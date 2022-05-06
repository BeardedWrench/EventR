import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Event, EventFormValues } from '../models/Event';
import { format } from 'date-fns';
import { store } from './store';
import { Profile } from '../models/Profile';

export default class EventStore {
  eventRegistry = new Map<string, Event>();
  selectedEvent: Event | undefined = undefined;
  editMode: boolean = false;
  loading: boolean = false;
  loadingInitial: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  private setEvent = (event: Event) => {
    const user = store.userStore.user;
    if (user) {
      event.isGoing = event.attendees!.some(
        (a) => a.username === user.username
      );
      event.isHost = event.hostUsername === user.username;
      event.host = event.attendees?.find(
        (x) => x.username === event.hostUsername
      );
    }
    event.date = new Date(event.date!);
    this.eventRegistry.set(event.id, event);
  };

  private getEvent = (id: string) => {
    return this.eventRegistry.get(id);
  };

  get eventsByDate() {
    return Array.from(this.eventRegistry.values()).sort(
      (a, b) => a.date!.getTime() - b.date!.getTime()
    );
  }

  get groupedEvents() {
    return Object.entries(
      this.eventsByDate.reduce((events, event) => {
        const date = format(event.date!, 'dd MMM yyyy');
        events[date] = events[date] ? [...events[date], event] : [event];
        return events;
      }, {} as { [key: string]: Event[] })
    );
  }

  loadEvents = async () => {
    this.loadingInitial = true;
    try {
      const events = await agent.Events.list();
      events.forEach((evt) => {
        this.setEvent(evt);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadEvent = async (id: string) => {
    let event = this.getEvent(id);
    if (event) {
      this.selectedEvent = event;
      return event;
    } else {
      this.loadingInitial = true;
      try {
        event = await agent.Events.details(id);
        this.setEvent(event);
        runInAction(() => {
          this.selectedEvent = event;
        });
        this.setLoadingInitial(false);
        return event;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createEvent = async (event: EventFormValues) => {
    const user = store.userStore.user;
    const attendee = new Profile(user!);
    try {
      await agent.Events.create(event);
      const newEvent = new Event(event);
      newEvent.hostUsername = user!.username;
      newEvent.attendees = [attendee];
      this.setEvent(newEvent);
      runInAction(() => {
        this.selectedEvent = newEvent;
      });
    } catch (error) {
      console.log(error);
    }
  };

  updateEvent = async (event: EventFormValues) => {
    try {
      await agent.Events.update(event);
      runInAction(() => {
        if (event.id) {
          let updatedEvent = { ...this.getEvent(event.id), ...event };
          this.eventRegistry.set(event.id, updatedEvent as Event);
          this.selectedEvent = updatedEvent as Event;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteEvent = async (id: string) => {
    this.loading = true;
    try {
      await agent.Events.delete(id);
      runInAction(() => {
        this.eventRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateAttendance = async () => {
    const user = store.userStore.user;
    this.loading = true;
    try {
      await agent.Events.attend(this.selectedEvent!.id);
      runInAction(() => {
        if (this.selectedEvent?.isGoing) {
          this.selectedEvent.attendees = this.selectedEvent.attendees?.filter(
            (a) => a.username !== user?.username
          );
          this.selectedEvent.isGoing = false;
        } else {
          const attendee = new Profile(user!);
          this.selectedEvent?.attendees?.push(attendee);
          this.selectedEvent!.isGoing = true;
        }
        this.eventRegistry.set(this.selectedEvent!.id, this.selectedEvent!);
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.loading = false));
    }
  };

  cancelEventToggle = async () => {
    this.loading = true;
    try {
      await agent.Events.attend(this.selectedEvent!.id);
      runInAction(() => {
        this.selectedEvent!.isCancelled = !this.selectedEvent!.isCancelled;
        this.eventRegistry.set(this.selectedEvent!.id, this.selectedEvent!);
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.loading = false));
    }
  };

  clearSelectedEvent = () => {
    this.selectedEvent = undefined;
  };
}

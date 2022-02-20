import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import Event from '../models/Event';
import { v4 as uuid } from 'uuid';

export default class EventStore {
  eventRegistry = new Map<string, Event>();
  selectedEvent: Event | undefined = undefined;
  editMode: boolean = false;
  loading: boolean = false;
  loadingInitial: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  get eventsByDate() {
    return Array.from(this.eventRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  loadEvents = async () => {
    try {
      const events = await agent.Events.list();
      events.forEach((evt) => {
        evt.date = evt.date.split('T')[0];
        this.eventRegistry.set(evt.id, evt);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  selectEvent = (id: string) => {
    this.selectedEvent = this.eventRegistry.get(id);
  };

  cancelSelectedEvent = () => {
    this.selectedEvent = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectEvent(id) : this.cancelSelectedEvent();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createEvent = async (event: Event) => {
    this.loading = true;
    event.id = uuid();

    try {
      await agent.Events.create(event);
      runInAction(() => {
        this.eventRegistry.set(event.id, event);
        this.selectedEvent = event;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateEvent = async (event: Event) => {
    this.loading = true;
    try {
      await agent.Events.update(event);
      runInAction(() => {
        this.eventRegistry.set(event.id, event);
        this.selectedEvent = event;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteEvent = async (id: string) => {
    this.loading = true;
    try {
      await agent.Events.delete(id);
      runInAction(() => {
        this.eventRegistry.delete(id);
        if (this.selectedEvent?.id === id) this.cancelSelectedEvent();
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}

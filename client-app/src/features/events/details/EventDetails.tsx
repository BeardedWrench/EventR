import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';

export default observer(function EventDetails() {
  const { eventStore } = useStore();
  const {
    selectedEvent: event,
    loadEvent,
    loadingInitial,
    clearSelectedEvent,
  } = eventStore;

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadEvent(id);

    return () => clearSelectedEvent();
  }, [id, loadEvent, clearSelectedEvent]);

  if (loadingInitial || !event) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat eventId={event.id} />
      </Grid.Column>

      <Grid.Column width={6}>
        <EventDetailedSidebar event={event} />
      </Grid.Column>
    </Grid>
  );
});

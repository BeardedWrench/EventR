import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventList from './EventList';
import EventFilters from './EventFilters';

export default observer(function EventDashboard() {
  const { eventStore } = useStore();
  const { loadEvents, eventRegistry } = eventStore;

  useEffect(() => {
    if (eventRegistry.size <= 1) loadEvents();
  }, [eventRegistry.size, loadEvents]);

  if (eventStore.loadingInitial)
    return <LoadingComponent content="Loading..." />;

  return (
    <Grid>
      <Grid.Column width="10">
        <EventList />
      </Grid.Column>
      <Grid.Column width="6">
        <EventFilters />
      </Grid.Column>
    </Grid>
  );
});

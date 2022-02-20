import { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import EventDashboard from '../../features/events/dashboard/EventDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const { eventStore } = useStore();

  useEffect(() => {
    eventStore.loadEvents();
  }, [eventStore]);

  if (eventStore.loadingInitial) return <LoadingComponent content="Loading" />;

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <EventDashboard />
      </Container>
    </>
  );
}

export default observer(App);

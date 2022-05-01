import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavBar from './NavBar';
import EventDashboard from '../../features/events/dashboard/EventDashboard';
import HomePage from '../../features/home/HomePage';
import EventForm from '../../features/events/form/EventForm';
import EventDetails from '../../features/events/details/EventDetails';
import TestError from '../../features/errors/TestError';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';

export default observer(function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded) return <LoadingComponent content="Loading..." />;

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <ModalContainer />
      <Route exact path="/" component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                <Route exact path="/events" component={EventDashboard} />
                <Route path="/events/:id" component={EventDetails} />
                <Route
                  key={location.key}
                  path={['/createEvent', '/manage/:id']}
                  component={EventForm}
                />
                <Route path="/errors" component={TestError} />
                <Route path="/server-error" component={ServerError} />
                <Route path="/login" component={LoginForm} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
});

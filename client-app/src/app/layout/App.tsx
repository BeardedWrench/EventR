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

export default observer(function App() {
  const location = useLocation();

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
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
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
});

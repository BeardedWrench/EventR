import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';

export default function NavBar() {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" exact header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: '0.8rem' }}
          />
          EventR
        </Menu.Item>
        <Menu.Item as={NavLink} to="/events" name="Events" />
        <Menu.Item as={NavLink} to="/errors" name="Errors" />

        <Menu.Item>
          <Button
            as={NavLink}
            to="/createEvent"
            positive
            content="Create Event"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
}

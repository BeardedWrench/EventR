import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default function NavBar() {
  const { eventStore } = useStore();

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: '0.8rem' }}
          />
          EventR
        </Menu.Item>
        <Menu.Item name="Events" />
        <Menu.Item>
          <Button
            onClick={() => eventStore.openForm()}
            positive
            content="Create Event"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
}

import { Link } from 'react-router-dom';
import { Container, Header, Segment, Image, Button } from 'semantic-ui-react';

export default function HomePage() {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          EventR
        </Header>
        <Header as="h2" inverted content="Welcome to EventR"></Header>
        <Button as={Link} to="/events" size="huge" inverted>
          Show me the Events!
        </Button>
      </Container>
    </Segment>
  );
}

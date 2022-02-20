import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default function EventDetails() {
  const { eventStore } = useStore();

  const { selectedEvent: event, openForm, cancelSelectedEvent } = eventStore;

  if (!event) return <LoadingComponent />;

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${event.category}.jpg`} />
      <Card.Content>
        <Card.Header>{event.title}</Card.Header>
        <Card.Meta>
          <span>{event.date}</span>
        </Card.Meta>
        <Card.Description>{event.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            onClick={() => openForm(event.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => cancelSelectedEvent()}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}

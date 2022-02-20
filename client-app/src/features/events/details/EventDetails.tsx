import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import Event from '../../../app/models/Event';

interface Props {
  event: Event;
  cancelSelectEvent: () => void;
  openForm: (id: string) => void;
}

export default function EventDetails({
  event,
  cancelSelectEvent,
  openForm,
}: Props) {
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
            onClick={() => cancelSelectEvent()}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}

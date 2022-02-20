import React, { useState } from 'react';
import { SyntheticEvent } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import Event from '../../../app/models/Event';

interface Props {
  events: Event[];
  selectEvent: (id: string) => void;
  deleteEvent: (id: string) => void;
  submitting: boolean;
}

export default function EventList({
  events,
  selectEvent,
  deleteEvent,
  submitting,
}: Props) {
  const [target, setTarget] = useState('');

  function handleEventDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteEvent(id);
  }
  return (
    <Segment>
      <Item.Group divided>
        {events.map((event) => {
          return (
            <Item key={event.id}>
              <Item.Content>
                <Item.Header as="a">{event.title}</Item.Header>
                <Item.Meta>{event.date}</Item.Meta>
                <Item.Description>
                  <div>{event.description}</div>
                  <div>
                    {event.city}, {event.venue}
                  </div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    onClick={() => selectEvent(event.id)}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Button
                    name={event.id}
                    onClick={(e) => handleEventDelete(e, event.id)}
                    loading={submitting && target === event.id}
                    floated="right"
                    content="Delete"
                    color="red"
                  />
                  <Label basic content={event.category} />
                </Item.Extra>
              </Item.Content>
            </Item>
          );
        })}
      </Item.Group>
    </Segment>
  );
}

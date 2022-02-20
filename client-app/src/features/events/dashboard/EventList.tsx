import React from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import Event from '../../../app/models/Event';

interface Props {
  events: Event[];
  selectEvent: (id: string) => void;
  deleteEvent: (id: string) => void;
}

export default function EventList({ events, selectEvent, deleteEvent }: Props) {
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
                    onClick={() => deleteEvent(event.id)}
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

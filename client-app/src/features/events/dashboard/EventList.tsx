import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function EventList() {
  const { eventStore } = useStore();
  const { loading, deleteEvent, eventsByDate } = eventStore;

  const [target, setTarget] = useState('');

  function handleEventDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteEvent(id);
  }
  return (
    <Segment>
      <Item.Group divided>
        {eventsByDate.map((event) => {
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
                    as={Link}
                    to={`/events/${event.id}`}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Button
                    name={event.id}
                    onClick={(e) => handleEventDelete(e, event.id)}
                    loading={loading && target === event.id}
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
});

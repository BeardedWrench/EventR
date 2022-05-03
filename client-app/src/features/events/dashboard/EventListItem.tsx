import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { Event } from '../../../app/models/Event';
import EventListItemAttendee from './EventListItemAttendee';

interface Props {
  event: Event;
}

export default function EventListItem({ event }: Props) {
  return (
    <Segment.Group>
      <Segment>
        {event.isCancelled && (
          <Label
            attached="top"
            color="red"
            content="Cancelled"
            style={{ textAlign: 'center' }}
          />
        )}
        <Item.Group>
          <Item>
            <Item.Image
              style={{ marginBottom: 5 }}
              size="tiny"
              circular
              src={event.host?.image || '/assets/user.png'}
            />
            <Item.Content>
              <Item.Header as={Link} to={`/events/${event.id}`}>
                {event.title}
              </Item.Header>
              <Item.Description>
                Hosted by{' '}
                <Link to={`/profiles/${event.hostUsername}`}>
                  {event.host?.displayName}
                </Link>
              </Item.Description>
              {event.isHost && (
                <Item.Description>
                  <Label basic color="orange">
                    You are hosting this event
                  </Label>
                </Item.Description>
              )}
              {event.isGoing && !event.isHost && (
                <Item.Description>
                  <Label basic color="green">
                    You are going to this event
                  </Label>
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" />
          {format(event.date!, 'dd MMM yyyy h:mm aa')}
          <Icon name="marker" />
          {event.venue}
        </span>
      </Segment>
      <Segment secondary>
        <EventListItemAttendee attendees={event.attendees!} />
      </Segment>
      <Segment clearing>
        <span>{event.description}</span>
        <Button
          as={Link}
          to={`/events/${event.id}`}
          color="teal"
          floated="right"
          content="View"
        />
      </Segment>
    </Segment.Group>
  );
}

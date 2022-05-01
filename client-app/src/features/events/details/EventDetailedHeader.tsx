import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Button, Header, Item, Segment, Image, Label } from 'semantic-ui-react';
import { Event } from '../../../app/models/Event';
import { useStore } from '../../../app/stores/store';

const eventImageStyle = {
  filter: 'brightness(40%)',
};
const eventImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white',
};

interface Props {
  event: Event;
}

export default observer(function EventDetailedHeader({ event }: Props) {
  const {
    eventStore: { updateAttendance, loading, cancelEventToggle },
  } = useStore();
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: '0' }}>
        {event.isCancelled && (
          <Label
            style={{ position: 'absolute', zIndex: 1000, left: -14, top: 20 }}
            ribbon
            color="red"
            content="Cancelled"
          ></Label>
        )}
        <Image
          src={`/assets/categoryImages/${event.category}.jpg`}
          fluid
          style={eventImageStyle}
        />
        <Segment style={eventImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={event.title}
                  style={{ color: 'white' }}
                />
                <p>{format(event.date!, 'dd MMM yyyy')}</p>
                <p>
                  Hosted by{' '}
                  <strong>
                    <Link to={`/profiles/${event.host?.username}`}>
                      {event.host?.displayName}
                    </Link>
                  </strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {event.isHost ? (
          <>
            <Button
              color={event.isCancelled ? 'green' : 'red'}
              floated="left"
              basic
              content={event.isCancelled ? 'Re-activate Event' : 'Cancel Event'}
              onClick={cancelEventToggle}
              loading={loading}
            />
            <Button
              disabled={event.isCancelled}
              as={Link}
              to={`/manage/${event.id}`}
              color="orange"
              floated="right"
            >
              Manage Event
            </Button>
          </>
        ) : event.isGoing ? (
          <Button loading={loading} onClick={updateAttendance}>
            Cancel attendance
          </Button>
        ) : (
          <Button
            disabled={event.isCancelled}
            loading={loading}
            onClick={updateAttendance}
            color="teal"
          >
            Join Event
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
});

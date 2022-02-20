import React from 'react';
import { Grid } from 'semantic-ui-react';
import Event from '../../../app/models/Event';
import EventDetails from '../details/EventDetails';
import EventForm from '../form/EventForm';
import EventList from './EventList';

interface Props {
  events: Event[];
  selectedEvent: Event | undefined;
  selectEvent: (id: string) => void;
  cancelSelectEvent: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (event: Event) => void;
  deleteEvent: (id: string) => void;
  submitting: boolean;
}

export default function EventDashboard({
  events,
  selectedEvent,
  selectEvent,
  cancelSelectEvent,
  editMode,
  openForm,
  closeForm,
  createOrEdit,
  deleteEvent,
  submitting,
}: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <EventList
          events={events}
          selectEvent={selectEvent}
          deleteEvent={deleteEvent}
          submitting={submitting}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedEvent && !editMode && (
          <EventDetails
            event={selectedEvent}
            cancelSelectEvent={cancelSelectEvent}
            openForm={openForm}
          />
        )}
        {editMode && (
          <EventForm
            closeForm={closeForm}
            event={selectedEvent}
            createOrEdit={createOrEdit}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}

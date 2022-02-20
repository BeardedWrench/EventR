import { observer } from 'mobx-react-lite';
import { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function EventForm() {
  const { eventStore } = useStore();
  const { selectedEvent, closeForm, createEvent, updateEvent, loading } =
    eventStore;

  const initialState = selectedEvent ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  };

  const [event, setEvent] = useState(initialState);

  function handleSubmit() {
    event.id ? updateEvent(event) : createEvent(event);
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={event.title}
          name="title"
          onChange={handleChange}
        />
        <Form.TextArea
          placeholder="Description"
          value={event.description}
          name="description"
          onChange={handleChange}
        />
        <Form.Input
          placeholder="Category"
          value={event.category}
          name="category"
          onChange={handleChange}
        />
        <Form.Input
          type="date"
          placeholder="Date"
          value={event.date}
          name="date"
          onChange={handleChange}
        />
        <Form.Input
          placeholder="City"
          value={event.city}
          name="city"
          onChange={handleChange}
        />
        <Form.Input
          placeholder="Venue"
          value={event.venue}
          name="venue"
          onChange={handleChange}
        />
        <Button
          loading={loading}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={() => closeForm()}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
});

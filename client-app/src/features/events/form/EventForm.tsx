import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import Dropdown from '../../../app/common/form/Dropdown';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import DateInput from '../../../app/common/form/DateInput';
import Event from '../../../app/models/Event';

export default observer(function EventForm() {
  const history = useHistory();
  const { eventStore } = useStore();
  const { createEvent, updateEvent, loading, loadingInitial, loadEvent } =
    eventStore;
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: null,
    city: '',
    venue: '',
  });

  const validationSchema = Yup.object({
    title: Yup.string().required('The event title is required.'),
    description: Yup.string().required('The event description is required.'),
    category: Yup.string().required(),
    date: Yup.string().required('Date is required.').nullable(),
    venue: Yup.string().required(),
    city: Yup.string().required(),
  });

  useEffect(() => {
    if (id) loadEvent(id).then((event) => setEvent(event!));
  }, [id, loadEvent]);

  function handleFormSubmit(event: Event) {
    if (event.id.length === 0) {
      let newEvent = {
        ...event,
        id: uuid(),
      };
      createEvent(newEvent).then(() => {
        history.push(`/events/${newEvent.id}`);
      });
    } else {
      updateEvent(event).then(() => {
        history.push(`/events/${event.id}`);
      });
    }
  }

  if (loadingInitial) return <LoadingComponent content="Loading Event..." />;

  return (
    <Segment clearing>
      <Header content="Event Details" sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={event}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <TextInput name="title" placeholder="Title" />
            <TextArea rows={3} placeholder="Description" name="description" />
            <Dropdown
              options={categoryOptions}
              placeholder="Category"
              name="category"
            />
            <DateInput
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <Header content="Location Details" sub color="teal" />
            <TextInput placeholder="City" name="city" />
            <TextInput placeholder="Venue" name="venue" />
            <Button
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="Submit"
              disabled={isSubmitting || !dirty || !isValid}
            />
            <Button
              onClick={() => history.goBack()}
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});

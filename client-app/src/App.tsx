import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/events').then((res) => {
      console.log(res);
      setEvents(res.data);
    });
  }, []);

  return (
    <>
      <Header as="h2" icon="users" content="EventR" />
      <List>
        {events.map((event: any) => {
          return <List.Item key={event.id}>{event.title}</List.Item>;
        })}
      </List>
    </>
  );
}

export default App;

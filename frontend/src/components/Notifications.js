// frontend/src/components/Notifications.js

import React, { useEffect, useState } from 'react';
import WebSocketClient from '../WebSocketClient';
import { Typography, Container, List, ListItem } from '@mui/material';

function Notifications() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const wsClient = new WebSocketClient();
    wsClient.connect();

    wsClient.addCallbacks('notification', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      if (wsClient.socketRef) {
        wsClient.socketRef.close();
      }
    };
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Notifications
      </Typography>
      <List>
        {messages.map((msg, index) => (
          <ListItem key={index}>{msg}</ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Notifications;

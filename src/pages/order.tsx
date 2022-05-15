import type React from 'react';
import { Typography, Container } from '@mui/material';
import { Timeline } from '@mui/lab';
import { TimelineElement } from '../components/TimelineElement';
import { useContext, useEffect } from 'react';
import { AppContext } from '../components/AppProvider';
import useUser from '../lib/useUser';
import { ACTIONS } from '../reducers/actions';

const Order = () => {
  const {state, dispatch} = useContext(AppContext);
  useEffect(() => {
    if (!state.guest.id) {
      dispatch({type: 'UPDATE_GUEST', value: {...JSON.parse(localStorage.getItem('shaun_char_guest_2022') ?? '{}')}});
    }
  }, [state.guest.id]);

  useUser({ redirectTo: '/invitation-only' });
  return (
    <Container maxWidth="sm">
      <Typography variant="h2">Order of service</Typography>
      <Timeline>
        <TimelineElement name="Procession - bridal party" />
        <TimelineElement name="Welcome &amp; prayer" />
        <TimelineElement name="Declatory &amp; contracting words" />
        <TimelineElement name="Scripture recital" />
        <TimelineElement name="Worship" />
        <TimelineElement name="Sermon" />
        <TimelineElement name="Worship" />
        <TimelineElement name="Vows" />
        <TimelineElement name="Ring exchange" isLast/>
      </Timeline>
    </Container>
  );
};

export default Order;

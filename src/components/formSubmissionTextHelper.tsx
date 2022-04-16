import React from 'react';
import { List, ListItem, Typography } from '@mui/material';
import { Box } from '@mui/system';

export const showAttendanceMessage = (isAttending: boolean, hasPlusOne: boolean) => {
  if (isAttending === undefined || isAttending === null) {
    return 'Head over to the RSVP page to let us know if you can make it';
  }
  return isAttending
    ? `We're glad you're attending our wedding${hasPlusOne ? ', including your plus one.': '!'}`
    : 'We\'ll miss your absence at our wedding!';
};
const menuMap = [{key: 0, value: 'blem'}];
export const showMealSelection = (menuChoices: Array<number>) => {
  return (
    <Box>
      <Typography variant="h3">You have chosen:</Typography>
      <List>
        {menuChoices.map(x => <ListItem key={x}>• {menuMap[x]?.value}</ListItem>)}
      </List>
    </Box>);
};
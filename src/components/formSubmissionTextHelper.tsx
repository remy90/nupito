import React, { useContext } from 'react';
import { List, ListItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { CuisineType, Menu } from './Interfaces';
import { afroMenuItems, dessertItems, euroMainItems, euroStarterItems } from './MenuOptions/MenuHelpers';
import { AppContext } from './AppProvider';

export const showAttendanceMessage = (isAttending: boolean, hasPlusOne: boolean) => {
  const {state} = useContext(AppContext);

  if (isAttending === undefined || isAttending === null) {
    return 'Head over to the RSVP page to let us know if you can make it';
  }
  return isAttending
    ? `We're glad you ${hasPlusOne && !!state.plusOne?.firstName ? `and ${state.plusOne.firstName}`: ''} are attending!`
    : 'We\'ll miss you!';
};

export const showMealSelection = (menuChoices: Menu, cuisine: CuisineType) => {
  const afroChoices = cuisine === 'afro' && afroMenuItems.filter(x => menuChoices[x.key]);

  return (
    <Box>
      <Typography variant="h3">You have chosen:</Typography>
      <List dense={true} sx={{ listStyleType: 'disc', margin: '1rem', padding: '0.4rem' }}>
        {
          cuisine === 'euro' && menuChoices?.euroStarter &&
            <ListItem  sx={{ display: 'list-item' }} key={menuChoices.euroStarter}>{euroStarterItems?.find(x => x.key === menuChoices.euroStarter)?.primary}</ListItem>
        }
        { 
          cuisine === 'euro' && menuChoices?.euroMain &&
            <ListItem  sx={{ display: 'list-item' }} key={menuChoices.euroMain}>{euroMainItems?.find(x => x.key === menuChoices.euroMain)?.primary}</ListItem>
        }
        {
          cuisine === 'afro' && menuChoices && afroChoices &&
            afroChoices.map(x => <ListItem  sx={{ display: 'list-item' }} key={x.key}>{x.primary}</ListItem>)
        }
        {
          menuChoices?.euroDessert &&
            <ListItem  sx={{ display: 'list-item' }} key={menuChoices.euroDessert}>{dessertItems?.find(x => x.key === menuChoices.euroDessert)?.primary}</ListItem>
        }
      </List>
    </Box>);
};
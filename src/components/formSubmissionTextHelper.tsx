import type React from 'react';
import { List, ListItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { CuisineType, Menu } from './Interfaces';
import { afroMenuMains, afroMenuStarters, dessertItems, euroMainItems, euroStarterItems } from './MenuOptions/MenuHelpers';
import Link from 'src/Link';

export const showAttendanceMessage = (isAttending: boolean, hasPlusOne: boolean, plusOneFirstName: string) => {

  if (isAttending === undefined || isAttending === null) { // not false
    return (
      <Typography>Head over to the <Link href="/rsvp">RSVP page</Link> to let us know if you can make it.</Typography>
    );
  }
  return isAttending
    ? <Typography>We&apos;re glad you {hasPlusOne && !!plusOneFirstName ? `and ${plusOneFirstName}`: ''} are attending!</Typography>
    : <Typography>We&apos;ll miss you!</Typography>;
};

export const showMealSelection = (menuChoices: Menu, cuisine: CuisineType) => {
  const afroMains = cuisine === 'afro' && afroMenuMains.filter(x => menuChoices[x.key]);
  const afroStarters = cuisine === 'afro' && afroMenuStarters.filter(x => menuChoices[x.key]);

  return (
    <Box>
      <Typography variant="h2">You have chosen:</Typography>
      <List dense={true} sx={{ listStyleType: 'disc', margin: '1rem', padding: '0.4rem' }}>
        <Typography variant="h3" sx={{my: '1rem'}}>Starter</Typography>
        {
          cuisine === 'euro' && menuChoices?.euroStarter &&
          <ListItem  sx={{ display: 'list-item' }} key={menuChoices.euroStarter}>{euroStarterItems?.find(x => x.key === menuChoices.euroStarter)?.primary}</ListItem>
        }
        {
          cuisine === 'afro' && menuChoices && afroStarters &&
        afroStarters.map(x => <ListItem  sx={{ display: 'list-item' }} key={x.key}>{x.primary}</ListItem>)
        }
        <Typography variant="h3" sx={{my: '1rem'}}>Main</Typography>
        { 
          cuisine === 'euro' && menuChoices?.euroMain &&
          <ListItem  sx={{ display: 'list-item' }} key={menuChoices.euroMain}>{euroMainItems?.find(x => x.key === menuChoices.euroMain)?.primary}</ListItem>
        }
        {
          cuisine === 'afro' && menuChoices && afroMains &&
        afroMains.map(x => <ListItem  sx={{ display: 'list-item' }} key={x.key}>{x.primary}</ListItem>)
        }
        <Typography variant="h3" sx={{my: '1rem'}}>Dessert</Typography>
        {
          menuChoices?.euroDessert &&
          <ListItem  sx={{ display: 'list-item' }} key={menuChoices.euroDessert}>{dessertItems?.find(x => x.key === menuChoices.euroDessert)?.primary}</ListItem>
        }
      </List>
    </Box>);
};
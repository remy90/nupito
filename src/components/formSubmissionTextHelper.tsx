import type React from 'react';
import { List, ListItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { CuisineType, Menu } from './Interfaces';
import { afroMenuMains, afroMenuStarters, dessertItems, euroMainItems, euroStarterItems } from './MenuOptions/MenuHelpers';
import Link from 'src/Link';

export const showAttendanceMessage = (isAttending: boolean, hasPlusOne: boolean, plusOneFirstName: string, isFed: boolean) => {

  if (isAttending === undefined || isAttending === null) { // not false
    return (
      <Typography>Head over to the <Link href="/rsvp">RSVP page</Link> to let us know if you can make it. The option to respond will be removed on Monday 11th July.</Typography>
    );
  }
  return isAttending
    ? <Box>
      <Typography>We&apos;re glad you {hasPlusOne && !!plusOneFirstName ? `and ${plusOneFirstName}`: ''} are attending!</Typography>
      <Typography>Your arrival time is: {isFed ? '11:30' : '18:30'}</Typography>
    </Box>
    : <Typography>We&apos;ll miss you!</Typography>;
};

export const showMealSelection = (menuChoices: Menu, cuisine: CuisineType) => {
  const afroMains = cuisine === 'afro' && afroMenuMains.filter(x => menuChoices[x.key]);
  const afroStarters = cuisine === 'afro' && afroMenuStarters.filter(x => menuChoices[x.key]);

  return cuisine === 'euro' || cuisine === 'afro' ? (
    <Box>
      <Typography variant="h2">From the food menu, you have chosen:</Typography>
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
        {menuChoices?.euroDessert.trim() !== '' && <Typography variant="h3" sx={{my: '1rem'}}>Dessert</Typography>}
        {
          menuChoices?.euroDessert &&
          <ListItem  sx={{ display: 'list-item' }} key={menuChoices.euroDessert}>{dessertItems?.find(x => x.key === menuChoices.euroDessert)?.primary}</ListItem>
        }
      </List>
    </Box>)
    : (<></>);
};
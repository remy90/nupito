import React from 'react';
import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { RHFormControlProps } from './Interfaces';

export const DessertOptions = ({control}: RHFormControlProps) =>
  <>
    <Typography variant="h4" sx={{ my: '1rem', fontSize: '2rem'}}>Dessert</Typography>
    <Controller
      name='menuChoice.euroDessert'
      control={control}
      render={({field}) =>
        <RadioGroup {...field}>
          <FormControlLabel value={28} control={<Radio />} label="Cheese &amp; Roquito Pepper Tart" />
          <FormControlLabel value={29} control={<Radio />} label="Wild Mushroom &amp; Creamy Tomato Crêpe" />
          <FormControlLabel value={30} control={<Radio />} label="Roasted Butternut Squash &amp; Shallot Risotto with Parmesan shavings" />
          <FormControlLabel value={31} control={<Radio />} label="Raspberry Brûlée Tart served with Raspberries &amp; Coulis" />
          <FormControlLabel value={32} control={<Radio />} label="Chocolate Truffle Torte With a mini Profiterole &amp; Strawberry" />
          <FormControlLabel value={33} control={<Radio />} label="Lemon Posset Served with Blueberries and Langue de Chat Biscuits" />
          <FormControlLabel value={34} control={<Radio />} label="Golden Toffee Cheesecake served with Toffee Sauce &amp;Raspberry" />
          <FormControlLabel value={35} control={<Radio />} label={<><p>Passionfruit Pannacotta served with Blueberry &amp; Coulis</p> <em> - recommended</em></>} />
          <FormControlLabel value={36} control={<Radio />} label="Chocolate &amp; Orange Tart served with Chocolate Coulis" />
          <FormControlLabel value={37} control={<Radio />} label="Fresh Fruit Platter" />
        </ RadioGroup>}
    />
  </>;

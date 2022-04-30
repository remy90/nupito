import React from 'react';
import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { RHFormControlProps } from '../Interfaces';

export const AfroMenuOptions = ({ control }: RHFormControlProps) =>
  <FormGroup>
    <Typography variant="h4" sx={{ my: '1rem'}}>Starters</Typography>
    <Controller
      name='menu.foodOption0'
      control={control}
      render={({field}) =>
        <FormControlLabel {...field} control={<Checkbox />} label="Spring roll  samosa &amp; puff puff" />}
    />
    <Typography  variant="h4" sx={{ my: '1rem'}}>Mains</Typography>
    <Controller
      name='menu.foodOption1'
      control={control}
      render={({field}) =>
        <FormControlLabel {...field} control={<Checkbox />} label="Jollof rice" />}
    />
    <Controller
      name='menu.foodOption2'
      control={control}
      render={({field}) =>
        <FormControlLabel {...field} control={<Checkbox />} label="Fried rice" />} />
    <Controller
      name='menu.foodOption3'
      control={control}
      render={({field}) =>
        <FormControlLabel {...field} control={<Checkbox />} label="Asaro with sauce" />} />
    <Controller
      name='menu.foodOption4'
      control={control}
      render={({field}) =>
        <FormControlLabel {...field} control={<Checkbox />} label="Ewa agoyin with sauce Ayamase with white rice" />} />
    <Controller
      name='menu.foodOption5'
      control={control}
      render={({field}) =>
        <FormControlLabel {...field} control={<Checkbox />} label="Assorted meat, chicken &amp; fish" />} />
    <Controller
      name='menu.foodOption6'
      control={control}
      render={({field}) =>
        <FormControlLabel {...field} control={<Checkbox />} label="Efo riro efo elegusi" />} />
    <Controller
      name='menu.foodOption7'
      control={control}
      render={({field}) =>
        <FormControlLabel {...field} control={<Checkbox />} label="Pounded yam" />} />
    <Controller
      name='menu.foodOption8'
      control={control}
      render={({field}) =>
        <FormControlLabel {...field} control={<Checkbox />} label="Abula (Gbegiri ewedu amala soup with assorted meat stew)" />} />
    <Typography>Side</Typography>
    <Controller
      name='menu.foodOption9'
      control={control}
      render={({field}) =>
        <FormControlLabel {...field} control={<Checkbox />} label="Dodogizzard" />} />
    <Typography variant="h4" sx={{ my: '1rem'}}>Sides</Typography>
    <Controller
      name='menu.foodOption10'
      control={control}
      render={({field}) =>
        <FormControlLabel {...field} control={<Checkbox />} label="Moin-moin" />} />
    <Controller
      name='menu.foodOption11'
      control={control}
      render={({field}) =>
        <FormControlLabel {...field} control={<Checkbox />} label="Salad" />} />
  </FormGroup>;
  
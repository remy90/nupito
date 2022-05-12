import type React from 'react';
import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { IMenuDefaultProps } from '../Interfaces';
import { dessertItems } from './MenuHelpers';

export const DessertOptions = ({control, defaultValues }: IMenuDefaultProps) =>
  <>
    <Typography variant="h4" sx={{ my: '1rem', fontSize: '2rem'}}>Dessert</Typography>
    <Controller
      name='menu.euroDessert'
      control={control}
      defaultValue={defaultValues?.euroDessert ?? ''}
      render={({field}) =>
        <RadioGroup {...field}>
          {dessertItems.map(x => <FormControlLabel key={x.key} value={x.key} control={<Radio />} label={x.primary} />)}
        </ RadioGroup>}
    />
  </>;

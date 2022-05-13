import type React from 'react';
import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { IMenuOptionProps } from '../Interfaces';
import { dessertItems, shouldShowBasedOnDietChoice } from './MenuHelpers';

export const DessertOptions = ({control, defaultValues, diet }: IMenuOptionProps) =>
  <>
    <Typography variant="h4" sx={{ my: '1rem', fontSize: '2rem'}}>Dessert</Typography>
    <Controller
      name='menu.euroDessert'
      control={control}
      defaultValue={defaultValues?.euroDessert}
      render={({field}) =>
        <RadioGroup {...field}>
          {dessertItems.map(x => shouldShowBasedOnDietChoice(diet, x.diet) && <FormControlLabel key={x.key} value={x.key} control={<Radio />} label={x.primary} />)}
        </ RadioGroup>}
    />
  </>;

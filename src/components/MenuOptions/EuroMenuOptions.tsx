import type React from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import type { IMenuOptionProps } from '../Interfaces';
import { euroMainItems, euroStarterItems, shouldShowBasedOnDietChoice } from './MenuHelpers';
import { useMemo } from 'react';

export const EuroMenuOptions = ({ control, defaultValues, diet }: IMenuOptionProps) =>
{
  return (
    <FormControl>
      <Typography variant="h4" sx={{ my: '1rem', fontSize: '2rem'}}>Starters</Typography>
      <Controller
        name='menu.euroStarter'
        control={control}
        defaultValue={defaultValues?.euroStarter}
        render={({field}) =><RadioGroup {...field} value={field.value}>
          {euroStarterItems.map(x => shouldShowBasedOnDietChoice(diet, x.diet) && <FormControlLabel key={x.key} value={x.key} control={<Radio />} label={x.primary} />)}
        </RadioGroup>}
      />
      <Typography variant="h4" sx={{ my: '1rem', fontSize: '2rem'}}>Mains - all are served with Seasonal Vegetables and Potatoes</Typography>
      <Controller
        name='menu.euroMain'
        control={control}
        defaultValue={defaultValues?.euroMain}
        render={({field}) => <RadioGroup {...field} value={field.value}>
          {euroMainItems.map(x => shouldShowBasedOnDietChoice(diet, x.diet) && <FormControlLabel key={x.key} value={x.key} control={<Radio />} label={x.primary} />)}
        </RadioGroup>}
      />
    </FormControl>);
};

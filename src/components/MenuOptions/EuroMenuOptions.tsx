import type React from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import type { IMenuOptionProps } from '../Interfaces';
import { euroMainItems, euroStarterItems, shouldShowBasedOnDietChoice } from './MenuHelpers';

export const EuroMenuOptions = ({ control, defaultValues, diet }: IMenuOptionProps) =>
{
  return (
    <FormControl>
      <Typography variant="h4">Western menu</Typography>
      <Typography variant="subtitle1">Choose one starter, main &amp; dessert</Typography>
      <Typography variant="subtitle2" sx={{ mt: '1rem'}}>Starters</Typography>
      <Controller
        name='menu.euroStarter'
        control={control}
        defaultValue={defaultValues?.euroStarter ?? ''}
        render={({field}) =><RadioGroup {...field} value={field.value}>
          {euroStarterItems.map(x => shouldShowBasedOnDietChoice(diet, x.diet) && <FormControlLabel key={x.key} value={x.key} control={<Radio />} label={x.primary} />)}
        </RadioGroup>}
      />
      <Typography variant="subtitle2" sx={{ mt: '1rem'}}>Mains</Typography>
      <Typography variant="subtitle1" sx={{ mb: '1rem' }}>All are served with seasonal vegetables &amp; potatoes</Typography>
      <Controller
        name='menu.euroMain'
        control={control}
        defaultValue={defaultValues?.euroMain ?? ''}
        render={({field}) => <RadioGroup {...field} value={field.value}>
          {euroMainItems.map(x => shouldShowBasedOnDietChoice(diet, x.diet) && <FormControlLabel key={x.key} value={x.key} control={<Radio />} label={x.primary} />)}
        </RadioGroup>}
      />
    </FormControl>);
};

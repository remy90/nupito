import type React from 'react';
import { Box, MenuItem, TextField } from '@mui/material';
import { IFieldProps } from '../Interfaces';

export const DietPreferenceField = ({ onChange, errors, register, defaultValue }: IFieldProps) =>
{
  return(
    <Box sx={{marginBottom: '2rem'}}>
      <TextField
        select
        sx={{ width: '100%' }}
        label="Diet"
        defaultValue={defaultValue}
        inputProps={register('diet', { required: 'If you&apos;re eating, please enter a dietary preference' })}
        onChange={onChange}
        error={!!errors?.diet}
        helperText={errors?.diet?.message}
      >
        <MenuItem value={'Meat'}>No restrictions</MenuItem>
        <MenuItem value={'Vegetarian'}>Vegetarian</MenuItem>
        <MenuItem value={'Vegan'}>Vegan</MenuItem>
        <MenuItem value={'NoFood'}>No food for me</MenuItem>
      </TextField>
    </Box>);
};
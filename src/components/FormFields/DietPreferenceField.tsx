import type React from 'react';
import { Box, MenuItem, TextField } from '@mui/material';
import { DietType, IFieldProps } from '../Interfaces';

export const DietPreferenceField = ({ onChange, errors, register }: IFieldProps) =>
  <Box sx={{marginBottom: '2rem'}}>
    <TextField
      select
      sx={{ width: '100%' }}
      label="Diet"
      defaultValue={''}
      inputProps={register('diet', {
        required: 'Please enter a dietary preference',
      })}

      onChange={onChange}
      error={!!errors?.diet}
      helperText={errors?.diet?.message}
    >
      <MenuItem value={DietType.Meat}>I can eat anything</MenuItem>
      <MenuItem value={DietType.Vegetarian}>Vegetarian</MenuItem>
      <MenuItem value={DietType.Vegan}>Vegan</MenuItem>
    </TextField>
  </Box>;
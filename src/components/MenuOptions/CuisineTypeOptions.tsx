import type React from 'react';
import { FormControl, FormControlLabel, RadioGroup, Radio, Box, Typography } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { CuisineType, GuestDocument } from '../Interfaces';

interface ICuisineTypeOptions {
  defaultValues: CuisineType | undefined;
  control: Control<GuestDocument, object>;
  handleCuisineChange: (cuisine: CuisineType) => void;
}

export const CuisineTypeOptions = ({defaultValues = 'euro', control, handleCuisineChange}: ICuisineTypeOptions) =>
  <Box>
    <Typography variant="h3">What cuisine type would you like?</Typography>
    <FormControl>
      <Controller
        control={control}
        defaultValue={defaultValues}
        name="cuisine"
        render={({field}) =>
          <RadioGroup {...field}>
            <FormControlLabel
              value={'euro'}
              control={<Radio />}
              label="European"
              onClick={() => handleCuisineChange('euro')}
            />
            <FormControlLabel
              value={'afro'}
              control={<Radio />}
              label="West African 🇳🇬"
              // onClick={() => handleCuisineChange('afro')}
              disabled
            />
          </RadioGroup>}
      />
    </FormControl>
  </Box>;

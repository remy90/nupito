import {  Box, Typography, FormControl, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import React, { useState } from 'react';
import { Control, useForm } from 'react-hook-form';
import { AfroMenuOptions } from './AfroMenuOptions';
import { EuroMenuOptions } from './EuroMenuOptions';
import { RHFormControlProps } from './Interfaces';

type CuisineType = 'euro' | 'afro';
interface OtherProps {
  eatsAnything: boolean;
  control: Control;
}

export default function MenuForm({ eatsAnything, control }: RHFormControlProps & OtherProps) {
  const [isAfrican, setIsAfrican] = useState(false);
  const [isEuropean, setIsEuropean] = useState(false);

  const { reset } = useForm();

  const resetFoodOptions = (firstOptionNumber: number, lastOptionNumber: number) => {
    const resetObject: any = {};
  
    for (let i = firstOptionNumber; i <= lastOptionNumber; i++) {
      resetObject[`menuChoice.foodOption${i}`] = false;
    }
    return resetObject;
  };
  const handleEuroCuisine = () => {
    setIsAfrican(false);
    setIsEuropean(true);
    eatsAnything = false;
    reset(resetFoodOptions(0, 11));
  };
  const handleAfroCuisine = () => {
    setIsEuropean(false);
    setIsAfrican(true);
    eatsAnything = true;
    reset(resetFoodOptions(12, 37));
  };
  const cuisines = {
    euro: handleEuroCuisine,
    afro: handleAfroCuisine
  };
  const handleClick = (cuisineType: CuisineType) =>
    cuisines[cuisineType]();

  return (
    <Box sx={{marginTop: '2rem', marginBottom: '2rem'}}>
      <Typography variant="h3" sx={{ fontSize: '2.5rem'}}>What cuisine type would you like?</Typography>
      {eatsAnything && <FormControl>
        <RadioGroup name="radio-buttons-group">
          <FormControlLabel
            checked={isEuropean}
            control={<Radio />}
            label="European"
            onClick={() => handleClick('euro')}
          />
          <FormControlLabel
            checked={isAfrican}
            control={<Radio />}
            label="African 🇳🇬"
            onClick={() => handleClick('afro')}
          />
        </RadioGroup>
      </FormControl>}
      {eatsAnything && isAfrican && <AfroMenuOptions control={control} />}
      {(isEuropean || !eatsAnything) && <EuroMenuOptions control={control} />}
    </Box>
  );
}
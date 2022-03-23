import {  Box, Typography, FormControl, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AfroMenuOptions, RHFormControlProps } from './AfroMenuOptions';

type FormValues = {
  IsAttending: boolean;
  diet: string;
  emailAddress: string;
  foodChoices: [];
};

type CuisineType = 'euro' | 'afro';
interface OtherProps {
  eatsAnything: boolean;
}
export default function MenuForm({ eatsAnything, control }: RHFormControlProps & OtherProps) {
  const [isAfrican, setIsAfrican] = useState(false);
  const [isEuropean, setIsEuropean] = useState(false);
  const isAttending = (val: any) => val;
  // const onSubmit = data => {debugger; handleSubmit(data);};
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const onSubmit: SubmitHandler<FormValues> = (data) => {JSON.stringify(getValues());
  };
  const handleEuroCuisine = () => {
    setIsAfrican(false);
    setIsEuropean(true);
    eatsAnything = false;
  };
  const handleAfroCuisine = () => {
    setIsEuropean(false);
    setIsAfrican(true);
    eatsAnything = true;
  };
  const cuisines = {
    euro: handleEuroCuisine,
    afro: handleAfroCuisine
  };
  const handleClick = (cuisineType: CuisineType) =>
    cuisines[cuisineType]();

  return (
    <Box sx={{marginTop: '2rem', marginBottom: '2rem'}}>
      <Typography><b>What cuisine type would you like?</b></Typography>
      <FormControl>
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
      </FormControl>
      {isAfrican && eatsAnything && <AfroMenuOptions control={control} />}
    </Box>
  );
}
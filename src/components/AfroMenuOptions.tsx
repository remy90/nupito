import React from 'react';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { Inputs } from './Form';

export interface RHFormControlProps {
  control: Control<Inputs, object>;
}

export const AfroMenuOptions = ({ control}: RHFormControlProps) =>
  <FormGroup>
    <Controller
      name='menuChoice.foodOption2'
      control={control}
      render={({field}) =>
        <FormControlLabel {...field} checked={field.value} control={<Checkbox />} label="Jollof rice" />}
    />
    <Controller
      name='menuChoice.foodOption3'
      control={control}
      render={({field}) =>
        <FormControlLabel {...field} checked={field.value} control={<Checkbox />} label="Fried rice" />} />
    <Controller
      name='menuChoice.foodOption4'
      control={control}
      render={({field}) =>
        <FormControlLabel {...field} checked={field.value} control={<Checkbox />} label="Asaro with sauce" />} />
    <Controller
      name='menuChoice.foodOption5'
      control={control}
      render={({field}) =>
        <FormControlLabel {...field} checked={field.value} control={<Checkbox />} label="Ewa agoyin with sauce Ayamase with white rice" />} />
    <Controller
      name='menuChoice.foodOption6'
      control={control}
      render={({field}) =>
        <FormControlLabel {...field} checked={field.value} control={<Checkbox />} label="Assorted meat, chicken &amp; fish" />} />
    <Controller
      name='menuChoice.foodOption1'
      control={control}
      render={({field}) =>
        <FormControlLabel {...field} checked={field.value} control={<Checkbox />} label="Efo riro efo elegusi" />} />
    <Controller
      name='menuChoice.foodOption7'
      control={control}
      render={({field}) =>
        <FormControlLabel {...field} checked={field.value} control={<Checkbox />} label="Pounded yam" />} />
    <Controller
      name='menuChoice.foodOption8'
      control={control}
      render={({field}) =>
        <FormControlLabel {...field} checked={field.value} control={<Checkbox />} label="Abula (Gbegiri ewedu amala soup with assorted meat stew)" />} />
    <Controller
      name='menuChoice.foodOption9'
      control={control}
      render={({field}) =>
        <FormControlLabel {...field} checked={field.value} control={<Checkbox />} label="Jollof rice" />} />
    <Controller
      name='menuChoice.foodOption10'
      control={control}
      render={({field}) =>
        <FormControlLabel {...field} checked={field.value} control={<Checkbox />} label="Jollof rice" />} />
    <Controller
      name='menuChoice.foodOption11'
      control={control}
      render={({field}) =>
        <FormControlLabel {...field} checked={field.value} control={<Checkbox />} label="Jollof rice" />} />
    <Controller
      name='menuChoice.foodOption12'
      control={control}
      render={({field}) =>
        <FormControlLabel {...field} checked={field.value} control={<Checkbox />} label="Jollof rice" />} />
  </FormGroup>;
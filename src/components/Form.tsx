import { FormControl, Input, MenuItem, Select } from '@mui/material';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

export const DietType = {
  AnythingGoes: 'anything goes',
  Veggie: 'veggie',
  Vegan: 'vegan',
} as const;
type DietType = typeof DietType[keyof typeof DietType];

type Inputs = {
  isAttending: boolean,
  diet: DietType,
  otherFoodRequirements: string,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      padding: 10,
      margin: 10,
    },
  },
};

export default function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <FormControl sx={{ m: 1, width: 300 }} onSubmit={handleSubmit(onSubmit)}>
      
      <Select MenuProps={MenuProps} {...register('isAttending')}>
        <MenuItem value={undefined} />
        <MenuItem value={1}>yes</MenuItem>
        <MenuItem value={0}>no</MenuItem>
      </Select>
      <Select MenuProps={MenuProps} {...register('diet')}>
        <MenuItem value={undefined} />
        <MenuItem value={1}>anything goes</MenuItem>
        <MenuItem value={0}>veggie</MenuItem>
        <MenuItem value={0}>vegan</MenuItem>
      </Select>
      <Input {...register('otherFoodRequirements')} />
      <Input style={{margin: 10, padding: 10}} type="submit" />
    </FormControl>
  );
}
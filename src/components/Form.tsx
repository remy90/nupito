import { FormControl, Input, InputLabel, MenuItem, Paper, Select, TextField, Box } from '@mui/material';
import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

export const DietType = {
  Meat: 'anything goes',
  Vegetarian: 'veggie',
  Vegan: 'vegan',
} as const;
type DietType = typeof DietType[keyof typeof DietType];

type Inputs = {
  isAttending: boolean,
  diet: DietType,
  otherFoodRequirements: string,
};

export default function Form() {
  const { register, handleSubmit, control, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
  return (
    <Paper style={{height: '40vh'}}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{marginTop: '2rem', marginBottom: '2rem'}}>
          <TextField
            select
            sx={{width: '100%'}}
            label="RSVP"
            defaultValue=""
            inputProps={register('isAttending', {
              required: 'Please enter currency',
            })}
            // error={errors.isAttending}
            helperText={errors.isAttending?.message}
          >
            <MenuItem value={''} />
            <MenuItem value={0}>I will attend</MenuItem>
            <MenuItem value={1}>I will not be able to attend</MenuItem>
          </TextField>
        </Box>
        <Box sx={{marginBottom: '2rem'}}>
          <TextField
            select
            sx={{ width: '100%' }}
            label="Diet"
            defaultValue={''}
            inputProps={register('diet', {
              required: 'Please enter currency',
            })}
            // error={errors.isAttending}
            helperText={errors.diet?.message}
          >
            <MenuItem value={''} />
            <MenuItem value={DietType.Meat}>I can eat anything</MenuItem>
            <MenuItem value={DietType.Vegetarian}>Vegetarian</MenuItem>
            <MenuItem value={DietType.Vegan}>Vegan</MenuItem>
          </TextField>
        </Box>
        <Box sx={{marginBottom: '2rem'}}>
          <Input
            sx={{ width: '100%', paddingLeft: 2 }}
            placeholder='Other food requirements'
            {...register('otherFoodRequirements')} />
        </Box>
        <Box><Input type="submit" /></Box>
      </form>
    </Paper>
  );
}
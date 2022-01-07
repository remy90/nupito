import { Input, MenuItem, Paper, TextField, Box, Alert, AlertColor } from '@mui/material';
import React, { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AppContext } from './AppProvider';
import { TemporaryAlert } from './TemporaryAlert';

export const DietType = {
  Meat: 'anything goes',
  Vegetarian: 'veggie',
  Vegan: 'vegan',
} as const;
type DietType = typeof DietType[keyof typeof DietType];

export type Inputs = {
  isAttending: boolean,
  diet: DietType,
  otherFoodRequirements: string,
};
export type GuestData = {
  firstName: string,
  lastName: string,
  isPlusOne: string,
  ID: string,
  hasPlusOne: boolean,
  wave:1,
  isAttending: boolean,
  diet: string,
  otherFoodRequirements: string,
};
export type FormData = {
  urlId: string,
  isAttending: boolean,
  diet: DietType,
  otherFoodRequirements: string,
  plusOne?: {
    guest: GuestData,
  }
}
export default function Form() {
  const { state, dispatch } = useContext(AppContext);
  const registerGuest = async (data: any) =>
    await fetch('/api/guestUpdate', {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const showAlertMessage = true;
  const getAlertText = (severity: AlertColor = 'info') => {
    if (severity === 'info') { return; }
    return severity === 'success'
      ? 'Form submitted successfully'
      : 'An error occured with your submission. Please ensure you used the correct invitation url and try again.';
  };
  const onSubmit: SubmitHandler<Inputs> = async data => {
    if (!state?.ID){
      console.error('id not registered');
    }
    const result = await registerGuest({
      ID: state?.ID,
      ...data
    });
    console.log(result);
    console.log(`result.status: ${result.status}`);
    console.log(`state severity: ${state.Severity}`);
    dispatch({
      type: 'SUBMIT_FORM',
      value: {
        showAlertMessage: showAlertMessage,
        severity: result.status === 200 ? 'success' : 'error',
      },
    });
    console.log(`state severity: ${state.Severity}`);
    console.log(`ShowAlertMessage: ${state.ShowAlertMessage}`);
    console.log(state);
  };
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
              required: 'Please select your attendance'  // JS only: <p>error message</p> TS only support string
            })}
            error={!!errors.isAttending}
            helperText={errors.isAttending?.message}
          >
            <MenuItem value={'true'}>I will attend</MenuItem>
            <MenuItem value={'false'}>I will not be able to attend</MenuItem>
          </TextField>
        </Box>
        <Box sx={{marginBottom: '2rem'}}>
          <TextField
            select
            sx={{ width: '100%' }}
            label="Diet"
            defaultValue={''}
            inputProps={register('diet', {
              required: 'Please enter a dietary preference',
            })}
            error={!!errors.diet}
            helperText={errors.diet?.message}
          >
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
        {!!state.ShowAlertMessage
          && <TemporaryAlert severity={ state.Severity ?? 'error' }>
            { getAlertText(state.Severity) }
          </TemporaryAlert>}
      </form>
    </Paper>
  );
}
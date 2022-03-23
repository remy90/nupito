import { Input, MenuItem, Paper, TextField, Box, AlertColor, SelectChangeEvent, Button, Typography, FormControlLabel, Checkbox, FormGroup } from '@mui/material';
import { fontSize } from '@mui/system';
import React, { ChangeEvent, useContext, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { once } from 'stream';
import { AppContext } from './AppProvider';
import MenuForm from './MenuForm';
import { AfroMenuOptions } from './MenuOptions';
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
  otherFoodConsiderations: string,
  emailAddress: string,
  cuisineType: {
    euro: boolean;
    afro: boolean;
  }
  menuChoice: {
    foodOption1: boolean,
    foodOption2: boolean,
    foodOption3: boolean,
    foodOption4: boolean,
    foodOption5: boolean,
    foodOption6: boolean,
    foodOption7: boolean,
    foodOption8: boolean,
    foodOption9: boolean,
    foodOption10: boolean,
    foodOption11: boolean,
    foodOption12: boolean,
  }
};
export type GuestData = {
  ID: string,
  firstName: string,
  lastName: string,
  isPlusOne: string,
  hasPlusOne: boolean,
  wave:1,
  isAttending: boolean,
  diet: string,
  otherFoodConsiderations: string,
};
export type FormData = {
  urlId: string,
  isAttending: boolean,
  diet: DietType,
  otherFoodConsiderations: string,
  plusOne?: {
    guest: GuestData,
  },
  emailAddress: string,
}
export default function Form() {
  const { state, dispatch } = useContext(AppContext);
  const [attending, setAttending] = useState<boolean>();
  const [eatsAnything, setEatsAnything] = useState<boolean>(false);
  const registerGuest = async (data: any) =>
    await fetch('/api/guestUpdate', {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

  const { register, handleSubmit, formState: { errors }, control } = useForm<Inputs>({
    defaultValues: {
      menuChoice: {
        foodOption1: false,
        foodOption2: false,
        foodOption3: false,
        foodOption4: false,
        foodOption5: false,
        foodOption6: false,
        foodOption7: false,
        foodOption8: false,
        foodOption9: false,
        foodOption10: false,
        foodOption11: false,
        foodOption12: false
      }
    }
  });
  const showAlertMessage = true;
  const getAlertText = (severity: AlertColor = 'info') => {
    if (severity === 'info') { return; }
    return severity === 'success'
      ? 'Form submitted successfully'
      : 'An error occured with your submission. Please ensure you used the correct invitation url and try again.';
  };
  const onSubmit: SubmitHandler<Inputs> = async data => {
    debugger;
    console.log(data);
    console.log('submitting...');
    if (!state?.ID){
      console.error('id not registered');
    }

    const result = await registerGuest({
      ID: state?.ID ?? localStorage.getItem('shaun_char_guest_id'),
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
  const handleAttendanceChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAttending(event.target?.value === 'true');
  };
  const handleDietChange =  (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEatsAnything(event.target?.value === DietType.Meat);
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
            onChange={handleAttendanceChange}
            error={!!errors.isAttending}
            helperText={errors.isAttending?.message}
          >
            <MenuItem onSelect={() => console.log('selected')} value={'true'}>I will attend</MenuItem>
            <MenuItem value={'false'}>I will not be able to attend</MenuItem>
          </TextField>
        </Box>
        
        {attending && <Box sx={{marginBottom: '2rem'}}>
          <TextField
            select
            sx={{ width: '100%' }}
            label="Diet"
            defaultValue={''}
            inputProps={register('diet', {
              required: 'Please enter a dietary preference',
            })}

            onChange={handleDietChange}
            error={!!errors.diet}
            helperText={errors.diet?.message}
          >
            <MenuItem value={DietType.Meat}>I can eat anything</MenuItem>
            <MenuItem value={DietType.Vegetarian}>Vegetarian</MenuItem>
            <MenuItem value={DietType.Vegan}>Vegan</MenuItem>
          </TextField>
        </Box>}
        <MenuForm eatsAnything={!!eatsAnything} control={control} />
        {attending && <Box  sx={{marginTop: 2, marginBottom: 2, paddingLeft: 2}}>
          <Input
            sx={{ width: '90%', paddingLeft: 2, paddingRight: 2 }}
            placeholder='Email address'
            {...register('emailAddress', {
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
            }
            )}
            error={!!errors.emailAddress}
          />
          { errors?.emailAddress?.type === 'pattern' && (
            <div style={{width: '80%'}}>
              <Typography style={{
                fontSize: '0.75rem',
                fontWeight: 400,
                color: '#ff1744'
              }}>Please supply a valid email address for our wedding updates</Typography>
            </div>
          )}
        </Box>}
        <Box><Button sx={{margin: 2}} variant="outlined" type="submit">Submit</Button></Box>
        {!!state.ShowAlertMessage
          && <TemporaryAlert severity={ state.Severity ?? 'error' }>
            { getAlertText(state.Severity) }
          </TemporaryAlert>}
      </form>
    </Paper>
  );
}
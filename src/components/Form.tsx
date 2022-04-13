import React, { ChangeEvent, useContext, useState } from 'react';
import { Paper, Box, AlertColor, Button } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AppContext } from './AppProvider';
import MenuForm from './MenuForm';
import { TemporaryAlert } from './TemporaryAlert';
import { DietType, Inputs } from './Interfaces';
import { EmailFormField } from './FormFields/EmailFormField';
import { AttendanceField } from './FormFields/AttendanceField';
import { DietPreferenceField } from './FormFields/DietPreferenceField';
import { formDefaults } from './FormFields/FormHelpers';

export default function Form() {
  const { state, dispatch } = useContext(AppContext);
  const [isAttending, setAttending] = useState<boolean>();
  const [eatsAnything, setEatsAnything] = useState<boolean>(false);

  const registerGuest = async (data: any) =>
    await fetch('/api/guestUpdate', {
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST'
    }); 

  const { register, handleSubmit, formState: { errors }, control, getValues } = useForm<Inputs>({
    defaultValues: { ...formDefaults }
  });
  const showAlertMessage = true;
  const getAlertText = (severity: AlertColor = 'info') => {
    if (severity === 'info') { return; }
    return severity === 'success'
      ? 'Form submitted successfully'
      : 'An error occured with your submission. Please ensure you used the correct invitation url and try again.';
  };
  const onSubmit: SubmitHandler<Inputs> = async data => {
    console.log('submitting...');
    if (!state?.ID){
      console.error('id not registered');
    }

    const result = await registerGuest({
      ID: state?.ID ?? localStorage.getItem('shaun_char_guest_id'),
      ...data
    });
    dispatch({
      type: 'SUBMIT_FORM',
      value: {
        showAlertMessage: showAlertMessage,
        severity: result.status === 200 ? 'success' : 'error',
      },
    });
    console.log(state);
  };
  const handleAttendanceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAttending(!!event.target?.value);
  };
  const handleDietChange =  (event: ChangeEvent<HTMLInputElement>) => 
    setEatsAnything(event.target?.value === DietType.Meat);

  return (
    <Paper style={{height: '40vh'}}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{marginTop: '2rem', marginBottom: '2rem'}}>
          <AttendanceField errors={errors} onChange={handleAttendanceChange} register={register} />
        </Box>
        {isAttending && <Box sx={{marginBottom: '2rem'}}>
          <DietPreferenceField errors={errors} onChange={handleDietChange} register={register} />
        </Box>}
        {isAttending && !!getValues()?.diet && <MenuForm eatsAnything={!!eatsAnything} control={control} />}
        {isAttending && <EmailFormField errors={errors} onChange={() => null} register={register} />}
        <Box><Button sx={{margin: 2}} variant="outlined" type="submit">Submit</Button></Box>
        {!!state.ShowAlertMessage
          && <TemporaryAlert severity={ state.Severity ?? 'error' }>
            { getAlertText(state.Severity) }
          </TemporaryAlert>}
      </form>
    </Paper>
  );
}
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
import { registerGuest } from '../pages/api/guest';
import { Sentry } from '../utils';
import { STATUS_CODES } from 'http';

export default function Form() {
  const { state, dispatch } = useContext(AppContext);
  const [isAttending, setAttending] = useState<boolean>();
  const [eatsAnything, setEatsAnything] = useState<boolean>(false);

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
    if (!state?.id){
      Sentry.captureException(`id not registered ${localStorage.getItem('shaun_char_guest_id')}`);
    }

    try {
      const result = await registerGuest({
        id: state?.id ?? localStorage.getItem('shaun_char_guest_id'),
        ...data
      });
      dispatch({
        type: 'SUBMIT_FORM',
        value: {
          showAlertMessage: showAlertMessage,
          severity: result?.status ? STATUS_CODES[result.status] : 'error',
        },
      });
      console.log(state);
    } catch(e) {
      Sentry.captureException(`failed to register guest ${state?.id}: ${e}`);
    }
  };
  const handleAttendanceChange = (event: ChangeEvent<HTMLInputElement>) =>
    setAttending(event.target?.value === 'isAttending');

  const handleDietChange =  (event: ChangeEvent<HTMLInputElement>) => 
    setEatsAnything(event.target?.value === DietType.Meat);

  return (
    <Paper style={{height: '100%'}}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AttendanceField errors={errors} onChange={handleAttendanceChange} register={register} />
        {isAttending && 
          <DietPreferenceField errors={errors} onChange={handleDietChange} register={register} />}
        {isAttending &&
          !!getValues()?.diet && <MenuForm eatsAnything={!!eatsAnything} control={control} />}
        {isAttending &&
          <EmailFormField errors={errors} onChange={() => null} register={register} />}
        <Box><Button sx={{margin: 2}} variant="outlined" type="submit">Submit</Button></Box>
        {!!state.ShowAlertMessage
          && <TemporaryAlert severity={ state.Severity ?? 'error' }>
            { getAlertText(state.Severity) }
          </TemporaryAlert>}
      </form>
    </Paper>
  );
}
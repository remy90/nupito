import React, { ChangeEvent, useContext, useState } from 'react';
import { Paper, Box, AlertColor, Button, Container } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { STATUS_CODES } from 'http';
import { Sentry } from '../../utils';
import { formDefaults } from '../../components/FormFields/FormHelpers';
import { registerGuest } from '../api/guest';
import { DietPreferenceField } from '../../components/FormFields/DietPreferenceField';
import MenuForm from '../../components/MenuForm';
import { EmailFormField } from '../../components/FormFields/EmailFormField';
import { TemporaryAlert } from '../../components/TemporaryAlert';
import { DietType, Inputs } from '../../components/Interfaces';
import { AppContext } from '../../components/AppProvider';
import { NameField } from '../../components/FormFields/NameField';
import { useRouter } from 'next/router';

export default function plusOne() {
  const { state, dispatch } = useContext(AppContext);
  const [eatsAnything, setEatsAnything] = useState<boolean>(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors, isDirty }, control, getValues } = useForm<Inputs>({
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
    console.log('add plus one data to state');
    console.log('storing rsvp...');
    console.log(JSON.stringify(state));
    if (!state?.id){
      Sentry.captureException(`id not registered ${localStorage.getItem('shaun_char_guest_id')}`);
      return; //?
    }

    try {
      const result = await registerGuest({
        id: state?.id ?? localStorage.getItem('shaun_char_guest_id'),
        ...data
      });
      dispatch({
        type: 'SUBMIT_GUEST_RSVP',
        value: {
          ...data,
          showAlertMessage: showAlertMessage,
          severity: result?.status ? STATUS_CODES[result.status] : 'error',
        },
      });
      console.log(state);
    } catch(e) {
      Sentry.captureException(`failed to register guest ${state?.id}: ${e}`);
    }
  };

  const handleDietChange =  (event: ChangeEvent<HTMLInputElement>) => 
    setEatsAnything(event.target?.value === DietType.Meat);

  return (
    <Container>
      <Paper style={{height: '100%'}}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <NameField errors={errors} inputName="firstName" placeholder='first name' onChange={() => null} register={register} />
          <NameField errors={errors} inputName="lastName" placeholder='last name' onChange={() => null} register={register} />
          <DietPreferenceField errors={errors} onChange={handleDietChange} register={register} />
          {!!getValues()?.diet && <MenuForm eatsAnything={!!eatsAnything} control={control} />}
          <EmailFormField errors={errors} onChange={() => null} register={register} />
          <Box>
            <Button sx={{margin: 2}} variant="outlined" onClick={router.back}>Back</Button>
            <Button sx={{margin: 2}} variant="outlined" type="submit" disabled={!isDirty}>Submit</Button>
          </Box>
          {!!state.ShowAlertMessage
          && <TemporaryAlert severity={ state.Severity ?? 'error' }>
            { getAlertText(state.Severity) }
          </TemporaryAlert>}
        </form>
      </Paper>
    </Container>
  );
}

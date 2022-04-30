import React, { ChangeEvent, useContext, useState } from 'react';
import { Paper, Box, Button, Container, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Sentry } from '../../utils';
import { formDefaults } from '../../components/FormFields/FormHelpers';
import { persistGuestAttendance } from '../api/guest';
import { DietPreferenceField } from '../../components/FormFields/DietPreferenceField';
import MenuForm from '../../components/MenuForm';
import { EmailFormField } from '../../components/FormFields/EmailFormField';
import { DietType, GuestDocument } from '../../components/Interfaces';
import { AppContext } from '../../components/AppProvider';
import { useRouter } from 'next/router';
import { randomUUID } from 'crypto';
import { InputField } from '../../components/FormFields/InputField';
import { PlusOneDecision } from '../../components/FormFields/PlusOneDecision';

export default function plusOne() {
  const { state, dispatch } = useContext(AppContext);
  const [eatsAnything, setEatsAnything] = useState<boolean>(false);
  const [decision, setDecision] = useState<boolean>(false);
  const tempFunc = (val) => {
    console.log(val);
    setDecision(val);
  };
  const handleDietChange =  (event: ChangeEvent<HTMLInputElement>) => 
    setEatsAnything(event.target?.value === DietType.Meat);

  const router = useRouter();

  const { register, handleSubmit, formState: { errors, isDirty }, getValues, control } = useForm<GuestDocument>({
    defaultValues: { ...formDefaults }
  });

  const onSubmit: SubmitHandler<GuestDocument> = async data => {
    console.log('add plus one data to state');
    console.log('storing rsvp...');
    const plusOneId = randomUUID().slice(0,5);
    const plusOneData = data; // ? the following doesn't work? const plusOneData = { ...data, id: plusOneId };
    plusOneData.id = plusOneId;
    console.log(JSON.stringify(state));
    if (!state?.guest.id){
      Sentry.captureException(`id not registered ${localStorage.getItem('shaun_char_guest_id')}`);
      return; //?
    }

    try {
      await persistGuestAttendance(state.guest, '/api/guestUpdate');

      console.log(JSON.stringify(plusOneData));
      const result = await persistGuestAttendance(plusOneData, '/api/addPlusOne');

      dispatch({ type: 'SUBMIT_PLUS_ONE_RSVP', value: plusOneData });
      Sentry.captureMessage(`${state.plusOne.id} persisted: ${result!.text}`);
    } catch(e) {
      Sentry.captureException(`failed to register guest ${state?.plusOne.id}: ${e}`);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h1" sx={{fontSize: '5rem'}} gutterBottom>Plus one</Typography>
      <Paper style={{height: '100%'}}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField errors={errors} inputName="firstName" placeholder='First name' register={register} />
          <InputField errors={errors} inputName="lastName" placeholder='Last name' register={register} />
          <EmailFormField inputName="emailAddress" placeholder="Email address" errors={errors} register={register} />
          <PlusOneDecision setDecision={tempFunc} />
          {decision && state.guest.isEating &&
            <DietPreferenceField inputName="plusOne.diet" errors={errors} onChange={handleDietChange} register={register} />}
          {decision && getValues().diet &&<MenuForm eatsAnything={!!eatsAnything} control={control} />}
          <Box>
            <Button sx={{margin: 2}} variant="outlined" onClick={router.back}>Back</Button>
            <Button sx={{margin: 2}} variant="contained" type="submit" disabled={!isDirty}>Submit</Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

import React, { ChangeEvent, useContext, useState, useId } from 'react';
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
  const guestIdSuffix = useId();

  const handleDietChange =  (event: ChangeEvent<HTMLInputElement>) => 
    setEatsAnything(event.target?.value === DietType.Meat);

  const router = useRouter();

  const { register, handleSubmit, formState: { errors, isDirty }, getValues, control } = useForm<GuestDocument>({
    defaultValues: { ...formDefaults }
  });
  const getPlusOneData = (data: any) => {
    const d = { ...data, id: plusOneId };
    return d;
  };

  const plusOneId = state.guest.id.concat(`-${guestIdSuffix.slice(1,3)}`);
  const onSubmit: SubmitHandler<GuestDocument> = async data => {
    const plusOneData = getPlusOneData(data);

    console.log('add plus one data to state');
    console.log('storing rsvp...');
    // console.log(JSON.stringify(state));
    if (!state?.guest.id){
      Sentry.captureException(`id not registered ${localStorage.getItem('shaun_char_guest_id')}`);
      return; //?
    }

    try {
      await persistGuestAttendance(state.guest, '/api/guestUpdate');

      const additionalPlusOneProps = {
        isAttending: 1,
        isEating: state.guest.isEating,
        hasPlusOne: false,
      };
      const result = await persistGuestAttendance({
        ...plusOneData,
        ...additionalPlusOneProps
      }, '/api/addPlusOne');

      dispatch({ type: 'SUBMIT_PLUS_ONE_RSVP', value: plusOneData });
      localStorage.setItem(`shaun_char_guest_id-${state.guest.id}`, JSON.stringify(state));
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
          <PlusOneDecision setDecision={setDecision} />
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

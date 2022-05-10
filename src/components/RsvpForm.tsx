/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { ChangeEvent, useContext, useState } from 'react';
import { Paper, Box, Button } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AppContext } from './AppProvider';
import MenuForm from './MenuForm';
import { DietType, GuestDocument as GuestDocument } from './Interfaces';
import { EmailFormField } from './FormFields/EmailFormField';
import { AttendanceField } from './FormFields/AttendanceField';
import { DietPreferenceField } from './FormFields/DietPreferenceField';
import { formDefaults } from './FormFields/FormHelpers';
import { persistGuestAttendance } from '../pages/api/guest';
import { Sentry } from '../utils';
import { useRouter } from 'next/router';
import SubmissionModal from './Modal';
import { getConfirmationText } from './Modal/modalTextHelper';
import { ButtonContent } from './ButtonContent';
import { ACTIONS } from '../reducers/actions';

export default function Form() {
  const { state, dispatch } = useContext(AppContext);
  const [formAttendance, setFormAttendance] = useState<boolean>(state?.guest?.isAttending);
  const [showCuisineType, shouldShowCuisineType] = useState<boolean>((!!state.guest?.diet || !!state.guest?.menu) ?? false);
  const router = useRouter();
  const defaults = formDefaults(state, 'guest');
  const { register, handleSubmit, formState: {
    errors,
    isDirty,
    isValid
  }, control, getValues } = useForm<GuestDocument>({
    defaultValues: defaults,
    mode: 'onChange'
  });
  const isAttending = formAttendance || state?.guest?.isAttending;

  const [modalVisibility, setModalVisibility] = React.useState<boolean>(false);
  const handleClose = () => setModalVisibility(false);
  const [modalText, setModalText] = useState<string>('');

  const dispatchGuest = (value: GuestDocument) =>
    dispatch({ type: ACTIONS.SUBMIT_GUEST_RSVP, value });

  const onSubmit: SubmitHandler<GuestDocument> = async data => {
    console.log('storing rsvp...');
    if (!state?.guest.id) {
      Sentry.captureException(`id not registered ${localStorage.getItem('shaun_char_guest_2022')}`);
      return;
    }

    try {
      const result = await persistGuestAttendance({...data, id: state.guest.id}, '/api/guestUpdate');
      dispatchGuest(data);
      localStorage.setItem('shaun_char_guest_2022', JSON.stringify(state));

      Sentry.captureMessage(`${state.guest.id} persisted: ${result!.text}`);
      setModalText(getConfirmationText(data, state));
      setModalVisibility(true);
    } catch(e) {
      Sentry.captureException(`failed to register guest ${state?.guest.id}: ${e}`);
      setModalText('An error occured while trying to save your choices, there&apos;s already a chance that we are aware but let Shaun or Charlotte know');
      setModalVisibility(true);
    }
  };
  const handleClickNext = () => {
    dispatchGuest(getValues());
    router.push('rsvp/plusOne');
  };
  const handleAttendanceChange = (event: ChangeEvent<HTMLInputElement> ) =>
    //@ts-ignore
    setFormAttendance((event.target.value as boolean) === true);

  const handleDietChange =  (event: ChangeEvent<HTMLInputElement>) => 
    shouldShowCuisineType(event.target?.value === DietType.Meat);
  const extraButton: ButtonContent = {name: 'Registry', route: '/registry'};
  return (
    <Paper style={{height: '100%'}}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AttendanceField
          errors={errors}
          onChange={handleAttendanceChange}
          register={register}
          defaultValue={state.guest?.isAttending}
        />

        <EmailFormField
          placeholder='email address'
          errors={errors}
          onChange={() => null}
          register={register}
          defaultValue={state.guest?.emailAddress}
        />

        {((isAttending && state?.guest.isEating) || !!state.guest.diet) &&
          <DietPreferenceField errors={errors} onChange={handleDietChange} register={register} defaultValue={state.guest.diet}/>}

        {isAttending && showCuisineType && <MenuForm control={control} defaultValues={state.guest} />}
        <Box>
          {isAttending && state.guest.hasPlusOne
            ? <Button sx={{margin: 2}} variant="outlined"  onClick={handleClickNext} disabled={!isDirty && isValid}>Next</Button>
            : <Button sx={{margin: 2}} variant="outlined" type="submit" disabled={!isDirty && isValid}>Submit</Button>
          }
        </Box>
      </form>
      <SubmissionModal
        open={modalVisibility}
        handleClose={handleClose}
        title={getValues().isAttending ? 'Splendid' : 'Confirmed'}
        message={modalText}
        extraButtonRoute={extraButton}
      />
    </Paper>
  );
}

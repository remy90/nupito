/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { ChangeEvent, useContext, useState } from 'react';
import { Paper, Box, Button } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AppContext } from './AppProvider';
import MenuForm from './MenuForm';
import { CuisineType, DietType, GuestDocument as GuestDocument } from './Interfaces';
import { EmailFormField } from './FormFields/EmailFormField';
import { AttendanceField } from './FormFields/AttendanceField';
import { DietPreferenceField } from './FormFields/DietPreferenceField';
import { formDefaults, initialState } from './FormFields/FormHelpers';
import { persistGuestAttendance } from '../pages/api/guest';
import { Sentry } from '../utils';
import { useRouter } from 'next/router';
import { ConfirmationModal } from './Modal';
import { getConfirmationText } from './Modal/modalTextHelper';
import { isTruthy } from '../utils/createEmotionCache';
import { CuisineTypeOptions } from './MenuOptions/CuisineTypeOptions';
import { afroMenuMains } from './MenuOptions/MenuHelpers';

export default function Form() {
  const { state, dispatch } = useContext(AppContext);
  const [formAttendance, setFormAttendance] = useState<boolean>(state?.guest?.isAttending || false);
  const [showCuisineType, shouldShowCuisineType] = useState<boolean>((!!state.guest?.diet || !!state.guest?.menu) ?? false);
  const [showPlusOneModal, setShowPlusOneModal] = useState<boolean>(false);
  const [isSubmitModalVisible, setIsSubmitModalVisible] = React.useState<boolean>(false);
  const [modalText, setModalText] = useState<string>('');
  const [diet, setDietChange] = useState<DietType>(state?.guest?.diet ?? 'NoFood');
  const [cuisineType, setCuisineType] = useState(state.guest?.cuisine ?? 'euro');
  const defaults = formDefaults(state, 'guest');
  const isAttending = formAttendance || state?.guest?.isAttending;

  const router = useRouter();
  const { register, handleSubmit, formState: {
    errors,
    isDirty,
    isValid
  }, control, getValues, setValue, resetField } = useForm<GuestDocument>({
    defaultValues: defaults,
    mode: 'onChange'
  });

  const handleSubmitClose = () => setIsSubmitModalVisible(false);
  const handlePlusOneClose = () => setShowPlusOneModal(false);

  const dispatchGuest = (value: GuestDocument) => dispatch({ type: 'SUBMIT_GUEST_RSVP', value });

  const onSubmit: SubmitHandler<GuestDocument> = async data => {
    setShowPlusOneModal(false);

    console.log('storing rsvp...');
    if (!state?.guest.id) {
      Sentry.captureException(`id not registered. Possibly: ${localStorage.getItem('shaun_char_guest_2022')}`);
      return;
    }

    try {
      const result = await persistGuestAttendance({...data, id: state.guest.id}, '/api/guestUpdate');
      dispatchGuest(data);
      localStorage.setItem('shaun_char_guest_2022', JSON.stringify(state));

      Sentry.captureMessage(`${state.guest.id} persisted: ${result!.text}`);
      setModalText(getConfirmationText(data, state));
      setIsSubmitModalVisible(true);
    } catch(e) {
      Sentry.captureException(`failed to register guest ${state?.guest.id}: ${e}`);
      setModalText('An error occured while trying to save your choices, there&apos;s already a chance that we are aware but let Shaun or Charlotte know');
      setIsSubmitModalVisible(true);
    }
  };
  const handleClickNext = () => {
    setShowPlusOneModal(true);
    dispatchGuest(getValues());
  };
  const handleAttendanceChange = (event: ChangeEvent<HTMLInputElement> ) =>
    setFormAttendance(isTruthy(event.target.value));

  const handleDietChange =  (event: ChangeEvent<HTMLInputElement>) => {
    const selection: DietType = event.target?.value as DietType;
    shouldShowCuisineType(selection === 'Meat'); // if not meat, no rerender is triggered

    setDietChange(selection); // for required rerender
    if (selection !== 'Meat') {
      if(selection === 'NoFood') {
        setValue('cuisine', 'neither');
        setCuisineType('neither');
      } else{
        setValue('cuisine', 'euro');
        setCuisineType('euro');
      }
    }
  };
  const resetAfroMenuChoices = () => {
    //@ts-ignore key is limited to available possibilities
    const euroIsTouched =
      getValues().menu.euroStarter !== initialState.guest.menu.euroStarter
      || getValues().menu.euroMain !== initialState.guest.menu.euroMain;

    if (euroIsTouched) {
      resetField('menu.foodOption1', {defaultValue: false});
      resetField('menu.foodOption2', {defaultValue: false});
      resetField('menu.foodOption3', {defaultValue: false});
      resetField('menu.foodOption4', {defaultValue: false});
      resetField('menu.foodOption5', {defaultValue: false});
      resetField('menu.foodOption6', {defaultValue: false});
      resetField('menu.foodOption7', {defaultValue: false});
      resetField('menu.foodOption8', {defaultValue: false});
      resetField('menu.foodOption9', {defaultValue: false});
      resetField('menu.foodOption10', {defaultValue: false});
      resetField('menu.foodOption11', {defaultValue: false});
      resetField('menu.foodOption12', {defaultValue: false});
      resetField('menu.foodOption13', {defaultValue: false});
    }
  };
  const resetEuroChoices = () => {
    //@ts-ignore key is limited to available possibilities
    const afroIsTouched = afroMenuMains.some(x => getValues().menu[x.key] !== false);
    if (afroIsTouched) {
      resetField('menu.euroStarter', {defaultValue: ''});
      resetField('menu.euroMain', {defaultValue: ''});
    }
  };

  const handleCuisineChange = (cuisine: CuisineType) => {
    cuisine === 'afro' ? resetAfroMenuChoices() : resetEuroChoices();
    setCuisineType(cuisine);
  };

  return (
    <Paper style={{height: '100%'}}>
      <form onSubmit={handleSubmit(onSubmit)} id="guestForm" style={{padding: '1rem'}}>
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

        {((isAttending && state?.guest.isFed)) &&
          <DietPreferenceField errors={errors} onChange={handleDietChange} register={register} defaultValue={state.guest.diet}/>} 
      
        {showCuisineType && <CuisineTypeOptions
          control={control}
          defaultValues={state?.guest?.cuisine}
          handleCuisineChange={handleCuisineChange}
        />}
        {diet !== 'NoFood' &&
          <MenuForm
            control={control}
            defaultValues={state.guest}
            diet={diet}
            cuisineType={cuisineType ?? state.guest?.cuisine ?? 'euro'}
          />}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
          {isAttending && state.guest.hasPlusOne
            ? <Button sx={{margin: 2}} variant="contained" onClick={handleClickNext} disabled={!isDirty && isValid}>Next</Button>
            : <Button sx={{margin: 2}} variant="contained" type="submit" disabled={!isDirty && isValid}>Submit</Button>
          }
        </Box>
        <ConfirmationModal
          open={showPlusOneModal}
          onClose={handlePlusOneClose}
          title="All set?"
          message={modalText}
        >
          <Button variant="outlined" onClick={() => router.push('rsvp/plusOne')}>Plus one</Button>
          <Button sx={{margin: 2}} variant="contained" onClick={handleSubmit(onSubmit)}>Yes, submit</Button>
        </ConfirmationModal>
      </form>
      <ConfirmationModal
        open={isSubmitModalVisible}
        onClose={handleSubmitClose}
        title={isAttending ? 'Splendid' : 'Confirmed'}
        message={modalText}
      >
        <Button variant="outlined" autoFocus href={`/${state.guest.id}`}>{state.guest.firstName}&apos;s page</Button>
        <Button href="/registry" variant="contained">Registry</Button>
      </ConfirmationModal>
    </Paper>
  );
}
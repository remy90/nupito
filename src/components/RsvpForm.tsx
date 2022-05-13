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
import { SubmissionModal, PlusOneModal } from './Modal';
import { getConfirmationText } from './Modal/modalTextHelper';
import { ACTIONS } from '../reducers/actions';
import { isTruthy } from '../utils/createEmotionCache';
import { CuisineTypeOptions } from './MenuOptions/CuisineTypeOptions';
import { afroMenuItems, euroStarterItems } from './MenuOptions/MenuHelpers';

export default function Form() {
  const { state, dispatch } = useContext(AppContext);
  const [formAttendance, setFormAttendance] = useState<boolean>(state?.guest?.isAttending || false);
  const [showCuisineType, shouldShowCuisineType] = useState<boolean>((!!state.guest?.diet || !!state.guest?.menu) ?? false);
  const [showPlusOneModal, setShowPlusOneModal] = useState<boolean>(false);
  const [modalVisibility, setModalVisibility] = React.useState<boolean>(false);
  const [modalText, setModalText] = useState<string>('');
  const [diet, setDietChange] = useState<DietType>('NoFood');
  const [cuisineType, setCuisineType] = useState(state.guest?.cuisine ?? 'euro');
  const defaults = formDefaults(state, 'guest');
  const isAttending = formAttendance || state?.guest?.isAttending;

  const router = useRouter();
  const { register, handleSubmit, formState: {
    errors,
    isDirty,
    isValid
  }, control, getValues, setValue, resetField, reset } = useForm<GuestDocument>({
    defaultValues: defaults,
    mode: 'onChange'
  });

  const handleClose = () => setModalVisibility(false);

  const dispatchGuest = (value: GuestDocument) => dispatch({ type: ACTIONS.SUBMIT_GUEST_RSVP, value });

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
    setShowPlusOneModal(true);
    dispatchGuest(getValues());
  };
  const handleAttendanceChange = (event: ChangeEvent<HTMLInputElement> ) =>
    setFormAttendance(isTruthy(event.target.value));

  const handleDietChange =  (event: ChangeEvent<HTMLInputElement>) => {
    const selection: DietType = event.target?.value as DietType;
    shouldShowCuisineType(selection === 'Meat'); // if not meat, no rerender is triggered
    console.log(getValues().diet);
    setDietChange(selection); // for required rerender
    if (selection !== 'Meat') {
      selection === 'NoFood'
        ? setValue('cuisine', 'neither')
        : setValue('cuisine', 'euro');
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
    const afroIsTouched = afroMenuItems.some(x => getValues().menu[`foodOption${x.key}`] !== false);
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

        {((isAttending && state?.guest.isEating)) &&
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
        <Box>
          {isAttending && state.guest.hasPlusOne
            ? <Button sx={{margin: 2}} variant="outlined" onClick={handleClickNext} disabled={!isDirty && isValid}>Next</Button>
            : <Button sx={{margin: 2}} variant="outlined" type="submit" disabled={!isDirty && isValid}>Submit</Button>
          }
        </Box>
      </form>
      <SubmissionModal
        open={modalVisibility}
        handleClose={handleClose}
        title={isAttending ? 'Splendid' : 'Confirmed'}
        message={modalText}
      >
        <Button autoFocus onClick={handleClose}>{state.guest.firstName}&apos;s page</Button>
        <Button href="/Registry" variant="contained">Registry</Button>
      </SubmissionModal>
      <PlusOneModal
        open={showPlusOneModal}
        handleClose={handleClose}
        title="Plus one?"
        message={modalText}
      >
        <Button onClick={() => router.push('rsvp/plusOne')}>Add plus one</Button>
        <Button autoFocus sx={{margin: 2}} variant="contained" type="submit" >No thanks, Submit</Button>
      </PlusOneModal>
    </Paper>
  );
}

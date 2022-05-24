import React, { ChangeEvent, useContext, useState, useId, useEffect } from 'react';
import { Paper, Box, Button, Container, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Sentry } from '../../utils';
import { formDefaults, initialState } from '../../components/FormFields/FormHelpers';
import { persistGuestAttendance } from '../api/guest';
import { DietPreferenceField } from '../../components/FormFields/DietPreferenceField';
import MenuForm from '../../components/MenuForm';
import { EmailFormField } from '../../components/FormFields/EmailFormField';
import { CuisineType, DietType, GuestDocument } from '../../components/Interfaces';
import { AppContext } from '../../components/AppProvider';
import { useRouter } from 'next/router';
import { InputField } from '../../components/FormFields/InputField';
import { PlusOneDecision } from '../../components/FormFields/PlusOneDecision';
import useUser from '../../lib/useUser';
import { ConfirmationModal } from '../../components/Modal';
import { getConfirmationText } from '../../components/Modal/modalTextHelper';
import { CuisineTypeOptions } from 'src/components/MenuOptions/CuisineTypeOptions';
import { afroMenuMains } from 'src/components/MenuOptions/MenuHelpers';

export default function plusOne() {
  const { state, dispatch } = useContext(AppContext);
  const [showCuisineType, shouldShowCuisineType] = useState<boolean>(false);
  const [cuisineType, setCuisineType] = useState(state.guest?.cuisine ?? 'euro');
  const [foodIsChosen, setDecision] = useState<boolean>(false);
  const [diet, setDietChange] = useState<DietType>(state?.guest?.diet ?? 'NoFood');
  const guestIdSuffix = useId();
  const [modalVisibility, setModalVisibility] = React.useState<boolean>(false);
  const handleClose = () => setModalVisibility(false);
  const [modalText, setModalText] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    if (!state.guest.id) {
      dispatch({type: 'UPDATE_GUEST', value: {...JSON.parse(localStorage.getItem('shaun_char_guest_2022') ?? '{}')}});
    }
  }, [state.guest.id]);
  
  useUser({ redirectTo: '/invitation-only' });
  const resetAfroMenuChoices = () => {

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
    const afroIsTouched = afroMenuMains.some(x => getValues().menu[x.key] !== false);
    if (afroIsTouched) {
      resetField('menu.euroStarter', {defaultValue: ''});
      resetField('menu.euroMain', {defaultValue: ''});
    }
  };

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

  const dispatchGuest = (value: GuestDocument) =>
    dispatch({ type: 'SUBMIT_PLUS_ONE_RSVP', value });

  const handleBackClick = () => {
    dispatchGuest(getValues());
    router.back();
  };

  const defaults = formDefaults(state, 'plusOne');
  const { register, handleSubmit, formState: { errors }, getValues, setValue, control, resetField } = useForm<GuestDocument>({
    defaultValues: defaults,
    mode: 'onBlur',
    shouldFocusError: true,
    reValidateMode: 'onChange',
  });
  const isAttending = state.guest.isAttending || getValues().isAttending;
  const getPlusOneData = (data: any) => {
    const d = { ...data,
      id: plusOneId,
      isPlusOne: true,
      hasPlusOne: false,
      isAttending: true,
      dateUpdated: new Date().toISOString()
    };
    return d;
  };

  const plusOneId = state.guest.id.concat(`-${guestIdSuffix.slice(1,3)}`);

  const onSubmit: SubmitHandler<GuestDocument> = async data => {
    const plusOneData = getPlusOneData(data);

    if (!state?.guest.id){
      Sentry.captureException(`id not registered ${localStorage.getItem('shaun_char_guest_2022')}`);
      return;
    }

    try {
      await persistGuestAttendance(state.guest, '/api/guestUpdate');

      const additionalPlusOneProps = {
        isAttending: true,
        isFed: state.guest.isFed,
        hasPlusOne: false,
      };
      const result = await persistGuestAttendance({
        ...plusOneData,
        ...additionalPlusOneProps
      }, '/api/addPlusOne');

      dispatch({ type: 'SUBMIT_PLUS_ONE_RSVP', value:{ plusOne: plusOneData} });
      localStorage.setItem('shaun_char_guest_2022', JSON.stringify(state));
      Sentry.captureMessage(`${state.plusOne.id} persisted: ${result!.text}`);
      console.log(JSON.stringify(plusOneData));
      const confirmationText = getConfirmationText(plusOneData, plusOneData.firstName);
      setModalText(confirmationText);
      setModalVisibility(true);

      // after successful submission, prevent guest with plusOne from inviting another person
      await persistGuestAttendance({
        ...state.guest,
        hasPlusOne: false,
        guestName: plusOneData.firstName
      }
      , '/api/guestUpdate');
      dispatch({ type: 'REMOVE_PLUS_ONE' });
    } catch(e) {
      Sentry.captureException(`failed to register guest ${state?.plusOne.id}: ${e}`);
      setModalText('An error occured while trying to save your choices, there&apos;s already a chance that we are aware but let Shaun or Charlotte know');
      setModalVisibility(true);
    }
  };

  const handleCuisineChange = (cuisine: CuisineType) => {
    cuisine === 'afro' ? resetAfroMenuChoices() : resetEuroChoices();
    setCuisineType(cuisine);
  };
  return (
    <Container maxWidth="sm">
      <Typography variant="h1" gutterBottom>Plus one</Typography>
      <Paper style={{height: '100%'}}>
        <form onSubmit={handleSubmit(onSubmit)}  style={{padding: '1rem'}}>
          <InputField errors={errors} inputName="firstName" placeholder='First name' register={register} />
          <InputField errors={errors} inputName="lastName" placeholder='Last name' register={register} />
          <EmailFormField control={control} inputName="emailAddress" placeholder="Email address" errors={errors} defaultValue={state.plusOne.emailAddress ?? ''} />
          {state.guest.isFed && <Box sx={{my: '1rem'}}><PlusOneDecision setDecision={setDecision} /></Box>}
               
          {foodIsChosen && state.guest.isFed &&
            <DietPreferenceField inputName="plusOne.diet" errors={errors} onChange={handleDietChange} register={register} />}
           
          {showCuisineType && <CuisineTypeOptions
            control={control}
            defaultValues={state?.guest?.cuisine}
            handleCuisineChange={handleCuisineChange}
          />}
          
          {foodIsChosen && diet !== 'NoFood' &&
            <MenuForm
              control={control}
              cuisineType={cuisineType ?? state.plusOne?.cuisine ?? 'euro'}
              diet={diet}
              defaultValues={state.plusOne}
            />}
          <Box>
            <Button variant="outlined" sx={{margin: 2}} onClick={handleBackClick}>Back</Button>
            <Button sx={{margin: 2}} variant="contained" type="submit">Submit</Button>
          </Box>
        </form>
      </Paper>
      <ConfirmationModal
        open={modalVisibility}
        onClose={handleClose}
        title={isAttending ? 'Splendid' : 'Confirmed'}
        message={modalText}
        copyText={`https://shaunandcharlotte.co.uk/${plusOneId}`}
      >
        <Button variant="contained" href="/registry">Registry</Button>
      </ConfirmationModal>
    </Container>
  );
}

import { GuestDocument, Menu } from './../Interfaces';
import { RsvpData } from '../Interfaces';

const initialMenu: Menu = {
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
  foodOption12: false,
  foodOption13: false,
  euroStarter: '',
  euroMain: '',
  euroDessert: ''
};

const initialGuest: GuestDocument = {
  id: '',
  firstName: '',
  lastName: '',
  emailAddress: '',
  isAttending: false,
  isFed: false,
  hasPlusOne: false,
  menu: initialMenu,
  cuisine: 'euro',
  diet: 'Meat',
  guestName: ''
};

export const initialState: RsvpData = {
  guest: initialGuest,
  plusOne: initialGuest
};

export const formDefaults = (state: RsvpData, person: 'guest' | 'plusOne') => {
  return {
    firstName: state[person].firstName,
    lastName: state[person].lastName,
    isAttending: state[person].isAttending,
    diet: state[person].diet,
    menu: state[person].menu
  };
};
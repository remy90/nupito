import { RsvpData } from '../Interfaces';

export const initialState: RsvpData = {
  guest: {
    id: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
    isAttending: false,
    isEating: false,
    hasPlusOne: false,
    menu: {
      foodOption0: false,
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
      euroStarter: undefined,
      euroMain: undefined,
      euroDessert: undefined
    },
    diet: 'anything goes'
  },
  plusOne: {
    id: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
    isAttending: false,
    isEating: false,
    hasPlusOne: false,
    menu: {
      foodOption0: false,
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
      euroStarter: undefined,
      euroMain: undefined,
      euroDessert: undefined
    },
    diet: 'anything goes'
  }
};

export const formDefaults = (state: RsvpData, person: 'guest' | 'plusOne') => { // get from session/state
  state[person]?.firstName ?? '';
  state[person]?.lastName;
  state[person]?.isAttending;
  state[person]?.menu ?? {
    foodOption0: false,
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
    euroStarter: undefined,
    euroMain: undefined,
    euroDessert: undefined,
  };
};
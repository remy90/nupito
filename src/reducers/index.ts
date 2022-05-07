import { initialState } from './../components/FormFields/FormHelpers';
import { RsvpData, GuestDocument } from './../components/Interfaces';


type reducerType = {
    type: string,
    value: GuestDocument;
}
function guestReducer(state: RsvpData, action: reducerType) {
  switch (action.type) {
  case 'UPDATE_GUEST':
    return {
      ...state,
      ...action.value,
    };
  case 'SUBMIT_GUEST_RSVP':
    return {
      ...state,
      guest: {
        ...state.guest,
        ...action.value,
      }
    };
  case 'SUBMIT_PLUS_ONE_RSVP':
    return {
      ...state,
      plusOne: {
        ...action.value,
        isAttending: 1,
        isEating: state.guest.isEating,
        hasPlusOne: false,
      }
    };
  case 'SUBMIT_RSVP_FORM':
    return {
      ...state,
      ...action.value
    };
  case 'RESET_FORM_ALERT':
    return {
      ...state,
      showAlertMessage: false,
      severity: undefined,
    };
  default:
    return state;
  }
}

export { initialState, guestReducer };

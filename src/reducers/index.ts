import { IGuestProps } from './../components/Interfaces';
import { AlertColor } from '@mui/material';

const initialState = {
};
type formValue = {
  showAlertMessage: boolean,
  severity?: AlertColor,
};

type reducerType = {
    type: string,
    value: formValue | string | IGuestProps;
}
function guestReducer(state: any, action: reducerType) {
  const formValue = action.value as formValue;

  switch (action.type) {
  case 'UPDATE_GUEST':
    return {
      ...state,
      ...(action.value as IGuestProps),
    };
  case 'SUBMIT_GUEST_RSVP':
    return {
      guest: {
        ...formValue,
      }
    };
  case 'SUBMIT_PLUS_ONE_RSVP':
    return {
      plusOne: {
        ...formValue,
      }
    };
  case 'SUBMIT_RSVP_FORM':
    return {
      ...formValue
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

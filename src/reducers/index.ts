import { AlertColor } from '@mui/material';

const initialState = {};
type formValue = {
  showAlertMessage: boolean,
  severity?: AlertColor,
};

type reducerType = {
    type: string,
    value: formValue | string
}
function guestReducer(state: any, action: reducerType) {
  const formValue = action.value as formValue;

  switch (action.type) {
  case 'UPDATE_ID':
    return {
      ...state,
      id: action.value,
    };
  case 'SUBMIT_FORM':
    return {
      ...state,
      showAlertMessage: true,
      severity: formValue.severity,
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

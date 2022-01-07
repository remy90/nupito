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
      ID: action.value,
      ...state
    };
  case 'SUBMIT_FORM':
    return {
      ShowAlertMessage: true,
      Severity: formValue.severity,
      ...state
    };
  case 'RESET_FORM_ALERT':
    return {
      ShowAlertMessage: false,
      Severity: undefined,
      ...state,
    };
  default:
    return state;
  }
}

export { initialState, guestReducer };

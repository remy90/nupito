import type { RsvpData, GuestDocument } from './../Interfaces';

export const getConfirmationText = (data: GuestDocument, state: RsvpData) => {
  if(data.isAttending) {
    return data.hasPlusOne
      ? `Your save was successful. Please send the following link to your plus one and let  them know if they need to pick their menu choice: https://shaunandcharlotte.co.uk/${state.plusOne.id}`
      : 'It looks like you\'re all set!\n Would you like to check out the registry?';
  }
  return 'Submission successful, thanks for letting us know. Would you like to check out the registry?';
};
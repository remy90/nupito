import type { RsvpData, GuestDocument } from './../Interfaces';

export const getConfirmationText = (data: GuestDocument, state: RsvpData) => {
  if(data) {
    // n.b. plusOne isAttending is unset
    return state.guest.hasPlusOne && JSON.stringify(state.plusOne.menu) !== JSON.stringify(data.menu)
      ? 'Save successful. Copy this link to let your plus one pick their menu choice'
      : 'It looks like you\'re all set!\n Would you like to check out the registry?';
  }
  return 'Submission successful, thanks for letting us know. Would you like to check out the registry?';
};

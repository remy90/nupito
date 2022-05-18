import type { GuestDocument } from './../Interfaces';

export const getConfirmationText = (data: GuestDocument, plusOneName?: string) => {
  if (data && data.isAttending) {
    return plusOneName
      ? `Save successful. Share this link with ${plusOneName} for their access`
      : 'It looks like you\'re all set!\n Would you like to check out the registry?';
  }
  return 'Submission successful, thanks for letting us know. Would you like to check out the registry?';
};

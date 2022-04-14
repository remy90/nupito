import { Sentry } from '../../utils';

export const registerGuest = async (data: any) => {
  try { 
    return await fetch('/api/guestUpdate', {
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST'
    });
  } catch (e) {
    Sentry.captureException(`Failed to update guest, ${e}`);
  }
};
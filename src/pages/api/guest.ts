import { GuestDocument } from './../../components/Interfaces';
import { Sentry } from '../../utils';

export const persistGuestAttendance = async (data: GuestDocument, endpoint: string) => {
  try { 
    return await fetch(endpoint, {
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST'
    });
  } catch (e) {
    Sentry.captureException(`Failed to update guest, ${e}`);
  }
};
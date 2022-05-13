import createCache from '@emotion/cache';

export default function createEmotionCache() {
  return createCache({ key: 'css' });
}

export const isTruthy = (val: any) => 
  val == 1 || val == true || val == 'true';
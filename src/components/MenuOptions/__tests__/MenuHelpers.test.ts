import { initialState } from './../../FormFields/FormHelpers';
import { Menu } from './../../Interfaces';
/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://jestjs.io/"}
 */
import { euroStarterItems, euroMainItems } from './../MenuHelpers';
import { shouldShowBasedOnDietChoice } from '../MenuHelpers';

describe('DietChoice', () => {
  it('should only show vegan options', () => {
    const result = euroStarterItems.filter((x) => shouldShowBasedOnDietChoice('Vegan', x.diet));
    expect(result.length).toEqual(2);
    expect(result.every(x => x.diet === 'Vegan')).toBeTruthy();
  });

  it('should show vegetarian options', () => {
    const result = euroStarterItems.filter((x) => shouldShowBasedOnDietChoice('Vegetarian', x.diet));
    expect(result.length).toEqual(3);
    expect(result.every(x => x.diet === 'Vegetarian' || x.diet === 'Vegan')).toBeTruthy();
  });

  it('should show options for no restrictions', () => {
    const result = euroStarterItems.filter((x) => shouldShowBasedOnDietChoice('Meat', x.diet));
    expect(result.length).toEqual(4);
    expect(result.every(x => x.diet === 'Meat' || x.diet === 'Vegetarian' || x.diet === 'Vegan')).toBeTruthy();
  });
});

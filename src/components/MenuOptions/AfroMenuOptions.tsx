import type React from 'react';
import { IMenuOptionProps } from '../Interfaces';
import CheckboxList from './MenuCheckboxList';
import { afroMenuMains } from './MenuHelpers';

export const AfroMenuOptions = ({control, diet, defaultValues}: IMenuOptionProps) =>
  <CheckboxList listItems={afroMenuMains} control={control} defaultValues={defaultValues} diet={diet} />;

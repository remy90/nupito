import type React from 'react';
import { IMenuOptionProps } from '../Interfaces';
import CheckboxList from '../TextList';
import { afroMenuItems } from './MenuHelpers';

export const AfroMenuOptions = ({control, diet, defaultValues}: IMenuOptionProps) =>
  <CheckboxList listItems={afroMenuItems} control={control} defaultValues={defaultValues} diet={diet} />;

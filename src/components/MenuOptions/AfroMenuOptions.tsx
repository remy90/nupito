import type React from 'react';
import { IMenuDefaultProps } from '../Interfaces';
import CheckboxList from '../TextList';
import { afroMenuItems } from './MenuHelpers';

export const AfroMenuOptions = ({control, defaultValues}: IMenuDefaultProps) =>
  <CheckboxList listItems={afroMenuItems} control={control} defaultValues={defaultValues} />;

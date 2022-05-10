import { ChangeEvent } from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

export const DietType = {
  Unknown: '',
  Meat: 'anything goes',
  Vegetarian: 'veggie',
  Vegan: 'vegan',
  NoFood: 'no food'
} as const;
type DietType = typeof DietType[keyof typeof DietType];

// Full mongodb document
export type GuestDocument = {
  id: string
  firstName: string;
  lastName: string;
  emailAddress: string;
  isAttending: boolean;
  isEating: boolean;
  hasPlusOne: boolean;
  cuisine: CuisineType;
  menu: Menu;
  diet: DietType;
}
export type InputType = 'firstName' | 'lastName';
export type RsvpData = { guest: GuestDocument, plusOne: GuestDocument };
export interface IFieldProps {
  errors?: FieldErrors<GuestDocument>;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  register: UseFormRegister<GuestDocument>;
  inputName?: any;
  defaultValue?: any;
}

export interface IInputFieldProps extends IFieldProps {
  placeholder?: string;
}

export interface IEmailFormFieldProps {
  errors: FieldErrors<GuestDocument>;
  register: UseFormRegister<GuestDocument>; //<Record<string, unknown>>;
}

export type Menu = {
  foodOption1: boolean,
  foodOption2: boolean,
  foodOption3: boolean,
  foodOption4: boolean,
  foodOption5: boolean,
  foodOption6: boolean,
  foodOption7: boolean,
  foodOption8: boolean,
  foodOption9: boolean,
  foodOption10: boolean,
  foodOption11: boolean,
  foodOption12: boolean,
  foodOption13: boolean,
  euroStarter: number | string,
  euroMain: number | string,
  euroDessert: number | string,
}

export type MenuType = 'foodOption1' | 'foodOption2' | 'foodOption3' |
'foodOption4' | 'foodOption5' | 'foodOption6' | 'foodOption7' |
'foodOption8' | 'foodOption9' | 'foodOption10' | 'foodOption11'|
'foodOption11'| 'foodOption12'| 'foodOption13' | 'euroStarter' |
'euroMain' | 'euroDessert';
export interface RHFormControlProps {
  control: Control<GuestDocument, object>;
}
export type CuisineType = 'euro' | 'afro';
export interface ICuisineOptionProps extends RHFormControlProps{
  defaultValues?: GuestDocument;
}
export interface IMenuOptionProps extends RHFormControlProps{
  defaultValues?: MenuType;
}

export interface IMenuDefaultProps extends RHFormControlProps{
  defaultValues?: Menu;
}

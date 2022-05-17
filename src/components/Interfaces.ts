import { ChangeEvent } from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

export type DietType = 'Meat' | 'Vegetarian' | 'Vegan' | 'NoFood';

// Full mongodb document
export type GuestDocument = {
  id: string
  firstName: string;
  lastName: string;
  emailAddress: string;
  isAttending: boolean;
  isFed: boolean;
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
  euroStarter: string,
  euroMain: string,
  euroDessert: string,
}

export type MenuType = 'foodOption1' | 'foodOption2' | 'foodOption3' |
'foodOption4' | 'foodOption5' | 'foodOption6' | 'foodOption7' |
'foodOption8' | 'foodOption9' | 'foodOption10' | 'foodOption11'| 'foodOption12' |
 'euroStarter' | 'euroMain' | 'euroDessert';
export interface RHFormControlProps {
  control: Control<GuestDocument, object>;
}
export type CuisineType = 'euro' | 'afro' | 'neither';
export interface ICuisineOptionProps extends IMenuDefaultProps{
  cuisineType: CuisineType;
}
export interface IMenuTypeOptionProps extends RHFormControlProps{
  defaultValues?: MenuType | undefined;
  diet: DietType;
}

export interface IMenuDefaultProps extends RHFormControlProps{
  defaultValues?: GuestDocument;
  cuisineType: CuisineType;
  diet: DietType;
}
export interface IMenuOptionProps extends RHFormControlProps{
  defaultValues?: Menu | undefined;
  diet: DietType;
}

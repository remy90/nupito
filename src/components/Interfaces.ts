import { ChangeEvent } from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

export const DietType = {
  Meat: 'anything goes',
  Vegetarian: 'veggie',
  Vegan: 'vegan',
} as const;
type DietType = typeof DietType[keyof typeof DietType];

// Full mongodb document
export type GuestDocument = {
  // "id" | "isAttending" | "firstName" | "lastName" | "emailAddress" | "isEating" | "hasPlusOne" | "menuChoice" | "diet" | "menu.foodOption0" | "menu.foodOption1" | ... 12 more ... | "menu.euroDessert
  id: string
  firstName: string;
  lastName: string;
  emailAddress: string;
  isAttending: boolean;
  isEating: boolean;
  hasPlusOne: boolean;
  // TODO: Create RadioOptionFormField template with label, key and default value
  menu: Menu;
  diet: DietType;
}
export type InputType = 'firstName' | 'lastName';
export type RsvpData = {
  guest: GuestDocument,
  plusOne: GuestDocument
};
export interface IFieldProps {
  errors?: FieldErrors<GuestDocument>;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  register: UseFormRegister<GuestDocument>;
  inputName?: any;
}

export interface IInputFieldProps extends IFieldProps {
  placeholder?: string;
}

export interface IEmailFormFieldProps {
  errors: FieldErrors<GuestDocument>;
  register: UseFormRegister<GuestDocument>; //<Record<string, unknown>>;
}

export type Menu = {
  foodOption0: boolean;
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
  euroStarter: number | undefined,
  euroMain: number | undefined,
  euroDessert: number | undefined,
}
export interface RHFormControlProps {
  control: Control<GuestDocument, object>;
}

/** Used for initial data fetch on guests */ 
export interface IGuestProps {
  id: string;
  firstName: string;
  isAttending: boolean;
  isEating: boolean;
  hasPlusOne: boolean;
  menu: Menu;
  homePageImg: string;
}
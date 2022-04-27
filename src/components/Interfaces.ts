import { ChangeEvent } from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

export const DietType = {
  Meat: 'anything goes',
  Vegetarian: 'veggie',
  Vegan: 'vegan',
} as const;
type DietType = typeof DietType[keyof typeof DietType];

export type Inputs = {
  firstName: string,
  lastName: string,
  isAttending: boolean,
  diet: DietType,
  otherFoodConsiderations: string,
  emailAddress: string,
  cuisineType: {
    euro: boolean;
    afro: boolean;
  }
  // TODO: Create RadioOptionFormField template with label, key and default value
  menuChoice: {
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
};

export type GuestData = {
  id: string,
  firstName: string,
  lastName: string,
  hasPlusOne: boolean,
  isAttending: boolean,
  diet: DietType,
  menuChoices: Array<number>,
};

export type FormData = {
  urlId: string,
  isAttending: boolean,
  diet: DietType,
  plusOne?: {
    guest: GuestData,
  },
  emailAddress: string,
  menuChoices: Array<number>,
};


export interface IFieldProps {  
  errors: FieldErrors<Inputs>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  register: UseFormRegister<Inputs>;
}

export interface IEmailFormFieldProps {
  errors: FieldErrors<Inputs>;
  register: UseFormRegister<Inputs>;
}

export interface RHFormControlProps {
  control: Control<Inputs, object>;
}

export interface IGuestProps {
  id: string;
  firstName: string;
  isAttending: boolean;
  isEating: boolean;
  hasPlusOne: boolean;
  menuChoices: Array<number>;
  homePageImg: string;
}
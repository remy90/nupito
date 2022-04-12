import { ChangeEvent } from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

export const DietType = {
  Meat: 'anything goes',
  Vegetarian: 'veggie',
  Vegan: 'vegan',
} as const;
type DietType = typeof DietType[keyof typeof DietType];

export type Inputs = {
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
    euroStarter: number,
    euroMain: number,
    // TODO: Add dessert to afro options
    euroDessert: number,
  }
};

export type GuestData = {
  ID: string,
  firstName: string,
  lastName: string,
  isPlusOne: string,
  hasPlusOne: boolean,
  wave:1,
  isAttending: boolean,
  diet: string,
  otherFoodConsiderations: string,
};

export type FormData = {
  urlId: string,
  isAttending: boolean,
  diet: DietType,
  otherFoodConsiderations: string,
  plusOne?: {
    guest: GuestData,
  },
  emailAddress: string,
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

export interface IDietFormFieldProps {
  errors: FieldErrors<Inputs>;
  register: UseFormRegister<Inputs>;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
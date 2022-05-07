import React, { useState } from 'react';
import {  Box, Typography, FormControl, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { useForm } from 'react-hook-form';
import { AfroMenuOptions } from './MenuOptions/AfroMenuOptions';
import { DessertOptions } from './MenuOptions/DessertOptions';
import { EuroMenuOptions } from './MenuOptions/EuroMenuOptions';
import { RHFormControlProps } from './Interfaces';

type CuisineType = 'euro' | 'afro';
interface IMenuFormProps extends RHFormControlProps {
  eatsAnything: boolean;
}

export default function MenuForm({ eatsAnything, control }: IMenuFormProps) {
  const [isAfrican, setIsAfrican] = useState(false);
  const [isEuropean, setIsEuropean] = useState(false);

  const { reset } = useForm();

  const resetFoodOptions = (firstOptionNumber: number, lastOptionNumber: number, defaultValue: false | string) => {
    const resetObject: any = {};
  
    for (let i = firstOptionNumber; i <= lastOptionNumber; i++) {
      resetObject[`menu.foodOption${i}`] = defaultValue;
    }
    return resetObject;
  };
  const handleEuroCuisine = () => {
    // 0 - 11 is euro
    setIsAfrican(false);
    setIsEuropean(true);
    eatsAnything = false;
    reset(resetFoodOptions(0, 11, false));
  };
  const handleAfroCuisine = () => {
    setIsEuropean(false);
    setIsAfrican(true);
    eatsAnything = true;
    reset(resetFoodOptions(12, 27, ''));
  };

  const cuisines = {
    euro: handleEuroCuisine,
    afro: handleAfroCuisine
  };
  const handleClick = (cuisineType: CuisineType) =>
    cuisines[cuisineType]();

  return (
    <Box sx={{marginTop: '2rem', marginBottom: '2rem'}}>
      <Typography variant="h3" sx={{ fontSize: '2.5rem'}}>What cuisine type would you like?</Typography>
      {eatsAnything && <FormControl>
        <RadioGroup name="radio-buttons-group">
          <FormControlLabel
            checked={isEuropean}
            control={<Radio />}
            label="European"
            onClick={() => handleClick('euro')}
          />
          <FormControlLabel
            checked={isAfrican}
            control={<Radio />}
            label="West African 🇳🇬"
            onClick={() => handleClick('afro')}
          />
        </RadioGroup>
      </FormControl>}
      {eatsAnything && isAfrican && <AfroMenuOptions control={control} />}
      {(isEuropean || !eatsAnything) && <EuroMenuOptions control={control} />}
      {(isAfrican || isEuropean) && <DessertOptions control={control} />}
    </Box>
  );
}
// Small shops for start 
// Spring roll  samosa ,and puff puff 
// Puff puff is is a traditional African snack made of fried dough.

// Dodogizzard 
// Boiled pieces of gizzard are deeply fried and mixed fried plantains poured over a simmering pepper and Tomato Sauce. 

// Main food 
// Jollof rice 
// Jollof (/dʒəˈlɒf/), or jollof rice, is a rice dish from West Africa. The dish is typically made with long-grain rice, tomatoes, onions, spices, vegetables and meat in a single pot


// Fried rice 
// Nigerian fried rice is rice mixed with vegetables, and spices. Sometimes contains prawns and various meats.

// Asaro with sauce 
// Yam porridge or Asaro is another delicious Nigerian yam dish cooked in a well-seasoned pepper mix until soft and fluffy with some yam chunks. 



// Ewa agoyin with sauce 
// Ewa Aganyin is a street food commonly eaten across Nigeria. The beans are made to be extremely soft or mashed. It is commonly eaten with barely ground pepper and tomato sauce which is very spicy, but peppery. It has a local name of 'Ewa G'. Additional ingredients can include palm oil, onion and crayfish.


// Ayamase with white rice 
// Ayamase is a stew made of green bell peppers, red onions, scotch bonnet peppers, assorted meats, locust beans and various spices. It is served with white rice. Sometimes contains boiled eggs.


// Meat chicken and fish 

// Efo riro Efo elegusi 
// Egusi is a popular Nigerian stew made of bell peppers, assorted meats, egusi seeds, crayfish, scotch bonnets and basil. 
// You can have this with white rice or pounded yam.

// Pounded yam 
// Pounded Yam is a popular African dish similar to mashed potatoes but heavier. It is served with stew. You may want to have this with egusi.

// Abula (Gbegiri ewedu amala with Assorted stew)

// Àmàlà is a local indigenous Nigerian food, native to the Yoruba ethnic group in the western states of the country. It is made out of yam and/or cassava flour,
// or unripe plantain flour. 

// Gbegiri is a traditional Nigerian bean soup consisting of honey beans (also called brown beans), smoked or fresh fish, ground crayfish, palm oil, stock, irú (locust beans), salt, and pepper. The beans are soaked, peeled, and mashed to a smooth paste, which is then combined with the other ingredients and cooked until the mixture reaches a slightly thickened consistency.



// Side meal 

//  Moimoi
// Moin-Moin or Moimoi is a Yoruba steamed bean pudding made from a mixture of washed and peeled black-eyed beans, onions and fresh ground red peppers. It is a protein-rich food that is a staple in Nigeria.

// Salad
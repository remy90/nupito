import React, { useState } from 'react';
import {  Box, Typography, FormControl, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { AfroMenuOptions } from './MenuOptions/AfroMenuOptions';
import { DessertOptions } from './MenuOptions/DessertOptions';
import { EuroMenuOptions } from './MenuOptions/EuroMenuOptions';
import { CuisineType, ICuisineOptionProps } from './Interfaces';

export default function MenuForm({ control, defaultValues }: ICuisineOptionProps) {
  const [isEuropean, setIsEuropean] = useState(defaultValues?.cuisine === 'euro' ?? true);

  const { reset } = useForm();

  // const resetFoodOptions = (firstOptionNumber: number, lastOptionNumber: number, defaultValue: false | string) => {
  //   const resetObject: any = {};
  
  //   for (let i = firstOptionNumber; i <= lastOptionNumber; i++) {
  //     resetObject[`menu.foodOption${i}`] = defaultValue;
  //   }
  //   return resetObject;
  // };
  // const handleEuroCuisine = () => {
  //   // 0 - 11 is euro
  //   setIsAfrican(false);
  //   setIsEuropean(true);
  //   reset(resetFoodOptions(0, 11, false));
  // };
  // const handleAfroCuisine = () => {
  //   setIsEuropean(false);
  //   setIsAfrican(true);
  //   reset(resetFoodOptions(12, 27, ''));
  // };

  const handleCuisineChange = (cuisine: CuisineType) =>
    setIsEuropean(cuisine === 'euro');

  return (
    <Box sx={{marginTop: '2rem', marginBottom: '2rem'}}>
      <Typography variant="h3" sx={{ fontSize: '2.5rem'}}>What cuisine type would you like?</Typography>
      <FormControl>
        <Controller
          control={control}
          defaultValue={defaultValues?.cuisine ?? 'euro'}
          name="cuisine"
          render={({field}) =>
            <RadioGroup {...field}>
              <FormControlLabel
                value={'euro'}
                control={<Radio />}
                label="European"
                onClick={() => handleCuisineChange('euro')}
              />
              <FormControlLabel
                value={'afro'}
                control={<Radio />}
                label="West African 🇳🇬"
                onClick={() => handleCuisineChange('afro')}
              />
            </RadioGroup>}
        />
      </FormControl>
      { !isEuropean && <AfroMenuOptions control={control} defaultValues={defaultValues?.menu}/>}
      { isEuropean && <EuroMenuOptions control={control} defaultValues={defaultValues?.menu}/>}
      <DessertOptions control={control} defaultValues={defaultValues?.menu} />
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
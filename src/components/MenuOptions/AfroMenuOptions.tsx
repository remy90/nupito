import type React from 'react';
import { IMenuDefaultProps } from '../Interfaces';
import CheckboxList, { listItem } from '../TextList';

const listItems: listItem[] = [
  { key: 'foodOption1', primary: 'Spring roll, samosa &amp; puff puff', secondary: 'A starter option. Puff puff is a snack made of fried dough.' },
  { key: 'foodOption2', primary: 'Dodogizzard', secondary: 'Boiled pieces of gizzard are deeply fried and mixed fried plantains poured over a simmering pepper and Tomato Sauce.' },
  { key: 'foodOption3', primary: 'Jollof rice', secondary: 'The dish is typically made with long-grain rice, tomatoes, onions, spices, vegetables and meat in a single pot' },
  { key: 'foodOption4', primary: 'Fried rice', secondary: 'Rice mixed with vegetables, and spices. Sometimes contains prawns and various meats.' },
  { key: 'foodOption5', primary: 'Asaro with sauce', secondary: 'Also known as Yam porridge.A yam dish cooked in a peppery mix until soft and fluffy with some yam chunks.' },
  { key: 'foodOption6', primary: 'Ewa agoyin with sauce Ayamase with white rice', secondary: 'The beans are cooked till soft (or mashed). Commonly eaten with barley, ground pepper and a spicy tomato sauce. Can include palm oil, onion and crayfish.' },
  { key: 'foodOption7', primary: 'Assorted meat, chicken &amp; fish', secondary: '' },
  { key: 'foodOption8', primary: 'Efo riro efo elegusi', secondary: 'A stew made of bell peppers, assorted meats, egusi seeds, crayfish, scotch bonnets and basil. You can have this with white rice or pounded yam.' },
  { key: 'foodOption9', primary: 'Pounded yam', secondary: 'Similar to mashed potatoes. It is served with stew. You may want to have this with egusi.' },
  { key: 'foodOption10', primary: 'Abula (Gbegiri ewedu amala soup with assorted meat stew)', secondary: 'It is made out of yam and/or cassava flour, or unripe plantain flour.' },
  { key: 'foodOption11', primary: 'dodogizzard', secondary: 'Boiled pieces of gizzard are deeply fried and mixed fried plantains poured over a simmering pepper and Tomato Sauce.' },
  { key: 'foodOption12', primary: 'Moin-moin', secondary: 'A protein rich dish, with Yoruba steamed bean pudding made from a mixture of washed and peeled black-eyed beans, onions and fresh ground red peppers' },
  { key: 'foodOption13', primary: 'Salad', secondary: '' },
];
export const AfroMenuOptions = ({control, defaultValues}: IMenuDefaultProps) =>
  <CheckboxList listItems={listItems} control={control} defaultValues={defaultValues} />;

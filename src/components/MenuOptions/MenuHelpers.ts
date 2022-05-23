import { Sentry } from '../../utils';
import { MenuType, DietType } from './../Interfaces';

export type listItem = {
  key: MenuType | number | string,
  primary: string | JSX.Element,
  diet: DietType,
  secondary?: string,
};

export type afroListItem = {
  key: MenuType,
  primary: string | JSX.Element,
  diet: DietType,
  secondary?: string,
};

export const afroMenuStarters: afroListItem[] = [
  { key: 'foodOption1', primary: 'Spring roll', secondary: '', diet: 'Meat' },
  { key: 'foodOption2', primary: 'Samosa', secondary: '', diet: 'Meat' },
  { key: 'foodOption3', primary: 'Puff puff', secondary: 'A snack made of fried dough.', diet: 'Meat' },
  { key: 'foodOption4', primary: 'Dodogizzard', secondary: 'Boiled pieces of gizzard are deeply fried and mixed fried plantains poured over a simmering pepper and Tomato Sauce.', diet: 'Meat' }
];

export const afroMenuMains: afroListItem[] = [
  { key: 'foodOption5', primary: 'Jollof rice', secondary: 'Rice, tomatoes, onions, spices, vegetables and meat in a single pot', diet: 'Meat' },
  { key: 'foodOption6', primary: 'Fried rice', secondary: 'Rice mixed with vegetables, and spices. Sometimes contains prawns and various meats.', diet: 'Meat' },
  { key: 'foodOption7', primary: 'Asaro with sauce', secondary: 'Asaro, also known as yam porridge, is a dish cooked in a peppery mix until soft and fluffy with some yam chunks.', diet: 'Meat' },
  { key: 'foodOption8', primary: 'Ewa agoyin with sauce Ayamase with white rice', secondary: 'The beans are cooked till soft (or mashed). Commonly eaten with barley, ground pepper and a spicy tomato sauce. Can include palm oil, onion and crayfish.', diet: 'Meat' },
  { key: 'foodOption9', primary: 'Assorted meat, chicken & fish', secondary: '', diet: 'Meat' },
  { key: 'foodOption10', primary: 'Efo riro efo elegusi', secondary: 'A stew made of bell peppers, assorted meats, egusi seeds, crayfish, scotch bonnets and basil. You can have this with white rice or pounded yam.', diet: 'Meat' },
  { key: 'foodOption11', primary: 'Pounded yam', secondary: 'Similar to mashed potatoes. It is served with stew. You may want to have this with egusi.', diet: 'Meat' },
  { key: 'foodOption12', primary: 'Abula (Gbegiri ewedu amala soup with assorted meat stew)', secondary: 'It is made out of yam and/or cassava flour, or unripe plantain flour.', diet: 'Meat' },
  { key: 'foodOption13', primary: 'Moin-moin', secondary: 'A protein rich dish, with Yoruba steamed bean pudding made from a mixture of washed and peeled black-eyed beans, onions and fresh ground red peppers', diet: 'Meat' },
  { key: 'foodOption14', primary: 'Salad', secondary: '', diet: 'Meat' }
];

export const euroStarterItems: listItem[] = [
  { key: '15', primary: 'Chinese duck pancakes served with spring onion cucumber & Hoi Sin', diet: 'Meat' },
  { key: '16', primary: 'Balsamic red onion & halloumi tart ', diet: 'Vegetarian' },
  { key: '17', primary: 'Trio of melon served with a raspberry coulis', diet: 'Vegan' },
  { key: '18', primary: 'Balsamic red onion & vegan cheese', diet: 'Vegan' }
];

export const euroMainItems: listItem[] = [
  { key: '19', primary: '“Rosa di Marco“ - Italian pork loin stuffed with prosciutto, mozzarella & sage pesto', diet: 'Meat' },
  { key: '20', primary: 'Roasted butternut squash & shallot risotto with parmesan shavings', diet: 'Vegetarian' },
  { key: '21', primary: 'Trio of falafel with mint mayonnaise', diet: 'Vegan' }
];

export const  dessertItems: listItem[] = [
  { key: '22', primary: 'Passionfruit pannacotta served with blueberry & coulis - recommended', diet: 'Vegetarian' },
  { key: '23', primary: 'Raspberry brûlée tart served with raspberries & coulis', diet: 'Vegetarian' },
  { key: '24', primary: 'Chocolate & orange tart served with chocolate coulis', diet: 'Vegan' }
];

const hasNoDietRestrictions = (diet: DietType) => diet === 'Meat' || diet === 'Vegetarian' || diet === 'Vegan';
const isVegetarian = (diet: DietType) => diet === 'Vegetarian' || diet === 'Vegan';
const isVegan = (diet: DietType) => diet === 'Vegan';

export const shouldShowBasedOnDietChoice = (guestDiet: DietType, foodType: DietType) => {
  // is vegan and food is vegan
  if (isVegan(guestDiet)) {
    return isVegan(foodType);
  }

  // is veggie and food is veggie or vegan
  if (isVegetarian(guestDiet)) {
    return isVegetarian(foodType);
  }

  // Allow those with no restriction to see all options
  if (hasNoDietRestrictions(guestDiet)) {
    return hasNoDietRestrictions(foodType);
  }

  return false;
};

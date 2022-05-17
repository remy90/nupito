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
  { key: 'foodOption1', primary: 'Spring roll, samosa & puff puff', secondary: 'A starter option. Puff puff is a snack made of fried dough.', diet: 'Meat' },
];

export const afroMenuMains: afroListItem[] = [
  { key: 'foodOption2', primary: 'Dodogizzard', secondary: 'Boiled pieces of gizzard are deeply fried and mixed fried plantains poured over a simmering pepper and Tomato Sauce.', diet: 'Meat' },
  { key: 'foodOption3', primary: 'Jollof rice', secondary: 'The dish is typically made with long-grain rice, tomatoes, onions, spices, vegetables and meat in a single pot', diet: 'Meat' },
  { key: 'foodOption4', primary: 'Fried rice', secondary: 'Rice mixed with vegetables, and spices. Sometimes contains prawns and various meats.', diet: 'Meat' },
  { key: 'foodOption5', primary: 'Asaro with sauce', secondary: 'Also known as Yam porridge.A yam dish cooked in a peppery mix until soft and fluffy with some yam chunks.', diet: 'Meat' },
  { key: 'foodOption6', primary: 'Ewa agoyin with sauce Ayamase with white rice', secondary: 'The beans are cooked till soft (or mashed). Commonly eaten with barley, ground pepper and a spicy tomato sauce. Can include palm oil, onion and crayfish.', diet: 'Meat' },
  { key: 'foodOption7', primary: 'Assorted meat, chicken & fish', secondary: '', diet: 'Meat' },
  { key: 'foodOption8', primary: 'Efo riro efo elegusi', secondary: 'A stew made of bell peppers, assorted meats, egusi seeds, crayfish, scotch bonnets and basil. You can have this with white rice or pounded yam.', diet: 'Meat' },
  { key: 'foodOption9', primary: 'Pounded yam', secondary: 'Similar to mashed potatoes. It is served with stew. You may want to have this with egusi.', diet: 'Meat' },
  { key: 'foodOption10', primary: 'Abula (Gbegiri ewedu amala soup with assorted meat stew)', secondary: 'It is made out of yam and/or cassava flour, or unripe plantain flour.', diet: 'Meat' },
  { key: 'foodOption11', primary: 'Moin-moin', secondary: 'A protein rich dish, with Yoruba steamed bean pudding made from a mixture of washed and peeled black-eyed beans, onions and fresh ground red peppers', diet: 'Meat' },
  { key: 'foodOption12', primary: 'Salad', secondary: '', diet: 'Meat' },
];

export const euroStarterItems: listItem[] = [
  { key: '14', primary: 'Chinese duck pancakes served with spring onion cucumber & Hoi Sin', diet: 'Meat' },
  { key: '15', primary: 'Balsamic red onion & halloumi tart ', diet: 'Vegetarian' },
  { key: '16', primary: 'Trio of melon served with a raspberry coulis', diet: 'Vegan' },
  { key: '17', primary: 'Balsamic red onion & vegan cheese', diet: 'Vegan' },
];

export const euroMainItems: listItem[] = [
  { key: '18', primary: '“Rosa di Marco“ - Italian pork loin stuffed with prosciutto, mozzarella & sage pesto', diet: 'Meat' },
  { key: '19', primary: 'Roasted butternut squash & shallot risotto with parmesan shavings', diet: 'Vegetarian' },
  { key: '20', primary: 'Trio of falafel with mint mayonnaise', diet: 'Vegan' },
  // { key: '22', primary: 'Chicken & Sun Dried Tomato en Crôute served with a Creamy White Wine Sauce', diet: 'Meat' },
  // { key: '23', primary: 'Beef Sirloin Steak served with a Red Wine & Mushroom Sauce ', diet: 'Meat' },
  // { key: '24', primary: 'Grilled Teriyaki Salmon', diet: 'Meat' },
  // { key: '25', primary: 'Chilli & Mint Lamb Chump Served with a Minted Jus', diet: 'Meat' },
  // { key: '26', primary: 'Mediterranean Pot Roasted Chicken', diet: 'Meat' },
  // { key: '28', primary: 'Asian Roasted Duck Breast With Stir Fry Vegetables & Rice', diet: 'Meat' },
];

export const  dessertItems: listItem[] = [
  { key: '20', primary: 'Passionfruit pannacotta served with blueberry & coulis - recommended', diet: 'Vegetarian' },
  { key: '21', primary: 'Raspberry brûlée tart served with raspberries & coulis', diet: 'Vegetarian' },
  { key: '22', primary: 'Chocolate & orange tart served with chocolate coulis', diet: 'Vegan' },
  // { key: 28, primary: 'Cheese & Roquito Pepper Tart', diet: 'Vegetarian' },
  // { key: 29, primary: 'Wild Mushroom & Creamy Tomato Crêpe', diet: 'Vegetarian' },
  // { key: 32, primary: 'Chocolate Truffle Torte With a mini Profiterole & Strawberry', diet: 'Vegetarian' },
  // { key: 33, primary: 'Lemon Posset Served with Blueberries and Langue de Chat Biscuits', diet: 'Vegetarian' },
  // { key: 34, primary: 'Golden Toffee Cheesecake served with Toffee Sauce &Raspberry', diet: 'Vegetarian' },
  // { key: 37, primary: 'Fresh Fruit Platter', diet: 'Vegan' }
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

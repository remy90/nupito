import { MenuType } from './../Interfaces';

export type listItem = {
  key: MenuType | number | string,
  primary: string | JSX.Element,
  secondary?: string,
};

export const afroMenuItems: listItem[] = [
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

export const euroStarterItems: listItem[] = [
  { key: 14, primary: 'Breaded Brie Wedges Served with Leaves &amp; Spiced Apricot Chutney' },
  { key: 15, primary: 'Coconut Coated Skewered Prawns served with Chilli Dressing' },
  { key: 16, primary: 'Chicken Brochette Kebab with a Sweet Corn Aioli' },
  { key: 17, primary: 'Balsamic Red Onion &amp; Halloumi Tart ' },
  { key: 18, primary: 'Heritage Tomato, Feta &amp; Olive Salad ' },
  { key: 19, primary: 'Trio Of Melon Served with a Raspberry Coulis' },
  { key: 20, primary: 'Chinese Duck Pancakes served with Spring Onion Cucumber &amp; Hoi Sin' },
  { key: 21, primary: 'Smoked Salmon Mousse with Balsamic Glaze &amp; Micro Leaves' },
];

export const euroMainItems: listItem[] = [
  { key: 22, primary: 'Chicken &amp; Sun Dried Tomato en Crôute served with a Creamy White Wine Sauce' },
  { key: 23, primary: 'Beef Sirloin Steak served with a Red Wine &amp; Mushroom Sauce ' },
  { key: 24, primary: 'Grilled Teriyaki Salmon' },
  { key: 25, primary: 'Chilli &amp; Mint Lamb Chump Served with a Minted Jus' },
  { key: 26, primary: 'Mediterranean Pot Roasted Chicken' },
  { key: 27, primary: '“Rosa di Marco“ - Italian Pork Loin Stuffed with Prosciutto, Mozzarella &amp; Sage Pesto' },
  { key: 28, primary: 'Asian Roasted Duck Breast With Stir Fry Vegetables &amp; Rice' },
  { key: 29, primary: 'Trio of Falafel with Mint Mayonnaise' },
];

export const  dessertItems: listItem[] = [
  { key: 28, primary: 'Cheese &amp; Roquito Pepper Tart' },
  { key: 29, primary: 'Wild Mushroom &amp; Creamy Tomato Crêpe' },
  { key: 30, primary: 'Roasted Butternut Squash &amp; Shallot Risotto with Parmesan shavings' },
  { key: 31, primary: 'Raspberry Brûlée Tart served with Raspberries &amp; Coulis' },
  { key: 32, primary: 'Chocolate Truffle Torte With a mini Profiterole &amp; Strawberry' },
  { key: 33, primary: 'Lemon Posset Served with Blueberries and Langue de Chat Biscuits' },
  { key: 34, primary: 'Golden Toffee Cheesecake served with Toffee Sauce &amp;Raspberry' },
  { key: 35, primary: 'Passionfruit Pannacotta served with Blueberry &amp; Coulis - recommended' },
  { key: 36, primary: 'Chocolate &amp; Orange Tart served with Chocolate Coulis' },
  { key: 37, primary: 'Fresh Fruit Platter' }
];

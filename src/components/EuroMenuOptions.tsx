import React from 'react';
import { Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { Inputs } from './Form';

export interface RHFormControlProps {
  control: Control<Inputs, object>;
}

// TODO: Allow only 1 starter, 1 main course and 1 desert
export const EuroMenuOptions = ({ control}: RHFormControlProps) =>
  
  <FormControl>
    <Typography variant="h4" sx={{ my: '1rem', fontSize: '2rem'}}>Starters</Typography>
    <Controller
      name='menuChoice.euroStarter'
      control={control}
      render={({field}) =>
        <RadioGroup {...field}>
          <FormControlLabel value={12} control={<Radio />} label="Breaded Brie Wedges Served with Leaves &amp; Spiced Apricot Chutney" />
          <FormControlLabel value={13} control={<Radio />} label="Coconut Coated Skewered Prawns served with Chilli Dressing" />
          <FormControlLabel value={14} control={<Radio />} label="Chicken Brochette Kebab with a Sweet Corn Aioli" />
          <FormControlLabel value={15} control={<Radio />} label="Balsamic Red Onion &amp; Halloumi Tart " />
          <FormControlLabel value={16} control={<Radio />} label="Heritage Tomato, Feta &amp; Olive Salad " />
          <FormControlLabel value={17} control={<Radio />} label="Trio Of Melon Served with a Raspberry Coulis" />
          <FormControlLabel value={18} control={<Radio />} label="Chinese Duck Pancakes served with Spring Onion Cucumber &amp; Hoi Sin" />
          <FormControlLabel value={19} control={<Radio />} label="Smoked Salmon Mousse with Balsamic Glaze &amp; Micro Leaves" />
        </RadioGroup>}
    />
    <Typography variant="h4" sx={{ my: '1rem', fontSize: '2rem'}}>Mains - all are served with Seasonal Vegetables and Potatoes</Typography>
    <Controller
      name='menuChoice.euroMain'
      control={control}
      render={({field}) =>
        <RadioGroup {...field}>
          <FormControlLabel value={20} control={<Radio />} label="Chicken &amp; Sun Dried Tomato en Crôute served with a Creamy White Wine Sauce" />
          <FormControlLabel value={21} control={<Radio />} label="Beef Sirloin Steak served with a Red Wine &amp; Mushroom Sauce " />
          <FormControlLabel value={22} control={<Radio />} label="Grilled Teriyaki Salmon" />
          <FormControlLabel value={23} control={<Radio />} label="Chilli &amp; Mint Lamb Chump Served with a Minted Jus" />
          <FormControlLabel value={24} control={<Radio />} label="Mediterranean Pot Roasted Chicken" />
          <FormControlLabel value={25} control={<Radio />} label="“Rosa di Marco“ - Italian Pork Loin Stuffed with Prosciutto, Mozzarella &amp; Sage Pesto"/>Check
          <FormControlLabel value={26} control={<Radio />} label="Asian Roasted Duck Breast With Stir Fry Vegetables &amp; Rice" />
          <FormControlLabel value={27} control={<Radio />} label="Trio of Falafel with Mint Mayonnaise" />
        </RadioGroup>}
    />
    <Typography variant="h4" sx={{ my: '1rem', fontSize: '2rem'}}>Dessert</Typography>
    <Controller
      name='menuChoice.euroDessert'
      control={control}
      render={({field}) =>
        <RadioGroup {...field}>
          <FormControlLabel value={28} control={<Radio />} label="Cheese &amp; Roquito Pepper Tart" />
          <FormControlLabel value={29} control={<Radio />} label="Wild Mushroom &amp; Creamy Tomato Crêpe" />
          <FormControlLabel value={30} control={<Radio />} label="Roasted Butternut Squash &amp; Shallot Risotto with Parmesan shavings" />
          <FormControlLabel value={31} control={<Radio />} label="Raspberry Brûlée Tart served with Raspberries &amp; Coulis" />
          <FormControlLabel value={32} control={<Radio />} label="Chocolate Truffle Torte With a mini Profiterole &amp; Strawberry" />
          <FormControlLabel value={33} control={<Radio />} label="Lemon Posset Served with Blueberries and Langue de Chat Biscuits" />
          <FormControlLabel value={34} control={<Radio />} label="Golden Toffee Cheesecake served with Toffee Sauce &amp;Raspberry" />
          <FormControlLabel value={35} control={<Radio />} label="Passionfruit Pannacotta served with Blueberry &amp; Coulis" />
          <FormControlLabel value={36} control={<Radio />} label="Chocolate &amp; Orange Tart served with Chocolate Coulis" />
          <FormControlLabel value={37} control={<Radio />} label="Fresh Fruit Platter" />
        </ RadioGroup>}
    />
  </FormControl>;
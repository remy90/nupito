import type React from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import type { IMenuDefaultProps } from '../Interfaces';

export const EuroMenuOptions = ({ control, defaultValues }: IMenuDefaultProps) =>
{
  return (<FormControl>
    <Typography variant="h4" sx={{ my: '1rem', fontSize: '2rem'}}>Starters</Typography>
    <Controller
      name='menu.euroStarter'
      control={control}
      defaultValue={defaultValues?.euroStarter ?? ''}
      render={({field}) =>
        <RadioGroup {...field} value={field.value || undefined}>
          <FormControlLabel value={14} control={<Radio />} label="Breaded Brie Wedges Served with Leaves &amp; Spiced Apricot Chutney" />
          <FormControlLabel value={15} control={<Radio />} label="Coconut Coated Skewered Prawns served with Chilli Dressing" />
          <FormControlLabel value={16} control={<Radio />} label="Chicken Brochette Kebab with a Sweet Corn Aioli" />
          <FormControlLabel value={17} control={<Radio />} label="Balsamic Red Onion &amp; Halloumi Tart " />
          <FormControlLabel value={18} control={<Radio />} label="Heritage Tomato, Feta &amp; Olive Salad " />
          <FormControlLabel value={19} control={<Radio />} label="Trio Of Melon Served with a Raspberry Coulis" />
          <FormControlLabel value={20} control={<Radio />} label="Chinese Duck Pancakes served with Spring Onion Cucumber &amp; Hoi Sin" />
          <FormControlLabel value={21} control={<Radio />} label="Smoked Salmon Mousse with Balsamic Glaze &amp; Micro Leaves" />
        </RadioGroup>
      }
    />
    <Typography variant="h4" sx={{ my: '1rem', fontSize: '2rem'}}>Mains - all are served with Seasonal Vegetables and Potatoes</Typography>
    <Controller
      name='menu.euroMain'
      control={control}
      defaultValue={defaultValues?.euroMain}
      render={({field}) =>
        <RadioGroup {...field}>
          <FormControlLabel value={22} control={<Radio />} label="Chicken &amp; Sun Dried Tomato en Crôute served with a Creamy White Wine Sauce" />
          <FormControlLabel value={23} control={<Radio />} label="Beef Sirloin Steak served with a Red Wine &amp; Mushroom Sauce " />
          <FormControlLabel value={24} control={<Radio />} label="Grilled Teriyaki Salmon" />
          <FormControlLabel value={25} control={<Radio />} label="Chilli &amp; Mint Lamb Chump Served with a Minted Jus" />
          <FormControlLabel value={26} control={<Radio />} label="Mediterranean Pot Roasted Chicken" />
          <FormControlLabel value={27} control={<Radio />} label="“Rosa di Marco“ - Italian Pork Loin Stuffed with Prosciutto, Mozzarella &amp; Sage Pesto"/>
          <FormControlLabel value={28} control={<Radio />} label="Asian Roasted Duck Breast With Stir Fry Vegetables &amp; Rice" />
          <FormControlLabel value={29} control={<Radio />} label="Trio of Falafel with Mint Mayonnaise" />
        </RadioGroup>}
    />
  </FormControl>);
};

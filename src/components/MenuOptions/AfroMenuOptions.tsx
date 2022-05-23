import type React from 'react';
import { Box, Typography } from '@mui/material';
import { IMenuOptionProps } from '../Interfaces';
import CheckboxList from './MenuCheckboxList';
import { afroMenuMains, afroMenuStarters } from './MenuHelpers';

export const AfroMenuOptions = ({control, diet, defaultValues}: IMenuOptionProps) =>
  <Box>
    <Typography variant="h4">West African menu</Typography>
    <Typography variant="subtitle1">Choose as many starters &amp; mains as you wish, with one dessert</Typography>
    <Typography variant="subtitle2" sx={{ mt: '1rem'}}>Starters</Typography>
    <CheckboxList listItems={afroMenuStarters} control={control} defaultValues={defaultValues} diet={diet} />
    <Typography variant="subtitle2" sx={{ mt: '1rem'}}>Mains</Typography>
    <CheckboxList listItems={afroMenuMains} control={control} defaultValues={defaultValues} diet={diet} />
  </Box>;

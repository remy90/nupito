import type React from 'react';
import { Box } from '@mui/material';
import { AfroMenuOptions } from './MenuOptions/AfroMenuOptions';
import { DessertOptions } from './MenuOptions/DessertOptions';
import { EuroMenuOptions } from './MenuOptions/EuroMenuOptions';
import { IMenuDefaultProps } from './Interfaces';

export default function MenuForm({ control, cuisineType, diet, defaultValues }: IMenuDefaultProps) {
  return (
    <Box sx={{my: '2rem'}}>
      { cuisineType === 'afro' && <AfroMenuOptions control={control} diet={diet} defaultValues={defaultValues?.menu}/>}
      { cuisineType === 'euro' && <EuroMenuOptions control={control} diet={diet} defaultValues={defaultValues?.menu}/>}
      <DessertOptions control={control} defaultValues={defaultValues?.menu} diet={diet} />
    </Box>
  );
}

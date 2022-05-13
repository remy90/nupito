import type React from 'react';
import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Controller } from 'react-hook-form';
import { Checkbox } from '@mui/material';
import type { IMenuDefaultProps, IMenuOptionProps, MenuType } from '../Interfaces';
import { listItem, shouldShowBasedOnDietChoice } from '../MenuOptions/MenuHelpers';

interface ICheckboxListProps extends IMenuOptionProps {
  listItems: listItem[];
}

export default function CheckboxList({ listItems, control, defaultValues, diet }: ICheckboxListProps) {  
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <List>
            { listItems.map<ReactNode>(x => shouldShowBasedOnDietChoice(diet, x.diet) && 
              <Controller
                key={x.key}
                name={`menu.${x.key as MenuType}`}
                control={control}
                render={({field}) => (
                  <ListItem>
                    <Checkbox
                      {...field }
                      defaultChecked={defaultValues && defaultValues[x.key as MenuType] as boolean}/>
                    <ListItemText primary={x.primary} secondary={x.secondary} />
                  </ListItem>
                )}
              />
            )}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}

import type React from 'react';
import { ReactNode, useContext } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Controller } from 'react-hook-form';
import { Checkbox } from '@mui/material';
import type { IMenuDefaultProps, MenuType, RHFormControlProps } from '../Interfaces';
import { AppContext } from '../AppProvider';

export type listItem = {
  key: MenuType,
  primary: string,
  secondary: string,
};

interface ICheckboxListProps extends IMenuDefaultProps{
  listItems: listItem[];
}

export default function CheckboxList({ listItems, control, defaultValues }: ICheckboxListProps) {  
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <List>
            { listItems.map<ReactNode>(x => (
              <Controller
                key={x.key}
                name={`menu.${x.key}`}
                control={control}
                render={({field}) => (
                  <ListItem>
                    <Checkbox {...field } defaultChecked={defaultValues && defaultValues[x.key] as boolean}/>
                    <ListItemText primary={x.primary} secondary={x.secondary} />
                  </ListItem>
                )}
              />
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}

import React, {useContext} from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { ButtonContent } from '../ButtonContent';
import { AppContext } from '../AppProvider';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

interface IDialogProps {
  open: boolean;
  title: string;
  message: string;
  extraButtonRoute?: ButtonContent;
  handleClose: (t: React.SetStateAction<boolean>) => void;
}

export default function SubmissionModal({ open, title, message, handleClose: close, extraButtonRoute }: IDialogProps) {
  const handleClose = () => close(false);
  const {state} = useContext(AppContext);

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="form-submission-modal"
      open={open}
      maxWidth="lg"
      sx={{px: '2rem'}}
    >
      <BootstrapDialogTitle id="form-submission-modal" onClose={handleClose}>
        {title}
      </BootstrapDialogTitle>
      <DialogContent>
        <Typography gutterBottom>
          {message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>{state.guest.firstName}&apos;s page</Button>
        {extraButtonRoute && <Button href={extraButtonRoute.route}>{extraButtonRoute.name}</Button>}
      </DialogActions>
    </BootstrapDialog>
  );
}

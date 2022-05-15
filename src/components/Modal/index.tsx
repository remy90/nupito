import React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { CopySelection } from '../CopySelection';

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
  onClose: (t: React.SetStateAction<boolean>) => void;
  children: JSX.Element | JSX.Element[];
  copyText?: string;
}

export function ConfirmationModal({ open, title, message, onClose, children, copyText }: IDialogProps) {
  const handleClose = () => onClose(false);

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="form-submission-modal"
      open={open}
      // maxWidth="xs"
      fullWidth
      sx={{px: '2rem', maxWidth: '36rem'}}
    >
      <BootstrapDialogTitle id="form-submission-modal" onClose={handleClose}>
        {title}
      </BootstrapDialogTitle>
      <DialogContent>
        <Typography sx={{display: 'inline', flexWrap: 'wrap'}} gutterBottom>
          <>
            <span>
              {`${message}`}
            </span>
            {copyText && <span>
              &nbsp;<a href={copyText}>here:</a> <CopySelection copyText={copyText} />
            </span>}
          </>
        </Typography>
      </DialogContent>
      <DialogActions>{children}
      </DialogActions>
    </BootstrapDialog>
  );
}

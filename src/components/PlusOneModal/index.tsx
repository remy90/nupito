import React, { useState } from 'react';
import { Modal, Typography } from '@mui/material';
import { ModalContents } from './styled';

interface IPlusOneModalProps {
  isOpen: boolean;
}

export const PlusOneModal = ({isOpen}: IPlusOneModalProps) => {
  const [open, setOpen] = useState(isOpen);
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalContents>
        <Typography id="modal-modal-title" variant="h6" component="h2">
    Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </ModalContents>
    </Modal>);
};
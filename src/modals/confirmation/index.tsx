import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button, DialogActions, Divider, useTheme, useMediaQuery } from '@mui/material';
import { useConfirmationStore } from '@/src/zustand';
import { ConfirmationModalProps } from './types';

function ConfirmationModal(props: ConfirmationModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const open = useConfirmationStore((state) => state.open);
  const {
    title = 'Растау',
    body = 'Сіз шынымен әрекетті растағыңыз келе ме?',

    onClose = () => {},
    onConfirm = () => {},

    confirmButtonText = 'Қабылдау',
    cancelButtonText = 'Болдырмау',

    hideTitle = false,
    hideConfirmButton = false,
    hideCancelButton = false,

    dialogProps = {},
    confirmButtonProps = {},
    cancelButtonProps = {},
  } = useConfirmationStore((state) => state.options);
  const handleClose = useConfirmationStore((state) => state.handleClose);

  const onClickConfirm = () => {
    handleClose();
    onConfirm();
  };
  const onClickClose = () => {
    handleClose();
    onClose();
  };

  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      fullScreen={isMobile}
      {...dialogProps}
      open={open}
      onClose={onClickClose}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      {!hideTitle && (
        <>
          <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
          <Divider />
        </>
      )}
      <DialogContent id="confirmation-dialog-description">{body}</DialogContent>
      <Divider />
      <DialogActions>
        {!hideCancelButton && (
          <Button {...cancelButtonProps} onClick={onClickClose}>
            {cancelButtonText}
          </Button>
        )}
        {!hideConfirmButton && (
          <Button autoFocus variant="contained" {...confirmButtonProps} onClick={onClickConfirm}>
            {confirmButtonText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationModal;

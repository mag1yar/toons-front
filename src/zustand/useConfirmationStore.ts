import { ButtonProps, DialogProps } from '@mui/material';
import { ReactNode } from 'react';
import { create } from 'zustand';

type State = {
  open: boolean;
  handleClose: () => void;

  options: {
    title?: string;
    body?: ReactNode;
    onConfirm?: () => any;
    onClose?: () => void;

    confirmButtonText?: string;
    cancelButtonText?: string;

    dialogProps?: Omit<DialogProps, 'open'>;
    confirmButtonProps?: ButtonProps;
    cancelButtonProps?: ButtonProps;

    hideTitle?: boolean;
    hideConfirmButton?: boolean;
    hideCancelButton?: boolean;
  };
};

type Action = {
  confirm: (options: State['options']) => void;
};

const useConfirmationStore = create<State & Action>()((set, get) => ({
  open: false,
  handleClose: () => set({ open: false }),

  options: {},
  confirm: (options) => {
    set({
      open: true,
      options: {
        ...options,
        onClose: options.onClose || (() => {}),
        onConfirm: options.onConfirm || (() => {}),
      },
    });
  },
}));

export default useConfirmationStore;

import { AlertColor } from '@mui/material';
import { atom } from 'jotai';

type SnackbarType = {
  severity?: AlertColor;
  open: boolean;
  message: string;
};

const snackbar = atom<SnackbarType>({
  severity: undefined,
  open: false,
  message: '',
});

export const snackbarAtomGlobal = atom(
  (get) => get(snackbar),
  (get, set, newValue: Partial<SnackbarType>) => {
    set(snackbar, { ...get(snackbar), ...newValue });
  },
);

export const snackbarError = atom(null, (_, set, message: string) => {
  set(snackbarAtomGlobal, { open: true, message, severity: 'error' });
});

export const snackbarWarning = atom(null, (_, set, message: string) => {
  set(snackbarAtomGlobal, { open: true, message, severity: 'warning' });
});

export const snackbarInfo = atom(null, (_, set, message: string) => {
  set(snackbarAtomGlobal, { open: true, message, severity: 'info' });
});

export const snackbarSucess = atom(null, (_, set, message: string) => {
  set(snackbarAtomGlobal, { open: true, message, severity: 'success' });
});

export const snackbarCommon = atom(null, (_, set, message: string) => {
  set(snackbarAtomGlobal, { open: true, message, severity: undefined });
});

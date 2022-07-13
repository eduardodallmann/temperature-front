import React from 'react';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useAtom } from 'jotai';
import { snackbarAtomGlobal } from '../screens/snackbars';

export function SnackbarsGlobal() {
  const [{ open, message, severity }, setSnackbar] =
    useAtom(snackbarAtomGlobal);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={6000}
      onClose={() => setSnackbar({ open: false })}>
      <Alert
        severity={severity}
        elevation={6}
        variant="filled"
        sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

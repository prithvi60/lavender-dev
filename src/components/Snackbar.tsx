import React, { createContext, useContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

// Create the context
interface ISnackbarContext {
  showSnackbar: (message: string, severity?: AlertProps['severity']) => void;
}

const SnackbarContext = createContext<ISnackbarContext | undefined>(undefined);

// Custom hook to use Snackbar context
export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context.showSnackbar;
};

// Snackbar Provider component
export const SnackbarProvider = ({ children }: any) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertProps['severity']>('info');

  const showSnackbar = (message: string, severity: AlertProps['severity'] = 'info') => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right'}}>
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={severity}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

// src/hooks/useSnackbar.js
import { useState } from 'react';

export const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info' // 'success', 'error', 'warning', 'info'
  });

  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const hideSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  return {
    snackbar,
    showSnackbar,
    hideSnackbar,
    showSuccess: (msg) => showSnackbar(msg, 'success'),
    showError: (msg) => showSnackbar(msg, 'error'),
    showWarning: (msg) => showSnackbar(msg, 'warning'),
    showInfo: (msg) => showSnackbar(msg, 'info')
  };
};
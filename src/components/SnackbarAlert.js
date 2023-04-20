import React from 'react';
import { Alert, Snackbar } from '@mui/material';

//Alert inspired by the frontend lab from class
function SnackbarAlert ({ open, message, onClose, severity }) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
            <Alert severity={severity}>{message}</Alert>
        </Snackbar>
    );
}

export default SnackbarAlert;

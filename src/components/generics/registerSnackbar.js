import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function RegisterSnackbar({snackbar, setSnackbar, type}) {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar(false);
  };

  return (
    
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={snackbar} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
          {type === 'success' ? 'Cadastro realizado com sucesso' : 'Nenhum resultado encontrado para sua busca'}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
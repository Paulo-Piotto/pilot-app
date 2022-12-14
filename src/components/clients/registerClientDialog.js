import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { getAllClients, registerClient } from '../../services/api.services';
import { storeNClientValidation } from '../../services/validationServices/storesNClientsValidation';
import RegisterSnackbar from '../generics/registerSnackbar';

export default function RegisterClientDialog({openDialog, handleCloseDialog, setClients, setAbsoluteClients}){

    const [name, setName] = useState('');
    const [snackbar, setSnackbar] = useState(false)
    const [nameHelper, setNameHelper] = useState('');
    const [nameError, setNameError] = useState(false);

   function handleSubmit(e){
    e.preventDefault();
    const errorObject = storeNClientValidation({ name });

    if(errorObject){
        setNameError(errorObject.name.error);
        setNameHelper(errorObject.name.helper);
    }else{
        registerClient({ name })
            .then(() => {
                setSnackbar(true);
                handleCloseDialog();
                setName('');
                getAllClients()
                    .then((resp) => {
                        setClients(resp.data)
                        setAbsoluteClients(resp.data.length)
                    })
            })
            .catch(() => {
                alert('algo deu errado')
            })
        
    }       
   }

    return(
        <>
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth='sm' fullWidth={true} >
        <DialogTitle>Cadastrar Obra</DialogTitle>
        <form onSubmit={handleSubmit} noValidate>
        <DialogContent>           
          <TextField
            error={nameError}
            value={name}
            autoFocus
            margin="dense"
            id="name"
            label="Nome da Obra"
            type="text"
            required={true}
            helperText={nameHelper}
            fullWidth
            variant="standard"
            onChange={(e) => setName(e.target.value)}
          />          
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleCloseDialog}>Cancelar</Button>
          <Button type='submit'>Cadastrar</Button>
        </DialogActions>
        </form>
      </Dialog>
      <RegisterSnackbar snackbar={snackbar} setSnackbar={setSnackbar} type={'success'}/>
      </>
    );
}
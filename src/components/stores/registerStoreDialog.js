import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { StoresService } from '../../services/api.services';
import { storeNClientValidation } from '../../services/validationServices/storesNClientsValidation';
import RegisterSnackbar from '../generics/registerSnackbar';

export default function RegisterStoreDialog({openDialog, handleCloseDialog, setStores, setAbsoluteStores, setLoading}){

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
        setLoading(true);
        handleCloseDialog();
        StoresService.registerStore({ name })
            .then(() => {
                setSnackbar(true);
                setName('');
                StoresService.getAllStores()
                    .then((resp) => {
                        setStores(resp.data)
                        setAbsoluteStores(resp.data.length)
                        setLoading(false)
                    })
                    .catch(() => {
                      setLoading(false);
                      alert('algo deu errado')
                    })
            })
            .catch(() => {
                alert('algo deu errado')
                setLoading(false);
            })
        
    }       
   }

    return(
        <>
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth='sm' fullWidth={true} >
        <DialogTitle>Cadastrar Loja</DialogTitle>
        <form onSubmit={handleSubmit} noValidate>
        <DialogContent>           
          <TextField
            error={nameError}
            value={name}
            autoFocus
            margin="dense"
            id="name"
            label="Nome da loja"
            autoComplete='off'
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
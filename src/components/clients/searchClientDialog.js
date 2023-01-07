import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ClientsService } from '../../services/api.services';
import GenericSnackbar from '../generics/genericSnackbar';

export default function SearchClientDialog({openDialog, handleCloseDialog, setClients, setLoading}){

    const [name, setName] = useState('');
    const [snackbar, setSnackbar] = useState(false)
    const snackbarType = 'error';
    const snackbarMessage = 'Nenhum resultado encontrado'

   function handleSubmit(e){
    e.preventDefault();
    setLoading(true);
    handleCloseDialog();
    ClientsService.searchClientByName(name)
        .then((resp) => {
            setClients(resp.data);
            setName('');
            setLoading(false);
        })
        .catch(() => {
            setSnackbar(true)
            setClients([])
            setLoading(false);
            })
   }

    return(
        <>
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth='sm' fullWidth={true} >
        <DialogTitle>Buscar Obra</DialogTitle>
        <form onSubmit={handleSubmit} noValidate>
        <DialogContent>           
          <TextField
            value={name}
            autoFocus
            margin="dense"
            id="name"
            autoComplete='off'
            label="Nome da obra"
            type="text"
            required={true}
            fullWidth
            variant="standard"
            onChange={(e) => setName(e.target.value)}
          />          
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleCloseDialog}>Cancelar</Button>
          <Button type='submit'>Buscar</Button>
        </DialogActions>
        </form>
      </Dialog>
      <GenericSnackbar snackbar={snackbar} setSnackbar={setSnackbar} type={snackbarType} message={snackbarMessage} />
      </>
    );
}
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { searchClientByName, getAllClients } from '../../services/api.services';
import RegisterSnackbar from '../generics/registerSnackbar';

export default function SearchClientDialog({openDialog, handleCloseDialog, setClients}){

    const [name, setName] = useState('');
    const [snackbar, setSnackbar] = useState(false)

   function handleSubmit(e){
    e.preventDefault();
    searchClientByName(name)
        .then((resp) => {
            setClients(resp.data);
            handleCloseDialog();
            setName('');
        })
        .catch(() => {
            setSnackbar(true)
            getAllClients()
                .then((resp) => {
                    setClients(resp.data)
                })
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
      <RegisterSnackbar snackbar={snackbar} setSnackbar={setSnackbar} type={'error'}/>
      </>
    );
}
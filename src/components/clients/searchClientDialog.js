import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ClientsService } from '../../services/api.services';
import intToMoney from '../../services/utils/intToMoney';
import { sumTotalBalance } from '../../services/utils/sumTotal';

export default function SearchClientDialog({openDialog, handleCloseDialog, setClients, setTotal, setLoading, setSnackbar, setSnackbarType, setSnackbarMessage}){

    const [name, setName] = useState('');

   function handleSubmit(e){
    e.preventDefault();
    setLoading(true);
    handleCloseDialog();
    ClientsService.searchClient({name, initialDate: false, endDate: false})
        .then((resp) => {
            setClients(resp.data);
            setTotal(intToMoney(sumTotalBalance(resp.data)));
            setName('');
            setLoading(false);
        })
        .catch((err) => {
            setSnackbar(true)
            setSnackbarMessage('Nenhum resultado para essa busca')
            setSnackbarType('error')
            console.log(err)
            setClients([])
            setTotal('0,00');
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
      </>
    );
}
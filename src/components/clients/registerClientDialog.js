import { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ClientsService } from '../../services/api.services';
import { storeNClientValidation } from '../../services/validationServices/storesNClientsValidation';
import intToMoney from '../../services/utils/intToMoney';
import { sumTotalBalance } from '../../services/utils/sumTotal';
import AuthContext from '../context/AuthContext';

export default function RegisterClientDialog({openDialog, handleCloseDialog, setClients, setTotal, setLoading, setSnackbar, setSnackbarType, setSnackbarMessage}){

    const [name, setName] = useState('');
    const [nameHelper, setNameHelper] = useState('');
    const [nameError, setNameError] = useState(false);
    const { userData } = useContext(AuthContext);

   function handleSubmit(e){
    e.preventDefault();
    setLoading(true)
    const errorObject = storeNClientValidation({ name });

    if(errorObject){
        setNameError(errorObject.name.error);
        setNameHelper(errorObject.name.helper);
    }else{
        ClientsService.registerClient({ name, author: userData.name })
            .then(() => {
                setSnackbar(true);
                setSnackbarType('success')
                setSnackbarMessage('Obra Cadastrada com sucesso!')
                handleCloseDialog();
                setName('');
                ClientsService.getClientsBalance({initialDate: false, endDate: false})
                    .then((resp) => {
                        setClients(resp.data)
                        setTotal(intToMoney(sumTotalBalance(resp.data)));
                        setLoading(false)
                    })
            })
            .catch(() => {
                setSnackbar(true);
                setSnackbarType('error')
                setSnackbarMessage('Algo deu errado ao cadastrar a obra')
                setLoading(false)
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
            autoComplete='off'
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
      </>
    );
}
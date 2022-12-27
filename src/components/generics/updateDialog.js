import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function UpdateDialog({openDialog, handleCloseDialog, handleSubmit}){

    const [name, setName] = useState('');
    const [nameHelper, setNameHelper] = useState('');
    const [nameError, setNameError] = useState(false);

    return(
        <>
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth='sm' fullWidth={true} >
        <DialogTitle>Atualizar Cadastro</DialogTitle>
        <form onSubmit={(e) => handleSubmit({e, name, setName, setNameHelper, setNameError})} noValidate>
        <DialogContent>           
          <TextField
            error={nameError}
            value={name}
            autoFocus
            margin="dense"
            id="name"
            label="Novo nome"
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
          <Button type='submit'>Atualizar</Button>
        </DialogActions>
        </form>
      </Dialog>
      </>
    );
}
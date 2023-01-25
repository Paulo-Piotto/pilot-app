import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

export default function LogoutDialog({openDialog, handleCloseDialog, handleSubmit}){

    return(
        <>
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth='sm' fullWidth={true} >
        <DialogTitle>Tem certeza que deseja sair da sua conta?</DialogTitle>
        <DialogActions>
          <Button  onClick={handleCloseDialog}>Cancelar</Button>
          <Button variant='contained' color='warning' onClick={handleSubmit}>Sair</Button>
        </DialogActions>
      </Dialog>
      </>
    );
}
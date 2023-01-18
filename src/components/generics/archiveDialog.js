import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText }from '@mui/material';

export default function ArchiveDialog({openDialog, handleCloseDialog, handleSubmit}){

    return(
        <>
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth='sm' fullWidth={true} >
        <DialogTitle>Tem certeza que deseja alterar o status desse item?</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{fontSize: 15}}>Essa ação pode ser desfeita a qualquer momento</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleCloseDialog}>Cancelar</Button>
          <Button variant='outlined' onClick={handleSubmit}>Confirmar</Button>
        </DialogActions>
      </Dialog>
      </>
    );
}
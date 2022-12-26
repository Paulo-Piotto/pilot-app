import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText  from '@mui/material/DialogContentText';

export default function DeleteDialog({openDialog, handleCloseDialog, handleSubmit}){

    return(
        <>
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth='sm' fullWidth={true} >
        <DialogTitle>Tem certeza que deseja deletar esse item?</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{fontSize: 15}}>Essa ação não poderá ser desfeita</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleCloseDialog}>Cancelar</Button>
          <Button variant='contained' color='error' onClick={handleSubmit}>Deletar</Button>
        </DialogActions>
      </Dialog>
      </>
    );
}
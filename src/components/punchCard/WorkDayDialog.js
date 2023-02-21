import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

export default function WorkDayDialog({ openDialog, handleCloseDialog, workDayData }) {
    return (
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth='sm' fullWidth={true}>
            <DialogTitle>Fulano de tal</DialogTitle>

            <DialogActions>
                <Button  onClick={handleCloseDialog}>Cancelar</Button>
                <Button variant='contained' color='warning' onClick={() => {}}>Sair</Button>
            </DialogActions>
        </Dialog>
    )
}
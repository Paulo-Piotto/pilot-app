import { TextField, DialogTitle, DialogContent, DialogActions, Dialog, Button } from '@mui/material';
import {intToMoney} from '../../services/utils/format';
import dayjs from 'dayjs';


export default function IncomeDetailsDialog({rowData, openDialog, handleCloseDialog}){    
    return(
        <>
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth='sm' fullWidth={true} >
        <DialogTitle>Detalhes da Entrada</DialogTitle>
        <DialogContent> 
            <TextField
                value={rowData.name}
                margin="dense"
                id="name"
                label="Nome da Entrada:"
                type="text"
                variant="standard"
                fullWidth
                InputProps={{
                    readOnly: true,
                  }}
            />
            <TextField
                value={rowData.clients.name}
                margin="dense"
                id="Client"
                label="Obra:"
                type="text"
                variant="standard"
                fullWidth
                InputProps={{
                    readOnly: true,
                  }}
            />
            <TextField
                value={`R$ ${intToMoney(rowData.value)}`}
                margin="dense"
                id="value"
                label="Valor:"
                type="text"
                variant="standard"
                fullWidth
                InputProps={{
                    readOnly: true,
                  }}
            />
            <TextField
                value={dayjs(rowData.date).format('DD/MM/YYYY')}
                margin="dense"
                id="contact"
                label="Data do pagamento:"
                type="text"
                variant="standard"
                fullWidth
                InputProps={{
                    readOnly: true,
                  }}
            />
            <TextField
                value={rowData.author || 'Desconhecido'}
                margin="dense"
                id="lastEditedBy"
                label="Última edição por:"
                type="text"
                variant="standard"
                fullWidth
                InputProps={{
                    readOnly: true,
                    sx: {
                        fontSize: 16
                    }
                  }}
            />
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleCloseDialog}>Fechar</Button>
        </DialogActions>
      </Dialog>
      </>
    );
}
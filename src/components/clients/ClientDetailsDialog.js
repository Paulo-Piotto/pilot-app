import { useState } from 'react';
import { DialogContentText, Switch, TextField, DialogTitle, DialogContent, DialogActions, Dialog, Button } from '@mui/material';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import styled from 'styled-components';

export default function ClientDetailsDialog({rowData, openDialog, handleCloseDialog}){
    const [checked, setChecked] = useState(false);
    
    return(
        <>
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth='sm' fullWidth={true} >
        <DialogTitle>Detalhes da Obra</DialogTitle>
        <DialogContent> 
            <TextField
                value={rowData.name}
                margin="dense"
                id="name"
                label="Nome da Obra:"
                type="text"
                variant="standard"
                fullWidth
                InputProps={{
                    readOnly: true,
                  }}
            />
            <TextField
                value='N/A'
                margin="dense"
                id="accountable"
                label="Responsável:"
                type="text"
                variant="standard"
                fullWidth
                InputProps={{
                    readOnly: true,
                  }}
            />
            <TextField
                value='N/A'
                margin="dense"
                id="address"
                label="Endereço:"
                type="text"
                variant="standard"
                fullWidth
                InputProps={{
                    readOnly: true,
                  }}
            />
            <TextField
                value='N/A'
                margin="dense"
                id="contact"
                label="Contato:"
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
            <DialogContentText sx={{ fontSize: 18, mt: 3}}>
                <ArchiveContainer>
                    <Inventory2OutlinedIcon fontSize='small' sx={{mr: 1}}/>
                    <p>Arquivar: </p>
                    <Switch
                    checked={checked}
                    onChange={(e) =>  setChecked(e.target.checked)}
                    inputProps={{ 'aria-label': 'controlled' }}
                    />
                </ArchiveContainer>
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleCloseDialog}>Fechar</Button>
        </DialogActions>
      </Dialog>
      </>
    );
}

const ArchiveContainer = styled.div`
    display: flex;
    align-items: center;
`
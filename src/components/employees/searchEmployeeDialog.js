import { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  DialogContentText,
} from '@mui/material';
import { EmployeesService } from '../../services/api.services';
import RegisterSnackbar from '../generics/registerSnackbar';
import styled from 'styled-components';

export default function SearchEmployeeDialog({openDialog, handleCloseDialog, setEmployees}){

    const [name, setName] = useState('');
    const [snackbar, setSnackbar] = useState(false)
    const [includeArchived, setIncludeArchived] = useState(false);

   function handleSubmit(e){
    e.preventDefault();
    const filterString = `${includeArchived ? `includeArchived=${includeArchived}` : ''}${name ? `&name=${name}` : ''}`
    EmployeesService.getEmployees(filterString)
            .then((resp) => {
                setEmployees(resp.data);
                handleCloseDialog();
                setName('');
            })
            .catch(() => {
                setSnackbar(true)
                EmployeesService.getEmployees()
                    .then((resp) => {
                        setEmployees(resp.data)
                    })
            })
   }

    return(
        <>
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth='sm' fullWidth={true} >
        <DialogTitle>Buscar Funcionário</DialogTitle>
        <form onSubmit={handleSubmit} noValidate>
        <DialogContent>           
          <TextField
            value={name}
            autoFocus
            margin="dense"
            id="name"
            label="Nome do funcionário"
            type="text"
            required={true}
            fullWidth
            variant="standard"
            onChange={(e) => setName(e.target.value)}
          />   
          <DialogContentText sx={{ fontSize: 18, mt: 3 }}>
              <ArchiveContainer>
                <Checkbox
                  checked={includeArchived}
                  onChange={(e) => setIncludeArchived(e.target.checked)}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <p>Incluir Arquivados </p>
              </ArchiveContainer>
            </DialogContentText>       
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

const ArchiveContainer = styled.div`
  display: flex;
  align-items: center;
`;
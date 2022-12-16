import { useState } from 'react';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import RegisterSnackbar from '../generics/registerSnackbar';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { filterOrders } from '../../services/api.services';

export default function SearchOrdersDialog({openDialog, handleCloseDialog, setOrders}){

    const todayMinus30 = Date.now() - 86400000*30

    const [snackbar, setSnackbar] = useState(false);
    const [initialDate, setInitialDate] = useState(dayjs(todayMinus30).toISOString());
    const [endDate, setEndDate] = useState(dayjs(Date.now()).toISOString());

   function handleSubmit(e){
    e.preventDefault();

    const searchSettings = {
      initialDate,
      endDate,
    }
    

    filterOrders(searchSettings)
      .then((resp) => {
        setOrders(resp.data)
      })
      .catch(() => {
        alert('algo deu errado')
      })
    
   }

    return(
        <>
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth='sm' fullWidth={true} >
        <DialogTitle>Configurações de Busca</DialogTitle>
        <form onSubmit={handleSubmit} noValidate>
        <DialogContent>           
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateContainer>
          <DesktopDatePicker
            value={initialDate}
            autoFocus
            margin="dense"
            label='De:'
            id="date"
            inputFormat='DD/MM/YYYY'
            type="date"
            required={true}
            variant="standard"
            onChange={(e) => setInitialDate(e.toISOString())}
            renderInput={(params) => <TextField {...params} sx={{width: 200}} margin='dense' />}
          />
          <DesktopDatePicker
            value={endDate}
            autoFocus
            margin="dense"
            label='Até:'
            id="date"
            inputFormat='DD/MM/YYYY'
            type="date"
            required={true}
            variant="standard"
            onChange={(e) => setEndDate(e.toISOString())}
            renderInput={(params) => <TextField {...params} sx={{width: 200, ml: 1}} margin='dense' />}
          />
          </DateContainer>
          </LocalizationProvider>
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

const DateContainer = styled.div`
  width: 100%;
  display: flex;
`
import { useState, useEffect } from 'react';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import RegisterSnackbar from '../generics/registerSnackbar';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { filterOrders, getAllStores, getAllClients } from '../../services/api.services';
import sumTotal from '../../services/sumTotal';

export default function SearchOrdersDialog({openDialog, handleCloseDialog, setOrders, setTotal}){

    const todayMinus30 = Date.now() - 86400000*30

    const [snackbar, setSnackbar] = useState(false);
    const [initialDate, setInitialDate] = useState(dayjs(todayMinus30));
    const [endDate, setEndDate] = useState(dayjs(Date.now()));
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState(0)
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(0);

    useEffect(() => {
      getAllStores()
        .then((resp) => {
          setStores(resp.data)
        });
        getAllClients()
        .then((resp) => {
          setClients(resp.data)
        })
    }, [])

   function handleSubmit(e){
    e.preventDefault();

    const searchSettings = {
      initialDate: initialDate.toISOString(),
      endDate: endDate.toISOString(),
      store: selectedStore,
      client: selectedClient,
    }
    

    filterOrders(searchSettings)
      .then((resp) => {
        setOrders(resp.data);
        setTotal(Number(sumTotal(resp.data)/100).toFixed(2))
      })
      .catch(() => {
        setSnackbar(true)
      })
    
   }

    return(
        <>
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth='sm' fullWidth={true}>
        <DialogTitle sx={{mt: 2}}>Configurações de Busca</DialogTitle>
        <form onSubmit={handleSubmit} noValidate>
        <DialogContent >           
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
            onChange={(e) => setInitialDate(e)}
            renderInput={(params) => <TextField {...params}  margin='dense' />}
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
            onChange={(e) => setEndDate(e)}
            renderInput={(params) => <TextField {...params} sx={{ ml: 1}} margin='dense' />}
          />
          </DateContainer>
          </LocalizationProvider>
          <TextField
          id="outlined-select-store"
          sx={{mt: 1}}
          select
          fullWidth
          label="Loja"
          defaultValue={0}
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
        >
          <MenuItem key={0} value={0}>
              {'Todas'}
            </MenuItem>
          {stores.map((store) => (
            <MenuItem key={store.id} value={store.id}>
              {store.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-store"
          sx={{ mt: 1}}
          select
          fullWidth
          label="Obra"
          defaultValue={0}
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
        >
          <MenuItem key={0} value={0}>
              {'Todas'}
            </MenuItem>
          {clients.map((client) => (
            <MenuItem key={client.id} value={client.id}>
              {client.name}
            </MenuItem>
          ))}
        </TextField>
        </DialogContent>
        <DialogActions sx={{mb: 2, mr: 2}}>
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
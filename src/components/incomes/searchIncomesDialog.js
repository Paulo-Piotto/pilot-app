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
import dayjs from 'dayjs';
import styled from 'styled-components';
import { IncomesService, ClientsService } from '../../services/api.services';
import { sumTotal } from '../../services/utils/sumTotal';
import intToMoney from '../../services/utils/intToMoney';
import { floorDateHour, ceilDateHour } from '../../services/utils/dateServices';

export default function SearchIncomesDialog({openDialog, handleCloseDialog, setIncomes, setTotal, setLoading, setSnackbar, setSnackbarType, setSnackbarMessage}) {
    const todayMinus30 = Date.now() - 86400000*30
    const [initialDate, setInitialDate] = useState(dayjs(todayMinus30));
    const [endDate, setEndDate] = useState(dayjs(Date.now()));
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(0);

    useEffect(() => {
        setLoading(true);
        ClientsService.getAllClients()
        .then((resp) => {
          setClients(resp.data)
          setLoading(false);
        })
        .catch(() => {
            setSnackbarMessage('Ocorreu um erro ao tentar obter as obras');
            setSnackbarType('error');
            setSnackbar(true);
            setLoading(false);
        })
    }, [setLoading, setSnackbar, setSnackbarMessage, setSnackbarType]);

    function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
    
        const searchSettings = {
          initialDate: floorDateHour(initialDate),
          endDate: ceilDateHour(endDate),
          client: selectedClient,
        }
        
    
        IncomesService.filterIncomes(searchSettings)
          .then((resp) => {
            setLoading(false)
            setIncomes(resp.data);
            setTotal(intToMoney(sumTotal(resp.data)))
            handleCloseDialog();
          })
          .catch(() => {
            setSnackbarMessage('Ocorreu um erro ao tentar filtrar as entradas');
            setSnackbarType('error');
            setSnackbar(true);
            setIncomes([])
            setLoading(false)
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
          id="outlined-select-client"
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
      </>
    );
}

const DateContainer = styled.div`
  width: 100%;
  display: flex;
`

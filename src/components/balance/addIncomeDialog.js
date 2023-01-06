import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { MoneyInput, MoneyLabel } from '../../styles/moneyInputStyles';
import dayjs from 'dayjs';
import { getAllClients } from '../../services/api.services';

export default function AddIncomeDialog({openDialog, handleCloseDialog, setClients, setTotal, setLoading, setSnackbar, setSnackbarType, setSnackbarMessage}){
    const [clientsList, setClientsList] = useState([]);
    const [value, setValue] = useState('');
    const [client, setClient] = useState(0);
    const [date, setDate] = useState(dayjs(Date.now()));

    useEffect(() => {
        getAllClients()
            .then((resp) => {
                setClientsList(resp.data);
            })
            .catch(() => {
              setSnackbarType('error');
              setSnackbarMessage('Algo deu errado ao recuperar as obras da lista')
              setSnackbar(true);
            });
    })

    return(
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth='sm' fullWidth={true} >
        <DialogTitle>Adicionar Entrada</DialogTitle>
        <DialogContent>           
        <MoneyLabel>Valor:</MoneyLabel>
        <MoneyInput
            id="input-financed"
            name="input-financed"
            // warning={financedError}
            autoComplete='off'
            placeholder="R$ 0,00"
            value={value}
            intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
            decimalScale={2}
            onValueChange={(value, name) => setValue(value)}
        />
        <TextField
          id="outlined-select-client"
          sx={{mt: 1}}
          select
          fullWidth
          //error={clientError}
          label="Obra"
          defaultValue={0}
          value={client}
          onChange={(e) => setClient(e.target.value)}
        >
          <MenuItem key={0} value={0} sx={{fontSize: 15}}>
              {'Escolha uma Obra'}
            </MenuItem>
          {clientsList.map((client) => (
            <MenuItem key={client.id} value={client.id} sx={{fontSize: 15}}>
              {client.name}
            </MenuItem>
          ))}
        </TextField>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            value={date}
            autoFocus
            margin="dense"
            label='Data'
            id="date"
            inputFormat='DD/MM/YYYY'
            type="date"
            required={true}
            variant="standard"
            onChange={(e) => setDate(e)}
            renderInput={(params) => <TextField {...params} sx={{mt: 2}} />}
          />
          </LocalizationProvider> 
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleCloseDialog}>Cancelar</Button>
          <Button type='submit'>Cadastrar</Button>
        </DialogActions>
      </Dialog>
    );
}
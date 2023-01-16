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
import { ClientsService, IncomesService } from "../../services/api.services";
import { incomesValidation } from '../../services/validationServices/incomesValidation';
import { sumTotal } from '../../services/utils/sumTotal';
import intToMoney from '../../services/utils/intToMoney';

export default function AddIncomeDialog({openDialog, handleCloseDialog, setIncomes, setTotal, setLoading, setSnackbar, setSnackbarType, setSnackbarMessage}){
    const [clientsList, setClientsList] = useState([]);
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);
    const [value, setValue] = useState('');
    const [valueError, setValueError] = useState(false)
    const [client, setClient] = useState(0);
    const [clientError, setClientError] = useState(false);
    const [date, setDate] = useState(dayjs(Date.now()));

    useEffect(() => {
        ClientsService.getAllClients()
            .then((resp) => {
                setClientsList(resp.data);
            })
            .catch(() => {
              setSnackbarType('error');
              setSnackbarMessage('Algo deu errado ao recuperar as obras da lista')
              setSnackbar(true);
            });
    })

    function handleSubmit(e){
     e.preventDefault();
     setLoading(true)
     const validationData = incomesValidation({name, client, date, value})
     setNameError(validationData.name)
     setValueError(validationData.value)
     setClientError(validationData.client)
     
     IncomesService.addIncome({
      name,
      value: parseInt(Number(value.replace(',','.'))*100),
      client,
      date,
     }).then(() => {
      IncomesService.getAllIncomes()
        .then((resp) => {
          handleCloseDialog();
          setIncomes(resp.data)
          setTotal(intToMoney(sumTotal(resp.data)))
          setSnackbarType('success');
          setSnackbarMessage('Entrada registrada com sucesso')
          setSnackbar(true);
          setLoading(false)
          setName('');
          setValue('');
          setClient(0);
          setDate(dayjs(Date.now()));
        })
        .catch(() => {
          handleCloseDialog();
          setSnackbarType('error');
          setSnackbarMessage('Algo deu errado ao recuperar os itens')
          setSnackbar(true);
          setLoading(false)
        })
     })
     .catch(() => {
        handleCloseDialog();
        setSnackbarType('error');
        setSnackbarMessage('Algo deu errado ao tentar registrar a entrada')
        setSnackbar(true);
        setLoading(false)
     })
    }

    return(
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth='sm' fullWidth={true} >
        <DialogTitle>Adicionar Entrada</DialogTitle>
        <DialogContent>
        <TextField
            error={nameError}
            value={name}
            autoFocus
            margin="dense"
            id="name"
            label="Nome"
            type="text"
            required={true}
            fullWidth
            autoComplete='off'
            variant="standard"
            onChange={(e) => setName(e.target.value.toUpperCase())}
            inputProps={{style: {fontSize: 18}}}
          />           
        <MoneyLabel>Valor:</MoneyLabel>
        <MoneyInput
            id="input-financed"
            name="input-financed"
            warning={valueError}
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
          error={clientError}
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
          <Button onClick={handleSubmit}>Cadastrar</Button>
        </DialogActions>
      </Dialog>
    );
}
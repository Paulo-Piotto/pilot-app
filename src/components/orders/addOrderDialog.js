import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ordersValidation } from '../../services/validationServices/ordersValidation';
import styled from 'styled-components';
import { getAllClients, getAllStores, getAllOrders, addOrder } from '../../services/api.services';
import dayjs from 'dayjs';
import { MoneyInput } from '../../styles/moneyInputStyles';
import applyDiscount from '../../services/utils/applyDiscount';
import sumTotal from '../../services/utils/sumTotal';
import intToMoney from '../../services/utils/intToMoney';
import GenericSnackbar from '../generics/genericSnackbar';

export default function AddOrderDialog({openDialog, handleCloseDialog, setOrders, setTotal}){

    const [name, setName] = useState('');
    const [client, setClient] = useState(0);
    const [store, setStore] = useState(0);
    const [date, setDate] = useState(dayjs(Date.now()));
    const [valueFinanced, setValueFinanced] = useState('');
    const [valueCash, setValueCash] = useState('0,00');
    const [valueNegotiated, setValueNegotiated] = useState('');
    const [paymentMethod, setPaymentMethod] = useState(1)
    const [clients, setClients] = useState([]);
    const [stores, setStores] = useState([]);
    const [nameError, setNameError] = useState(false);
    const [clientError, setClientError] = useState(false);
    const [storeError, setStoreError] = useState(false);
    const [financedError, setFinancedError] = useState(false);
    const [negotiatedError, setNegotiatedError] = useState(false);
    const [snackbar, setSnackbar] = useState(false);
    const [snackbarType, setSnackbarType] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('Item deletado com sucesso')

    useEffect(() => {
        getAllClients()
            .then((resp) => {
                setClients(resp.data);
            })
            .catch(() => {
              setSnackbarType('error');
              setSnackbarMessage('Algo deu errado ao recuperar os itens')
              setSnackbar(true);
            });
        getAllStores()
            .then((resp) => {
                setStores(resp.data);
            })
            .catch(() => {
              setSnackbarType('error');
              setSnackbarMessage('Algo deu errado ao recuperar os itens');
              setSnackbar(true);
            })
    },[])

   function handleSubmit(e){
     e.preventDefault();
     const validationData = ordersValidation({name, client, store, date, valueFinanced, valueNegotiated, paymentMethod, valueCash})

    let keys = Object.keys(validationData.errorObject);
    let error = undefined

    for(let i=0; i<keys.length; i++){
        if(validationData.errorObject[keys[i]]){
          error = true;
        }
    }

    setNameError(validationData.errorObject.name)
    setClientError(validationData.errorObject.client)
    setStoreError(validationData.errorObject.store)
    setFinancedError(validationData.errorObject.valueFinanced)
    setNegotiatedError(validationData.errorObject.valueNegotiated)

    if(!error){
      let negotiatedValue = null;

      if(valueNegotiated && Number(valueNegotiated.replace(',','.')) > 0){
        negotiatedValue = Number(valueNegotiated.replace(',','.'))*100;
      }

      addOrder({
        invoice: name,
        store,
        client,
        value: parseInt(Number(validationData.value.replace(',','.'))*100),
        financed: parseInt(Number(valueFinanced.replace(',','.'))*100),
        cash: parseInt(Number(valueCash.replace(',','.'))*100),
        negotiated: negotiatedValue,
        date
      }).then(() => {
        getAllOrders()
          .then((resp) => {
            setOrders(resp.data)
            setTotal(intToMoney(sumTotal(resp.data)))
          }).catch(() => {
            setSnackbarType('error');
            setSnackbarMessage('Algo deu errado ao recuperar os itens')
            setSnackbar(true);
          })
      }).catch(() => {
        setSnackbarType('error');
        setSnackbarMessage('Algo deu errado ao recuperar os itens')
        setSnackbar(true);
      })

      handleCloseDialog(true);
      
      setName('');
      setClient(0);
      setStore(0);
      setDate(dayjs(Date.now()))
      setValueFinanced('');
      setValueCash('0,00');
      setValueNegotiated('');
      setPaymentMethod(1);
    }

   }

    return(
        <>
        <Dialog open={openDialog} onClose={handleCloseDialog}  fullWidth>
        <DialogTitle>Criar novo pedido</DialogTitle>
        <DialogContent>           
          <TextField
            error={nameError}
            value={name}
            autoFocus
            margin="dense"
            id="name"
            label="Pedido"
            type="text"
            required={true}
            fullWidth
            variant="standard"
            onChange={(e) => setName(e.target.value.toUpperCase())}
            inputProps={{style: {fontSize: 18}}}
          />
          <SelectWrapper>
          <TextField
          id="outlined-select-store"
          sx={{mt: 1, mr: 1}}
          select
          fullWidth
          error={storeError}
          label="Loja"
          defaultValue={0}
          value={store}
          onChange={(e) => setStore(e.target.value)}
        >
          <MenuItem key={0} value={0} sx={{fontSize: 15}}>
              {'Escolha uma loja'}
            </MenuItem>
          {stores.map((store) => (
            <MenuItem key={store.id} value={store.id} sx={{fontSize: 15}}>
              {store.name}
            </MenuItem>
          ))}
        </TextField>
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
          {clients.map((client) => (
            <MenuItem key={client.id} value={client.id} sx={{fontSize: 15}}>
              {client.name}
            </MenuItem>
          ))}
        </TextField>
        </SelectWrapper>
        <MoneyLabel>Valor à prazo:</MoneyLabel>
        <MoneyInput
            id="input-financed"
            name="input-financed"
            warning={financedError}
            placeholder="R$ 0,00"
            value={valueFinanced}
            intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
            decimalScale={2}
            onValueChange={(value, name) => {setValueFinanced(value); setValueCash(applyDiscount(value, [0.15, 0.025]))}}
        />
        <MoneyLabel>Valor à vista:</MoneyLabel>
        <MoneyInput
            id="input-cash"
            disabled
            name="input-cash"
            placeholder="Valor à prazo"
            value={valueCash}
            intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
            decimalScale={2}
        />
        <MoneyLabel>Valor negociado(opcional):</MoneyLabel>
        <MoneyInput
            id="input-negotiated"
            name="input-negotiated"
            placeholder='R$ 0,00'
            warning={negotiatedError}
            value={valueNegotiated}
            intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
            decimalScale={2}
            onValueChange={(value, name) => setValueNegotiated(value)}
        />
        <TextField
          id="outlined-select-payment"
          sx={{mt: 1}}
          select
          fullWidth
          label="Método de pagamento"
          value={paymentMethod}
          defaultValue={1}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <MenuItem value={1} sx={{fontSize: 15}}>
            {'À prazo'}
          </MenuItem>
          <MenuItem value={2} sx={{fontSize: 15}}>
            {'À vista'}
          </MenuItem>
          <MenuItem value={3} sx={{fontSize: 15}}>
            {'Negociado'}
          </MenuItem>
        </TextField>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateWrapper>
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
          </DateWrapper>
          </LocalizationProvider> 
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit}>Registrar</Button>
        </DialogActions>
      </Dialog>
      <GenericSnackbar snackbar={snackbar} setSnackbar={setSnackbar} type={snackbarType} message={snackbarMessage} />
      </>
    );
}

const DateWrapper = styled.div`
  margin-top: 10px;
 `

const SelectWrapper = styled.div`
    display: flex;
` 

const MoneyLabel = styled.p`
    font-family: 'Roboto', sans-serif;
    font-size: 0.7rem;
    margin-top: 8px;
    color: #6F6767;
`
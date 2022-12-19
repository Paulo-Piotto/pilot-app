import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { employeeValidation } from '../../services/validationServices/employeesValidation';
import styled from 'styled-components';
import RegisterSnackbar from '../generics/registerSnackbar';
import { registerEmployee } from '../../services/api.services';
import { getAllEmployees } from '../../services/api.services';
import dayjs from 'dayjs';
import { MoneyInput } from '../../styles/moneyInputStyles';

export default function RegisterEmployeeDialog({openDialog, handleCloseDialog, setEmployees, setAbsoluteEmployees}){

    const [name, setName] = useState('');
    const [wageValue, setWageValue] = useState('0,00');
    const [startDate, setStartDate] = useState(dayjs(Date.now()).toISOString());
    const [nameHelper, setNameHelper] = useState('');
    const [dateHelper, setDateHelper] = useState('');
    const [nameError, setNameError] = useState(false);
    const [snackbar, setSnackbar] = useState(false)

   function handleSubmit(e){
    e.preventDefault();

    const errorObject = employeeValidation({name, wageValue, startDate});

    if(errorObject){
        setNameError(errorObject.name.error);
        setNameHelper(errorObject.name.helper);
        setDateHelper(errorObject.startDate.helper);
    }else{
        
        const wage = Number(wageValue.replace(',','.')*100)
        registerEmployee({name, wage, startDate})
            .then(() => {
                setSnackbar(true);
                handleCloseDialog();
                setName('');
                setWageValue(Number(0).toFixed(2))
                setStartDate('')
                getAllEmployees()
                    .then((resp) => {
                        setEmployees(resp.data);
                        setAbsoluteEmployees(resp.data.length)

                    })
            })
            .catch(() => {
                alert('algo deu errado')
            })
        
    }
   }

    return(
        <>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Registrar Funcionário</DialogTitle>
        <DialogContent>           
          <TextField
            error={nameError}
            value={name}
            autoFocus
            margin="dense"
            id="name"
            label="Nome do funcionário"
            type="text"
            required={true}
            fullWidth
            variant="standard"
            helperText={nameHelper}
            onChange={(e) => setName(e.target.value)}
          />
          <MoneyInput
            id="input-example"
            name="input-name"
            placeholder="Salário base do Funcionário"
            value={wageValue}
            intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
            decimalScale={2}
            onValueChange={(value, name) => setWageValue(value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateWrapper>
          <DesktopDatePicker
            value={startDate}
            autoFocus
            margin="dense"
            label='Data de ínicio'
            id="date"
            inputFormat='DD/MM/YYYY'
            type="date"
            required={true}
            variant="standard"
            onChange={(e) => setStartDate(e.toISOString())}
            renderInput={(params) => <TextField {...params} helperText={dateHelper} sx={{mt: 2}} />}
          />
          </DateWrapper>
          </LocalizationProvider>    
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit}>Registrar</Button>
        </DialogActions>
      </Dialog>
      <RegisterSnackbar snackbar={snackbar} setSnackbar={setSnackbar} type={'success'} />
      </>
    );
}

const DateWrapper = styled.div`
  margin-top: 10px;
 `  
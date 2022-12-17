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

export default function RegisterEmployeeDialog({openDialog, handleCloseDialog, setEmployees, setAbsoluteEmployees}){

    const [name, setName] = useState('');
    const [wageValue, setWageValue] = useState(Number(0).toFixed(2));
    const [startDate, setStartDate] = useState(dayjs(Date.now()));
    const [nameHelper, setNameHelper] = useState('');
    const [wageHelper, setWageHelper] = useState('');
    const [dateHelper, setDateHelper] = useState('');
    const [nameError, setNameError] = useState(false);
    const [wageError, setWageError] = useState(false);
    const [snackbar, setSnackbar] = useState(false)

   function handleSubmit(e){
    e.preventDefault();
    const errorObject = employeeValidation({name, wageValue, startDate});

    if(errorObject){
        setNameError(errorObject.name.error);
        setNameHelper(errorObject.name.helper);
        setWageError(errorObject.wage.error);
        setWageHelper(errorObject.wage.helper);
        setDateHelper(errorObject.startDate.helper);
    }else{
        let wage = Number(wageValue).toFixed(0)*100
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
        <form onSubmit={handleSubmit} noValidate>
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
          <TextField
            error={wageError}
            value={wageValue}
            autoFocus
            margin="dense"
            id="wage"
            label="Salário base"
            type="number"
            required={true}
            fullWidth
            variant="standard"
            helperText={wageHelper}
            onChange={(e) => e.target.value >= 0 ? setWageValue(Number(e.target.value).toFixed(2)): setWageValue(Number(e.target.value * (-1)).toFixed(2))}
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
          <Button type='submit'>Registrar</Button>
        </DialogActions>
        </form>
      </Dialog>
      <RegisterSnackbar snackbar={snackbar} setSnackbar={setSnackbar} type={'success'} />
      </>
    );
}

const DateWrapper = styled.div`
    margin-top: 10px;
 `
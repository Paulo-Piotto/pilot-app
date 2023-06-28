import { useState, useEffect, useContext } from 'react';
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
import { FoodControlService, EmployeesService } from '../../services/api.services';
import { sumTotal } from '../../services/utils/sumTotal';
import { floorDateHour, ceilDateHour } from '../../services/utils/dateServices';
import AuthContext from '../context/AuthContext';

export default function FilterLunchboxesDialog({openDialog, handleCloseDialog, setItems, setTotal, setLoading, setSnackbar, setSnackbarType, setSnackbarMessage}) {
    const todayMinus30 = Date.now() - 86400000*30
    const [from, setFrom] = useState(dayjs(todayMinus30));
    const [to, setTo] = useState(dayjs(Date.now()));
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(0);
    const { userData } = useContext(AuthContext);

    useEffect(() => {
        setLoading(true);
        EmployeesService.getAllEmployees()
        .then((resp) => {
          setEmployees(resp.data)
          setLoading(false);
        })
        .catch(() => {
            setSnackbarMessage('Ocorreu um erro ao tentar recuperar os funcionários');
            setSnackbarType('error');
            setSnackbar(true);
            setLoading(false);
        })
    }, [setLoading, setSnackbar, setSnackbarMessage, setSnackbarType]);

    function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        let filterString;
        selectedEmployee ? filterString = `from=${floorDateHour(from)}&to=${ceilDateHour(to)}&employee=${selectedEmployee}` : filterString = `from=${floorDateHour(from)}&to=${ceilDateHour(to)}`;                 
    
        FoodControlService.getFoodOrders(filterString, userData.token)
          .then((resp) => {
            setLoading(false)
            setItems(resp.data);
            setTotal(sumTotal(resp.data))
            handleCloseDialog();
          })
          .catch(() => {
            setSnackbarMessage('Ocorreu um erro ao tentar filtrar os pedidos');
            setSnackbarType('error');
            setSnackbar(true);
            setItems([])
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
            value={from}
            autoFocus
            margin="dense"
            label='De:'
            id="date"
            inputFormat='DD/MM/YYYY'
            type="date"
            required={true}
            variant="standard"
            onChange={(e) => setFrom(e)}
            renderInput={(params) => <TextField {...params}  margin='dense' />}
          />
          <DesktopDatePicker
            value={to}
            autoFocus
            margin="dense"
            label='Até:'
            id="date"
            inputFormat='DD/MM/YYYY'
            type="date"
            required={true}
            variant="standard"
            onChange={(e) => setTo(e)}
            renderInput={(params) => <TextField {...params} sx={{ ml: 1}} margin='dense' />}
          />
          </DateContainer>
          </LocalizationProvider>
        <TextField
          id="outlined-select-employee"
          sx={{ mt: 1}}
          select
          fullWidth
          label="Funcionário"
          defaultValue={0}
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
        >
          <MenuItem key={0} value={0}>
              {'Todos'}
            </MenuItem>
          {employees.map((employee) => (
            <MenuItem key={employee.id} value={employee.name}>
              {employee.name}
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

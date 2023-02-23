import { Button, Dialog, DialogActions, DialogTitle, DialogContent } from '@mui/material';
import { PunchCardService } from '../../services/api.services';
import dayjs from 'dayjs';
import { getWeekDayNameBasedOnInt } from './helpers';
import { DialogContentText } from '@material-ui/core';

export default function WorkDayDialog({ openDialog, handleCloseDialog, workDayData, employeeData }) {
    const isPresence = workDayData.id
    const parsedDate = dayjs(workDayData.date).format("DD/MM/YYYY")
    const weekDay = getWeekDayNameBasedOnInt(dayjs(workDayData.date).day())

    function handleUpdateWorkDay() {
        
    }

    return (
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth='sm' fullWidth={true}>
            <DialogTitle>Cuidado!</DialogTitle>

            <DialogContent>
                <DialogContentText>{`Você está prestes a editar a presença referente ao dia ${parsedDate}, ${weekDay}`}</DialogContentText>
            </DialogContent>

            <DialogContent>
                <DialogContentText>{`Funcionário: ${employeeData.name}`}</DialogContentText>
                <DialogContentText>
                    {`${weekDay}, ${parsedDate}  `}
                </DialogContentText>
                <DialogContentText>
                   { `Status atual:   `}
                    <Button variant="text">{isPresence ? "PRESENÇA" : "FALTA"}</Button>
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleCloseDialog}>Fechar</Button>
                <Button variant='contained' color='warning' onClick={() => {}}>{`Mudar Para ${isPresence ? "FALTA" : "PRESENÇA"}`}</Button>
            </DialogActions>
        </Dialog>
    )
}
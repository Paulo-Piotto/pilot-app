import { Button, Dialog, DialogActions, DialogTitle, DialogContent } from '@mui/material';
import { PunchCardService, ClientsService } from '../../services/api.services';
import dayjs from 'dayjs';
import { getWeekDayNameBasedOnInt } from './helpers';
import { DialogContentText } from '@material-ui/core';
import AuthContext from '../context/AuthContext';
import PunchCardContext from '../context/PunchCardContext';
import { useContext, useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import LogoLoadingSpinner from '../generics/logoLoadingSpinner';
import { WorkDayDialogLoadingContainer } from "./styles"

export default function WorkDayDialog({ openDialog, closeDialog, initialWorkDayData, employeeData }) {
    const { userData } = useContext(AuthContext)
    const { callSnackBar, refreshPunchCardData } = useContext(PunchCardContext)
    const [ isLoading, setIsLoading ] = useState(true)
    const [ mode, setMode ] = useState("preview")
    const [ workDayData, setWorkDayData ] = useState({
        ...initialWorkDayData,
        isPresence: initialWorkDayData.id,
        parsedDate: dayjs(initialWorkDayData.date).format("DD/MM/YYYY"),
        weekDay: getWeekDayNameBasedOnInt(dayjs(initialWorkDayData.date).day())
    })
    const [ clients, setClients ] = useState({
        options: [],
        selectedId: 0
    })

    useEffect(() => {
        setWorkDayData(prev => ({
            ...prev,
            ...initialWorkDayData,
            isPresence: initialWorkDayData.id,
            parsedDate: dayjs(initialWorkDayData.date).format("DD/MM/YYYY"),
            weekDay: getWeekDayNameBasedOnInt(dayjs(initialWorkDayData.date).day())
        }))
    }, [initialWorkDayData])

    useEffect(() => {
        async function getClientOptions() {
            try {
                const updatedClientOptions = await ClientsService.getAllClients();
    
                setClients(prev => ({
                    ...prev,
                    options: updatedClientOptions.data,
                }))
            } catch (error) {
                console.error("Loading client options failed")
                console.error(error)
                callSnackBar({  message: "Falha ao consultar repositório de clientes", type: "error" })
            }
            setIsLoading(false)
        }

        getClientOptions()
    }, [setClients, callSnackBar])

    useEffect(() => { 
        setMode(prev => {
            if(prev !== "preview") return "preview"
            else return prev
        })
    }, [openDialog])

    async function deletePunch() { await PunchCardService.delete(workDayData.id, userData.token) }

    async function createPunch() {
        await PunchCardService.create({
            clientId: clients.selectedId,
            employeeId: employeeData.id,
            date: workDayData.date
        }, userData.token)
    }

    async function editHandler() {
        setIsLoading(true)

        if(!workDayData.isPresence && !clients.selectedId) {
            callSnackBar({  message: "Atribua uma obra à presença", type: "warning" })
            setIsLoading(false)
            return
        }

        try {
            if(workDayData.isPresence) await deletePunch()
            else await createPunch();

            refreshPunchCardData()
            callSnackBar({ message: "Alterações Salvas!", type: "success" })
        } catch (error) {
            console.error("Error while creating new punch in punchcard")
            console.error(error)
            callSnackBar({  message: "Falha ao editar presença", type: "error" })
        }

        setIsLoading(false)
        handleClose()
    }

    function handleClose() {
        setClients(prev => ({ ...prev, selectedId: 0 }))
        setWorkDayData(prev => ({ ...prev, clients: undefined }))
        closeDialog()
    }

    return (
        <Dialog open={openDialog} onClose={handleClose} maxWidth='sm' fullWidth={true}>
            <DialogTitle>Cuidado!</DialogTitle>

            <DialogContent>
                <DialogContentText>{`Você está prestes a editar a presença referente ao dia ${workDayData.parsedDate}, ${workDayData.weekDay}`}</DialogContentText>
            </DialogContent>

            <DialogContent>
                <DialogContentText>{`Funcionário: ${employeeData.name}`}</DialogContentText>
                <DialogContentText>
                    {`${workDayData.weekDay}, ${workDayData.parsedDate}  `}
                </DialogContentText>

                <DialogContentText>
                   { `Status atual:   `}
                    <Button variant="text">{(workDayData.isPresence && mode==="preview") || (!workDayData.isPresence && mode==="edit") ? "PRESENÇA" : "FALTA"}</Button>
                </DialogContentText>

                <FormControl fullWidth>
                    <InputLabel id="client_options">Obra</InputLabel>
                    <Select
                        id="outlined-select-client"
                        labelId="client_options"
                        disabled={mode === "preview" || !!workDayData.isPresence}
                        value={mode === "preview" ? clients.options.find(client => client.id === workDayData.clients?.id)?.id ?? "" : clients.selectedId}
                        label="Obra"
                        error={!clients.selectedId}
                        onChange={e => setClients(prev => ({...prev, selectedId: e.target.value}))}
                    >{
                        clients.options.map(client => <MenuItem key={client.id} value={client.id}>{client.name}</MenuItem>)
                    }</Select>
                </FormControl>
            </DialogContent>

            <DialogActions>
                {
                    isLoading
                    ? <WorkDayDialogLoadingContainer><LogoLoadingSpinner width="60px" height="60px" /></WorkDayDialogLoadingContainer>
                    : <>
                        <Button onClick={handleClose}>{mode === "edit" ? "Cancelar" : "Fechar"}</Button>
                        <Button variant='contained' 
                                color='warning' 
                                onClick={ mode === "preview" ? () => setMode("edit") : editHandler }
                        >

                            { mode === "preview"
                                ? `Mudar Para ${workDayData.isPresence ? "FALTA" : "PRESENÇA"}`
                                : "Salvar"
                            }
                        </Button>
                    </>
                }
            </DialogActions>
        </Dialog>
    )
}
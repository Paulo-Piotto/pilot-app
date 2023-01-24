import { AccordionContainer } from "./styles"
import { AiTwotoneEdit, AiFillCloseCircle } from "react-icons/ai";
import { MdOutlineDownloadDone } from "react-icons/md"
import { useState, useContext } from "react";
import LoadingSpinner from "../generics/loadingSpinner";
import { UsersService } from "../../../../services/api.services";
import ControlPanelContext from "../../../context/ControlPanelContext";
import { objectHasBeenChanged } from "../../../../services/utils";
import GenericSnackbar from "../../../generics/genericSnackbar";

export default function UserEditor({ userData }) {
    const iconStyle = { scale: "1.5" }
    const { name, email } = userData
    const { editorToken } = useContext(ControlPanelContext)
    const [ updatedUserData, setUpdatedUserData ] = useState({...userData})
    const [ componentState, setComponentState ] = useState({
        isLoading: false,
        isClicked: false,
        error: null
    })

    function updateUpdatedUserData(key, value) {
        setUpdatedUserData(prev => ({
            ...prev,
            [key]: value
        }))
    }
    function updateComponentState(key, value) {
        setComponentState(prev => ({
            ...prev,
            [key]: value
        }))
    }
    function toggle() { setComponentState(prev => ({...prev, isClicked: !prev.isClicked})) }
    async function submitUpdatedData() {
        updateComponentState("isLoading", true)
        try {
            if(objectHasBeenChanged(userData, updatedUserData)) {
                const updatedData = await UsersService.updateUser({ ...updatedUserData, id: userData.id }, editorToken)
                setUpdatedUserData(updatedData.data)
            }
        } catch(error) {
            console.error(error)
            updateComponentState("error", error.response?.data ?? "Falha ao se comunicar com servidor")
            setUpdatedUserData({ ...userData }) // return to initial values
        }
        updateComponentState("isLoading", false)
    }
    
    function resetUpdatedUserData() { setUpdatedUserData({ ...userData }) }

    return (
        <AccordionContainer>
            <main>
                <label>Nome: </label>
                <input placeholder={name}
                       disabled={!componentState.isClicked}
                       onChange={e => updateUpdatedUserData("name", e.target.value)}
                       value={updatedUserData.name}
                />

                <label>Email: </label>
                <input placeholder={email}
                       disabled={!componentState.isClicked}
                       onChange={e => updateUpdatedUserData("email", e.target.value)}
                       value={updatedUserData.email}
                />

                <label>Cargo: </label>
                <select name="roles"
                        disabled={!componentState.isClicked}
                        onChange={e => updateUpdatedUserData("role", e.target.value)}
                        value={updatedUserData.role}
                >
                    <option value="basic">Basic</option>
                    <option value="admin">Admin</option>
                    <option value="root">Root</option>
                </select>
            </main>
            
            <div>{
                componentState.isClicked
                    ? <><AiFillCloseCircle onClick={() => {resetUpdatedUserData();toggle()}} style={iconStyle} color="#e72a2a"/><MdOutlineDownloadDone style={iconStyle} color="#06bb03" onClick={() => {submitUpdatedData(); toggle()}}/></>
                    : componentState.isLoading
                        ? <LoadingSpinner />
                        : <AiTwotoneEdit style={iconStyle} onClick={toggle}/>
            }</div>
            <GenericSnackbar 
                snackbar={!!componentState.error}
                setSnackbar={value => { updateComponentState("error", value) }}
                type="error"
                message={componentState.error}
            />
        </AccordionContainer>
    )
}
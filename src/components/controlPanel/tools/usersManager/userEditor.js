import { AccordionContainer } from "./styles"
import { AiTwotoneEdit, AiFillCloseCircle } from "react-icons/ai";
import { MdOutlineDownloadDone } from "react-icons/md"
import { useState, useContext } from "react";
import LoadingSpinner from "../generics/loadingSpinner";
import { UsersService } from "../../../../services/api.services";
import ControlPanelContext from "../../../context/ControlPanelContext";
import { objectHasBeenChanged } from "../../../../services/utils";

export default function UserEditor({ userData }) {
    const iconStyle = { scale: "1.5" }
    const { name, email } = userData
    const { editorToken } = useContext(ControlPanelContext)
    const [ isCLicked, setIsClicked ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ updatedUserData, setUpdatedUserData ] = useState({...userData})

    function updateUpdatedUserData(key, value) {
        setUpdatedUserData(prev => ({
            ...prev,
            [key]: value
        }))
    }
    function toggle() { setIsClicked(prev => !prev) }
    async function submitUpdatedData() {
        setIsLoading(true)
        try {
            if(objectHasBeenChanged(userData, updatedUserData)) {
                const updatedData = await UsersService.updateUser({ ...updatedUserData, id: userData.id }, editorToken)
                setUpdatedUserData(updatedData.data)
            }
        } catch(error) {
            console.error(error)
        }
        setIsLoading(false)
    }
    
    function resetUpdatedUserData() { setUpdatedUserData({ ...userData }) }

    return (
        <AccordionContainer>
            <main>
                <label>Nome: </label>
                <input placeholder={name}
                       disabled={!isCLicked}
                       onChange={e => updateUpdatedUserData("name", e.target.value)}
                       value={updatedUserData.name}
                />

                <label>Email: </label>
                <input placeholder={email}
                       disabled={!isCLicked}
                       onChange={e => updateUpdatedUserData("email", e.target.value)}
                       value={updatedUserData.email}
                />

                <label>Cargo: </label>
                <select name="roles"
                        disabled={!isCLicked}
                        onChange={e => updateUpdatedUserData("role", e.target.value)}
                        value={updatedUserData.role}
                >
                    <option value="basic">Basic</option>
                    <option value="admin">Admin</option>
                    <option value="root">Root</option>
                </select>
            </main>
            
            <div>{
                isCLicked
                    ? <><AiFillCloseCircle onClick={() => {resetUpdatedUserData();toggle()}} style={iconStyle} color="#e72a2a"/><MdOutlineDownloadDone style={iconStyle} color="#06bb03" onClick={() => {submitUpdatedData(); toggle()}}/></>
                    : isLoading
                        ? <LoadingSpinner />
                        : <AiTwotoneEdit style={iconStyle} onClick={toggle}/>
            }</div>
        </AccordionContainer>
    )
}
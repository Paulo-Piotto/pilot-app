import { useState, useEffect, useContext } from "react";
import { ToolContainer } from "../generics/styles";
import { UsersService } from "../../../../services/api.services";
import UserEditor from "./userEditor";
import ControlPanelContext from "../../../context/ControlPanelContext";

export default function UsersManager() {
    const [ refresh, setRefresh ] = useState(0)
    const [ usersData, setUsersData ] = useState([])
    const { editorToken } = useContext(ControlPanelContext)

    useEffect(() => {
        async function refreshUserData() {
            const refreshedUsersData = await UsersService.getAllUsersData(editorToken);
            setUsersData(refreshedUsersData.data);
        }
        refreshUserData();
    }, [refresh, editorToken])

    return (
        <ToolContainer>
            {
                usersData.map(userData => <UserEditor key={userData.id} userData={userData}/>)
            }
        </ToolContainer>
    )
}
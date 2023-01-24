import { NavigatorContainer, ControlOption } from "./styles"
import dayjs from "dayjs"
import AuthContext from "../context/AuthContext"
import ControlPanelContext from "../context/ControlPanelContext"
import { useContext } from "react"

export default function Navigator() {
    const { userData } = useContext(AuthContext)
    const { controls, currentControl, setCurrentControl } = useContext(ControlPanelContext)

    return (
        <NavigatorContainer>
            <header>
                <h1>{`${userData.name.split(" ")[0]} - ${userData.role}`}</h1>
                <p>{`${dayjs().format("DD/MM/YYYY")}`}</p>
            </header>
            <nav>
                <ul>{
                    controls.map(thisControl => (
                        <ControlOption key={thisControl.displayName} onClick={() => { setCurrentControl(thisControl) }} isSelected={currentControl.displayName === thisControl.displayName}>
                            {`${currentControl.displayName === thisControl.displayName ? "»" : ""} ${thisControl.displayName}`}
                        </ControlOption>
                    ))    
                }</ul>
            </nav>
        </NavigatorContainer>
    )
}
import { ControlPanelSliderContainer } from "./styles"
import FloaterMenu from "./floaterMenu"
import { useState } from "react"
import { useWindowSize } from "../../hooks/generalHooks";
import Navigator from "./navigator";
import UsersManager from "./tools/usersManager";
import { ControlPanelContextProvider } from "../context/ControlPanelContext";

export default function ControlPanel() {
    const [ isActive, setIsActive ] = useState(false);
    const windowSize = useWindowSize();
    const motionVariants = {
        closed: {
            height: 0,
        },
        open: {
            height: (windowSize.height)*0.7,
        }
    }
    

    function toggle() { setIsActive(prevState => !prevState) }

    return (
        <ControlPanelContextProvider>
            <ControlPanelSliderContainer
                variants={motionVariants}
                initial="closed"
                animate={ isActive ? "open" : "closed" }
            >
                <Navigator />
                <UsersManager />

            </ControlPanelSliderContainer>
            <FloaterMenu motionDirection={isActive ? 1 : 0} toggle={toggle} />
        </ControlPanelContextProvider>
    )
}
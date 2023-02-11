import { ControlPanelSliderContainer } from "./styles"
import FloaterMenu from "./floaterMenu"
import { useContext } from "react"
import { useWindowSize } from "../../hooks/generalHooks";
import Navigator from "./navigator";
import AuthContext from "../context/AuthContext";
import Config from "../../pilot-app.config";
import ControlPanelContext from "../context/ControlPanelContext.js";

export default function ControlPanel() {
    const { userData } = useContext(AuthContext)
    const { isControlPanelActive, setIsControlPanelActive, currentControl } = useContext(ControlPanelContext);
    const windowSize = useWindowSize();
    const motionVariants = {
        closed: {
            height: 0,
            opacity: 0
        },
        open: {
            height: (windowSize.height)*0.5,
            opacity: .92
        }
    }
    
    function toggle() { setIsControlPanelActive(prevState => !prevState) }

    if(Config.rolesLevel[userData.role] < Config.rolesLevel.root) return;
    return (
        <>
            <ControlPanelSliderContainer
                variants={motionVariants}
                initial="closed"
                animate={ isControlPanelActive ? "open" : "closed" }
                whileHover={isControlPanelActive ? { opacity: 1 } : null}
            >
                <Navigator />
                {currentControl.component}
            </ControlPanelSliderContainer>
            <FloaterMenu motionDirection={isControlPanelActive ? 1 : 0} toggle={toggle} />
        </>
    )
}
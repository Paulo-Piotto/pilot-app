import { ControlPanelSliderContainer } from "./styles"
import FloaterMenu from "./floaterMenu"
import { useContext } from "react"
import { useWindowSize } from "../../hooks/generalHooks";
import Navigator from "./navigator";
import ControlPanelContext from "../context/ControlPanelContext.js";

export default function ControlPanel() {
    const { isControlPanelActive, setIsControlPanelActive, currentControl } = useContext(ControlPanelContext);
    const windowSize = useWindowSize();
    const motionVariants = {
        closed: {
            height: 0,
            opacity: 0
        },
        open: {
            height: (windowSize.height)*0.7,
            opacity: .92
        }
    }
    
    function toggle() { setIsControlPanelActive(prevState => !prevState) }

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
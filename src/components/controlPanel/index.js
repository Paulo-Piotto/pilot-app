import { ControlPanelSliderContainer } from "./styles"
import FloaterMenu from "./floaterMenu"
import { useState } from "react"
import { useWindowSize } from "../../hooks/generalHooks";
import Navigator from "./navigator";
import { ControlPanelContextProvider } from "../context/ControlPanelContext";
import controls from "./controls";

export default function ControlPanel() {
    const [ isActive, setIsActive ] = useState(false);
    const [ currentControlComponent, setCurrentControlComponent ] = useState(controls[0].component)
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
                <Navigator>
                    {controls.map(control => (
                        <li key={control.displayName} onClick={() => { setCurrentControlComponent(control.component) }}>{control.displayName}</li>
                    ))}
                </Navigator>
                {currentControlComponent ? currentControlComponent : <p>oi</p>}
            </ControlPanelSliderContainer>
            <FloaterMenu motionDirection={isActive ? 1 : 0} toggle={toggle} />
        </ControlPanelContextProvider>
    )
}
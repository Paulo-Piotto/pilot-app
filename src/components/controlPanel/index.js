import { ControlPanelSliderContainer } from "./styles"
import FloaterMenu from "./floaterMenu"
import { useState, useContext } from "react"
import { useWindowSize } from "../../hooks/generalHooks";
import Navigator from "./navigator";
import controls from "./controls";
import ControlPanelContext from "../context/ControlPanelContext.js";

export default function ControlPanel() {
    const { isControlPanelActive, setIsControlPanelActive } = useContext(ControlPanelContext);
    const [ currentControlComponent, setCurrentControlComponent ] = useState(controls[0].component)
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
                <Navigator>{
                    controls.map(control => (
                        <li key={control.displayName} onClick={() => { setCurrentControlComponent(control.component) }}>{control.displayName}</li>
                    ))
                }</Navigator>
                {currentControlComponent}
            </ControlPanelSliderContainer>
            <FloaterMenu motionDirection={isControlPanelActive ? 1 : 0} toggle={toggle} />
        </>
    )
}
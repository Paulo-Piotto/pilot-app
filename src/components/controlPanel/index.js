import { ControlPanelSliderContainer } from "./styles"
import FloaterMenu from "./floaterMenu"
import { useState } from "react"
import { useWindowSize } from "../../hooks/generalHooks";

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
        <>
            <ControlPanelSliderContainer
                variants={motionVariants}
                initial="closed"
                animate={ isActive ? "open" : "closed" }
            >
            </ControlPanelSliderContainer>
            <FloaterMenu motionDirection={isActive ? 1 : 0} toggle={toggle} />
        </>
    )
}
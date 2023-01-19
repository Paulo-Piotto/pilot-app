import { FloaterMenuContainer } from "./styles"
import Lottie from "lottie-react";
import menuAnimation from "../../assets/hamburger_menu_white.json";
import { useEffect, useRef, useState } from "react";

export default function FloaterMenu({ motionDirection, toggle }) {
    const [ wasClicked, setWasClicked ] = useState(false)
    const lottieRef = useRef();

    function updateClickState() {
        setWasClicked(true)
        toggle()
    }

    useEffect(() => {
        lottieRef.current.setSpeed(1.6)
        const segment = motionDirection ? [0,28] : [28,0]
        if(wasClicked) {
            lottieRef.current.playSegments(segment)
        }
    })

    return (
        <FloaterMenuContainer onClick={updateClickState}>
            <Lottie 
                animationData={menuAnimation}
                lottieRef={lottieRef}
                loop={false}
                autoplay={false}
                initialSegment={[1,2]}
            />
        </FloaterMenuContainer>
    )
}
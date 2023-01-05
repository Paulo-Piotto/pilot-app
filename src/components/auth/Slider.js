import * as sc from "./styles";
import { useLayoutEffect, useState } from "react";

export default function Slider({ igniteMotion, side }) {
    const [ animationBoundarie, setAnimationBoundarie ] = useState(0);

    useLayoutEffect(() => {
        console.log("layout effect")
        const trackContainerWidht = 0.8 * window.innerWidth;
        setAnimationBoundarie(trackContainerWidht/2);
    }, [ window.innerWidth ])

    const variants = {
        left: {
            x: 0,
        },
        right: {
            x: animationBoundarie
        }
    }

    return (
        <sc.SliderContainer
            variants={variants}
            initial={side}
            animate={side}
            transition={{
                type: "spring",
                stiffness: 250,
                damping: 30,
                duration: .1
            }}
        >
            <sc.SliderButton onClick={igniteMotion}>Deslizar</sc.SliderButton>
        </sc.SliderContainer>
    )
}
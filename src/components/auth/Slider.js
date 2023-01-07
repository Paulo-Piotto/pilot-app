import * as sc from "./styles";
import { useLayoutEffect, useState } from "react";
import { Logo } from "../../styles/generalStyles";

export default function Slider({ igniteMotion, side }) {
    const [ animationBoundarie, setAnimationBoundarie ] = useState(0);

    useLayoutEffect(() => {
        const trackContainerWidht = 0.8 * window.innerWidth;
        setAnimationBoundarie(trackContainerWidht/2);
    }, [ window.innerWidth ]) // this dependencie is crucial to animation adaptability through window resize

    const variants = {
        left: { x: 20 },
        right: { x: animationBoundarie-20 }
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
            <Logo src={"./assets/piotto-logo.png"} />
            <sc.SliderButton onClick={igniteMotion}>Deslizar</sc.SliderButton>
        </sc.SliderContainer>
    )
}
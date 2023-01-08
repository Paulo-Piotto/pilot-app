import * as sc from "./styles";
import { Logo } from "../../styles/generalStyles";
import useWindowSize from "../../hooks/useWindowSize";


export default function Slider({ igniteMotion, side }) {
    const animationBoundarie = (useWindowSize()*0.8)/2;

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
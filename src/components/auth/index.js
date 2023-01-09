import { useState } from "react";
import * as sc from "./styles";
import Slider from "./Slider";
import Login from "./Login";
import Register from "./Register";

export default function Auth() {
    const [ side, setSide ] = useState("left");

    function igniteMotion() {
        setSide(prevState => prevState === "left" ? "right" : "left")
    }

    return (
        <sc.Background>
            <sc.TrackContainer>
                <Slider igniteMotion={igniteMotion} side={side} />
                <Register side={side} />
                <Login side={side} />
            </sc.TrackContainer>
        </sc.Background>
    )
}


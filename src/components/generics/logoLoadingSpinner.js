import { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function Loader({image, speed, spins, width, height}){
    const [degree, setDegree] = useState(0);

    useEffect(() => {
        let degreeHandler=0;
        const maxDegree = spins ? 360*spins : 360;
        const spinningSpeed = speed ? speed : 500;

        const interval = setInterval(() => {
            if(degreeHandler===maxDegree){
                degreeHandler=0;
            }
            else{
                degreeHandler=degreeHandler+90;
            }
            setDegree(degreeHandler);
        }, spinningSpeed);  

        return () => clearInterval(interval);
    }, [speed, spins])
 
    
    return(
        <SpinningLeafsImageStyle degree={degree} src={image} width={width} height={height} />
    );    
}

const SpinningLeafsImageStyle = styled.img`
    width: ${props => props.width ? props.width : "50%"};
    height: ${props => props.height ? props.height : "50vw"};
    transform: ${props => `rotate(${props.degree}deg)`};
    transition: ease 500ms;
    z-index: 125;
`;
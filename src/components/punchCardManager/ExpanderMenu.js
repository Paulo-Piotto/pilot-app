import { ExpanderMenuContainer } from "./styles"
import Expander from "./Expander"
import { useEffect, useRef, useState, useContext, useCallback } from "react"
import PunchCardContext from "../context/PunchCardContext";
import EmployeeRecord from "./EmployeeRecord";
import LogoLoadingSpinner from "../generics/logoLoadingSpinner";
import piottoWhiteLogo from "../../assets/pilot-white.png";
import MassEditor from "./MassEditor";

export default function ExpanderMenu() {
    const expanderMenuRef = useRef();
    const { punchCardData, searchFilters, loadingInitialData } = useContext(PunchCardContext)
    const [ animationData, setAnimationData ] = useState({
        containerSize: {
            width: null,
            height: null
        },
        currentSelectedId: 0,
    })

    const handleExpanderSelection = useCallback((expanderId) => {
        setAnimationData(prev => {
            if(prev.currentSelectedId !== expanderId) return { ...prev, currentSelectedId: expanderId }
            return { ...prev } 
        })
    }, [])

    useEffect(() => {
        const timeoutId = setTimeout(() => { handleExpanderSelection(0) }, 100) //otherwise will trigger state change while animating, witch causes glitch
        return () => { clearTimeout(timeoutId) }
    }, [searchFilters.client, handleExpanderSelection])

    useEffect(() => {
        function calculateComponentSize() {
            if(expanderMenuRef.current) setAnimationData(prev => ({
                ...prev,
                containerSize: {
                    width: expanderMenuRef.current.offsetWidth,
                    height: expanderMenuRef.current.offsetHeight
                }
            }))
        }
        calculateComponentSize()

        window.addEventListener("resize", calculateComponentSize)

        return () => { window.removeEventListener("resize", calculateComponentSize) }
    }, [expanderMenuRef])

    return (
        <ExpanderMenuContainer ref={expanderMenuRef} layout>
            <Expander
                animationData={animationData}
                thisId={0}
                handleExpanderSelection={handleExpanderSelection}
                backgroundColor="#3f4a5c"
                title="Funcionários"
            >{
                loadingInitialData
                ? <LogoLoadingSpinner image={piottoWhiteLogo} width="70px" height="70px" />
                : punchCardData.byEmployees.length
                    ? <MassEditor toggleExpander={() => setAnimationData(prev => ({ ...prev, currentSelectedId: 1 }))}/>
                    : <p style={{color: "#d79318"}}>Ainda não há funcionários cadastrados que obedeçam aos filtros aplicados</p>
            }</Expander>

            <Expander 
                animationData={animationData}
                thisId={1}
                handleExpanderSelection={handleExpanderSelection}
                backgroundColor="#eaeaea"
                textColor="#131E29"
                title="Ficha Pessoal"
            >
                <EmployeeRecord />
            </Expander>
        </ExpanderMenuContainer>
    )
}
import { ExpanderMenuContainer } from "./styles"
import Expander from "./Expander"
import { useEffect, useRef, useState, useContext } from "react"
import PunchCardContext from "../context/PunchCardContext";
import EmployeeCard from "./EmployeeCard";
import EmployeeRecord from "./EmployeeRecord";
import { useCallback } from "react";

export default function ExpanderMenu() {
    const expanderMenuRef = useRef();
    const { punchCardData, searchFilters } = useContext(PunchCardContext)
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
                backgroundColor="#A2A9AD"
                title="Funcionários"
            >{
                punchCardData.byEmployees
                    .map(byEmployee => <EmployeeCard key={byEmployee.id}
                                                     employeeData={byEmployee}
                                                     toggleExpander={() => setAnimationData(prev => ({ ...prev, currentSelectedId: 1 }))}/>)
            }</Expander>

            <Expander 
                animationData={animationData}
                thisId={1}
                handleExpanderSelection={handleExpanderSelection}
                backgroundColor="#eaeaea"
                title="Ficha Pessoal"
            >
                <EmployeeRecord />
            </Expander>
        </ExpanderMenuContainer>
    )
}
import { ExpanderMenuContainer } from "./styles"
import Expander from "./Expander"
import { useEffect, useRef, useState, useContext } from "react"
import PunchCardContext from "../context/PunchCardContext";
import EmployeeCard from "./EmployeeCard";
import EmployeeRecord from "./EmployeeRecord";

export default function ExpanderMenu() {
    const expanderMenuRef = useRef();
    const { punchCardData } = useContext(PunchCardContext)
    const [ animationData, setAnimationData ] = useState({
        containerSize: {
            width: null,
            height: null
        },
        currentSelectedId: 0,
    })

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

    function handleExpanderSelection(expanderId) {
        if(expanderId !== animationData.currentSelectedId) setAnimationData(prev => ({
            ...prev,
            currentSelectedId: expanderId
        }))
    }

    return (
        <ExpanderMenuContainer ref={expanderMenuRef} layout>
            <Expander 
                animationData={animationData}
                thisId={0}
                handleExpanderSelection={handleExpanderSelection}
            >{
                punchCardData.byEmployees.map(byEmployee => <EmployeeCard 
                                                                key={byEmployee.id}
                                                                employeeData={byEmployee}
                                                                toggleExpander={() => setAnimationData(prev => ({ ...prev, currentSelectedId: 1 }))}/>)
            }</Expander>

            <Expander 
                animationData={animationData}
                thisId={1}
                handleExpanderSelection={handleExpanderSelection}
            >
                <EmployeeRecord />
            </Expander>
        </ExpanderMenuContainer>
    )
}
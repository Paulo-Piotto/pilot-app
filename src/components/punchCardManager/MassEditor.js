import { useContext, useState } from "react"
import PunchCardContext from "../context/PunchCardContext"
import EmployeeCard from "./EmployeeCard"
import { MassEditorContainer } from "./styles"
import MassActions from "./MassActions"

export default function MassEditor({ toggleExpander }) {
    const { punchCardData } = useContext(PunchCardContext)
    const [ allSelected, setAllSelected ] = useState(false);


    return (
        <MassEditorContainer>

            <MassActions onClick={() => console.log("batatinha")} />

            {
                punchCardData.byEmployees.map(byEmployee => (
                    <EmployeeCard key={byEmployee.id} employeeData={byEmployee} toggleExpander={toggleExpander}/>
                ))
            }
        </MassEditorContainer>

    )
}
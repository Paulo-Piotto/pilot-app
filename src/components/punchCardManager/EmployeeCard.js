import { useContext, useEffect, useState } from "react"
import PunchCardContext from "../context/PunchCardContext"
import MassActionContext from "../context/MassEditorContext"
import { EmployeeCardContainer } from "./styles"
import PunchCardPreview from "./PunchCardPreview"
import ContactPageIcon from '@mui/icons-material/ContactPage';

export default function EmployeeCard({ employeeData, toggleExpander }) {
    const { clientOptions, setPunchCardData } = useContext(PunchCardContext)
    const { massActionConfig, handleEmployeeUniqueSelection, allSelected } = useContext(MassActionContext)
    const [ isSelected, setIsSelected ] = useState(!!massActionConfig.selectedEmployeesIds.find(id => id === employeeData.id));

    useEffect(() => { setIsSelected(allSelected) }, [allSelected])
    useEffect(() => {
        setIsSelected(!!massActionConfig.selectedEmployeesIds.find(id => id === employeeData.id))
    }, [massActionConfig.selectedEmployeesIds, employeeData.id])

    return (
        <EmployeeCardContainer
            isSelected={isSelected}
            onClick={() => {
                handleEmployeeUniqueSelection(!isSelected, employeeData.id)
            }}
        >
            <p className="employee_name">{`${employeeData.name}`}</p>
            <section id="punch_card_preview">
                <PunchCardPreview previewSize={5} workedDaysData={employeeData["employees_worked_days"]} />
            </section>
            
            <section id="icons_container">
                {
                    isSelected
                    ? <p className="selected_client_name">{clientOptions.find(client => client.id === Number(massActionConfig.clientId))?.name ?? "Selecione uma obra"}</p>
                    : <ContactPageIcon 
                        onClick={e => {
                            e.stopPropagation()
                            setPunchCardData(prev => ({
                                ...prev,
                                selectedEmployee: employeeData
                            }))
                            toggleExpander();
                        }}/>
                }
            </section>
        </EmployeeCardContainer>  
    )
}

/* {
    "id": 2,
    "name": "michel",
    "wage": 1250,
    "start_day": "2023-02-13T12:32:39.288Z",
    "employees_worked_days": [
        {
            "id": 2,
            "date": "2023-02-13T17:11:02.024Z",
            "clients": {
                "id": 2,
                "name": "Museu Nacional"
            }
        },
        {
            "id": 4,
            "date": "2023-02-13T17:12:07.409Z",
            "clients": {
                "id": 2,
                "name": "Museu Nacional"
            }
        },
        {
            "id": 6,
            "date": "2023-02-14T16:10:54.558Z",
            "clients": {
                "id": 2,
                "name": "Museu Nacional"
            }
        }
    ]
}
] */
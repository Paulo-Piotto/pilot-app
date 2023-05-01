import { useContext, useEffect, useState } from "react"
import PunchCardContext from "../context/PunchCardContext"
import { EmployeeCardContainer } from "./styles"
import PunchCardPreview from "./PunchCardPreview"
import ContactPageIcon from '@mui/icons-material/ContactPage';

export default function EmployeeCard({ employeeData, toggleExpander, notifySelection, allSelected }) {
    const { setPunchCardData, punchCardData } = useContext(PunchCardContext)
    const [ isSelected, setIsSelected ] = useState(false);

    useEffect(() => { setIsSelected(allSelected) }, [allSelected])

    return (
        <EmployeeCardContainer
            isSelected={isSelected}
            onClick={() => {
                notifySelection(!isSelected, employeeData.id)
                setIsSelected(prev => !prev)
            }}
        >
            <p className="employee_name">{`${employeeData.name}`}</p>
            <section id="punch_card_preview">
                <PunchCardPreview previewSize={5} workedDaysData={employeeData["employees_worked_days"]} />
            </section>
            
            <section 
                id="icons_container"
                onClick={e => {
                    e.stopPropagation()
                    setPunchCardData(prev => ({
                        ...prev,
                        selectedEmployee: employeeData
                    }))
                    toggleExpander();
                }}
            >
                {
                    isSelected
                    ? <p>obra tal</p>
                    : <ContactPageIcon />
                }
            </section>
            {/* <p className="employee_detail">{`- Cadastrado em ${dayjs(employeeData.start_day).format("DD/MM/YYYY")}`}</p> */}
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
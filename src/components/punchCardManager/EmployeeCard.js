import { useContext } from "react"
import PunchCardContext from "../context/PunchCardContext"
import { EmployeeCardContainer } from "./styles"
import dayjs from "dayjs"

export default function EmployeeCard({ employeeData, toggleExpander }) {
    const { setPunchCardData } = useContext(PunchCardContext)

    return (
        <EmployeeCardContainer
            onClick={e => {
                e.stopPropagation()
                setPunchCardData(prev => ({
                    ...prev,
                    selectedEmployee: employeeData
                }))
                toggleExpander();
            }}
        >
            <p className="employee_name">{`${employeeData.name}`}</p>
            <p className="employee_detail">{`- Cadastrado em ${dayjs(employeeData.start_day).format("DD/MM/YYYY")}`}</p>
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
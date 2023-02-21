import { useContext } from "react"
import PunchCardContext from "../context/PunchCardContext"

export default function EmployeeCard({ employeeData, toggleExpander }) {
    const { setPunchCardData } = useContext(PunchCardContext)

    return (
        <div
            onClick={e => {
                e.stopPropagation()
                console.log("EMPLOYEE CLICKED")
                setPunchCardData(prev => ({
                    ...prev,
                    selectedEmployee: employeeData
                }))
                toggleExpander();
            }}
        >
            <p>{`Nome: ${employeeData.name}`}</p>
            <p>{`Cadastrado em ${employeeData.start_day}`}</p>
        </div>  
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
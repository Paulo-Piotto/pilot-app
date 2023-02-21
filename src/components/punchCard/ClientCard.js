import { useContext } from "react"
import PunchCardContext from "../context/PunchCardContext"

export default function ClientCard({ clientData }) {
    const { updateSearchFilters } = useContext(PunchCardContext)

    return (
        <div onClick={() => updateSearchFilters("client", clientData.name)}>
            <p>{`Cliente: ${clientData.name}`}</p>
            <p>{`Nº Registros de presença: ${clientData["_count"].employees_worked_days}`}</p>
        </div>
    )
}
import { useContext, useEffect, useState } from "react"
import PunchCardContext from "../context/PunchCardContext"
import { ClientCardContainer } from "./styles"

export default function ClientCard({ clientData }) {
    const { updateSearchFilters, searchFilters } = useContext(PunchCardContext)
    const [ isClicked, setIsClicked ] = useState(searchFilters.client === clientData.name)

    useEffect(() => {
        setIsClicked(searchFilters.client === clientData.name)
    }, [searchFilters, clientData.name])

    function handleClick() {
        if(searchFilters.client !== clientData.name) updateSearchFilters("client", clientData.name)
        else updateSearchFilters("client", null)
    }

    return (
        <ClientCardContainer onClick={handleClick} isClicked={isClicked}>
            <p className="client_name">{`${clientData.name}`}</p>
            <p className="client_detail">{`- Registros de presença: ${clientData["_count"].employees_worked_days}`}</p>
        </ClientCardContainer>
    )
}
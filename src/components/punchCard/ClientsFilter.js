import { PunchCardService } from "../../services/api.services"
import { useEffect, useContext } from "react"
import LoadingSpinner from "../generics/logoLoadingSpinner";
import pilotLoaderLogo from "../../assets/pilot-spinner-logo-black.png";
import PunchCardContext from "../context/PunchCardContext";
import AuthContext from "../context/AuthContext";

export default function ClientsFilter() {
    const { punchCardData, setPunchCardData, setSearchFilters, getQueryStringFilter } = useContext(PunchCardContext);
    const { userData } = useContext(AuthContext)

    useEffect(() => {
        async function fetchPunchCardByClientData() {
            const punchCardByClients = await PunchCardService.getPunchCardsByClients(
                getQueryStringFilter(),
                userData.token
            )

            setPunchCardData(prev => ({
                ...prev,
                byClients: punchCardByClients.data
            }))
        }

        fetchPunchCardByClientData()
    }, [])

    return (
        <>
            <h1>Clientes</h1>

            {
                punchCardData.byClients.length
                    ? punchCardData.byClients.map(byClientData => <p>{byClientData.name}</p>)
                    : <LoadingSpinner image={pilotLoaderLogo} width="50px" height="50px"/>
            }
        </>
    )
}


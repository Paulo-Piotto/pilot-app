import { useContext } from "react"
import LoadingSpinner from "../generics/logoLoadingSpinner";
import pilotLoaderLogo from "../../assets/pilot-spinner-logo-black.png";
import PunchCardContext from "../context/PunchCardContext";
import ClientCard from "./ClientCard";

export default function ClientsFilter() {
    const { punchCardData } = useContext(PunchCardContext);

    return (
        <>
            <h1>Clientes</h1>

            {
                punchCardData.byClients.length
                    ? punchCardData.byClients.map(byClientData => <ClientCard clientData={byClientData}/>)
                    : <LoadingSpinner image={pilotLoaderLogo} width="50px" height="50px"/>
            }
        </>
    )
}


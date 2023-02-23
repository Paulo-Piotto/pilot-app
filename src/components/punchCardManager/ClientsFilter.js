import { useContext } from "react"
import LoadingSpinner from "../generics/logoLoadingSpinner";
import pilotLoaderLogo from "../../assets/pilot-spinner-logo-black.png";
import PunchCardContext from "../context/PunchCardContext";
import ClientCard from "./ClientCard";
import { ClientsFilterContainer } from "./styles";

export default function ClientsFilter({ fireExpanderAnimationToEmployeesView }) {
    const { punchCardData } = useContext(PunchCardContext);

    return (
        <ClientsFilterContainer>
            <h1>Clientes˼</h1>

            {
                punchCardData.byClients.length
                    ? punchCardData.byClients .map(byClientData => <ClientCard key={byClientData.id} 
                                                                               clientData={byClientData} 
                                                                               fireExpanderAnimationToEmployeesView={fireExpanderAnimationToEmployeesView}/>)
                    : <LoadingSpinner image={pilotLoaderLogo} width="50px" height="50px"/>
            }
        </ClientsFilterContainer>
    )
}


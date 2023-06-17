import { useContext } from "react"
import LoadingSpinner from "../generics/logoLoadingSpinner";
import PunchCardContext from "../context/PunchCardContext";
import piottoWhiteLogo from "../../assets/pilot-white.png";
import ClientCard from "./ClientCard";
import { ClientsFilterContainer } from "./styles";

export default function ClientsFilter() {
    const { punchCardData, loadingInitialData } = useContext(PunchCardContext);

    if(loadingInitialData) return <ClientsFilterContainer><h1>Clientes˼</h1><LoadingSpinner image={piottoWhiteLogo} width="70px" height="70px" /></ClientsFilterContainer>
    return (
        <ClientsFilterContainer>
            <h1 >Clientes˼</h1>
            {
                punchCardData.byClients.length
                    ? punchCardData.byClients.map(byClientData => <ClientCard key={byClientData.id} 
                                                                              clientData={byClientData} />)
                    : <p style={{color: "#d79318"}}>Não há registros de presença em nenhum cliente que obedeça aos filtros aplicados, aqui aparecerão clientes que tiverem ao menos um registro de presença associado.</p>
            }
        </ClientsFilterContainer>
    )
}
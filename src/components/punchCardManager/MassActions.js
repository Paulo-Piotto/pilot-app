import { ActionsContainer } from "./styles"
import PunchCardContext from "../context/PunchCardContext"
import { useContext, useEffect, useRef } from "react"
import dayjs from "dayjs"

export default function MassActions({ setAllSelected, massActionConfig, selectAllEmployees, unselectAllEmployees, setMassActionConfig, dispatchMassAction }) {
    const scrollRef = useRef()
    const { clientOptions } = useContext(PunchCardContext)

    useEffect(() => {
        const currentRef = scrollRef.current
        if(currentRef) {
            const onWheel = (event) => {
                event.preventDefault();
              
                currentRef.scrollBy({
                  left: event.deltaY < 0 ? -30 : 30,
                  
                });
            }

            currentRef.addEventListener("wheel", onWheel)
            return () => currentRef.removeEventListener("wheel", onWheel)
        }
    }, [])

    return (
        <ActionsContainer
            ref={scrollRef}
        >
            <div className="action">
                <label for="employees"><nobr>Selecionar Todos: </nobr></label>
                <input type="checkbox" name="employees" onClick={() => {
                    setAllSelected(prev => {
                        if(prev) unselectAllEmployees()
                        else selectAllEmployees()
                        return !prev
                    })
                }}/>
            </div>

            <div className="action">
                <label for="operation_type">Aplicar: </label>
                <select name="operation_type"
                    onChange={e => setMassActionConfig(prev => ({ ...prev, isPresence: e.target.value === "true"}))}
                >
                    <option value={true}>Presença</option>
                    <option value={false}>Falta</option>
                </select>
            </div>
 
            <div className="action">
                <label for="date">Dia: </label>
                <input type="date" name="date"
                    onChange={e => {
                        console.log("DATA CHANGED TO: ", e.target.value)
                        setMassActionConfig(prev => ({ ...prev, date: dayjs(e.target.value)}))
                    }}
                />
            </div>  

            <div className="action">
                <label for="client">Obra: </label>
                <select name="client"
                    onChange={e => setMassActionConfig(prev => ({ ...prev, clientId: e.target.value }))}
                >
                    {
                        clientOptions.map(client => <option key={client.id} value={client.id}>{client.name}</option>)
                    }
                </select>
            </div>

            {
                massActionConfig.clientId > 0 &&

                <button className="save_mass_action" onClick={dispatchMassAction}>salvar</button>
            }
        </ActionsContainer>
    )
}
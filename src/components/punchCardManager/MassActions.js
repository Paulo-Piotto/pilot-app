import { ActionsContainer } from "./styles"
import PunchCardContext from "../context/PunchCardContext"
import { useContext, useEffect, useRef } from "react"
import dayjs from "dayjs"
import MassActionContext from "../context/MassEditorContext"

export default function MassActions() {
    const scrollRef = useRef()
    const { clientOptions, punchCardData } = useContext(PunchCardContext)
    const {
        massActionConfig, setMassActionConfig,
        allSelected, selectAllEmployees, unselectAllEmployees, setAllSelected,
        dispatchMassAction
    } = useContext(MassActionContext)

    useEffect(() => {
        const currentRef = scrollRef.current
        if(currentRef) {
            const onWheel = (event) => {
                event.preventDefault();
                currentRef.scrollBy({ left: event.deltaY < 0 ? -30 : 30 });
            }
            currentRef.addEventListener("wheel", onWheel)
            return () => currentRef.removeEventListener("wheel", onWheel)
        }
    }, [])

    return (
        <ActionsContainer ref={scrollRef}>
            {
                Number(massActionConfig.clientId) &&
                massActionConfig.selectedEmployeesIds.length 
                    ? <button className="save_mass_action" onClick={dispatchMassAction}>salvar</button>
                    : void(0)
            }
            <div className="action">
                <label for="employees"><nobr>Selecionar Todos: </nobr></label>
                <input type="checkbox" name="employees" checked={allSelected} onChange={() => {
                    setAllSelected(prev => {
                        if(prev) unselectAllEmployees()
                        else selectAllEmployees(punchCardData.byEmployees)
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
                    value={massActionConfig.date ? dayjs(massActionConfig.date).format("YYYY-MM-DD") : null}
                    onChange={e => {
                        setMassActionConfig(prev => ({ ...prev, date: dayjs(e.target.value)}))
                    }}
                />
            </div>  

            <div className="action">
                <label for="client">Obra: </label>
                <select name="client" value={massActionConfig.clientId}
                    onChange={e => setMassActionConfig(prev => ({ ...prev, clientId: e.target.value }))}
                >
                    <option key="empty" value="0"></option>
                    {
                        clientOptions.map(client => <option key={client.id} value={client.id}>{client.name}</option>)
                    }
                </select>
            </div>


        </ActionsContainer>
    )
}
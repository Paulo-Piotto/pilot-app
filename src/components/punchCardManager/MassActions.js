import { ActionsContainer } from "./styles"
import PunchCardContext from "../context/PunchCardContext"
import { useContext, useEffect, useRef, useState } from "react"
import dayjs from "dayjs"

export default function MassActions({ onClick }) {
    const scrollRef = useRef()
    const { clientOptions } = useContext(PunchCardContext)
    const [ massActionConfig, setMassActionConfig ] = useState({
        isPresence: true,
        date: dayjs(),
        clientId: 0 
    })

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
                <label for="operation_type">Aplicar: </label>
                <select name="operation_type"
                    onChange={e => setMassActionConfig(prev => ({ ...prev, isPresence: e.target.value }))}
                >
                    <option value={true} >Presença</option>
                    <option value={false}>Falta</option>
                </select>
            </div>
 
            <div className="action">
                <label for="employees">Funcionários: </label>
                <select name="employees">
                    <option>Todos</option>
                </select>
            </div>

            <div className="action">
                <label for="date">Dia: </label>
                <input type="date" name="date"
                    onChange={e => setMassActionConfig(prev => ({ ...prev, date: e.target.value }))}

                />
            </div>

            <div className="action">
                <label for="client">Obra: </label>
                <select name="client"
                    onChange={e => setMassActionConfig(prev => ({ ...prev, clientId: e.target.value }))}
                >
                    {
                        clientOptions.map(client => <option value={client.id}>{client.name}</option>)
                    }
                </select>
            </div>
        </ActionsContainer>
    )
}
import { ActionsContainer } from "./styles";
import PunchCardContext from "../context/PunchCardContext";
import { useContext } from "react";
import dayjs from "dayjs";
import MassActionContext from "../context/MassEditorContext";

export default function MassActions() {
/*   const scrollRef = useRef(); */
  const { clientOptions, punchCardData } = useContext(PunchCardContext);
  const {
    massActionConfig,
    setMassActionConfig,
    allSelected,
    selectAllEmployees,
    unselectAllEmployees,
    setAllSelected,
    dispatchMassAction,
  } = useContext(MassActionContext);

  function handleMassAction() {
    dispatchMassAction();
  }

  return (
    <ActionsContainer>
      {Number(massActionConfig.clientId) &&
      massActionConfig.selectedEmployeesIds.length ? (
        <button className="save_mass_action" onClick={handleMassAction}>
          salvar
        </button>
      ) : (
        void 0
      )}
      <div className="action">
        <label>
          <nobr>Todos: </nobr>
        </label>
        <input
          type="checkbox"
          name="employees"
          checked={allSelected}
          onChange={() => {
            setAllSelected((prev) => {
              if (prev) unselectAllEmployees();
              else selectAllEmployees(punchCardData.byEmployees);
              return !prev;
            });
          }}
        />
      </div>

      <div className="action">
        <label>Aplicar: </label>
        <select
          name="operation_type"
          value={massActionConfig.isPresence}
          onChange={(e) =>
            setMassActionConfig((prev) => ({
              ...prev,
              isPresence: e.target.value === "true",
            }))
          }
        >
          <option value={true}>Presença</option>
          <option value={false}>Falta</option>
        </select>
      </div>

      <div className="action">
        <label>Dia: </label>
        <input
          type="date"
          name="date"
          value={massActionConfig.date.format("YYYY-MM-DD")}
          onChange={(e) => {
            setMassActionConfig((prev) => ({
              ...prev,
              date: dayjs(e.target.value),
            }));
          }}
        />
      </div>

      <div className="action">
        <label>Obra: </label>
        <select
          name="client"
          value={massActionConfig.clientId}
          onChange={(e) =>
            setMassActionConfig((prev) => ({
              ...prev,
              clientId: e.target.value,
            }))
          }
        >
          <option key="empty" value="0"></option>
          {clientOptions.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>
    </ActionsContainer>
  );
}

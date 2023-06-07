import { Grow } from "@mui/material";
import { SearchCardContainer } from "./styles";
import {
  EmployeesService,
  PunchCardService,
} from "../../services/api.services";
import { useState, useContext } from "react";
import PunchCardContext from "../context/PunchCardContext";
import Loader from "../generics/logoLoadingSpinner";
import AuthContext from "../context/AuthContext";

export default function SearchCard({
  contrast,
  plHolder,
  iconName,
  action,
  width,
}) {
  const { setPunchCardData, callSnackBar, updateSearchFilters } =
    useContext(PunchCardContext);
  const { userData } = useContext(AuthContext);
  const [searchString, setSearchString] = useState("");
  const [loading, setLoading] = useState(false);

  async function searchEmployee() {
    setLoading(true);
    try {
      const foundEmployees = await EmployeesService.searchEmployeeByName(
        searchString
      );
      setPunchCardData((prev) => ({
        ...prev,
        byEmployees: foundEmployees.data,
      }));
    } catch (error) {
      if (error.response.status === 404)
        callSnackBar({
          message: "Nenhum funcionário encontrado",
          type: "error",
        });
      console.error(error);
    }
    setLoading(false);
  }

  async function getEmployeesWithoutPunchCardRecord() {
    setLoading(true);
    const emptyPunchs = await PunchCardService.getEmptyPunchCards(
      userData.token
    );
    setPunchCardData((prev) => ({
      ...prev,
      byEmployees: emptyPunchs.data,
    }));
    setLoading(false);
  }

  async function clearSearch() {
    updateSearchFilters("client", null);
  }

  return (
    <Grow
      in={true}
      timeout={{ enter: 500, exit: 500 }}
      style={{ transitionDelay: "0s" }}
    >
      <SearchCardContainer contrast={contrast} onClick={action} width={width}>
        <section>
          <input
            value={searchString}
            placeholder={plHolder}
            onChange={(e) => setSearchString(e.target.value)}
          />

          <div className="control_buttons_container">
            <button onClick={clearSearch}>Limpar Filtros</button>
            <button onClick={getEmployeesWithoutPunchCardRecord}>
              Funcionários sem presença
            </button>
          </div>
        </section>

        <div className="search_icon_container">
          {(loading && <Loader width="50px" height="50px" />) || (
            <ion-icon name={iconName} onClick={searchEmployee}></ion-icon>
          )}
        </div>
      </SearchCardContainer>
    </Grow>
  );
}

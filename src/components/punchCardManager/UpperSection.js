import { Grow } from "@material-ui/core";
import { AdaptedCardsContainer } from "./styles";
import PunchCardContext from "../context/PunchCardContext";
import { useContext } from "react";
import SearchCard from "./SearchCard";
import dayjs from "dayjs";
import { floorDateHour, ceilDateHour } from "../../services/utils/dateServices";

export default function UpperSection() {
  const { searchFilters, updateSearchFilters } = useContext(PunchCardContext);

  return (
    <>
      <AdaptedCardsContainer>
        <Grow
          in={true}
          timeout={{ enter: 500, exit: 500 }}
          style={{ transitionDelay: "0s" }}
        >
            <div id="upper_section_date_picker">
                <input
                    type="date"
                    value={searchFilters.date.from.add(1, "day").format("YYYY-MM-DD")}
                    onChange={e => {
                        updateSearchFilters("date", { from: dayjs(floorDateHour(dayjs(e.target.value))) })
                    }}
                />

                <input
                    type="date" 
                    value={searchFilters.date.to.format("YYYY-MM-DD")}
                    onChange={e => {
                        updateSearchFilters("date", { to: dayjs(ceilDateHour(dayjs(e.target.value))) })
                    }}
                />

            </div>
        </Grow>

        <SearchCard
          contrast={false}
          plHolder="Buscar funcionário"
          iconName="search-outline"
          width={"40%"}
          action={() => {}}
        />
      </AdaptedCardsContainer>
    </>
  );
}

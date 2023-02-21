import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Grow } from "@material-ui/core";
import { TextField } from '@mui/material/';
import { DatePickerCardStyle, AdaptedCardsContainer} from "./styles";
import PunchCardContext from "../context/PunchCardContext";
import { useContext } from "react";
import SearchCard from "./SearchCard";

export default function UpperSection() {
    const { searchFilters, updateSearchFilters } = useContext(PunchCardContext);

    return (
        <>
            <AdaptedCardsContainer>
                <Grow in={true} timeout={{ enter: 500, exit: 500 }} style={{ transitionDelay: '0s' }}>
                    <DatePickerCardStyle>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            value={searchFilters.date.from}
                            autoFocus
                            label='De:'
                            id="date"
                            inputFormat='DD/MM/YYYY'
                            type="date"
                            required={true}
                            variant="standard"
                            onChange={e => updateSearchFilters("date", {from: e})}
                            renderInput={(params) => <TextField {...params}  margin='dense' />}
                        />
                        <DesktopDatePicker
                            value={searchFilters.date.to}
                            autoFocus
                            label='Até:'
                            id="date"
                            inputFormat='DD/MM/YYYY'
                            type="date"
                            required={true}
                            variant="standard"
                            onChange={e => updateSearchFilters("date", {to: e})}
                            renderInput={(params) => <TextField {...params} sx={{ ml: 1}} margin='dense' />}
                        />
                        </LocalizationProvider>
                    </DatePickerCardStyle>
                </Grow>

                <SearchCard
                    contrast={false} 
                    subtitle='Configurações de'
                    searchString='Busca'
                    iconName='search-outline'
                    width={"40%"}
                    action={() => {}}
                />
            </AdaptedCardsContainer>
        </>
    )
}
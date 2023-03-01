import { WorkDayContainer } from "./styles"
import Tooltip from '@mui/material/Tooltip';
import dayjs from "dayjs"
import { getWeekDayNameBasedOnInt } from "./helpers";

export default function WorkDay({ workedDayData, dispatchDialog }) {
    const thisDate = dayjs(workedDayData.date)

    return (
        <Tooltip 
            title={`${getWeekDayNameBasedOnInt(thisDate.day())} - ${thisDate.format("DD/MM/YYYY")}`}
            arrow
            disableInteractive
            enterDelay={50}
        >
            <WorkDayContainer
                x={workedDayData.rectX}
                y={workedDayData.rectY}
                colorize={workedDayData.id}
                onClick={dispatchDialog}
            />
        </Tooltip>
    )
}
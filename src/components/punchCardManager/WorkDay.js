import { WorkDayContainer } from "./styles"
import Tooltip from '@mui/material/Tooltip';
import dayjs from "dayjs"

export default function WorkDay({ workedDayData }) {
    const weekDayIntRelation = [ "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]
    const thisDate = dayjs(workedDayData.date)

    return (
        <Tooltip 
            title={`${weekDayIntRelation[thisDate.day()]} - ${thisDate.format("DD/MM/YYYY")}`}
            arrow
            disableInteractive
            enterDelay={50}
        >
            <WorkDayContainer
                x={workedDayData.rectX}
                y={workedDayData.rectY}
                colorize={workedDayData.id}
                color={ workedDayData.id ? "green" : null }
                onClick={() => console.log(dayjs(workedDayData.date).format("DD/MM/YYYY"))}
            />
        </Tooltip>
    )
}
import { WorkDayContainer } from "./styles"
import WorkDayDialog from "./WorkDayDialog"
import dayjs from "dayjs"

export default function WorkDay({ workedDayData }) {
    return (
        <WorkDayContainer 
            color={ workedDayData.id ? "green" : null }
            onClick={() => console.log(dayjs(workedDayData.date).format("DD/MM/YYYY"))}
        />
    )
}
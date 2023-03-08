import WorkDay from "./WorkDay"
import { areDatesFromSameDay } from "./helpers"
import dayjs from "dayjs"
import { PunchCardContainer } from "./styles";

export default function PunchCardPreview({ previewSize, workedDaysData }) {

    function generatePreviewData() {
        function* populateWorkedDaysData() {
            const todayDate = dayjs()
            let workedDaysCurrentIndex = 0;

            for(let i = 0; i < previewSize; i++) {
                const iDate = todayDate.subtract(i, "day")

                if(
                    workedDaysCurrentIndex < workedDaysData.length 
                    && areDatesFromSameDay(iDate, workedDaysData[workedDaysCurrentIndex].date)
                ) {
                    yield workedDaysData[workedDaysCurrentIndex]
                    workedDaysCurrentIndex += 1
                } else { yield {date: iDate.toISOString()} }
            }
        }

        const populatedData = [...populateWorkedDaysData()]

        function* calculateRectCoordinates() {
            const baseY = 5;
            const baseX = 180;


            for(let i = 0; i < populatedData.length; i++) {
                yield {
                    ...populatedData[i],
                    rectX: baseX - (40*i) - (10),
                    rectY: baseY
                }
            }
        }

        return [...calculateRectCoordinates()]
    }

    return (
        <PunchCardContainer
            viewBox="0 0 200 30"
        >
            {
                generatePreviewData()
                    .map(previewData => <WorkDay key={previewData.date} workedDayData={previewData} dispatchDialog={() => {}} />)
            }
        </PunchCardContainer>
    )
}
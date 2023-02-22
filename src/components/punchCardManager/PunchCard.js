import dayjs from "dayjs"
import WorkDay from "./WorkDay"
import { areDatesFromSameDay } from "./helpers";
import { PunchCardContainer } from "./styles";

// requires that employee_worked_days are ordered by date in descending order
export default function PunchCard({ employeeData }) {
    //plotar pontos fazendo loop de traz pra frente, para em 365 dias ou employee start_day
    // pra cada iteração, criar um date e verificar se:
    //          - 1º elemento de employee_worked_days[] é dessa data?
    //              - se sim: presença, enviar employee_worked_day pra <WorkDay />
    //              - se não: enviar objeto generico de falta (apenas com o userId
    // ps. enviar objeto = inserir ele no arrai worDaysArray

    function generatePunchCard() {
        const todayDate = dayjs();
        const workDaysArray = [];
        const registeredPresences = employeeData["employees_worked_days"]
        let employeeWorkedDaysCurrentIndex = 0;
    
        for(let i = 0; i < 365; i++) {
            const iDate = todayDate.subtract(i, "day")
    
            if(areDatesFromSameDay(registeredPresences[employeeWorkedDaysCurrentIndex].date, iDate)) {
                workDaysArray.push(registeredPresences[employeeWorkedDaysCurrentIndex])
                employeeWorkedDaysCurrentIndex += 1
            } else {
                workDaysArray.push({
                    date: iDate
                })
            }
        }

        return workDaysArray;
    }

    return (
        <PunchCardContainer>
            {
                generatePunchCard().map(workedDay => <WorkDay key={workedDay.date} workedDayData={workedDay}/>)
            }
        </PunchCardContainer>
    )
}
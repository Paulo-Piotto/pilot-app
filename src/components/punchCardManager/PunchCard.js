import dayjs from "dayjs";
import WorkDay from "./WorkDay";
import { areDatesFromSameDay } from "./helpers";
import { PunchCardContainer } from "./styles";
import { useState, useCallback, useMemo } from "react";
import WorkDayDialog from "./WorkDayDialog";

export default function PunchCard({ employeeData }) {
  const [dialogConfig, setDialogConfig] = useState({
    shouldOpen: false,
    workDayData: {},
  });

  const punchCardDataGenerator = useCallback((employee) => {
    const renderDotsAmount = 232;
    const stepX = 24;
    const stepY = 24;
    const padding = 10;

    function* generatePunchCardDays() {
      const todayDate = dayjs();
      const registeredPresences = employee["employees_worked_days"];
      let employeeWorkedDaysCurrentIndex = 0;

      for (let i = 0; i < renderDotsAmount; i++) {
        const iDate = todayDate.subtract(i, "day");

        //if encounter multiple presences from the same day, it will render only the last one
        if (
          employeeWorkedDaysCurrentIndex + 1 < registeredPresences.length &&
          areDatesFromSameDay(
            registeredPresences[employeeWorkedDaysCurrentIndex].date,
            registeredPresences[employeeWorkedDaysCurrentIndex + 1].date
          )
        ) {
          i--;
          employeeWorkedDaysCurrentIndex += 1;
        } else if (
          employeeWorkedDaysCurrentIndex < registeredPresences.length &&
          areDatesFromSameDay(
            registeredPresences[employeeWorkedDaysCurrentIndex].date,
            iDate
          )
        ) {
          yield registeredPresences[employeeWorkedDaysCurrentIndex];
          employeeWorkedDaysCurrentIndex += 1;
        } else yield { date: iDate.toISOString() };
      }
    }

    function* calculateRectCoordinates() {
      let punchCardGenerator = generatePunchCardDays();
      let lastCalculatedY;
      let lastCalculatedX;

      for (let i = 0; i < renderDotsAmount; i++) {
        const currentWorkDay = punchCardGenerator.next().value;
        const weekDay = dayjs(currentWorkDay.date).day();

        if (lastCalculatedY === undefined) {
          lastCalculatedY = stepY * weekDay + padding;
          lastCalculatedX = 30;
        } else {
          const lastWeekDay = 6;

          if (lastCalculatedY - stepY < padding) {
            lastCalculatedX += stepX;
            lastCalculatedY = lastWeekDay * stepY + padding;
          } else {
            lastCalculatedY -= stepY;
          }
        }

        const currentWorkDayWithRectCoordinates = {
          ...currentWorkDay,
          rectX: lastCalculatedX,
          rectY: lastCalculatedY,
        };
        yield currentWorkDayWithRectCoordinates;
      }
    }

    return [...calculateRectCoordinates()];
  }, []);

  const memoizedPunchCardGeneratedData = useMemo(
    () => punchCardDataGenerator(employeeData),
    [employeeData, punchCardDataGenerator]
  );

  return (
    <PunchCardContainer viewBox={`0 0 820 200`}>
      <text x="0" y="24">
        Dom
      </text>
      <text x="0" y="96">
        Qua
      </text>
      <text x="0" y="168">
        Sáb
      </text>
      {memoizedPunchCardGeneratedData.map((workedDay) => (
        <WorkDay
          key={workedDay.date}
          workedDayData={workedDay}
          dispatchDialog={() => {
            setDialogConfig({ shouldOpen: true, workDayData: workedDay });
          }}
        />
      ))}
      <WorkDayDialog
        openDialog={dialogConfig.shouldOpen}
        closeDialog={() => {
          setDialogConfig((prev) => ({
            ...prev,
            shouldOpen: false,
            workDayData: {},
          }));
        }}
        initialWorkDayData={dialogConfig.workDayData}
        employeeData={{ id: employeeData.id, name: employeeData.name }}
      />
    </PunchCardContainer>
  );
}

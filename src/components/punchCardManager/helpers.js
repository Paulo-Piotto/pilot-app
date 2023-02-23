import dayjs from "dayjs"

export function areDatesFromSameDay(date1, date2) {
    return dayjs(date1).format("DD/MM/YYYY") === dayjs(date2).format("DD/MM/YYYY")
}

export function getWeekDayNameBasedOnInt(int) {
    return [ "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"][int]
}
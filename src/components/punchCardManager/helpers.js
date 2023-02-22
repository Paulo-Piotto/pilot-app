import dayjs from "dayjs"

export function areDatesFromSameDay(date1, date2) {
    return dayjs(date1).format("DD/MM/YYYY") === dayjs(date2).format("DD/MM/YYYY")
}
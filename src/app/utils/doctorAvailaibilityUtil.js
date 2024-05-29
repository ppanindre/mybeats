import moment from "moment";

/**
 * get all dates in the year of the weekday selected
 * @param {String} daySelected
 * @param {String} year
 * @returns {Array<int>}
 */
export const getAllDaysOfTheYear = (startTime, endTime) => {
    const datesSelected = []

    for (let i = 0; i <= 52; i++) {
        datesSelected.push({
            startTime: moment(startTime).add(7, "day"),
            endTime: moment(endTime).add(7, "day")
        })
    }

    return datesSelected;
};

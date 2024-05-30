import moment from "moment";

/**
 * get all dates in the year of the weekday selected
 * @param {String} daySelected
 * @param {String} year
 * @returns {Array<int>}
 */
export const getAllDaysOfTheYear = (startTime, endTime) => {
    const datesSelected = [];

    datesSelected.push({
        startTime: moment(startTime).toDate(),
        endTime: moment(endTime).toDate(),
    });

    for (let i = 1; i <= 52; i++) {
        const newStartTime = moment(startTime)
            .add(i * 7, "days")
            .toDate();
        const newEndTime = moment(endTime)
            .add(i * 7, "days")
            .toDate();

        datesSelected.push({
            startTime: newStartTime,
            endTime: newEndTime,
        });
    }

    return datesSelected;
};

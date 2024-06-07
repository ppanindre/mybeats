import React from "react";
import { Calendar } from "react-native-calendars";
import { theme } from "../../../../tailwind.config";
import moment from "moment";

const CalendarInput = ({ onDayPress, markedDates }) => {
    /**
     * function to return the min date for the calendar
     * @return {string}
     */
    const getMinDate = () => {
        return moment().format("YYYY-MM-DD");
    };

    return (
        <Calendar
            minDate={getMinDate()}
            onDayPress={onDayPress}
            markedDates={markedDates}
            theme={{
                arrowColor: theme.colors.primary,
            }}
        />
    );
};

export default CalendarInput;

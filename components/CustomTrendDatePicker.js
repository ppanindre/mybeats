import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "react-native-heroicons/outline";
import moment from "moment";
import { customTheme } from "../constants/themeConstants";

const CustomTrendDatePicker = ({ changeDateRange, isDataLoading }) => {
    // REDUX STORES
    const user = useSelector((state) => state.UserReducer);

    // STATES
    const [selectedMode, setSelectedMode] = useState("week");
    const [startDate, setStartDate] = useState(
        moment().startOf("week").format("MMM DD, YYYY")
    );
    const [endDate, setEndDate] = useState(
        moment().endOf("week").format("MMM DD, YYYY")
    );
    const [isRightDisabled, setIsRightDisabled] = useState(false);
    const [isLeftDisabled, setIsLeftDisabled] = useState(false);

    // Whenever mode changes or user changes, reset range
    useEffect(() => {
        setStartAndEndDate(selectedMode);
    }, [selectedMode, user]);

    // Notify parent of any range change
    useEffect(() => {
        changeDateRange(
            moment(startDate, "MMM DD, YYYY").format("YYYY-MM-DD"),
            moment(endDate, "MMM DD, YYYY").format("YYYY-MM-DD"),
            selectedMode
        );
    }, [startDate, endDate]);

    // Disable/enable arrows
    useEffect(() => {
        const current = moment();
        const start = moment(startDate, "MMM DD, YYYY");
        const end = moment(endDate, "MMM DD, YYYY");
        const join = moment(user.joinDate).startOf("day");

        // Right: can’t go into future
        setIsRightDisabled(
            current.isBetween(start, end, "day", "[]")
        );

        // Left: look one “step” back and see if that start < join
        const prevStart = start.clone().subtract(1, selectedMode);
        setIsLeftDisabled(prevStart.isBefore(join, "day"));
    }, [startDate, endDate, selectedMode, user.joinDate]);

    const setStartAndEndDate = (mode) => {
        setStartDate(moment().startOf(mode).format("MMM DD, YYYY"));
        setEndDate(moment().endOf(mode).format("MMM DD, YYYY"));
    };

    const goLeft = () => {
        const start = moment(startDate, "MMM DD, YYYY");
        const end = moment(endDate, "MMM DD, YYYY");
        const join = moment(user.joinDate).startOf("day");

        // If moving left would start before join date, do nothing
        const prevStart = start.clone().subtract(1, selectedMode);
        if (prevStart.isBefore(join, "day")) return;

        // Otherwise shift
        setStartDate(prevStart.format("MMM DD, YYYY"));
        setEndDate(end.clone().subtract(1, selectedMode).format("MMM DD, YYYY"));
    };

    const goRight = () => {
        const current = moment();
        const start = moment(startDate, "MMM DD, YYYY");
        const end = moment(endDate, "MMM DD, YYYY");

        // If moving right would go past today, do nothing
        const nextEnd = end.clone().add(1, selectedMode);
        if (nextEnd.isAfter(current, "day")) return;

        setStartDate(start.clone().add(1, selectedMode).format("MMM DD, YYYY"));
        setEndDate(nextEnd.format("MMM DD, YYYY"));
    };

    return (
        <View sentry-label="trend-date-picker" className="mt-5">
            {/* Modes */}
            <View className="flex-row items-center justify-between mx-10">
                {["week", "month", "year"].map((mode) => (
                    <TouchableOpacity
                        key={mode}
                        onPress={() => setSelectedMode(mode)}
                    >
                        <Text
                            style={{ fontSize: 16 }}
                            className={`${
                                selectedMode === mode
                                    ? "text-orange-400 font-bold underline"
                                    : "text-gray-300 font-bold"
                            }`}
                        >
                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* navigation */}
            <View className="flex-row items-center justify-between mt-6">
                <TouchableOpacity
                    disabled={isLeftDisabled || isDataLoading}
                    onPress={goLeft}
                >
                    <ChevronLeftIcon
                        color={
                            isLeftDisabled
                                ? customTheme.colors.light
                                : customTheme.colors.primary
                        }
                    />
                </TouchableOpacity>

                <Text className="text-lg font-bold text-gray-800">
                    {startDate} - {endDate}
                </Text>

                <TouchableOpacity
                    disabled={isRightDisabled || isDataLoading}
                    onPress={goRight}
                >
                    <ChevronRightIcon
                        color={
                            isRightDisabled
                                ? customTheme.colors.light
                                : customTheme.colors.primary
                        }
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default CustomTrendDatePicker;

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
  const user = useSelector((state) => state.UserReducer); // get user listener instance

  // STATES
  const [selectedMode, setSelectedMode] = useState("week"); // get selected mode
  const [startDate, setStartDate] = useState(
      moment().startOf("week").format("MMM DD, YYYY").toString()
  ); // start date
  const [endDate, setEndDate] = useState(
      moment().endOf("week").format("MMM DD, YYYY").toString()
  ); // end date
  const [isRightDisabled, setIsRightDisabled] = useState(false); // disable right arrow
  const [isLeftDisabled, setIsLeftDisabled] = useState(false); // disable left arrow

  useEffect(() => {
      setStartAndEndDate(selectedMode); // set start and end date for the selected mode
  }, [selectedMode]); // whenever mode is changed

  useEffect(() => {
      changeDateRange(
          moment(startDate, "MMM DD, YYYY").format("YYYY-MM-DD"),
          moment(endDate, "MMM DD, YYYY").format("YYYY-MM-DD"),
          selectedMode
      );
  }, [startDate, endDate]); // whenever start date and end date is changed

  useEffect(() => {
      const currentDate = moment(); // get current date
      const userJoinDate = moment(user.joinDate); // get user join date
      const startDateMode = moment(startDate, "MMM DD, YYYY"); // get start date
      const endDateMode = moment(endDate, "MMM DD, YYYY"); // get end date
      if (currentDate.isBetween(startDateMode, endDateMode, 'day', '[]')) {
          // disable the right arrow if the current date is between the range
          setIsRightDisabled(true);
      } else {
          setIsRightDisabled(false);
      }

      if (userJoinDate.isBetween(startDateMode, endDateMode)) {
          // disable the left arrow if the join date is between the range
          setIsLeftDisabled(true);
      } else {
          setIsLeftDisabled(false);
      }
  }, [startDate, endDate, selectedMode]);

  useEffect(() => {
      setSelectedMode("week");
      setStartAndEndDate("week");
  }, [user]); // when user listener activates

  // function to set start & end date based on the mode
  const setStartAndEndDate = (mode) => {
      setStartDate(moment().startOf(mode).format("MMM DD, YYYY").toString());
      setEndDate(moment().endOf(mode).format("MMM DD, YYYY").toString());
  };

  // function to handle user clicking the left arrow
  const goLeft = () => {
      const userJoinDate = moment(user.joinDate); // get user join date
      const startDateMode = moment(startDate, "MMM DD, YYYY"); // get start date
      const endDateMode = moment(endDate, "MMM DD, YYYY"); // get end date

      if (!userJoinDate.isBetween(startDateMode, endDateMode)) {
          if (selectedMode === "week") {
              setStartDate(
                  moment(startDate, "MMM DD, YYYY")
                      .subtract(1, "week")
                      .format("MMM DD, YYYY")
              );
              setEndDate(
                  moment(endDate, "MMM DD, YYYY")
                      .subtract(1, "week")
                      .format("MMM DD, YYYY")
              );
          } else if (selectedMode === "month") {
              setStartDate(
                  moment(startDate, "MMM DD, YYYY")
                      .subtract(1, "month")
                      .format("MMM DD, YYYY")
              );
              setEndDate(
                  moment(endDate, "MMM DD, YYYY")
                      .subtract(1, "month")
                      .format("MMM DD, YYYY")
              );
          } else if (selectedMode === "year") {
              setStartDate(
                  moment(startDate, "MMM DD, YYYY")
                      .subtract(1, "year")
                      .format("MMM DD, YYYY")
              );
              setEndDate(
                  moment(endDate, "MMM DD, YYYY")
                      .subtract(1, "year")
                      .format("MMM DD, YYYY")
              );
          }
      }
  };

  // function to handle user clicking the right arrow
  const goRight = () => {
      const currentDate = moment(); // get current date
      const startDateMode = moment(startDate, "MMM DD, YYYY"); // get start date
      const endDateMode = moment(endDate, "MMM DD, YYYY"); // get end date

      if (!currentDate.isBetween(startDateMode, endDateMode)) {
          if (selectedMode === "week") {
              setStartDate(
                  moment(startDate, "MMM DD, YYYY")
                      .add(1, "week")
                      .format("MMM DD, YYYY")
              );
              setEndDate(
                  moment(endDate, "MMM DD, YYYY")
                      .add(1, "week")
                      .format("MMM DD, YYYY")
              );
          } else if (selectedMode === "month") {
              setStartDate(
                  moment(startDate, "MMM DD, YYYY")
                      .add(1, "month")
                      .format("MMM DD, YYYY")
              );
              setEndDate(
                  moment(endDate, "MMM DD, YYYY")
                      .add(1, "month")
                      .format("MMM DD, YYYY")
              );
          } else if (selectedMode === "year") {
              setStartDate(
                  moment(startDate, "MMM DD, YYYY")
                      .add(1, "year")
                      .format("MMM DD, YYYY")
              );
              setEndDate(
                  moment(endDate, "MMM DD, YYYY")
                      .add(1, "year")
                      .format("MMM DD, YYYY")
              );
          }
      }
  };

  return (
      <View sentry-label="trend-date-picker" className="mt-5">
          {/* Modes */}
          <View className="flex-row items-center justify-between mx-10">
              {/* Week mode */}
              <TouchableOpacity
                  sentry-label="trend-date-week-mode"
                  onPress={() => setSelectedMode("week")}
              >
                  <Text
                      style={{ fontSize: 16 }}
                      className={`${
                          selectedMode === "week"
                              ? "text-orange-400 font-bold underline"
                              : "text-gray-300 font-bold"
                      } `}
                  >
                      Week
                  </Text>
              </TouchableOpacity>

              {/* Month mode */}
              <TouchableOpacity
                  sentry-label="trend-date-month-mode"
                  onPress={() => setSelectedMode("month")}
              >
                  <Text
                      style={{ fontSize: 16 }}
                      className={`${
                          selectedMode === "month"
                              ? "text-orange-400 font-bold underline"
                              : "text-gray-300 font-bold"
                      } `}
                  >
                      Month
                  </Text>
              </TouchableOpacity>

              {/* Year Mode */}
              <TouchableOpacity
                  sentry-label="trend-date-year-mode"
                  onPress={() => setSelectedMode("year")}
              >
                  <Text
                      style={{ fontSize: 16 }}
                      className={`${
                          selectedMode === "year"
                              ? "text-orange-400 font-bold underline"
                              : "text-gray-300 font-bold"
                      } `}
                  >
                      Year
                  </Text>
              </TouchableOpacity>
          </View>

          {/* trend-navigation */}
          <View className="flex-row items-center justify-between mt-6">
              {/* left arrow */}
              <TouchableOpacity
                  sentry-label="trend-date-left"
                  disabled={isLeftDisabled || isDataLoading}
                  onPress={goLeft}
              >
                  {/* Left arrow icon */}
                  <ChevronLeftIcon
                      color={
                          isLeftDisabled
                              ? customTheme.colors.light
                              : customTheme.colors.primary
                      }
                  />
              </TouchableOpacity>

              {/* Trend Chart label */}
              <View>
                  <Text className="text-lg font-bold text-gray-800">
                      {startDate} - {endDate}
                  </Text>
              </View>

              {/* Right arrow icon */}
              <TouchableOpacity
                  sentry-label="trend-date-right"
                  disabled={isRightDisabled || isDataLoading} // disable
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

import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "react-native-heroicons/outline";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import auth from "@react-native-firebase/auth";
import moment from "moment";
import { customTheme } from "../constants/themeConstants";

const CustomDayChartComponent = ({ changeDate }) => {
  // REDUX STORE
  const user = useSelector((state) => state.UserReducer); // get user listener instance
  const { toForceFoodData } = useSelector((state) => state.DashboardReducer); // force food data  on dashboard chart

  // STATES
  const [currentDate, setCurrentDate] = useState(
      moment().format("YYYY-MM-DD")
  ); // current date
  const [showDatePicker, setShowDatePicker] = useState(false); // show date picker
  const [prevSynctime, setPrevSynctime] = useState(); // previous sync time
  const [showLeftIcon, setShowLeftIcon] = useState(
      moment(auth().currentUser?.metadata.creationTime).format(
          "YYYY-MM-DD"
      ) === moment(currentDate).format("YYYY-MM-DD")
  ); // to show left arrow icon

  // function to handle click on left arrow
  const goLeft = () => {
      const newDate = moment(currentDate)
          .subtract(1, "days")
          .format("YYYY-MM-DD"); // get the previous date
      setCurrentDate(newDate); // set previous date as current date
  };

  // function to handle click on right arrow
  const goRight = () => {
      const newDate = moment(currentDate).add(1, "days").format("YYYY-MM-DD"); // get the next date
      setCurrentDate(newDate); //  set next date as current date
  };

  // toggle the date picker
  const toggleDateNavigation = () => {
      setShowDatePicker(!showDatePicker);
  };

  // handle when date is changed in date picker
  const handleDateChange = (date) => {
      const datePicked = moment(date).format("YYYY-MM-DD"); // set the date format
      changeDate(datePicked); // pass the function to parent components
      setCurrentDate(datePicked); // set current date
      setShowDatePicker(false); // stop showing the date picker
  };

  useEffect(() => {
      changeDate(currentDate);

      if (
          moment(auth().currentUser?.metadata?.creationTime).format(
              "YYYY-MM-DD"
          ) === moment(currentDate).format("YYYY-MM-DD")
      ) {
          // if the join date of user is equal to the current date do not show the left arrow
          setShowLeftIcon(false);
      } else {
          setShowLeftIcon(true);
      }
  }, [currentDate]);

  useEffect(() => {
      // Get current date
      const currentDate = moment().format("YYYY-MM-DD");

      const vendor = user.vendor; // get user device
      let forceData = false;

      // load only if the device sync time changes
      if (vendor === "apple") {
          if (prevSynctime !== user.deviceSyncTime_apple) {
              forceData = true;
              setPrevSynctime(user.deviceSyncTime_apple);
          } else {
              forceData = false;
          }
      } else if (vendor === "gfit") {
          if (prevSynctime !== user.deviceSyncTime_gfit) {
              forceData = true;
              setPrevSynctime(user.deviceSyncTime_gfit);
          } else {
              forceData = false;
          }
      } else if (vendor === "Fitbit") {
          if (prevSynctime !== user.deviceSyncTime_Fitbit) {
              forceData = true;
              setPrevSynctime(user.deviceSyncTime_Fitbit);
          } else {
              forceData = false;
          }
      } else if (vendor === "garmin") {
          if (prevSynctime !== user.deviceSyncTime_garmin) {
              forceData = true;
              setPrevSynctime(user.deviceSyncTime_garmin);
          } else {
              forceData = false;
          }
      } else if (vendor === "healthConnect") {
          if (prevSynctime !== user.deviceSyncTime_healthConnect) {
              forceData = true;
              setPrevSynctime(user.deviceSyncTime_healthConnect);
          } else {
              forceData = false;
          }
      }

      // change the date when something is changed in the user document
      if (forceData) {
          changeDate(currentDate, (forceDataForToday = forceData));
          setCurrentDate(currentDate);
      }
  }, [user, toForceFoodData]);

  return (
      <View
          sentry-label="day-chart-component"
          className="flex-row items-center justify-between"
          style={{ width: "100%" }}
      >
          {/* date picker */}
          <DateTimePickerModal
              isVisible={showDatePicker}
              mode="date"
              onConfirm={(date) => handleDateChange(date)}
              onCancel={toggleDateNavigation} // close date navigation
              maximumDate={
                  new Date(moment().add(1, "days").format("YYYY-MM-DD"))
              } // cannot go after the current day
              minimumDate={
                  new Date(
                      moment(auth().currentUser?.metadata?.creationTime)
                          .add(1, "day")
                          .format("YYYY-MM-DD")
                  )
              } // cannot go before the user join date
          />

          {/* Left arrow */}
          <TouchableOpacity
              sentry-label="day-chart-left-arrow"
              className="p-2  rounded-full"
              onPress={goLeft}
              disabled={!showLeftIcon} // disable the arrow
          >
              <ChevronLeftIcon
                  color={`${
                      showLeftIcon
                          ? customTheme.colors.primary
                          : customTheme.colors.light
                  }`}
              />
          </TouchableOpacity>

          {/* Date picker & current day*/}
          <View>
              <TouchableOpacity onPress={toggleDateNavigation}>
                  <Text
                      style={{ color: customTheme.colors.dark }}
                      className="text-lg font-bold"
                  >
                      {moment(currentDate).format("MMM DD, YYYY")}
                  </Text>
              </TouchableOpacity>
          </View>

          {/* Right arrow */}
          <TouchableOpacity
              sentry-label="day-chart-right-arrow"
              className={"p-2 bg-transparent rounded-full"}
              onPress={goRight}
              disabled={currentDate === moment().format("YYYY-MM-DD")}
          >
              <ChevronRightIcon
                  color={`${
                      currentDate === moment().format("YYYY-MM-DD")
                          ? customTheme.colors.light
                          : customTheme.colors.primary
                  }`}
              />
          </TouchableOpacity>
      </View>
  );
};

export default CustomDayChartComponent;

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ExclamationTriangleIcon,
  HandThumbUpIcon,
} from "react-native-heroicons/outline";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import moment from "moment";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";

import { notificationQueries } from "../../../apis/notificationQueries";
import { customTheme } from "../../../constants/themeConstants";
import { firebaseCollections } from "../../../constants/firebaseCollections";
import CustomSafeView from "../../../components/CustomSafeView";
import NotificationGraph from "../../../components/NotificationGraph";
import TopNavbar from "../components/Utils/TopNavbar";



const Notifications = () => {
  // get the user listener
  const user = useSelector((state) => state.UserReducer);

  // Check if the screen is focused or not
  const isFocused = useIsFocused();

  // Set notifications data
  const [notificationsData, setNotificationsData] = useState([]);
  const [displayNotificationsData, setDisplayNotificationsData] = useState(
      []
  );
  const [showNotficationIndex, setShowNotificationIndex] = useState(-1); // show more index
  const [prevDeviceSelected, setPrevDeviceSelected] = useState(user.vendor); // device selected
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Notifications for user
  const fetchNotificationsForUser = async (appendToStart = false) => {
      // set loading to true while notifications are being fetched
      setIsLoading(!appendToStart);

      // get notifications
      const notifications = await notificationQueries.fetchNotifications(
          user,
          notificationsData,
          appendToStart
      );

      // Set notifications
      setNotificationsData(notifications);

      // Declare update notifications
      const updatedNotificationsData = {};

      // for each notification, categorize each notification with respect to date
      notifications.forEach((data) => {
          // get date
          const date = moment(data.approvedTime).format("MMM D, YYYY");

          // if there are already notifications for that date, add it to the array otherwise create a new array
          if (updatedNotificationsData[date]) {
              // get last notification from the grouped date
              const lastNotification =
                  updatedNotificationsData[date][
                      updatedNotificationsData[date].length - 1
                  ];

              // Get latest notification
              const latestNotification = data;

              // if both the last notification and latest notification are health tip
              if (
                  lastNotification?.type === "Health Tip" &&
                  latestNotification?.type === "Health Tip"
              ) {
                  // Last notificationn approved time
                  const lastApprovedTime = moment(
                      lastNotification.approvedTime
                  ).format("h:mm a");

                  // Latest notification approved time
                  const latestApprovedTime = moment(
                      latestNotification.approvedTime
                  ).format("h:mm a");

                  // if both the last approved time and latest approved time are not equal
                  // push the notification
                  if (lastApprovedTime !== latestApprovedTime) {
                      updatedNotificationsData[date].push(latestNotification);
                  }
              } else {
                  updatedNotificationsData[date].push(latestNotification);
              }
          } else {
              updatedNotificationsData[date] = [data];
          }
      });

      // set notifications to display
      setDisplayNotificationsData(updatedNotificationsData);

      // set loading to false
      setIsLoading(false);
  };

  useEffect(() => {
      isFocused && notificationQueries.resetUnreadCounter(user.userId); // if the screen becomes focused, set the unread counter to 0
  }, [isFocused]);

  // whenver the device selected of the user changes, fetch notifications again
  useEffect(() => {
      // if user's current device is different than the previous device selected
      if (user.vendor !== prevDeviceSelected) {
          fetchNotificationsForUser(); // fetch notifications for that device
      }

      // set the prev device selected to be the new device
      setPrevDeviceSelected(user.vendor);
  }, [user]);

  // Notification Listener
  useEffect(() => {
      const unsubscribe = firestore()
          .collection(firebaseCollections.USER_COLLECTION)
          .doc(user.userId)
          .collection(firebaseCollections.NOTIFICATION_COLLECTION)
          .doc("summary")
          .collection("notifications")
          .where("device", "==", user.vendor) // where the device selected is vendor
          .where("approved", "==", true) // notification is approved
          .onSnapshot(() => {
              fetchNotificationsForUser(); // fetch notifications
          });

      return () => unsubscribe();
  }, [user.vendor]);

  // function to check if the user is close to the bottom of the scroll view
  const isCloseToBottom = ({
      layoutMeasurement,
      contentOffset,
      contentSize,
  }) => {
      const paddingToBottom = 20;
      return (
          layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom
      );
  };

  return (
      <CustomSafeView sentry-label="notification">
          <View className="relative flex-1">
              <TopNavbar showSync={false} />

              {/* Notifications screen */}
              <ScrollView
                  className="p-5 relative"
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
                  onScroll={({ nativeEvent }) => {
                      if (isCloseToBottom(nativeEvent)) {
                          // if the user is close to the bottom of the screen, fetch more notifications
                          fetchNotificationsForUser((appendToStart = true));
                      }
                  }}
                  scrollEventThrottle={400}
              >
                  {/* if notifications are loading, show an activitiy indicator */}
                  {isLoading ? (
                      <View
                          className="justify-center"
                          style={{ height: "100%" }}
                      >
                          <ActivityIndicator
                              color={customTheme.colors.primary}
                          />
                      </View>
                  ) : (
                      // show notifications
                      <View>
                          {displayNotificationsData !== null &&
                              Object.keys(displayNotificationsData).map(
                                  (date) => {
                                      return (
                                          // notification date
                                          <View key={date}>
                                              <View className="items-center mb-4">
                                                  <View className="bg-gray-300 items-center justify-center p-2 rounded-lg">
                                                      <Text className="">
                                                          {date}
                                                      </Text>
                                                  </View>
                                              </View>

                                              {/* if there is no device, show that the account has been created succesfully */}
                                              {user.vendor !== "" &&
                                                  date ===
                                                      moment(
                                                          user.joinDate
                                                      ).format(
                                                          "MMM DD, YYYY"
                                                      ) && (
                                                      <View className="mb-6">
                                                          <View className="border-2 border-orange-400 p-3 rounded-lg">
                                                              <View className="flex-row space-x-1">
                                                                  <HandThumbUpIcon
                                                                      color={
                                                                          customTheme
                                                                              .colors
                                                                              .primary
                                                                      }
                                                                      size={
                                                                          18
                                                                      }
                                                                  />
                                                                  <Text>
                                                                      Your
                                                                      account
                                                                      has been
                                                                      created
                                                                      succesfully
                                                                  </Text>
                                                              </View>
                                                          </View>
                                                      </View>
                                                  )}

                                              {/* map the notifications */}
                                              {displayNotificationsData[
                                                  date
                                              ].map((notify, index) => {
                                                  const show =
                                                      showNotficationIndex ===
                                                      index; // if user selected show more, this should be true
                                                  const message =
                                                      notify.message; // get notification message
                                                  const modified =
                                                      message.replace(
                                                          "timestamp",
                                                          moment(
                                                              notify.approvedTime
                                                          ).format("HH:mm")
                                                      ); // modify the timestamp with different format

                                                  // detect should be true if notify tupe should be any of the following
                                                  const detect =
                                                      notify.type == "Afib" ||
                                                      notify.type ==
                                                          "Arrhythmia" ||
                                                      notify.type ==
                                                          "SLEEP" ||
                                                      notify.type ==
                                                          "Hypertension";

                                                  return (
                                                      <View
                                                          key={index}
                                                          className="mb-6"
                                                      >
                                                          <View className="border-2 border-orange-400 p-3 rounded-lg">
                                                              <View className="flex-row space-x-1">
                                                                  <View>
                                                                      {/* <Text>
                                                                          {
                                                                              notify.type
                                                                          }
                                                                      </Text> */}
                                                                      {/* if detect is true, show an excalamation triangle */}
                                                                      {detect ? (
                                                                          <ExclamationTriangleIcon
                                                                              color={
                                                                                  customTheme
                                                                                      .colors
                                                                                      .primary
                                                                              }
                                                                              size={
                                                                                  18
                                                                              }
                                                                          />
                                                                      ) : notify.type ===
                                                                        "Sleep Score" ? (
                                                                          <FontAwesome
                                                                              name="moon-o"
                                                                              color={
                                                                                  customTheme
                                                                                      .colors
                                                                                      .primary
                                                                              }
                                                                              size={
                                                                                  18
                                                                              }
                                                                          />
                                                                      ) : notify.type ===
                                                                        "Health Tip" ? (
                                                                          <MaterialCommunityIcons
                                                                              name="lightbulb-on-outline"
                                                                              color={
                                                                                  customTheme
                                                                                      .colors
                                                                                      .primary
                                                                              }
                                                                              size={
                                                                                  18
                                                                              }
                                                                          />
                                                                      ) : (
                                                                          <HandThumbUpIcon
                                                                              color={
                                                                                  customTheme
                                                                                      .colors
                                                                                      .primary
                                                                              }
                                                                              size={
                                                                                  18
                                                                              }
                                                                          />
                                                                      )}
                                                                  </View>

                                                                  {/* modified section */}
                                                                  <View className="mr-3">
                                                                      <Text>
                                                                          {
                                                                              modified
                                                                          }
                                                                      </Text>
                                                                  </View>
                                                              </View>

                                                              {/* if detect is true, sho details about the notification */}
                                                              <View>
                                                                  {detect && (
                                                                      <View className="flex-row justify-end">
                                                                          <View>
                                                                              <TouchableOpacity
                                                                                  sentry-label="notification-show-more-less"
                                                                                  className="flex-row items-center"
                                                                                  onPress={() =>
                                                                                      show
                                                                                          ? setShowNotificationIndex(
                                                                                                -1
                                                                                            )
                                                                                          : setShowNotificationIndex(
                                                                                                index
                                                                                            )
                                                                                  }
                                                                              >
                                                                                  <Text className="text-orange-400 font-bold">
                                                                                      {show
                                                                                          ? "Show Less"
                                                                                          : "Show More"}
                                                                                  </Text>
                                                                                  {show ? (
                                                                                      <ChevronUpIcon
                                                                                          color={
                                                                                              customTheme
                                                                                                  .colors
                                                                                                  .primary
                                                                                          }
                                                                                      />
                                                                                  ) : (
                                                                                      <ChevronDownIcon
                                                                                          color={
                                                                                              customTheme
                                                                                                  .colors
                                                                                                  .primary
                                                                                          }
                                                                                      />
                                                                                  )}
                                                                              </TouchableOpacity>
                                                                          </View>
                                                                      </View>
                                                                  )}
                                                              </View>

                                                              {show && (
                                                                  <NotificationGraph
                                                                      notification={
                                                                          notify
                                                                      }
                                                                  />
                                                              )}
                                                          </View>
                                                          <View className="items-end">
                                                              <Text className="text-xs mt-3 text-gray-600">
                                                                  {moment(
                                                                      notify.approvedTime
                                                                  ).format(
                                                                      "h:mm a"
                                                                  )}
                                                              </Text>
                                                          </View>
                                                      </View>
                                                  );
                                              })}
                                          </View>
                                      );
                                  }
                              )}
                      </View>
                  )}
              </ScrollView>
          </View>
      </CustomSafeView>
  );
};
export default Notifications;

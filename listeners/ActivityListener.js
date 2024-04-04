import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { activityActionTypes } from "../store/ActivityReducer/ActivityActionTypes";

export const ActitvityListener =  (dispatch, deviceSelected = "") => {
    return new Promise((resolve, reject) => {
      // Get user id if available from the auth
      // const { deviceSelected } = useSelector((state) => state.DeviceReducer);
      const currentDay = moment().format("YYYY-MM-DD"); 
      const date = currentDay.concat(`-${deviceSelected}`)

      const userId = auth().currentUser.uid

      if(deviceSelected == ""){
        return unsubscribe;
      }

      // Listen for changes
      const unsubscribe = firestore()
      .collection("user")
      .doc(userId)
      .collection("activity")
      .doc(date)
      .collection("intraday")
      .doc("details")
      .onSnapshot((snapshot) => {
          if (snapshot.exists) {
              const data = snapshot.data();
              const activityIntraday = data.activities;


              // const timeSeries = data.activities;
              // //const timeArray = []
              // const timeArray = Array.from({ length: 1440 }).map(() => 0);
              // //const timeArray = Array.from({ length: 1440 }).map((value, index) => { return { x: index, y: -1 } })
              // timeSeries.forEach((data) => {
              //     const time = data.time;
              //     const value = data.level + 1;
              //     //get the index in timeArray from the time.
              //     const index = moment(time, "HH:mm:ss").diff(moment().startOf("d"), "minute");
              //     timeArray[index] = value;
              // });
              dispatch({
                type: activityActionTypes.FETCH_ACTIVITY_INTRADAY,
                payload: {acitivityIntraday : activityIntraday, date : date}
              })
            
              // saveToDevice(`ActivityIntraday_${date}`, JSON.stringify(timeArray))
          } else {
            (error) => {
              reject(error);
            }
              //ACTIVITY_INTRADAY_CACHE[date] = [];
          }
      })
  
      // return a cleanup function to unsubscribe when needed
      return unsubscribe;
    });
  };


  
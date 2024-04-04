import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";


const FetchDataWithoutUpdatingRedux = async(queryDate, deviceSelected) => {
  const userId = auth().currentUser.uid
  
  const ACTIVITY_RATE_CACHE = {}
  const ACTIVITY_INTRADAY_CACHE = {}
  // The dates that are currently being fetched.
  const DATES_FETCHING = {}
  // Dates fetching for intraday
  
  // const { deviceSelected } = useSelector((state) => state.DeviceReducer)

  const date = queryDate.concat(`-${deviceSelected}`)
  const promises = []

  if (DATES_FETCHING[date]) {
    promises.push(DATES_FETCHING[date]);
  } else if (!ACTIVITY_RATE_CACHE[date]) {
    const promise = firestore()
      .collection("user")
      .doc(userId)
      .collection("activity")
      .doc(date)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          const data = snapshot.data();
          ACTIVITY_RATE_CACHE[date] = data;

          //saveToDevice(`Activity_${date}`, JSON.stringify(data))
        } else {
          ACTIVITY_RATE_CACHE[date] = {};
        }
        //delete from dates fetching.
        delete DATES_FETCHING[date];
      });
    DATES_FETCHING[date] = promise;
    promises.push(promise)
  }




  await Promise.all(promises)

    return { activity: ACTIVITY_RATE_CACHE[date]};

    
    // dispatch({
    //   type: activityActionTypes.FETCH_ACTIVITY_INTRADAY,
    //   payload: { acitivityIntraday: ACTIVITY_INTRADAY_CACHE[date], date: date }

    // })

    // dispatch({
    //   type: activityActionTypes.FETCH_ACTIVITY_RATE,
    //   payload: ACTIVITY_RATE_CACHE[date]
    // })

  

};



export {FetchDataWithoutUpdatingRedux};
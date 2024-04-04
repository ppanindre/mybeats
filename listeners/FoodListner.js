import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import moment from "moment";
import { foodActionTypes } from "../store/FoodReducer/FoodActionTypes";

export const FoodListner =(dispatch, date=null) => {
    return new Promise((resolve, reject) => {

        const userId = auth().currentUser.uid;

        let currentDay = moment().format("YYYY-MM-DD");
        if(date !== null){ 
            currentDay = date
        }

        const unsubscribe = firestore()
        .collection("user")
        .doc(userId)
        .collection("food")
        .doc(currentDay)
        .onSnapshot((snapShot) => {
            if (snapShot.exists) {
                const data = snapShot.data();

                console.log("food data", data)
                                
                dispatch({
                    type: foodActionTypes.FETCH_FOOD_DATA,
                    payload: { foodData:  data , date: currentDay }
          
                  })

            } else {

                dispatch({
                    type: foodActionTypes.FETCH_FOOD_DATA,
                    payload: { foodData:  {} , date: currentDay }
          
                  })
            }

        });

     

      return unsubscribe;

    })
}
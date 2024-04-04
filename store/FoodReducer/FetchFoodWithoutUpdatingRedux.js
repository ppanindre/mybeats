import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";




const FetchFoodWithoutUpdatingRedux = async(date) => {

        const userId = auth().currentUser.uid

        const FOOD_CACHE = {}
        const DATES_FETCHING = {}

        if (DATES_FETCHING[date]) {
            await DATES_FETCHING[date];
        } else if (!FOOD_CACHE[date]) {
            const promise = firestore()
                .collection("user")
                .doc(userId)
                .collection("food")
                .doc(date)
                .get()
                .then((snapShot) => {
                    if (snapShot.exists) {
                        const data = snapShot.data();
                        FOOD_CACHE[date] = data;
                    } else {
                        FOOD_CACHE[date] = {};
                    }
                    delete DATES_FETCHING[date];
                });
    
            DATES_FETCHING[date] = promise;
            await promise;
        }

        return FOOD_CACHE[date];
       
    
        
}

export {FetchFoodWithoutUpdatingRedux}
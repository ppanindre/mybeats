import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import { ACTIVITY_SUBCOLLECTION, HEART_RATE_SUBCOLLECTION, SLEEP_SUBCOLLECTION }
    from "../../constants/firebaseCollections";

/**
 * 
 * @param {Array<string>} ids the document ids that needs to be queried.
 * @param {string} collection the collection to query
 */
const fetchMultipleDcoumentsById = async (ids, collection, options = {}, deviceSelected = "") => {
    //Max 10 ids can be fetched at one query.
    //We need to split the ids into chunks.

    // const user = await getUser()
    

    if(deviceSelected == "")
        return;
    


    // modify collection to fetch from vendor specific ones
    if (options?.subcollection == HEART_RATE_SUBCOLLECTION ||
        options?.subcollection == "activity" ||
        options?.subcollection == SLEEP_SUBCOLLECTION) {
        for (let i = 0; i < ids.length; i++) {
            ids[i] = ids[i] + "-" + deviceSelected
        }
    }


    const chunked = chunk(ids, 10)
    const data = []
    const promises = []




    chunked.forEach((chunks) => {
        let ref = firestore().collection(collection)



        //add subcollection 
        if (options.doc) {

            ref = ref.doc(options.doc).collection(options.subcollection)
  


        }
        promises.push(ref
            .where(firestore.FieldPath.documentId(), "in", chunks)
            .get()
            .then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                    data.push({ ...doc.data(), id: doc.id.replace("-" + deviceSelected,"") })
                })
            })
            .catch(() =>
                console.error(`Error fetching ids ${chunks} from collection ${collection}`)));
    });
    await Promise.all(promises)




    return data;
}


/**
 * @param {Array<any>} arr The array to chunk
 * @param {number} size the size of the chunk
 * @returns 
 */
const chunk = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size)
    );




export {
    fetchMultipleDcoumentsById
}
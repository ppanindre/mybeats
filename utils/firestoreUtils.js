import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import getUser from "../cache/userCache";
import { firebaseCollections}
    from "../constants/firebaseCollections";

/**
 * 
 * @param {Array<string>} ids the document ids that needs to be queried.
 * @param {string} collection the collection to query
 */
const fetchMultipleDcoumentsById = async (ids, collection, options = {}, currentActiveDevice) => {
    //Max 10 ids can be fetched at one query.
    //We need to split the ids into chunks.

    const user = await getUser()

    // modify collection to fetch from vendor specific ones
    if (options?.subcollection == firebaseCollections.HEART_RATE_SUBCOLLECTION ||
        options?.subcollection == firebaseCollections.ACTIVITY_SUBCOLLECTION ||
        options?.subcollection == firebaseCollections.SLEEP_SUBCOLLECTION) {
        
        for (let i = 0; i < ids.length; i++) {
            ids[i] = ids[i] + "-" + currentActiveDevice
        }
    }

    const chunked = chunk(ids, 10)
    const data = []
    const promises = []

    chunked.forEach((chunks) => {
        let ref = firestore().collection(firebaseCollections.USER_COLLECTION)

        //add subcollection 
        if (options.doc) {
            ref = ref.doc(options.doc).collection(options.subcollection)
        }
        promises.push(ref
            .where(firestore.FieldPath.documentId(), "in", chunks)
            .get()
            .then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                    data.push({ ...doc.data(), id: doc.id.replace("-" + currentActiveDevice,"") })
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
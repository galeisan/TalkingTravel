import {app, database} from '../firebase'

import {collection, getDocs, orderBy, query} from "firebase/firestore";

export const getAllFeeds = async (database:any) => {
    const feeds = await getDocs(
        query(collection(database, "posts"), orderBy("id", "desc"))
    )
    return feeds.docs.map(doc => doc.data())
}
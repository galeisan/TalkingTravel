import React, {useEffect, useRef, useState} from "react"
import {collection} from "firebase/firestore";
import {database, useAuth} from "../../firebase";
import {useNavigate} from "react-router";
import {getAllFeeds} from "../../utils/fetchData";
import styles from "./index.module.sass";
import {Button} from "../ui/Button";
import {GalleryPin} from "../GalleryPin";

export const Feed = () => {
    const [loading, setLoading] = useState(false)
    const [feeds, setFeeds] = useState<any>([])

    let navigate = useNavigate()

    const doSmth = () => {
    }

    useEffect(() => {
        setLoading(true)
        getAllFeeds(database).then((data) => {
            setFeeds(data)
            console.log(data)
            setLoading(false)
        })
    }, [])

    if (loading) return <div>Загрузка...</div>

    return (
        <div className={styles.feed}>
            {feeds && feeds.map((data: any) => (
                <GalleryPin data={data}/>
            ))}
        </div>
    )
}
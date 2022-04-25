import {observer} from "mobx-react";
import {useNavigate} from "react-router";
import {BaseLayout} from "../../components/BaseLayout";
import React, {useEffect, useRef, useState} from "react"
import {useParams} from "react-router-dom"
import {database, useAuth} from "../../firebase";
import styles from "./index.module.sass";
import {getSpecificPin, getUserInfo} from "../../utils/fetchData";
import avatar from "../../assets/header_profile_icon.svg";
import {LikeArticle} from "../../components/LikeArticle";



export const CardPage = observer(() => {
    let navigate = useNavigate()

    const currentUser = useAuth()
    const {pinId} = useParams()

    const [loading, setLoading] = useState(false)
    const [imageInfo, setImageInfo] = useState<any>(null)
    const [userInfo, setUserInfo] = useState<any>(null)

    useEffect(()=>{
        if(pinId){
            setLoading(true)
            getSpecificPin(database, pinId).then((data) =>{
                setImageInfo(data)
                console.log(data)
                // getUserInfo(database, data.userId).then((user)=>{
                //     setUserInfo(user)
                //  })
                // console.log(data)
                setLoading(false)
            })
        }
    },[pinId])

    if(loading) return <div>Загрузка...</div>

    const goTo = (path: string): void => {
        navigate(path)
    }

    return (
        <BaseLayout>
            <div className={styles.contentWrapper}>
                <div className={styles.contentContainer}>
                    <div className={styles.titleWrapper}>
                        <h3>{imageInfo?.title}</h3>
                        <div className={styles.infoWrapper}>
                            <img className={styles.pinImage} src={imageInfo?.imageURL}/>
                            {userInfo && <div className={styles.info}>
                                <img className={styles.userImage} src={userInfo?.photoURL ? userInfo?.photoURL : avatar}/>
                                <div>{userInfo?.name}</div>
                            </div>}
                            <div className={styles.info}>
                                {imageInfo?.description}
                            </div>
                            <div className={styles.like_btn}>
                                {currentUser && <LikeArticle id={imageInfo.id} likes={imageInfo.likes}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
});
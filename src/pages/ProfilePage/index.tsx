import React, {useEffect, useRef, useState} from "react"
import {observer} from "mobx-react";
import {useNavigate} from "react-router";
import {BaseLayout} from "../../components/BaseLayout";
import {app, logout, useAuth, database} from "../../firebase";
import Profile from "../../components/profile";
import {Button} from "../../components/ui/Button";
import styles from "./index.module.sass";
import {collection} from "firebase/firestore";
import {getDocs} from "firebase/firestore";
import {getAllFeeds} from "../../utils/fetchData";
import {Feed} from "../../components/Feed";

export const ProfilePage = observer(() => {

    const [loading, setLoading] = useState(false)
    const [usersInfo, setUsersInfo] = useState<any>([]);

    const usersDatabaseRef = collection(database, 'profile');
    const currentUser = useAuth()

    let navigate = useNavigate()

    if(loading) return <div>Загрузка...</div>

    useEffect(()=>{

    },[])


    useEffect(() => {
        const getUsersInfo = async () => {
            const data = await getDocs(usersDatabaseRef)
            let arr = data.docs.map((doc) => ({...doc.data()}))
            let user = arr.findIndex(function (user,index){
                return user.uid === currentUser.uid
            })
            let ans = arr[user]
            console.log(ans)
            setUsersInfo(ans)
            console.log(usersInfo)
        };
        getUsersInfo().then(err => console.log(err));
    }, [])

    async function handleLogout(){
        setLoading(true)
        try {
            await logout()
            navigate('/')
        } catch {
            alert("Error!")
        }
        setLoading(false)
    }

    const handleChangeProfile = () => {
        console.log(currentUser)
    }

    return (
        <BaseLayout>
            <div className={styles.content_container}>
                <div className={styles.content_wrapper}>
                            <div className={styles.user_info_wrapper}>
                                <img className={styles.user_avatar} src={currentUser?.photoURL} alt="IMAGE"/>
                                <div className={styles.user_info}>
                                    <h5>{usersInfo.name}</h5>
                                    <Button onClick={handleChangeProfile} disabled={false} mode={"secondary"}>
                                        Редактировать
                                    </Button>
                                </div>
                            </div>
                            <div className={styles.menu_container}>
                                Мои места Подборки Лайки Прочее
                            </div>
                    {currentUser &&
                    <>
                        <Profile/>
                        <Button disabled={loading|| !currentUser} onClick={handleLogout}>Выйти</Button>
                    </>}
                </div>
            </div>
        </BaseLayout>
    )
});
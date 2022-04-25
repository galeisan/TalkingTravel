import {observer} from "mobx-react";
import {useNavigate} from "react-router";
import heartPurple from "../../assets/purple_heart.svg"
import heartBlack from "../../assets/heart_black.svg"
import {useAuth} from "../../firebase";
import styles from "./index.module.sass";

export function LikeArticle({id, likes}:any) {
    const currentUser = useAuth()

    console.log(currentUser)

    return (
        <div>
            <img className={styles.like_icon}
                 src={`${!likes?.includes(currentUser.uid) ? heartPurple : heartBlack}`}/>
        </div>
    )
}
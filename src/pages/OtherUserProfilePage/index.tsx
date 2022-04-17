import {observer} from "mobx-react";
import {useNavigate} from "react-router";
import {BaseLayout} from "../../components/BaseLayout";
import React, {useEffect, useRef, useState} from "react"
import {useParams} from "react-router-dom"
import {database, useAuth} from "../../firebase";
import styles from "./index.module.sass";
import {getSpecificPin} from "../../utils/fetchData";



export const OtherUserProfilePage = observer(() => {
    let navigate = useNavigate()

    const goTo = (path: string): void => {
        navigate(path)
    }

    return (
        <BaseLayout>
            Юзеррр
        </BaseLayout>
    )
});
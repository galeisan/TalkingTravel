import React, {useEffect, useRef, useState} from "react"
import styles from "./index.module.sass";
import {Link, NavLink} from "react-router-dom";


export const GalleryPin = ({data}:any) => {

    return (
        <div className={styles.pinWrapper}>
            <Link to={''}>
                <img className={styles.pinImage} src={data.imageURL}/>
            </Link>
            <div className={styles.content}>
                <div className={styles.userInfo}>
                    <div>{data.country}</div>
                    <div>{data.address}</div>
                    <h5 className={styles.title}>{data.title}</h5>
                </div>
            </div>
        </div>
    )
}
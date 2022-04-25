import React from 'react';
import styles from "./index.module.sass";
import {NavLink} from "react-router-dom";
import {Button} from "../ui/Button";
import {useNavigate} from "react-router";

export const Menu = (props: any) =>{
    const { children } = props;
    let navigate = useNavigate()

    return (
        <div className={styles.menu_container}>
            <NavLink to='/'
                     className={(navData) => navData.isActive ? styles.header_link_active : styles.header_link}>
                Мои места
            </NavLink>
            <NavLink to='/'
                     className={(navData) => navData.isActive ? styles.header_link_active : styles.header_link}>
                Подборки
            </NavLink>
            <NavLink to='/'
                     className={(navData) => navData.isActive ? styles.header_link_active : styles.header_link}>
                Лайки
            </NavLink>
            <NavLink to='/'
                     className={(navData) => navData.isActive ? styles.header_link_active : styles.header_link}>
                Прочее
            </NavLink>
        </div>
    )
}
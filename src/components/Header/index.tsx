import React from 'react';
import styles from './index.module.sass';
import header_logo from '../../assets/header_logo.svg'
import header_search_icon from '../../assets/header_search_icon.svg'
import header_profile_icon from '../../assets/header_profile_icon.svg'
import vertical_divider from '../../assets/vertical_divider.svg'
import {NavLink} from "react-router-dom";
import {Button} from "../ui/Button";
import {useNavigate} from "react-router";

export const Header = (props: any) =>{
    const { children } = props;
    let navigate = useNavigate()

    const goToLogin = (): void => {
        navigate('/login')
    }

    return (
        <div className={styles.container}>
            <div className={styles.header_wrapper}>
                <img className={styles.header_logo} src={header_logo}/>
                <div className={styles.header_content_wrapper}>
                <div className={styles.header_links_wrapper}>
                    <NavLink to='/'
                             className={(navData) => navData.isActive ? styles.header_link_active : styles.header_link}>
                        Главная
                    </NavLink>
                    <NavLink to='/gallery'
                             className={(navData) => navData.isActive ? styles.header_link_active : styles.header_link}>
                        Галерея
                    </NavLink>
                    <NavLink to='/'
                             className={(navData) => navData.isActive ? styles.header_link_active : styles.header_link}>
                        Контакты
                    </NavLink>
                </div>
                    <img className={styles.vertical_divider} src={vertical_divider}/>
                    <img className={styles.header_icon} src={header_search_icon}/>
                    <Button id={styles.header_login_btn} onClick={goToLogin} disabled={false}>
                        <img className={styles.header_icon} src={header_profile_icon}/>
                    </Button>
                </div>
            </div>
        </div>
    )
}
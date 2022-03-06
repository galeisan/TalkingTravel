import {FC} from "react";
import classNames from "classnames/bind";
import {IButton} from "./index.interfaces";
import styles from './index.module.sass';


const cx = classNames.bind(styles);

export const Button: FC<IButton> = ({onClick, disabled, mode='primary', children}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={cx({
                button: true,
                primary: mode === 'primary',
                secondary: mode === 'secondary'
            })}
        >
            {children}
        </button>
    )
}
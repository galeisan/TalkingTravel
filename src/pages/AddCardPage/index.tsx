import {observer} from "mobx-react";
import {useNavigate} from "react-router";
import {BaseLayout} from "../../components/BaseLayout";
import styles from "./index.module.sass";



export const AddCardPage = observer(() => {
    let navigate = useNavigate()

    const goTo = (path: string): void => {
        navigate(path)
    }

    return (
        <BaseLayout>
            <div className={styles.page_container}>
                <div className={styles.content_container}>
                    <h4>Маленький заголовок</h4>
                    <h2>Большой заголовок</h2>
                    <h5>Добавь новое место. Карточка отобразиться на главной странице и в твоем блоге.</h5>
                </div>
            </div>
        </BaseLayout>
    )
});
import {observer} from "mobx-react";
import {useNavigate} from "react-router";
import {BaseLayout} from "../../components/BaseLayout";
import styles from "./index.module.sass";
import main_image from '../../assets/main_page_background.jpg'
import {Button} from "../../components/ui/Button";



export const MainPage = observer(() => {
    let navigate = useNavigate()

    const goTo = (path: string): void => {
        navigate(path)
    }

    return (
        <BaseLayout>
            <div className={styles.container}>
                <div className={styles.content_container}>
                        <h4>TEXT</h4>
                        <p>What a beautiful sunrise</p>
                    <Button disabled={false} onClick={() => goTo('/')}>Тескт кнопки</Button>
                </div>
               {/*<img className={styles.main_image} src={main_image} alt="IMAGE"/>*/}
            </div>
        </BaseLayout>
    )
});
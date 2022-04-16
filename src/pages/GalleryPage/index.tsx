import {observer} from "mobx-react";
import {useNavigate} from "react-router";
import {BaseLayout} from "../../components/BaseLayout";
import {Feed} from "../../components/Feed";
import React from "react";



export const GalleryPage = observer(() => {
    let navigate = useNavigate()

    const goTo = (path: string): void => {
        navigate(path)
    }

    return (
        <BaseLayout>
            <div>
                <Feed/>
            </div>
        </BaseLayout>
    )
});
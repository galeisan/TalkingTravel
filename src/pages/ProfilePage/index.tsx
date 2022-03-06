import React, {useEffect, useRef, useState} from "react"
import {observer} from "mobx-react";
import {useNavigate} from "react-router";
import {BaseLayout} from "../../components/BaseLayout";
import {logout, useAuth} from "../../firebase";
import Profile from "../../components/profile";
import {Button} from "../../components/ui/Button";


export const ProfilePage = observer(() => {

    const [loading, setLoading] = useState(false)
    let navigate = useNavigate()
    const currentUser = useAuth()

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

    return (
        <BaseLayout>
            <div>Currently logged in as: {currentUser?.email}</div>
            <div>Currently logged in as: {currentUser?.displayName}</div>
            {currentUser &&
            <>
                <Profile/>
                <Button disabled={loading|| !currentUser} onClick={handleLogout}>Log out</Button>
            </>}
        </BaseLayout>
    )
});
import {observer} from "mobx-react";
import {Navigate, useNavigate} from "react-router";
import {BaseLayout} from "../../components/BaseLayout";
import React, {useCallback, useContext, useRef, useState} from "react";
import {login, logout, useAuth} from "../../firebase";
import Profile from '../../components/profile'


export const LoginPage = observer(() => {
    const [loading, setLoading] = useState(false)
    const currentUser = useAuth()

    let navigate = useNavigate()

    const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    async function handleLogout(){
        setLoading(true)
        try {
            await logout()
        } catch {
            alert("Error!")
        }
        setLoading(false)
    }

    async function handleLogin(){
        setLoading(true)
        try {
            await login(emailRef.current.value, passwordRef.current.value);
        } catch {
            alert("Error!")
        }
        setLoading(false)
    }
    return (
        <BaseLayout>
            <div>Currently logged in as: {currentUser?.email}</div>

            {!currentUser &&
            <>
                <input ref={emailRef} placeholder="Email" />
                <input ref={passwordRef} type="password" placeholder="Password" />
                <button disabled={loading} onClick={handleLogin}>Log in</button>
            </>
            }

            {currentUser &&
            <>
                <Profile/>
                <button disabled={loading|| !currentUser} onClick={handleLogout}>Log out</button>
            </>}
        </BaseLayout>
    )
});

import {observer} from "mobx-react";
import {Navigate, useNavigate} from "react-router";
import {BaseLayout} from "../../components/BaseLayout";
import React, {useCallback, useContext, useRef, useState} from "react";
import {login, signInWithGoogle, useAuth} from "../../firebase";
import {NavLink} from "react-router-dom";
import {Button} from "../../components/ui/Button";
import {Input} from "../../components/ui/Input";



export const LoginPage = observer(() => {
    const [loading, setLoading] = useState(false)
    const currentUser = useAuth()

    let navigate = useNavigate()

    const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;


    async function handleLogin(){
        setLoading(true)
        try {
            await login(emailRef.current.value, passwordRef.current.value);
            navigate('/profile')
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
                <Input ref={emailRef} placeholder="Email" />
                <Input ref={passwordRef} type="password" placeholder="Password" />
                <Button disabled={loading} onClick={handleLogin}>Log in</Button>
                <Button disabled={loading} onClick={signInWithGoogle}>Log in with Google</Button>
                Еще нет аккаунта?
                <NavLink to='/signup'>
                    Зарегистрироваться
                </NavLink>
            </>
            }

        </BaseLayout>
    )
});

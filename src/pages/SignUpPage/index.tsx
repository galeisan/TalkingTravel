import {observer} from "mobx-react";
import {useNavigate} from "react-router";
import {BaseLayout} from "../../components/BaseLayout";
import React, {useEffect, useRef, useState} from "react";
import {signup, logout, login, useAuth} from '../../firebase';
import {NavLink} from "react-router-dom";
import {Button} from "../../components/ui/Button";
import {Input} from "../../components/ui/Input";


export const SignUpPage = observer(() => {
    const [loading, setLoading] = useState(false)
    const currentUser = useAuth()

    let navigate = useNavigate()

    const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;



    async function handleSignUp(){
        setLoading(true)
        try {
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate('/profile')
        } catch(e) {
            console.log((e as Error).message)
        }
        setLoading(false)
    }


    return (
        <BaseLayout>
            <div>Currently logged in as: {currentUser?.email}</div>
            <Input ref={emailRef} placeholder="Email" />
            <Input ref={passwordRef} type="Password" placeholder="Password" />
            <Button disabled={loading || currentUser} onClick={handleSignUp}>Sign up</Button>
            Уже есть аккаунт?
            <NavLink to='/login'>
                Войти
            </NavLink>
        </BaseLayout>
    )
});

import {observer} from "mobx-react";
import {useNavigate} from "react-router";
import {BaseLayout} from "../../components/BaseLayout";
import React, {useRef, useState} from "react";
import {signup, logout, login, useAuth} from '../../firebase';


export const SignUpPage = observer(() => {
    const [loading, setLoading] = useState(false)
    const currentUser = useAuth()

    let navigate = useNavigate()

    const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    async function handleSignUp(){
        setLoading(true)
        try {
            await signup(emailRef.current.value, passwordRef.current.value);
        } catch {
            alert("Error!")
        }
        setLoading(false)
    }


    return (
        <BaseLayout>
            <div>Currently logged in as: {currentUser?.email}</div>
            <input ref={emailRef} placeholder="Email" />
            <input ref={passwordRef} type="password" placeholder="Password" />
            <button disabled={loading || currentUser} onClick={handleSignUp}>Sign up</button>
        </BaseLayout>
    )
});

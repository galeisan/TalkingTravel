import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,
    signOut, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage"
import {useEffect, useState} from "react";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_API_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const storage = getStorage()
const provider = new GoogleAuthProvider()

export const signInWithGoogle = () =>{
    signInWithPopup(auth, provider).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })
}

export function signup(email:any,  password:any){
    return createUserWithEmailAndPassword(auth, email, password)
}

export function login(email:any, password:any){
    return signInWithEmailAndPassword(auth, email, password);
}

export function logout(){
    return signOut(auth)
}

export function useAuth(){
    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(()=>{
       const unsub = onAuthStateChanged(auth, user => setCurrentUser(user))
        return unsub
    },[])

    return currentUser;
}

export async function upload(file:any, currentUser:any, setLoading:any){
    const fileRef = ref(storage, currentUser.uid + '.png')
    setLoading(true)
    const snapshot = await uploadBytes(fileRef, file)
    const photoURL = await getDownloadURL(fileRef)

    await updateProfile(currentUser, {photoURL})

    setLoading(false)
    alert("Uploaded file")
}


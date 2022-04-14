import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,
    signOut, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage"
import {useEffect, useState} from "react";
import {addDoc, collection, doc, getFirestore} from 'firebase/firestore';
import firebase from "firebase/compat/app";
import "firebase/firestore"
import "firebase/storage"


const firebaseConfig = {
    apiKey: "AIzaSyDt5W8flTMF-2mRUIHOQ56esDexqRfFiKc",
    authDomain: "talking-travel-78a9c.firebaseapp.com",
    projectId: "talking-travel-78a9c",
    storageBucket: "talking-travel-78a9c.appspot.com",
    messagingSenderId: "954833119569",
    appId: "1:954833119569:web:71c2759db3007b00e68b70"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export const storage = getStorage()
const provider = new GoogleAuthProvider()
export const database = getFirestore();
const usersDatabaseRef = collection(database, 'profile');



export const signInWithGoogle = () =>{
    signInWithPopup(auth, provider).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })
}

export function signup(email:any,  password:any, userData?:any){
    return createUserWithEmailAndPassword(auth, email, password)
        .then((registeredUser) => {
        addDoc(usersDatabaseRef, {
            uid: registeredUser.user.uid,
            name: userData.name,
            email: userData.email
        })
            .then(res => console.log(res));
    })
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


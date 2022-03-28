import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,
    signOut, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage"
import {useEffect, useState} from "react";


const firebaseConfig = {
  apiKey: "AIzaSyCkciqlJj5EA-nyMmxENHYyHzOwwi2aC9M",
  authDomain: "talking-travel-auth-a9134.firebaseapp.com",
  databaseURL: "https://talking-travel-auth-a9134-default-rtdb.firebaseio.com",
  projectId: "talking-travel-auth-a9134",
  storageBucket: "talking-travel-auth-a9134.appspot.com",
  messagingSenderId: "71959847892",
  appId: "1:71959847892:web:8d7a75445d3630a8026c41"
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


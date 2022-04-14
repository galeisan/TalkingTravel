import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import styles from "./index.module.sass";
import {Input} from "../ui/Input";
import {useAuth} from "../../firebase";
import {ref} from 'firebase/storage'
import firebase from "firebase/compat/app";
import { collection, onSnapshot,  doc, setDoc } from "firebase/firestore";

export const Form = () => {
    let selectedFile:any;

    const {handleSubmit, formState: {errors}, reset} = useForm()
    const currentUser = useAuth()

    const[title, setTitle] = useState('')
    const[country, setCountry] = useState('')
    const[address, setAddress] = useState('')
    const[image, setImage] = useState('')
    const[description, setDescription] = useState('')

    const handleFileSelect = (e:any) =>{
        setImage(e.target.files[0])
    }



    const create = (data:any) =>{
        // const {title, country, address, description, image} = data;
        // const upload = ref(storage,`images/${image.name}`)
        // const uploadTask = uploadBytes(storageReference, file);
        // upload.on("state_changed", (snp) =>{
        //     let progress = (snp.bytesTransferred / snp.totalBytes)*100
        //     console.log(progress)
        // }, (err) =>{
        //     console.log(err)
        // }, () =>{
        //     storage.ref("images")
        //         .child(image.name)
        //         .getDownloadURL()
        //         .then(url =>{
        //             const unsubscribe = onSnapshot(collection(db, "posts"), () => {
        //                 setDoc(doc(db, "data", "one"), {
        //                     address,
        //                     country,
        //                     currentTime: firebase.firestore.FieldValue.serverTimestamp(),
        //                     description,
        //                     image: url,
        //                     title,
        //                     username: currentUser.username
        //                 });
        //             });
        //         })
        // })
    }

    const onSubmit = async (data: any) => {
        setAddress('')
        setCountry('')
        setImage('')
        setTitle('')
        setDescription('')
        console.log(data)
        reset()
    }

    return (
            <form onSubmit={handleSubmit(onSubmit)} className={styles.card_form}>
                <Input placeholder={'Название'} id="title"/>
                {errors.title && (<span className={styles.err_span}>Required</span>)}
                <Input placeholder={'Страна'} id="country"/>
                {errors.country && (<span className={styles.err_span}>Required</span>)}
                <Input placeholder={'Aдрес'} id="address"/>
                {errors.address && (<span className={styles.err_span}>Required</span>)}
                <textarea id="description" placeholder={'Расскажи о своем опыте'}/>
                {errors.description && (<span className={styles.err_span}>Required</span>)}
                <input type="file" id="upload" required onChange={handleFileSelect}/>
                <input id={styles.card_form_submit} type="submit" value="Добавить" onClick={() => {}}/>
                <h5>(массив)категории + фото</h5>
            </form>
    )
}
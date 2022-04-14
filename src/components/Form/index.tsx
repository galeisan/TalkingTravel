import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import styles from "./index.module.sass";
import {Input} from "../ui/Input";
import {database, storage, uploadUserPhoto, useAuth} from "../../firebase";
import {getDownloadURL, ref, uploadBytes,  deleteObject, uploadBytesResumable} from 'firebase/storage'
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
    const [loading, setLoading] = useState(false)
    const [imageAsset, setImageAsset]=useState('')

    const postsDatabaseRef = collection(database, 'posts');


    const uploadImage = (e:any) =>{
        setLoading(true)
        const file = e.target.files[0]
        const fileRef = ref(storage, 'posts/' + currentUser.uid +`${file.name}`)
        const uploadTask = uploadBytesResumable(fileRef, file)

        uploadTask.on('state_changed', (snapshot:any)=>{
            const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        }, (error:any)=>{
            console.log(error)
        }, ()=>{getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageAsset(downloadURL)
            setLoading(false)
        })
        })
    }

    const deleteImage = () =>{
        const deleteRef = ref(storage, imageAsset)
        deleteObject(deleteRef).then(() =>{
            setImageAsset('')
        }).catch((error) => {
            console.log(error)
        })
    }


    const uploadDetails = async () => {
      try{
          setLoading(true)
          if(!title && !country && !address && !description && !imageAsset){
              console.log('no ditails')
          } else {
              const data = {
                  id: `${Date.now()}`,
                  title: title,
                  country: country,
                  address: address,
                  userId: currentUser.uid,
                  imageURL: imageAsset,
                  description: description
              }
              await setDoc(doc(database, 'posts', `${Date.now()}`), data)
          }
      } catch (error){
          console.log(error)
      }
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
                <Input placeholder={'Название'} id="title" onChange={(e: any) => setTitle(e.target.value)}/>
                {errors.title && (<span className={styles.err_span}>Required</span>)}
                <Input placeholder={'Страна'} id="country"  onChange={(e: any) => setCountry(e.target.value)}/>
                {errors.country && (<span className={styles.err_span}>Required</span>)}
                <Input placeholder={'Aдрес'} id="address"  onChange={(e: any) => setAddress(e.target.value)}/>
                {errors.address && (<span className={styles.err_span}>Required</span>)}
                <textarea id="description" placeholder={'Расскажи о своем опыте'}  onChange={(e: any) => setDescription(e.target.value)}/>
                {errors.description && (<span className={styles.err_span}>Required</span>)}
                <input type="file" id="upload" required onChange={uploadImage}/>
                <button onClick={deleteImage}/>
                <input id={styles.card_form_submit} type="submit" value="Добавить" onClick={uploadDetails}/>
                <h5>(массив)категории + фото</h5>
            </form>
    )
}
import React from 'react'
import { useForm } from 'react-hook-form'
import styles from "./index.module.sass";
import {Input} from "../ui/Input";
import {useAuth} from "../../firebase";
import firebase from "firebase/compat";

export const Form = () => {
    let selectedFile:any;

    const {register, handleSubmit, formState: {errors}, reset} = useForm()
    const currentUser = useAuth()

    const onSubmit = async (data: any) => {
        console.log(data)
        reset()
    }

    function handleFileSelect(event:any) {
        selectedFile = event.target.files[0];
    };
    //
    // function confirmUpload() {
    //     var metadata = {
    //         contentType: 'image',
    //         customMetadata: {
    //             'dogType': 'Lab',
    //             'uploadedBy': currentUser.uid,
    //             'title': $("#title").val(),
    //             'country': $("#country").val(),
    //             'address': $("#address").val(),
    //             'description': $("#description").val(),
    //         },
    //     };
    //     var uploadTask = firebase.storage().ref().child('dogImages/' + selectedFile.name).put(selectedFile, metadata);
    //     uploadTask.on('state_changed', function(snapshot){
    //     }, function(error) {
    //     }, function() {
    //         $(".upload-group")[0].before("Success!");
    //         $(".upload-group").hide();
    //
    //     });
    //
    // }

    return (
            <form onSubmit={handleSubmit(onSubmit)} className={styles.card_form}>
                <Input placeholder={'Название'} id="title"
                    {...register('title', {required: true})}/>
                {errors.title && (<span className={styles.err_span}>Required</span>)}
                <Input placeholder={'Страна'} id="country"
                       {...register('country', {required: true})}/>
                {errors.country && (<span className={styles.err_span}>Required</span>)}
                <Input placeholder={'Aдрес'} id="address"
                       {...register('address', {required: true})}/>
                {errors.address && (<span className={styles.err_span}>Required</span>)}
                <textarea id="description" placeholder={'Расскажи о своем опыте'}
                {...register('description', {required: true})}/>
                {errors.description && (<span className={styles.err_span}>Required</span>)}
                <input type="file" id="upload" required onChange={handleFileSelect}/>
                <input id={styles.card_form_submit} type="submit" value="Добавить" onClick={() => {}}/>
                <h5>(массив)категории + фото</h5>
            </form>
    )
}
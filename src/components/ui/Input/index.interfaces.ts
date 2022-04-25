import {MutableRefObject} from "react";

export interface IInput {
    ref?: MutableRefObject<HTMLInputElement>;
    placeholder?: string;
    type?: any;
    value?:string;
    id?:string;
    onChange?: any;
    required?: boolean
}
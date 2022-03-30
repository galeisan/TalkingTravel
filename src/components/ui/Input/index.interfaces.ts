import {MutableRefObject} from "react";

export interface IInput {
    ref?: MutableRefObject<HTMLInputElement>;
    placeholder?: string;
    type?: string;
    value?:string
    id?:string
}
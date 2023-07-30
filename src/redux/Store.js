import { configureStore } from "@reduxjs/toolkit";
import NavReducer from "./navSlice"

export const Store =()=>configureStore({
    reducer:{
        nav:NavReducer,
    },
});
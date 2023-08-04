import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reducer/authReducer";

export const store =configureStore({
    reducer:{
        Login:loginReducer,
     
    },
});
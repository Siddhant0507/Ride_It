import { createSlice } from "@reduxjs/toolkit";
import { LoginData } from "../action/authAction";

const loginSlice = createSlice({
    name: "Login",
    initialState: {
       
        loading: false
    },

    reducers: {

    },

    extraReducers: builder => {

   
    }

})

export default loginSlice.reducer
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "Login",
    initialState: {
        Ride: [],
        pickUpData: [],
        dropData: [],
        loading: false
    },

    reducers: {
        BookRide: (state, action) => {
            state.Ride = action.payload


        },
        PickUpDateTime: (state, action) => {
            state.pickUpData = action.payload


        },
        DropTimeDate: (state, action) => {
            state.dropData = action.payload

        },
    },
})


export const { BookRide, PickUpDateTime, DropTimeDate } = loginSlice.actions;
export default loginSlice.reducer;
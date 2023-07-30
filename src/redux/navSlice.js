import {createSlice} from "@reduxjs/toolkit"

const intitialSlice ={
    destination:null
}

export const navSlice = createSlice({
    name:'nav',
    intitialSlice,
    reducers:{
        setDestination:(state,action)=>{
            state.destination=action.payload;
        }
    }
})

 export const {setDestination} = navSlice.actions;

 export const selectDestination = (state )=> state.nav.destination;

 export default navSlice.reducer;
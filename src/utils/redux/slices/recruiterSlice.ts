import { createSlice } from "@reduxjs/toolkit";

const recruiterSlice = createSlice({
    name: "recruiter",
    initialState:{
        recruiterData : {},
    },
    reducers:{
        addRecruiter:(state,action)=> {
            console.log(action.payload,'action payload');
            state.recruiterData = {...state.recruiterData,...action.payload}
            
        },
        clearRecruiter:(state)=> {
            state.recruiterData={}
        }
    }
})

export const {addRecruiter,clearRecruiter} =recruiterSlice.actions 

export default recruiterSlice.reducer
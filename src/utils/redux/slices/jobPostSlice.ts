import { createSlice } from "@reduxjs/toolkit";

const jobPostSlice = createSlice({
  name: "postData",
  initialState: {
    jobData: {
      questions:[] as string[]
    },
  },
  reducers: {
    jobPost: (state, action) => {
      state.jobData = { ...state.jobData, ...action.payload };
      
    },
    addQuestion:(state,action)=> {
      console.log(action.payload);

      state.jobData.questions.push(action.payload)
      
      
    },
    clearJobPost:(state)=> {
      state.jobData ={questions:[] as string[]}
    }
  },
});


export const {jobPost,addQuestion,clearJobPost} = jobPostSlice.actions

export default jobPostSlice.reducer
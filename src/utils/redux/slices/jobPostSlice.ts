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
      // console.log("job dataaaaaaa");
      // console.log(action.payload);
      state.jobData = { ...state.jobData, ...action.payload };
      // console.log(state.jobData);
      
    },
    addQuestion:(state,action)=> {
      // console.log('add question');
      console.log(action.payload);

      state.jobData.questions.push(action.payload)
      // console.log(state.jobData);
      
      
    },
    clearJobPost:(state)=> {
      state.jobData ={questions:[] as string[]}
    }
  },
});


export const {jobPost,addQuestion,clearJobPost} = jobPostSlice.actions

export default jobPostSlice.reducer
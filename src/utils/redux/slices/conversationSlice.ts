import {createSlice} from '@reduxjs/toolkit'


interface ConversationState{
    selectedConversation: string| null;
    messages:string[]
} 

const initialState : ConversationState={
    selectedConversation:null,
    messages:[],
}
const conversationSlice = createSlice({
name:"conversation",
initialState,
reducers:{
    setSelectedConversation:(state,action)=>{
        state.selectedConversation=action.payload
    },
    setMessages:(state,action)=> {
        state.messages =[...state.messages,...action.payload]
    }
}
})

export const {setMessages,setSelectedConversation} =conversationSlice.actions

export default conversationSlice.reducer
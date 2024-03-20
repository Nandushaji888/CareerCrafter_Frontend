import {createSlice} from '@reduxjs/toolkit'
import { IUser } from '../../interface/interface';


interface ConversationState{
    selectedConversation: IUser| {} ;
    messages:string[]
} 

const initialState : ConversationState={
    selectedConversation:{},
    messages:[],
}
const conversationSlice = createSlice({
name:"conversation",
initialState:initialState,
reducers:{
    setSelectedConversation:(state,action)=>{
        state.selectedConversation={...state.selectedConversation,...action.payload}
    },
    setMessages:(state,action)=> {
        state.messages =[...state.messages,...action.payload]
    }
}
})

export const {setMessages,setSelectedConversation} =conversationSlice.actions

export default conversationSlice.reducer
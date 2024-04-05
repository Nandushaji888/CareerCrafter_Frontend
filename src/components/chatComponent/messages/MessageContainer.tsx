import React, { useEffect, useState } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import useConversation from "../../../utils/zustand/userConversation";

import { Video } from 'lucide-react';
import { Link, useNavigate, useParams } from "react-router-dom";
import useGetConversations from "../../../utils/hooks/useGetConversations";
import axios from "axios";


const MessageContainer = () => {
  const countUrl = 'http://localhost:4005/api/messages';

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const { selectedConversation, setSelectedConversation,setMessages } = useConversation();

  const { conversation,setConversation } = useGetConversations()
  const { id } = useParams()

  const clearMessageCount = async () => {
    // console.log('reached here');
    
    axios.get(`${countUrl}/clear-message-count/${id}`, { withCredentials: true })
      .then((res) => {
        // console.log(res?.data);
        setMessages(res?.data?.messages?.messages)

      })
      .catch((err) => {
        console.log(err);

      })
  }

  useEffect(()=> {
    clearMessageCount()

  },[])

  useEffect(() => {

    const filteredName = conversation?.filter((el) => {
      return (
        el?._id === id
      )
    })
    if (filteredName && filteredName.length > 0) {

      setName(filteredName[0]?.name)
      setSelectedConversation(filteredName[0])
      clearMessageCount()
    }


  }, [conversation, selectedConversation])




  return (
    <div className="md:min-w-[720px] flex flex-col bg-gray-700">


      <div className="bg-slate-500 px-4 py-4 mb-2  pe-6">
        {/* <span className="label-text">To:</span>{" "} */}
        <div className="flex justify-between px-5">
          <span className="text-white font-bold">
            {name}
          </span>
          <span onClick={()=>navigate(`/video-call/${id}`)} ><Video /></span>
          {/* <Link to='/video-call' ></Link> */}
        </div>
      </div>
      <Messages />
      <MessageInput />

    </div>
  );
};

export default MessageContainer;



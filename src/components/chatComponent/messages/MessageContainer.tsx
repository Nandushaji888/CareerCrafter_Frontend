import React, { useEffect, useState } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import useConversation from "../../../utils/zustand/userConversation";
import { useSelector } from "react-redux";
import { TiMessages } from 'react-icons/ti'
import { Video } from 'lucide-react';
import { Link, useNavigate, useParams } from "react-router-dom";
import useGetConversations from "../../../utils/hooks/useGetConversations";
import { IUser } from "../../../utils/interface/interface";


const MessageContainer = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const { selectedConversation } = useConversation();

  const { conversation } = useGetConversations()
  const { id } = useParams()

  useEffect(() => {
    const filteredName = conversation?.filter((el) => {
      return (
        el?._id === id
      )
    })
    if (filteredName && filteredName.length > 0) {

      setName(filteredName[0]?.name)
    }


  }, [conversation,selectedConversation])


  return (
    <div className="md:min-w-[720px] flex flex-col bg-gray-700">


      <div className="bg-slate-500 px-4 py-4 mb-2  pe-6">
        {/* <span className="label-text">To:</span>{" "} */}
        <div className="flex justify-between px-5">
          <span className="text-white font-bold">
            {name}
          </span>
          <Link to='/video-call' ><Video /></Link>
        </div>
      </div>
      <Messages />
      <MessageInput />

    </div>
  );
};

export default MessageContainer;



import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import useConversation from "../../../utils/zustand/userConversation";
import { useSelector } from "react-redux";
import { TiMessages } from 'react-icons/ti'


const MessageContainer = () => {

  const { selectedConversation, setSelectedConversation } = useConversation()

  useEffect(() => {
    //clean-up function for unmounting
    return () => setSelectedConversation(null)
  }, [setSelectedConversation])

  return (
    <div className="md:min-w-[720px] flex flex-col bg-gray-700">

    
          <div className="bg-slate-500 px-4 py-4 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-white font-bold">
              {selectedConversation?.name}
            </span>
          </div>
          <Messages />
          <MessageInput />

    </div>
  );
};

export default MessageContainer;



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

      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-4 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-white font-bold">
              {selectedConversation?.name}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}

    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const userData = useSelector((state: any) => state.persisted.user.userData)
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {userData.name} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

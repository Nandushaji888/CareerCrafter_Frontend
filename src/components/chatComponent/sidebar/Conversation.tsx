import React from "react";
import { IUser } from "../../../utils/interface/interface";

import useConversation from "../../../utils/zustand/userConversation";
import { useNavigate } from "react-router-dom";
interface ConversationProps {
  conversation: IUser;
  lastIdx: boolean;
}

const Conversation: React.FC<ConversationProps> = ({ conversation, lastIdx }) => {
  const {selectedConversation,setSelectedConversation} = useConversation()
  const isSelected = selectedConversation?._id === conversation?._id
  
  const navigate = useNavigate()

  return (
    <>
      <div
        className={`flex gap-4 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
        ${isSelected ? "bg-gray-500" : ""}
        `}
        onClick={() =>{ setSelectedConversation(conversation) 
        navigate(`/messages/${conversation?._id}`)
        }
          
        }
      >


        <div className={`avatar "online" `}>
          <div className="w-12 rounded-full">
            <img src="/profile.png" width={38} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation?.name}</p>
            {/* <span className="text-xl">🎃</span> */}
          </div>
        </div>
      </div>
      {!lastIdx && (
        <div className="opacity-15 w-5/6 mx-auto ">
          <hr className="border-t-1 border-gray-200" />
        </div>
      )}


    </>
  );
};

export default Conversation;

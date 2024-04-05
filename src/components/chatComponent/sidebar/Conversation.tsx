import React, { useCallback, useEffect, useState } from "react";
import { IUser } from "../../../utils/interface/interface";

import useConversation from "../../../utils/zustand/userConversation";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearRecruiter } from "../../../utils/redux/slices/recruiterSlice";
import { clearUser } from "../../../utils/redux/slices/userSlice";
interface ConversationProps {
  conversation: IUser;
  lastIdx: boolean;
}

const Conversation: React.FC<ConversationProps> = ({ conversation, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation()
  const isSelected = selectedConversation?._id === conversation?._id
  const [messagesCount, setMessageCount] = useState()
  const location = useLocation();
  const currentRoute = location.pathname;
  const countUrl = 'http://localhost:4005/api/messages';



  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {


    axios.get(`${countUrl}/conversation-message-count/${conversation?._id}`, { withCredentials: true })
      .then((res) => {
        if (res.status) {
          const { messageCount } = res?.data

          setMessageCount(messageCount)
        }


      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          dispatch(conversation?.type === 'recruiter' ? clearRecruiter() : clearUser());
          navigate(conversation?.type === 'recruiter' ? '/recruiter/login' : '/login');
        }
        console.log(err);

      })
  }, [])
const handleNavigate = ()=> {
  console.log('handle navigate');
  
  setSelectedConversation(conversation)

  console.log("Current Route:", currentRoute);
  currentRoute === '/recruiter/messages' ? navigate(`/recruiter/messages/${conversation?._id}`) : navigate(`/messages/${conversation?._id}`)
}

  return (
    <>
      <div
        className={`flex gap-4 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
        ${isSelected ? "bg-gray-500" : ""}
        `}
        onClick={handleNavigate}
      >
        <div className={`avatar "online" `}>
          <div className="w-12 rounded-full">
            <img src="/profile.png" width={38} alt="user avatar" />
          </div>
        </div>



        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between pe-5">
            <p className="font-bold text-gray-200">{conversation?.name}</p>
            {
              Number(messagesCount) > 0 &&

              <span className="flex mt-1 items-center justify-center rounded-full h-5 w-5 text-xs bg-green-700 px-2">{messagesCount}</span>
            }
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

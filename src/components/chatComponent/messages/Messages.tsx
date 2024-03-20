import React, { useEffect, useRef } from "react";
import Message from './Message'
import useGetMessages from "../../../utils/hooks/useGetMessages";
import MessageSkeleton from "../skeltons/MessageSkelton";
import useListenMessages from "../../../utils/hooks/useListenMessages";

const Messages = () => {

  const { loading, messages } = useGetMessages()
  useListenMessages()

  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <div className="px-4 flex-1 overflow-auto ">
      {
        !loading &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <div key={message?._id || index} ref={index === messages.length - 1 ? lastMessageRef : null}>

            <Message message={message} />
          </div>
        ))
      }

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}

    </div>
  );
};

export default Messages;

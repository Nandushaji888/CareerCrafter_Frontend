import React, { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import useConversation from '../zustand/userConversation';
import { IMessage } from '../interface/interface';

const useListenMessages = (): void => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    const handleNewMessage = (newMessage: IMessage): void => {
        setMessages([...messages, newMessage]);
    };

    if (socket) {
      socket.on('newMessage', handleNewMessage);

      return () => {
        socket.off('newMessage', handleNewMessage);
      };
    }
  }, [socket, messages, setMessages]);
};

export default useListenMessages;

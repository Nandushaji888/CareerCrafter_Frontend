import React, { useEffect, useState } from 'react';
import { IMessage } from '../../../utils/interface/interface';
import { extractTime } from '../../../utils/formatTime/formatTime';
import { useSelector } from 'react-redux';
import { useSocketContext } from '../../../utils/context/SocketContext';
import { CheckCheck } from 'lucide-react';

interface MessageProps {
  message: IMessage;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const [read, setRead] = useState(message?.readStatus);
  const { socket } = useSocketContext();

  useEffect(() => {
    if (socket) {
      console.log('socket connected', socket?.id);

      socket.emit("messageRead", message._id);

      socket.on("messageRead", (messageId: string) => {
        // console.log('messageIddddddddddddddddddddddddd',messageId);

        if (messageId === message._id) {
          socket.emit("message:read:done", message._id);
        }
      });

      socket.on("message:read:done", (messageId: string) => {
        if (messageId === message._id) {
          setRead(true);
        }
      });

      return () => {
        socket.off("messageRead");
        socket.off("message:read:done");
      };
    }
  }, [socket, message._id]);
  useEffect(() => {
    console.log((`socket connected ${socket?.id} in jitsi`));

    socket?.on('video:call:room:created', ({roomName}) => {
      console.log(`Your video call link is "https://meet.jit.si/${roomName}"`);

    })

    return ()=> {
      socket?.off("video:call:room:created")
    }
  }, [socket])

  const userData = useSelector((state: any) => state.persisted.user.userData);
  const isUser = message?.senderId === userData?._id ? false : true;
  const formattedTime = extractTime(message?.createdAt);
  const bubbleBgColor = isUser ? "bg-gray-800" : "bg-green-900";
  const readStyle = read ? 'blue' : 'white';

  return (
    <div className={`flex items-${isUser ? 'start' : 'end'} gap-2.5 justify-${isUser ? 'start' : 'end'}`}>
      {isUser && <img src="/profile.png" alt="Profile" className="w-8 h-8 rounded-full" />}
      <div className="flex flex-col gap-1 w-full max-w-[320px]">
        <div className={`flex relative py-auto flex-col leading-1 p-4 border-gray-200 rounded-e-xl rounded-es-xl ${bubbleBgColor}`}>
          <p className="text-sm font-normal text-gray-900 dark:text-white">{message.message}</p>
          <span className="text-xs absolute bottom-0 right-0 me-2 my-2 pt-2 font-normal text-gray-500 dark:text-gray-400">{formattedTime}</span>
          {!isUser && <span className='pt-5' style={{ marginBottom: '-10px' }}><CheckCheck color={readStyle} size={20} /></span>}
        </div>
      </div>
    </div>
  );
};

export default Message;

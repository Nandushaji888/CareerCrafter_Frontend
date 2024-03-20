import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io, Socket } from 'socket.io-client';
import { IUser } from "../interface/interface";



interface SocketContextType {
  socket: Socket | null;
  onlineUsers: IUser[];
}

 const SocketContext = createContext<SocketContextType | null>(null);


export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within a SocketContextProvider");
  }
  return context;
};

interface SocketContextProviderProps {
  children: React.ReactNode;
}

export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<IUser[]>([]);
  const userData = useSelector((state: any) => state.persisted.user.userData);
  console.log(userData);

  useEffect(() => {
    if (userData && !socket) {
      const newSocket = io("http://localhost:4006", {
        query: {
          userId: userData?._id
        }
      });
  
      newSocket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });
  
      setSocket(newSocket);
  
      newSocket.on("getOnlineUsers", (users: IUser[]) => {
        setOnlineUsers(users);
      });
  
      return () => {
        newSocket.close();
      };
    } else if (!userData && socket) {
      socket.close();
      setSocket(null);
    }
  }, [userData]);
  
   

  return <SocketContext.Provider value={{socket,onlineUsers}} >{children}</SocketContext.Provider>;
};


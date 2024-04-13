import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import {  useSelector } from "react-redux";
import { IRecruiter, IUser, RootState } from "../interface/interface";
import { useLocation, useNavigate } from "react-router-dom";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState<IUser | IRecruiter>();
  const messageUrl = "http://localhost:4005/api/messages";

  const location = useLocation();
  const currentRoute = location.pathname;

  const messenger = useSelector((state: RootState) => {
    // const userData = state.persisted.user.userData || state.persisted.recruiter.recruiterData;
    const userData =
      currentRoute === "/recruiter/messages"
        ? state.persisted.recruiter.recruiterData
        : state.persisted.user.userData;
    return userData;
  });

  const navigate = useNavigate();
  useEffect(() => {
    const getConverstions = async () => {
      setLoading(true);
      try {
        await axios
          .get(`${messageUrl}/users/${messenger?._id}`, {
            withCredentials: true,
          })
          .then((res: any) => {
            if (res?.data?.status) {
              setConversation(res?.data?.messagedUsers.reverse());
            }
          });
      } catch (error: any) {
        // toast.error(error)
        if (error?.response?.status) {
          // messenger?.worksAt ? dispatch(clearRecruiter()):dispatch(clearUser())
          currentRoute === "/recruiter/messages"
            ? navigate("/recruiter/login")
            : navigate("/login");
        }
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getConverstions();
  }, [currentRoute, messenger?._id, navigate]);
  return { loading, conversation, setConversation };
};

export default useGetConversations;

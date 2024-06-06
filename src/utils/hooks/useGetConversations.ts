import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { IRecruiter, IUser, RootState } from "../interface/interface";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../axios/axiosInstance";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState<IUser | IRecruiter>();
  const messageUrl = "http://localhost:4005/api/messages";

  const location = useLocation();
  const currentRoute = location.pathname;

  const messenger = useSelector((state: RootState) => {
    // const userData = state.persisted.user.userData || state.persisted.recruiter.recruiterData;
    let userData;
    if (currentRoute.includes("/recruiter/messages")) {
      userData = state.persisted.recruiter.recruiterData;
    } else {
      userData = state.persisted.user.userData;
    }

    // const userData =
    //   currentRoute === "/recruiter/messages"
    //     ? state.persisted.recruiter.recruiterData
    //     : state.persisted.user.userData;
    return userData;
  });

  const navigate = useNavigate();
  useEffect(() => {
    const getConverstions = async () => {
      setLoading(true);
      try {
        console.log("currentRoute");
        console.log(currentRoute);

        await axiosInstance
          .get(`${messageUrl}/users/${messenger?._id}`)
          .then((res: any) => {
            if (res?.data?.status) {
              setConversation(res?.data?.messagedUsers.reverse());
            }
          });
      } catch (error: any) {
        // toast.error(error)
        if (error?.response?.status) {
          // messenger?.worksAt ? dispatch(clearRecruiter()):dispatch(clearUser())
          console.log(error);

          console.log("reached at use get convo");

          if (currentRoute.includes("/recruiter/messages")) {
            navigate("/recruiter/login");
          } else {
            navigate("/login");
          }
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

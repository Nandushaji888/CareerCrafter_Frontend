import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AdminRouter from './router/AdminRouter'
import UserRouter from './router/UserRouter'
import RecruiterRouter from './router/RecruiterRouter'
import { useEffect, useState } from 'react'
import { useSocketContext } from './utils/context/SocketContext'
import IncomingCallNotification from './components/IncomingCallNotification '


function App() {
  const [videoLink, setVideoLink] = useState<string | undefined>('');
  const [incomingCall, setIncomingCall] = useState(false);

  const { socket } = useSocketContext()
  useEffect(() => {
    if (socket) {
      console.log('socket connected', socket?.id);
      console.log((`socket connected ${socket?.id} in jitsi111111111`));

      socket?.on('video:call:room:created', (roomName ) => {
        console.log(`Your video call link is "https://meet.jit.si/${roomName}"`);
        console.log('roomName');
        console.log(roomName);
        
        setVideoLink(`https://meet.jit.si/${roomName}`)
        console.log('videoLink');
        console.log(videoLink);
        setIncomingCall(true);
        
      })

      return () => {
        socket?.off("video:call:room:created")
      }
    }
  }, [socket,videoLink])

  const handleAcceptCall = () => {
    if(videoLink){

      window.location.href = videoLink;
      setIncomingCall(false); 
    }

  };

  const handleRejectCall = () => {

    setIncomingCall(false); 
  };
  
  return (
    <>
     {incomingCall && (
        <IncomingCallNotification
        videoLink={videoLink}
          onAccept={handleAcceptCall}
          onReject={handleRejectCall}
        />
      )}

      <Router>
        <Routes>
          <Route path='/admin/*' element={<AdminRouter />} />
          <Route path='/recruiter/*' element={<RecruiterRouter />} />
          <Route path='/*' element={<UserRouter />} />
        </Routes>
      </Router>

    </>
  )
}

export default App

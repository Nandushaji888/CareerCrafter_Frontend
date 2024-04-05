import React, { useEffect, useRef, useState } from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useSocketContext } from '../utils/context/SocketContext';
import { useParams } from 'react-router-dom';

const JistyVedioCall: React.FC = () => {
    const userData = useSelector((state: any) => state.persisted.user.userData);
    const apiRef: any = useRef();
    const [roomName] = useState(() => `JitsiMeetRoomNo${Math.random() * 100}-${Date.now()}`);
    const [logItems, updateLog]: any = useState([]);
    const { socket } = useSocketContext()
    const { id } = useParams()
    useEffect(() => {
        console.log('Socket:', socket);
        if (socket) {
            socket.emit("video:call:room:created", { roomName, receiverId: id });
            console.log('room name : created');
            
        }
    }, [socket, roomName, id]);




    const user = {
        displayName: userData?.name,
        email: userData?.email,
    };

    const renderSpinner = () => (
        <div style={{
            fontFamily: 'sans-serif',
            textAlign: 'center'
        }}>
            Loading..
        </div>
    );
    const handleAudioStatusChange = (payload: any, feature: any) => {

        if (payload.muted) {
            updateLog((items: any) => [...items, `${feature} off`])
        } else {
            updateLog((items: any) => [...items, `${feature} on`])
        }
    };

    const handleJitsiIFrameRef1 = (iframeRef: any) => {
        iframeRef.style.border = '1px solid #C1506D';
        iframeRef.style.position = 'fixed'
        iframeRef.style.background = '#3d3d3d';
        iframeRef.style.height = '99vh';
        iframeRef.style.width = '92vw'
    };


    const handleApiReady = (apiObj: any) => {
        apiRef.current = apiObj;
        apiRef.current.on('audioMuteStatusChanged', (payload: any) => handleAudioStatusChange(payload, 'audio'));
        apiRef.current.on('videoMuteStatusChanged', (payload: any) => handleAudioStatusChange(payload, 'video'));
    };




    const handleReadyToClose = () => {
        toast.error("SUUUU");
        alert('Ready to close...');
    };

    return (
        <div className='z-50 w-full h-full '>
            <JitsiMeeting
                roomName={roomName}
                spinner={renderSpinner}
                configOverwrite={{
                    subject: 'Group video call',
                    hideConferenceSubject: false,
                }}
                lang='eng'
                onApiReady={handleApiReady}
                onReadyToClose={handleReadyToClose}
                getIFrameRef={handleJitsiIFrameRef1}

                userInfo={user}
            />
        </div>
    );
};

export default JistyVedioCall;

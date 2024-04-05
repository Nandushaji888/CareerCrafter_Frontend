import React, { MouseEventHandler, useEffect } from 'react';
import '../assets/css/IncomingCallNotification.css'
interface IncomingCallNotification {
    videoLink?: string,
    onAccept: MouseEventHandler<HTMLButtonElement>;
    onReject: MouseEventHandler<HTMLButtonElement>;

}

const IncomingCallNotification: React.FC<IncomingCallNotification> = ({ videoLink, onAccept, onReject }) => {
    useEffect(() => {
        console.log('reached otification');
    }, [])

    return (
        <div className="incoming-call-notification">
            <div className="notification-content">
                <h3>Incoming Video Call</h3>
                <p>You have an incoming video call.</p>
                <div className="buttons">
                    <button onClick={onAccept}>Accept</button>
                    <button onClick={onReject}>Reject</button>
                </div>
            </div>
        </div> 
  );
};

export default IncomingCallNotification;

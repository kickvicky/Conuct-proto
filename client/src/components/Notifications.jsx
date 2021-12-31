import React, { useContext } from 'react';
import { Button } from '@material-ui/core';

import { SocketContext } from '../SocketContext';


const Notifications = () => {
    const { answerCall, call, callAccepted } = useContext(SocketContext);

    return (
        <>
            {call.isReceivingCall && !callAccepted && (
                <div style={{ display: 'flex', fontFamily: 'cursive' }}>
                    <h2>&nbsp;&nbsp;&nbsp;&nbsp;{call.name} Is Calling :&nbsp;</h2>
                    <Button variant="contained" color="secondary" onClick={answerCall}>
                        Answer {call.name} 📞
                    </Button>
                </div>
            )}
        </>
    );
};

export default Notifications;

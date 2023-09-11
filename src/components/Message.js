import React from 'react'
import { useEffect, useState } from 'react'
import socket from './Socket';

function Message() {
  
    const [message, setmessage] = useState([]);

    useEffect(() => {
        socket.on("receive_link", (data) => { 
            let from = data.user;
            let id = data.id;
            setmessage(message.concat({from, id}));
        });
    }, [])
  
    return (
    <>
        
    </>
  )
}

export default Message
import React from 'react'
import { useEffect, useState } from 'react'
import socket from './Socket';

function Message() {
  

    const [message, setmessage] = useState([]);

    

    const Share = async (id) => {
        try {
          const response = await fetch(`http://localhost:5000/api/file/share/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem('token')
          }
          });
          const json = await response.json();
        } catch (error) {
          console.log(error);
        }
      }
      

      socket.on("receive_link", (data) => { 
        let from = data.user;
        let file = data.file;
        let id = data.id;
        setmessage(message.concat({from, file, id}));
      });

      const remove = (id) => {
        let temp = message.filter ((ele) => {return ele.id != id})
        setmessage(temp);
      }
  
    return (
    <>
        <div className='msg'>
            {message.map((element,index) => {
                return (
                    <div className='sgl' key={element.id}>
                        <div className="card">
                            <div className="card-header">
                                {element.from}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{element.file}</h5>
                                <button type="button" onClick={() => {Share(element.id);remove(element.id)}} className="btn btn-success">Accept</button>
                                <button type="button" onClick={() => {remove(element.id)}} className="btn btn-danger mx-2">Decline</button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    </>
  )
}

export default Message
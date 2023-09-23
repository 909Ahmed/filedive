import React, { useState ,useEffect, useRef } from 'react'
import { useContext } from 'react';
import fileContext from '../context/filecontext';
import { useNavigate } from 'react-router-dom';
import Context from './Context';
import socket from './Socket';

function Files(props) {
  

  const initial = {
    show : false,
    x : 0,
    y : 0
  }

  let {permit, setpermit, cred, setcred} = props;

  const ref = useRef(null);

  const navigate = useNavigate();
  const context = useContext(fileContext);

  let {getfolders ,naming ,settitle } = context;
  const [name, setname] = useState(props.element.name)
  const [change, setchange] = useState(true)
  const [contextMenu, setcontextMenu] = useState(initial);


  const [Name, setName] = useState('');

  const handleChange = (e) => {
    setName(e.target.value);
  }
  
  const send_link = () =>{
    ref.current.click();
    let id = cred.id;
    let user = props.user;
    let file = cred.name;
    socket.emit("send_link", {id, Name, user, file});
  }


  const dbl = () => {
    setchange(false);
  }

  const handleClick = () => {
    setcontextMenu(initial);
  }

  const handleIn = () => {
    getfolders(props.element._id);
  }

  const handleContext = (e) => {
    e.preventDefault();
    setpermit(true);let temp = {
      name : props.element.name,
      id : props.element._id
    }
    setcred(temp);
    setcontextMenu({show : true, x : e.pageX, y : e.pageY});
  }

  const onChange = (e) => {
    setname(e.target.value);
  }

  const handleEnter = (e) => {
    if (e.code === 'Enter') {
      setchange(true);
      naming(props.element._id ,name);
    }
  } 

  useEffect(() => {
    if (!permit) {
      setcontextMenu(initial)
    }
  }, [permit])
  

  return (
    <>  

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Share</h1>
                <button ref={ref} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="check modal-body">

                <input type="text" className="form-control" onChange={handleChange} id="name" name="name" />

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={send_link}>Send</button>
              </div>
            </div>
          </div>
        </div>


        {contextMenu.show &&  permit && <Context key={props.element._id} x={contextMenu.x} y={contextMenu.y} id={props.element._id} name={props.element.name}/>}
        
        <div className='file container' onContextMenu={handleContext} onClick={handleClick}>
            <div className='d-flex my-5' style={{flexDirection:`column`}}>
              
              {!name.includes('pdf') &&  <div onClick={handleIn}><i className="fa-solid fa-folder" style={{color: `#f0d314`,fontSize:`5em`}}></i></div>}
              {name.includes('pdf') &&  <div onClick={() => {settitle(name);navigate('/view')}}><i className="fa-solid fa-file-lines" style={{color: '#d62424' ,fontSize:`4em`,marginTop:'0.2em'}}></i></div>}
              
              {change && <div onDoubleClick={dbl} className='name' style={{marginTop:`2px`}}>{name}</div>}
              {!change && <div><input type="text" className="name" value={name} onChange={onChange} onKeyDown={handleEnter}/></div>}
            
            </div>
        </div>

    </>
  )
}

export default Files
import React, { useState ,useEffect } from 'react'
import { useContext } from 'react';
import fileContext from '../context/filecontext';
import { useNavigate } from 'react-router-dom';
import Context from './Context';

function Files(props) {
  

  const initial = {
    show : false,
    x : 0,
    y : 0
  }

  const navigate = useNavigate();
  const context = useContext(fileContext);

  let {getfolders ,naming ,parent ,settitle } = context;
  const [name, setname] = useState(props.element.name)
  const [change, setchange] = useState(true)
  const [contextMenu, setcontextMenu] = useState(initial);

  const dbl = () => {
    setchange(false)
  }

  const enter = async (event) => {
    if (event.code === 'Enter') {
      // await naming(props.element._id ,name);
      setchange(true);
      setcontextMenu(initial);
    }
  }

  document.addEventListener('keydown', (event) => {enter(event)} );
    // if (event.code === 'Enter') {
    //   setchange(true);
    //   setcontextMenu(initial);
    //   naming(props.element._id ,name);
    // }
  

  const handleContext = (e) => {
    e.preventDefault();
    setcontextMenu({show : true, x : e.pageX, y : e.pageY})
  }

  const onChange = (e)=>{
    setname(e.target.value)
  }

  return (
    <>  
        {contextMenu.show && <Context x={contextMenu.x} y={contextMenu.y} id={props.element._id}/>}

        <div className='file container' onContextMenu={handleContext}>
            <div className='d-flex my-5' style={{flexDirection:`column`}}>
              {!name.includes('pdf') &&  <div onClick={()=>{getfolders(props.element._id);parent = props.element._id}}><i className="fa-solid fa-folder" style={{color: `#f0d314`,fontSize:`5em`}}></i></div>}
              {name.includes('pdf') &&  <div onClick={() => {settitle(name);navigate('/view')}}><i className="fa-solid fa-file-lines" style={{color: '#d62424' ,fontSize:`4em`,marginTop:'0.2em'}}></i></div>}
              {change && <div onDoubleClick={dbl} className='name' style={{marginTop:`2px`}}>{name}</div>}
              {!change && <div><input type="text" className="name" value={name} onChange={onChange}/></div>}
            </div>
        </div>
    </>
  )
}

export default Files
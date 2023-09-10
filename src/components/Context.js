import React, { useRef, useState } from 'react'
import fileContext from '../context/filecontext';
import { useContext } from 'react';


function Context(props) {

  let {x, y, id, name} = props;
  
  const context = useContext(fileContext);
  let {folder, setfolder} = context;

  const ref = useRef(null);

  const launch = () => {
    ref.current.click();
  }
  
  const deletefolder = async () =>{
    const response = await fetch(`http://localhost:5000/api/folder/deletefolder/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const json = await response.json();
    const newfolders = folder.filter((ele)=>{return ele._id!==id})
    setfolder(newfolders)
  }

  const deletefile = async () =>{
    const response = await fetch(`http://localhost:5000/api/file/deletefile/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const json = await response.json();
    const newfolders = folder.filter((ele)=>{return ele._id!==id})
    setfolder(newfolders)
  }

  const Delete = () =>{
    if (name.includes('pdf')) {
      deletefile();
    } else {
      deletefolder();
    }
  }


  const Download = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/file/getfile/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
      });
      const blob = await response.blob();
      
      const fileURL = window.URL.createObjectURL(blob);

      let alink = document.createElement('a');
      alink.href = fileURL;
      alink.download = `${name}`;
      alink.click();
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>

        <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
        <div className="drop" style={{left : `${x}px`, top : `${y}px`}}>
            <ul className="down-menu">
                <li className='down-item' onClick={launch}><span className='list'>Share</span></li>
                <li className='down-item' onClick={Delete}><span className='list'>Delete</span></li>
                <li className='down-item' onClick={Download}><span className='list'>Download</span></li>
            </ul>
        </div>
    </>
  )
}

export default Context
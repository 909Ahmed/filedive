import { useContext } from 'react';
import React from 'react'
import fileContext from '../context/filecontext';

function Back() {

    const context = useContext(fileContext);

    const {redo ,parent} = context;

    const handleClick = async () => {
        let data  = await redo(parent);
    }

  return (
    <>
        <div className='back' onClick={handleClick}>
            <i className="fa-solid fa-backward" style={{color:`#0058f0`}}></i>
        </div>
    </>
  )
}

export default Back
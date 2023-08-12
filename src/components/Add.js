import { useContext } from 'react';
import React from 'react'
import fileContext from '../context/filecontext';



function Add(props) {

    const context = useContext(fileContext);

    const {addfolder ,parent} = context;
  return (
    <>
        <div className='add' onClick={()=>{addfolder('NewFolder',parent)}}>
            <i className="fa-solid fa-circle-plus" style={{color: `#001dfa`}}></i>
        </div>
    </>
  )
}

export default Add
import { useContext ,useEffect, useState} from 'react';
import React from 'react'
import fileContext from '../context/filecontext';



function Add(props) {

    const context = useContext(fileContext);

    const {addfolder ,parent} = context;

    let status = true;

    const rotate = () => {

      if (status) status = false;
      else status = true;
      
      console.log(status);

      {status && (document.querySelector(".add").style.transform = 'rotate(180deg)')}
      {!status && (document.querySelector(".add").style.transform = 'rotate(-180deg)')}
      
    }


    useEffect(() => {
      
      document.querySelector(".add").addEventListener('click', rotate);

    }, [])
    
    

  return (
    <>
        <div className='add' onClick={()=>{addfolder('NewFolder',parent)}}>
          <i className="fa-solid fa-circle-plus" style={{color : "#001dfa"}}></i>  
        </div>
    </>
  )
}

export default Add
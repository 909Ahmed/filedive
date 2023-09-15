import { useContext ,useEffect, useState} from 'react';
import React from 'react'
import fileContext from '../context/filecontext';



function Add(props) {

    const context = useContext(fileContext);

    const {addfolder ,parent} = context;
    const [current_rotation, setcurrent_rotation] = useState(360)

    
    const rotate = () => {
      setcurrent_rotation(current_rotation+360);
      console.log(current_rotation);
      document.querySelector(".add").style.transform = 'rotate(' + current_rotation + 'deg)';
    }
    
    
    useEffect(() => {
      
      document.querySelector(".add").addEventListener('click', rotate);
      
      return () => {
        document.querySelector(".add").removeEventListener('click', rotate);
      }


    }, [current_rotation])
    
    

  return (
    <>
        <div className='add' onClick={()=>{addfolder('NewFolder',parent)}}>
            
              <i className="fa-solid fa-circle-plus" style={{color : "#001dfa"}}></i>
            
        </div>
    </>
  )
}

export default Add
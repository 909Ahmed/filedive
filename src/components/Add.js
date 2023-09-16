import { useContext ,useEffect} from 'react';
import React from 'react'
import fileContext from '../context/filecontext';



function Add(props) {

    const context = useContext(fileContext);

    const {addfolder, submit, parent} = context;

    let status = true;

    const rotate = () => {

      if (status) status = false;
      else status = true;
      

      if (status) {
        
        document.querySelector(".add").style.transform = 'rotate(0deg)';

        let addDiv = document.querySelector(".addlist");

        addDiv.style.bottom = "12%";
        addDiv.style.fontSize = "0.2rem";
        addDiv.style.opacity = 0;

      } else {
        
        document.querySelector(".add").style.transform = 'rotate(-90deg)';

        let addDiv = document.querySelector(".addlist");

        addDiv.style.bottom = "21%";
        addDiv.style.opacity = 1;
        addDiv.style.fontSize = "1.5rem";

      }
    }


    useEffect(() => {
      
      document.querySelector(".add").addEventListener('click', rotate);
      document.getElementById("addlist").style.transition = "all 0.5s";
      document.getElementById('file').addEventListener('change' ,submit);

    }, [])
    
    

  return (
    <>
        <div className='addlist' id='addlist'>
          <div className='fol' onClick={()=>{addfolder('NewFolder',parent)}}>
            New Folder
          </div>
          <div className='fol'>
              <form>
                <label className="file-upload">
                  <input type="file" name='file' id='file' required/> Add PDF
                </label>
              </form>
          </div>
        </div>

        <div className='add'>
          <i className="fa-solid fa-circle-plus" style={{color : "#001dfa"}}></i>  
        </div>
    </>
  )
}

export default Add
import React from 'react'
import { useEffect ,useContext } from 'react'
import Files from './Files';
import fileContext from '../context/filecontext';
import Add from './Add';
import Back from './Back';
import { useNavigate } from 'react-router-dom';
import Addfile from './Addfile';

function Filemap() {
  
    const context = useContext(fileContext);

    const {getfolders ,folder} = context;
    const navigate =useNavigate()

  const firstTime  = async () =>{
    // eslint-disable-next-line
    let data = await getfolders('5ce819935e539c343f141ece');
  }


  useEffect(() => {
    if(localStorage.getItem('token')){
      firstTime();
    }else{
      navigate('/login');
    }
    firstTime();
    // eslint-disable-next-line
  }, [])
  
  
   
    return (
    <>
       
        <div className='last container my-5'>
            <div className='row'>
                {folder.map((element,index) => {
                    return (
                        <div className='col md-4' key={element._id}>
                            <Files key={element._id} element = {element}/>
                        </div>
                    )
                })}
            </div>
        </div>
        <div>
          
        </div>
        <div> 
        {/* <embed src={require('../uploads/ad34c0c9506888477d761c1337799030')} width="500px" height="375px" type="application/pdf"/> */}
        </div>
        {/* <Add/> */}
        <Addfile/>
        <Back/>
    </>
  )
}

export default Filemap
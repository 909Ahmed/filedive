import React from 'react'
import { useEffect ,useContext ,useState} from 'react'
import Files from './Files';
import fileContext from '../context/filecontext';
import Add from './Add';
import { useNavigate } from 'react-router-dom';
import socket from './Socket';

function Filemap(props) {

    const context = useContext(fileContext);
    const [user, setuser] = useState('');
    const [cred, setcred] = useState({name : '',id :''});

    const {getfolders, folder, userdet} = context;
    const navigate =useNavigate()

    const set_user = (user) => {
      socket.emit("set_user", user);
    }


  const firstTime  = async () =>{

    let data = await getfolders('5ce819935e539c343f141ece');
    let UserData = await userdet();
    
    set_user(UserData.name);
    setuser(UserData.name);
  }

  useEffect(() => {
    
    if(localStorage.getItem('token')){
      firstTime();
    }else{
      navigate('/login');
    }
    // eslint-disable-next-line
  }, [])
  
  
   
    return (
    <>
        <div className='last container my-5'>
            <div className='row'>
                {folder.map((element,index) => {
                    return (
                        <div className='col md-4' key={element._id}>
                            <Files key={element._id} element = {element} permit={props.permit} setpermit={props.setpermit} user={user} cred={cred} setcred={setcred}/>
                        </div>
                    )
                })}
            </div>
        </div>
        
        <Add/>
    </>
  )
}

export default Filemap
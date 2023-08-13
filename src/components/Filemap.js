import React from 'react'
import { useEffect ,useContext ,useState} from 'react'
import Files from './Files';
import fileContext from '../context/filecontext';
import Add from './Add';
import Back from './Back';
import { useNavigate } from 'react-router-dom';
import Addfile from './Addfile';
import io from "socket.io-client";


function Filemap() {
  
  const socket = io.connect("http://localhost:3001");

    const context = useContext(fileContext);

    const {getfolders ,folder ,userdet} = context;
    const navigate =useNavigate()

    const [user, setuser] = useState('hehe')
    const [link, setlink] = useState('huhu')

    const shit = () => {
      socket.emit("send_person", user);
      socket.emit("send_link", { link, user });
      socket.on("receive_link", (data) => {
        console.log(user ,data.user ,data.link);
      });
    }
  
  
    const det = async () => {
      let data = await userdet();
      setuser(data.user);
      setlink(data.email);
      shit();
    }  

  const firstTime  = async () =>{
    // eslint-disable-next-line
    let data = await getfolders('5ce819935e539c343f141ece');
    det();
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
        <Add/>
        <Addfile/>
        <Back/>
    </>
  )
}

export default Filemap
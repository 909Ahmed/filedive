import React from 'react'
import { useEffect ,useContext ,useState} from 'react'
import Files from './Files';
import fileContext from '../context/filecontext';
import Add from './Add';
import Back from './Back';
import { useNavigate } from 'react-router-dom';
import Addfile from './Addfile';
import io from 'socket.io-client'


function Filemap() {

    const socket = io.connect("http://localhost:3001");

    const context = useContext(fileContext);


    const [Name, setName] = useState('')

    const {getfolders, folder, userdet} = context;
    const navigate =useNavigate()

    const set_user = (user) => {
      socket.emit("set_user", user);
    }
  
    const send_link = (user,link) =>{
      socket.emit("send_link", { link, user });
    }
  
    socket.on("receive_link", (data) => { 
      console.log(data.user ,data.link);
    });


  const firstTime  = async () =>{

    let data = await getfolders('5ce819935e539c343f141ece');
    let UserData = await userdet();
    
    set_user(UserData.name);
  }


  const handleChange = (e) => {
    setName(e.target.value);
  }

  const handleClick = (e) => {
    e.preventDefault();
    send_link('asdfasdfa3e' ,'UWU');
    console.log(Name);
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
                            <Files key={element._id} element = {element}/>
                        </div>
                    )
                })}
            </div>
        </div>
        
        <Add/>
        <Addfile/>
        <form>
          <input type='text' name='wth' id='wth' value={Name} onChange={handleChange}/>
          <button type="button" className="btn btn-primary" onClick={handleClick}>Primary</button>
        </form>
        <Back/>
    </>
  )
}

export default Filemap
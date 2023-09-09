import React , {useState} from 'react'
import fileContext from "./filecontext";


function FileState(props) {
  
    const host = "http://localhost:5000"

    const [folder, setfolder] = useState([])
    const [parent, setparent] = useState('5ce819935e539c343f141ece')
    const [title , settitle] = useState('check.pdf')

    const getfolders = async (parentPass) =>{
        const response = await fetch(`${host}/api/folder/fetchfolders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem('token')
          },body : JSON.stringify({parent : parentPass})
        });
        const json = await response.json();
        setfolder(json);
        setparent(parentPass)
    }

    const addfolder = async (name ,Parent) =>{

        const response = await fetch(`${host}/api/folder/addfolder`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem('token')
          },body :JSON.stringify({name,parent : Parent})
        });

        const json = await response.json();
        setfolder(folder.concat(json));
        setparent(Parent)
    
    }

    const userdet = async () =>{
      const response = await fetch(`${host}/api/auth/Userdet`, {
        method: "POST",
        headers: {
          "auth-token" : localStorage.getItem('token')
        }
      });

      const json = await response.json();
      return json;
    }

    const redo = async (parentPass) =>{
        
        const response = await fetch(`${host}/api/folder/getparent`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },body :JSON.stringify({parent :parentPass})
        });
        
        const json = await response.json();
        // eslint-disable-next-line
        let data = getfolders(json);

    }

    const naming = async (id ,name) => {
      
      const response = await fetch(`${host}/api/folder/updatename/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        }, body: JSON.stringify({name})
      });
      // eslint-disable-next-line
      const json = await response.json();
    }
    
    return (
    <>
        <fileContext.Provider value={{folder , getfolders ,addfolder ,parent ,redo ,naming ,settitle ,title ,userdet}}>
            {props.children}
        </fileContext.Provider>
    </>
  )
}

export default FileState
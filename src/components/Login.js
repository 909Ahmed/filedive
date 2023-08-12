import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = () => {

    const [credentials, setCredentials] = useState({name: "", password: ""})
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/gettoken", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: credentials.name, password: credentials.password})
        });
        const json = await response.json()
        if (json.success){
            localStorage.setItem('token', json.authToken); 
            navigate('/') 
        }
        else{
            alert("Invalid credentials");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <>
            <form className='forms'>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>
                

            </form>
            <div className='sub'><button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button></div>
    </>
  )
}

export default Login;
import React from 'react'
import Login from './Login'
import Signup from './Signup'
import {Link} from 'react-router-dom'

function Verify(props) {
    return(
        <>
            <div className='verify'>
                <div className='wrap' style={{backgroundColor:`#fff`}}>
                    <div className="btn-group">
                        <Link to="/login" className={`but btn btn-secondary ${props.go==="login"?"active":""}`}>Login</Link>
                        <Link to="/sign" className={`but btn btn-secondary ${props.go==="sign"?"active":""}`}>Sign Up</Link>
                    </div>
                    {props.go==='login'  && <Login/>}
                    {props.go==='sign'  && <Signup/>}
                </div>
            </div>
        </>
    )
  
}

export default Verify
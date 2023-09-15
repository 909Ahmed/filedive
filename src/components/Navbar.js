import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import fileContext from '../context/filecontext';

function Navbar() {

    const context = useContext(fileContext);

    const {redo ,parent} = context;

    const handleClick = async () => {
        let data  = await redo(parent);
    }


  return (
    <>

        <nav className="navbar navbar-expand-lg bg-dark fixed-top" style={{height:'65px'}}>
            <div className="container-fluid" style={{display:'flex',flexDirection:'row-reverse'}}>
                
                <div className='items'>
                    <ul className="navlist">
                        <li className="listI">
                            <Link className="nav-link text-white" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="listI">
                            <Link className="nav-link text-white" to="/">Link</Link>
                        </li>
                        <li className='listI'>
                            <a className="nav-link text-white" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">Inbox</a>
                        </li>
                    </ul>
                </div>

                {parent !=='5ce819935e539c343f141ece' && <div className='back mx-2' onClick={handleClick}>
                    <i className="fa-solid fa-arrow-left" style={{ color: `#fafafa` }}></i>
                </div>}

            </div>
        </nav>
    </>
  )
}

export default Navbar
import React from 'react'
import { useContext } from 'react';
import fileContext from '../context/filecontext';

function Addfile() {

    const context = useContext(fileContext);

    const {addfolder ,parent} = context;

    return (
    <>
        <div className='add'>
            <form action="http://localhost:5000/api/file/upload"  method="post" encType="multipart/form-data">
                <input type="file" id="file" name="file" required />
                <button type="submit">haha</button>
            </form>
        </div>
    </>
  )
}

export default Addfile
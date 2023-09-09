import React from 'react'
import { useContext } from 'react';
import fileContext from '../context/filecontext';

function Addfile() {

    const context = useContext(fileContext);

    const {addfolder ,parent} = context;

    const submit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('file', e.target.querySelector('input[name="file"]').files[0]);
        formData.append('parent' ,parent);

        try {
            const response = await fetch('http://localhost:5000/api/file/upload', {
                method: 'POST',
                headers : {
                    "auth-token" : localStorage.getItem('token')
                },
                body: formData
            });

            const json = await response.json();
        } catch (error) {
            console.error('Error uploading PDF:', error);
        }
    }

    return (
    <>
        <div className='container'>
            <form onSubmit={submit}>
                <label class="file-upload">
                    <input type="file" name='file' required/> Add PDF
                </label>
                <button type="submit" className="btn btn-primary">Add</button> 
            </form>
        </div>
    </>
  )
}

export default Addfile
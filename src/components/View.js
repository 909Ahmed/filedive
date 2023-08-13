import React from 'react'
import { useContext } from 'react';
import fileContext from '../context/filecontext';

function View( props ) {
    

    const context = useContext(fileContext);
    let {title} = context;

    return (
    <>
        <div className='view' style={{marginTop:'50px'}}>
            <embed className='pdf' src={require(`../uploads/${title}`)} type="application/pdf"/>
        </div>
    </>
  )
}

export default View
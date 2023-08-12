import React from 'react'
import { useParams } from 'react-router-dom';

function View( props ) {
    
    let {name} = props

    return (
    <>
        <div className='view' style={{marginTop:'50px'}}>
            <embed className='pdf' src={require(`../uploads/${name}`)} type="application/pdf"/>
        </div>
    </>
  )
}

export default View
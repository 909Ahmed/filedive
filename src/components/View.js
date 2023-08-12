import React from 'react'

function View({ routes }) {
    
    // let {name} = routes.params
    console.log(routes);

    return (
    <>
        <div className='view' style={{marginTop:'50px'}}>
            <embed className='pdf' src={require(`../uploads/sample.pdf`)} type="application/pdf"/>
        </div>
    </>
  )
}

export default View
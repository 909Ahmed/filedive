import React from 'react'

function Context(props) {
  return (
    <>
        <div className="drop" style={{left : `${props.x}px`, top : `${props.y}px`}}>
            <ul className="down-menu">
                <li className='down-item'>Share</li>
                <li className='down-item'>Delete</li>
                <li className='down-item'>UWU</li>
            </ul>
        </div>
    </>
  )
}

export default Context
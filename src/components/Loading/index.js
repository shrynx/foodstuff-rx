import React from 'react'
//styles
import './assets/styles/loading.scss'

const Loading = (props) => {
  return (
    <div className="row loading">
      <div className='col s12 center'>
        <h2 className="hotpink-text">Please wait while we are preparing</h2>
        <h1><span className="blue-text">{props.choice}</span></h1>
      </div>
    </div>
  )
}

export default Loading

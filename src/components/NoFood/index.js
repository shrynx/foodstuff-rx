import React from 'react'
//styles
import './assets/styles/noFood.scss'

const NoFood = (props) => {
  return (
    <div className="row no-food">
      <div className='col s12 center'>
        <h2 className="hotpink-text">Sorry, we don't have</h2>
        <h2 className="hotpink-text"><span className="blue-text">{props.choice}</span> in stock.</h2>
      </div>
    </div>
  )
}

export default NoFood

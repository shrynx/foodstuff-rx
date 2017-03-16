import React from 'react'
//styles
import './assets/styles/food.scss'

const nutritionTable = (nutrition) => {
  const tableHeader = Object.keys(nutrition).map((nutrient, key) => {
    return <th key={key}>{nutrient}</th>
  })

  const tableContent = Object.keys(nutrition).map((nutrient, key) => {
    return <td key={key}>{nutrition[nutrient]}</td>
  })

  return (
    <table className="centered">
      <thead>
        <tr>
          {tableHeader}
        </tr>
      </thead>
      <tbody>
        <tr>
          {tableContent}
        </tr>
      </tbody>
    </table>
  )
}

const Food = (props) => {
  return (
    <div className="col s12 food">
      <h2 className="header hotpink-text"><span className="blue-text food-name">{props.foodItem.name}</span> is now ready.</h2>
      <div className={`card horizontal ${props.foodItem.category === 'light'? 'light-food' : 'heavy-food'}`}>
        <div className="row">
          <div className="col s3">
            <div className="image">
              <img src={`${process.env.REACT_APP_FOOD_DATA_API}${props.foodItem.image}`} alt={props.foodItem.name} />
            </div>
          </div>
          <div className="col s9 pull-right">
            <div className="card-stacked">
              <div className="card-content">
                <div className="row">
                  <div className="col s3">Prep. Time </div><div className="col s9">
                    {props.foodItem.preprationTime} mins.
                  </div>
                </div>
                <div className="row">
                  <div className="col s3">Rating </div>
                  <div className="col s9">{"⭐".repeat(props.foodItem.rating)}</div>
                </div>
                <div className="row">
                  <div className="col s3">Contents </div>
                  <div className="col s9">{props.foodItem.contents.join(', ')}</div>
                </div>
                <div className="row">
                  <div className="col s12">
                    {nutritionTable(props.foodItem.nutrition)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Food

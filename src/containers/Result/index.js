import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { routerActions } from 'react-router-redux'
// components
import Loading from 'src/components/Loading'
import Food from 'src/components/Food'
import NoFood from 'src/components/NoFood'

class Result extends Component {

  componentWillMount() {
    // when result component loads
    // and doesn't have a choice in food object of props
    // route to base url.
    if (!this.props.food.choice) {
      this.props.push('/')
    }
  }

  componentWillUpdate(nextProps) {
    // when result component recieves more props
    // and doesn't have a choice in food object of props
    // route to base url.
    if (!nextProps.food.choice) {
      this.props.push('/')
    }
  }

  render() {
    if(this.props.food.preparing) {
      return <Loading choice={this.props.food.choice} />
    } else {
      if(Object.keys(this.props.food.foodItem).length === 0) {
        return <NoFood choice={this.props.food.choice} />
      } else {
        return <Food foodItem={this.props.food.foodItem} />
      }
    }
  }
}

const mapStateToProps = ( {food} ) => {
  return {food}
}

const mapDispatchToProps = (dispatch) => {
  return  bindActionCreators({ ...routerActions }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Result)

import React, { Component } from 'react'
// components
import Header from 'src/components/Header'
// styles
import './assets/styles/app.scss'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container">
            {React.cloneElement(this.props.children, this.props)}
        </div>
      </div>
    )
  }
}

export default App

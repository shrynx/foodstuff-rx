import React from 'react'
import {Link} from 'react-router'
// styles
import './assets/styles/header.scss'

const Header = () => {
  return (
    <header>
      <div className="img"></div>
      <span><Link to={'/'}>Foodstuff</Link></span>
    </header>
  )
}

export default Header

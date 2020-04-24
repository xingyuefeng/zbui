import React, { FC } from 'react'
import { Link } from 'react-router-dom'

const Layout:FC = (props) => {
  return (
    <div className="app-container">
      <div className="app-header">
        <div className="logo">
          <Link to="/">Zbui</Link>
        </div>
        <div className="nav">
          <Link to="/components">组件</Link>
        </div>
      </div>
      {props.children}
    </div>
  )
}


export default Layout
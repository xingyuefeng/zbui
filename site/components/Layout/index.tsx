import React, { FC } from 'react'
import { Link } from 'react-router-dom'

const Layout:FC = (props) => {
  return (
    <div className="app-container">
      <div className="app-header">
        <div className="logo">
          <Link to="/zbui">Zbui</Link>
        </div>
        <div className="nav">
          <Link to="/components">组件</Link>
          <a href="https://github.com/xingyuefeng/zbui" target="_blank" rel="noopener noreferrer">Github</a>
        </div>
      </div>
      {props.children}
    </div>
  )
}


export default Layout
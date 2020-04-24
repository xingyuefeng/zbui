import React, { FC } from 'react'
import { Link } from 'react-router-dom'

interface ISlider {
  menus: any,
}

const Slider: FC<ISlider> = (props) => {
  
  const { menus } = props;
  
  const renderMenus = (title, menus) => {
    return <div className="slider-menu">
      <div className="slider-menu-label">{title}</div>
      {
        menus.map(item => <Link key={item.name} className="slider-menu-item" to={`/components/${item.name}`} >{item.description}</Link>)
      }
    </div>
  }

  return (
    <div className="slider">
      {/* <Link to="/components/QuickStart" >QuickStart</Link>
      <Link to="/components/Button" >Button</Link> */}
      {renderMenus('开发指南', menus.documents)}
      {renderMenus('操作反馈', menus.components.basicComponents)}
    </div>
  )
}

// Slider.Item = (props) => <li>{props.children}</li>


export default Slider
import React, { FC } from 'react'
import { Link } from 'react-router-dom'

type Menus = {
  name: string,
  description: string,
  module: () => {}
}

interface ISlider {
  menus: {
    [propName: string]: Menus[] | Object,
    components: {
      [propName: string]: Menus[],
    }
  },
}

const Slider: FC<ISlider> = (props) => {
  
  const { menus } = props;
  
  const renderMenus = (title: string, menus: Menus[]) => {
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
      {renderMenus('开发指南', menus.documents as Menus[])}
      {renderMenus('操作反馈', menus.components.basicComponents)}
    </div>
  )
}

// Slider.Item = (props) => <li>{props.children}</li>


export default Slider
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components'

export default function Home() {
  return (
    <div className="home">
      <div className="desc">基于TypeScript与React Hooks开发的ui组件库</div>
      <Button type="primary"><Link to="/components" className="view">查看组件</Link></Button>
    </div>
  )
}

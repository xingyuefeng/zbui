import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components'
import useEventListener from '@/components/hooks/useEventListener'

export default function Home() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEventListener('mousemove', (event: MouseEvent) => {
    setCoords({x: event.pageX, y: event.pageY})
  });


  return (
    <div className="home">
      <h1>
        The mouse position is ({coords.x}, {coords.y})
    </h1>
      <div className="desc">基于TypeScript与React Hooks开发的ui组件库</div>
      <Button type="primary"><Link to="/components" className="view">查看组件</Link></Button>
    </div>
  )
}

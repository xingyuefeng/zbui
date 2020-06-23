import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Dialog } from "zbui";
import { CSSTransition  } from "react-transition-group";


// import useEventListener from '@/components/hooks/useEventListener'

export default function Home() {
  // useEventListener('mousemove', (event: MouseEvent) => {
  //   setCoords({x: event.pageX, y: event.pageY})
  // });
  const [visible, toggleDialog] = useState(false);
  return (
    <div className="home">
      <div className="desc">
        基于TypeScript与React Hooks开发的ui组件库{" "}
        <span role="img" aria-labelledby="rocket">
          🚀🚀🚀
        </span>
      </div>
      <div className="desc">Happy Coding</div>
      <Button type="primary">
        <Link to="/components" className="view">
          查看组件
        </Link>
      </Button>
      <Button
        type="primary"
        onClick={() => {
          toggleDialog(!visible);
        }}
      >
        显示弹框
      </Button>
      <CSSTransition in={true} timeout={200} classNames="my-node">
        <div>
          123
        </div>
      </CSSTransition>
    </div>
  );
}

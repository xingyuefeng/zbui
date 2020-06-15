import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Dialog } from "@/components";

// import useEventListener from '@/components/hooks/useEventListener'

export default function Home() {
  const [visible, toggleDialog] = useState(false);
  // useEventListener('mousemove', (event: MouseEvent) => {
  //   setCoords({x: event.pageX, y: event.pageY})
  // });

  return (
    <div className="home">
      <div className="desc">
        基于TypeScript与React Hooks开发的ui组件库{" "}
        <span role="img" aria-labelledby="rocket">
          >🚀🚀🚀
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
          toggleDialog(true);
        }}
        style={{ position: "absolute", left: 20, top: 400, zIndex: 10000 }}
      >
        显示弹框
      </Button>
      <Dialog
        visible={visible}
        title="这是弹框标题"
        footer={
          <Button
            onClick={() => {
              toggleDialog(false);
            }}
          >
            关闭
          </Button>
        }
        onClose={() => {
          toggleDialog(false);
        }}
        // getContainer=
      >
        <div>你总觉着自己如今正是栖栖遑遑</div>
      </Dialog>
    </div>
  );
}

import React, { FC, CSSProperties, ReactNode, useState, useRef, useEffect  } from "react";
import { findDOMNode } from 'react-dom'
import { CSSTransition } from "react-transition-group";
import classnames from "classnames";
import Button from "../Button";
import useEventListener from "../hooks/useEventListener";

type IStringOrHtmlElement = string | HTMLElement;

function getScroll(w: any, top?: boolean) {
  let ret = w[`page${top ? 'Y' : 'X'}Offset`];
  const method = `scroll${top ? 'Top' : 'Left'}`;
  if (typeof ret !== 'number') {
    const d = w.document;
    ret = d.documentElement[method];
    if (typeof ret !== 'number') {
      ret = d.body[method];
    }
  }
  return ret;
}

function offset(el: any) {
  const rect = el.getBoundingClientRect();
  const pos = {
    left: rect.left,
    top: rect.top,
  };
  const doc = el.ownerDocument;
  const w = doc.defaultView || doc.parentWindow;
  pos.left += getScroll(w);
  pos.top += getScroll(w, true);
  return pos;
}


export interface Dioalogprops {
  className?: string | undefined;
  closable?: boolean;
  prefixCls?: string;
  bodyStyle?: CSSProperties;
  maskStyle?: CSSProperties;
  visible: boolean;
  title?: string | ReactNode;
  footer?: ReactNode;
  mask?: boolean;
  maskClosable?: boolean;
  keyboard?: boolean;
  mousePosition?: {
    x: number;
    y: number;
  };
  onClose?: () => void;
  getContainer?: IStringOrHtmlElement | (() => IStringOrHtmlElement) | false;
  closeIcon?: ReactNode;
  children?: ReactNode;
}

const Dialog: FC<Dioalogprops> = ({
  visible,
  children,
  closable = true,
  className,
  prefixCls = "zb",
  title,
  mask = true,
  maskClosable = true,
  bodyStyle,
  footer,
  maskStyle,
  onClose = () => {},
}) => {
  const [mousePosition, serMousePosition] = useState({x: 0, y: 0});
  const [elOffset, serElOffset] = useState({left: 0, top: 0});

  const dialogRef = useRef() as any

  useEventListener("click", (event: MouseEvent) => {
    const dialogNode = findDOMNode(dialogRef.current);
    const elOffset = offset(dialogNode);
    serElOffset({
      left: elOffset.left,
      top: elOffset.top,
    })
    serMousePosition({ x: event.pageX, y: event.pageY });
  });



  return (
    <div
      className={classnames(prefixCls, className, {
        [prefixCls + "-mask"]: mask,
        [prefixCls + "-mask-hidden"]: !visible,
      })}
      style={maskStyle}
     
    >
      <CSSTransition
        timeout={300}
        classNames={`${prefixCls}-alert`}
        in={visible}
        style={{transformOrigin: `${mousePosition.x - elOffset.left}px ${mousePosition.y - elOffset.top}px`,}}

      >
        <div
          className={`${prefixCls}-content`}
        
          ref={dialogRef}
        >
          {closable && (
            <Button
              className={`${prefixCls}-close`}
              type="primary"
              size="sm"
              onClick={() => onClose()}
            >
              X
            </Button>
          )}
          {title && (
            <div className={`${prefixCls}-header`}>
              <div className={`${prefixCls}-title`}>{title}</div>
            </div>
          )}
          <div className={`${prefixCls}-body`} style={bodyStyle}>
            {children}
          </div>
          {footer && <div className={`${prefixCls}-footer`}>{footer}</div>}
        </div>
      </CSSTransition>
    </div>
  );
};

export default Dialog;

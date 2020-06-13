import React, { FC, CSSProperties, ReactNode } from "react";
import { CSSTransition } from "react-transition-group";
import classnames from "classnames";
import Button from "../Button";

type IStringOrHtmlElement = string | HTMLElement;

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

  onClose = () => {},
}) => {
  console.log('visible===>', visible)
  return (
    <div className={classnames(prefixCls, prefixCls + "-mask", className)}>
      <CSSTransition
        timeout={300}
        // classNames={`${prefixCls}-content`}
        classnames="zbalert"
        in={visible}
        onEnter={() => console.log('enter')}
      >
        <div className={`${prefixCls}-content`}>
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

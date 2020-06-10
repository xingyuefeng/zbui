import React, { FC, CSSProperties, ReactNode } from "react";
import { CSSTransition } from "react-transition-group";
import Mask from "./mask";

interface Dioalogprops {
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
  onClose?: () => {};
  getContainer?: (e: HTMLElement) => {};
  closeIcon?: ReactNode;
}

const Dialog: FC<Dioalogprops> = ({ visible, children, prefixCls = "zb" }) => {
  return (
    <CSSTransition timeout={300} classNames="modal">
      <Mask visible={visible} prefixCls={prefixCls}>
        {children}
      </Mask>
    </CSSTransition>
  );
};

export default Dialog;

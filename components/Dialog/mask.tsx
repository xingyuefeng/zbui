import React, { FC } from "react";
import classnames from "classnames";

interface MaskProps {
  visible?: boolean;
  className?: string | undefined;
  prefixCls?: string;
}

const Mask: FC<MaskProps> = ({ children, className, prefixCls }) => {
  return (
    <div className={classnames(prefixCls + "-mask", className)}>{children}</div>
  );
};

export default Mask;

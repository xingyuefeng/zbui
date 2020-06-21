import React, { FC, ReactNode, HTMLAttributes } from 'react'
import classnames from 'classnames';

export interface ICard extends HTMLAttributes<HTMLDivElement> {
  title?: string,
  children?: ReactNode
}

const Card: FC<ICard> = (props) => {
  const {
    children,
    className,
    title,
  } = props;
  const classes = classnames("ps-card", className)
  return (
    <div className={classes}>
      <div className="ps-card-head">
        {title}
      </div>
      <div className="ps-card-body">
        {children}
      </div>

    </div>
  )
}



export default Card

import React from 'react'
import clsx from 'clsx'

function Button ({
  children,
  className,
  disabled = false,
  style,
  onClick,
  onMouseOver,
}) {

  return (
      <button
        className={clsx('fs-1 fw-bold', className)}
        style={style}
        disabled={disabled}
        onClick={onClick}
        onMouseOver={onMouseOver}
      >
          {children}
      </button>
  )
}

export default Button
import clsx from 'clsx'
import React from 'react'

function Spinner ({ size = false, color = false }) {
  return (
    <div className='text-center'>
        <div className={clsx("spinner-grow text-secondary me-2", size, color)} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        <div className={clsx("spinner-grow text-secondary me-2", size, color)} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        <div className={clsx("spinner-grow text-secondary", size, color)} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
  )
}

export default Spinner
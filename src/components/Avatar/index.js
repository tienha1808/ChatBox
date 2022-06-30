import React from 'react'
import clsx from 'clsx'
import styles from './Avatar.module.scss'

function Avatar ({ avatar, name, className, style }) {
  return (
    <div 
        className={clsx(styles.avatar, 'd-flex align-items-center justify-content-center fs-1 text-white fw-bold', className)}
        style={style}
    >
        {
            avatar
            ?
            <img
                className='w-100 h-100' src={avatar} alt=""
                style={{
                    borderRadius: '50%',
                    objectFit: 'cover',
                }}
            />
            :
            name.charAt(0).toUpperCase()
        }
    </div>
  )
}

export default Avatar
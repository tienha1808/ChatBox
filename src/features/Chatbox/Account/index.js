import React, { useEffect, useState } from 'react'
import styles from './Account.module.scss'
import clsx from 'clsx'
import Button from '../../../components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkCircle, faUser, faCamera } from '@fortawesome/free-solid-svg-icons'
import Avatar from '../../../components/Avatar'
import { userCurrent } from '../../Auth/SignIn/logInSlice'
import { useSelector } from 'react-redux'
import MainForm from './MainForm'

function Account ({ hidden, setHidden }) {
  
  const user = useSelector(userCurrent)

  const [ avatar, setAvatar ] = useState()

  useEffect(() => {
    return(() => {
      avatar && URL.revokeObjectURL(avatar.preview)
    })
  }, [avatar])

  const handleAvatar = e => {
    const file = e.target.files[0]
    file.preview = URL.createObjectURL(file)

    setAvatar(file)
  }

  return (
    <div className={clsx(styles.wrapper, 'd-flex flex-column', {
      [styles.wrapperVisible]: hidden
    })}>
      <div className='col-12 d-flex align-items-center justify-content-between py-2 px-5 border-bottom border-1 shadow-sm'>
        <div className='fw-bold' style={{fontSize: '4.2rem', color: 'var(--secondary-color)'}}>
          <FontAwesomeIcon className='me-5' icon={faUser} />
          Profile
        </div>
        <div className='fw-bold' style={{fontSize: '5.2rem', color: 'var(--secondary-color)'}}>
          CHATBOX
        </div>
        <Button
          className={clsx('d-flex align-items-center', styles.btn)}
          onClick={() => setHidden(false)}
        >
          <FontAwesomeIcon icon={faXmarkCircle} size='2x' />
        </Button>
      </div>
      {
        user
        &&
        <div className='flex-grow-1 d-flex col-10 mx-auto my-5'>
          <div className={clsx('h-100 d-flex flex-column justify-content-between col-4 shadow-sm py-5', styles.bgWrapper)}>
            <div className='col-4 mx-auto d-flex align-items-center justify-content-center position-relative'>
              <label
                className={styles.wrapAvatar}
                htmlFor='avatar'
              >
                <input
                  name='avatar'
                  className={styles.input}
                  type='file'
                  onChange={handleAvatar}
                />
                <Avatar className={styles.avatar} avatar={avatar ? avatar.preview : user.avatar} name={user.name} />
                <Button
                  className={clsx(styles.cameraBtn)}
                  style={{borderRadius: '50%', width: '5rem', height: '5rem'}}
                >
                  <FontAwesomeIcon icon={faCamera} />
                </Button>
              </label>
            </div>
            <div className='p-4 flex-grow-1'>
              <ul className='p-0 py-5 m-0 text-muted h-100 d-flex flex-column justify-content-center'>
                <li className={clsx('d-flex align-items-end justify-content-between py-4 px-5 my-3 shadow-sm', styles.wrapList)}>
                  <div className='fs-4'>
                    Full Name
                  </div>
                  <div className='fs-3 fw-bold'>
                    {user.name.toUpperCase()}
                  </div>
                </li>
                <li className={clsx('d-flex align-items-end justify-content-between py-4 px-5 my-3 shadow-sm', styles.wrapList)}>
                  <div className='fs-4'>
                    Age
                  </div>
                  <div className='fs-3 fw-bold'>
                    {user.age}
                  </div>
                </li>
                <li className={clsx('d-flex align-items-end justify-content-between py-4 px-5 my-3 shadow-sm', styles.wrapList)}>
                  <div className='fs-4'>
                    Phone
                  </div>
                  <div className='fs-3 fw-bold'>
                    {user.phone}
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <MainForm user={user} avatar={avatar} />
        </div>
      }
    </div>
  )
}

export default Account
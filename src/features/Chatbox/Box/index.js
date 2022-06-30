import React, { useState } from 'react'
import styles from './Box.module.scss'
import clsx from 'clsx'
import Button from '../../../components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { chatBoxState, messengers, messengerState, chatBoxCurrent, sendMes } from './chatBoxSlice'
import Spinner from '../../../components/Spinner'
import Messenger from './Messenger'
import { userCurrent } from '../../Auth/SignIn/logInSlice'

function Box () {

  const boxState = useSelector(chatBoxState)
  const messengersBox = useSelector(messengers)
  const box = useSelector(chatBoxCurrent)
  const user = useSelector(userCurrent)
  const mesState = useSelector(messengerState)
  const dispatch = useDispatch()

  const [ mesInput, setMesInput ] = useState('')
  const [ dropdownId, setDropdownId ] = useState()

  const handleSendMes = () => {
    if (mesInput.length > 0 && user) {
      dispatch(sendMes({
        messenger: mesInput,
        boxId: box.id,
        userId: user.id,
      }))
      setMesInput('')
    }
  }

  const handleEnterSend = e => {
    if (e.keyCode === 13 && mesInput.length > 0 && user) {
      dispatch(sendMes({
        messenger: mesInput,
        boxId: box.id,
        userId: user.id,
      }))
      setMesInput('')
    }
  }

  return (
    <div
      className='d-flex flex-column justify-content-between h-100'
    >
      {
        boxState === 'loading'
        &&
        <div className='col-12 my-auto'>
          <Spinner />
        </div>
      }
      {
        boxState !== 'loading' && boxState !== 'success'
        &&
        <div className='col-12 fs-3 text-center text-warning my-auto'>
          {boxState}
        </div>
      }
      {
        boxState === 'success'
        &&
        <>
          <div className='col-12 ps-4 fs-2 fw-bold py-2 shadow-sm border-bottom'>
            {box.name}
          </div>
          <ul
            className={clsx('d-flex flex-column-reverse flex-grow-1 w-100 px-4 m-0', styles.wrapMessenger)}
          >
            {messengersBox.allMessengers.map(messenger => (
              <Messenger key={messenger.id} id={messenger.id} date={messenger.date} content={messenger.messenger} dropId={dropdownId} setDropId={setDropdownId} />
            ))}
          </ul>
          <div className='col-12 border-top shadow-sm p-3 position-relative'>
            {
              mesState === 'loading'
              &&
              <div className={clsx('position-absolute w-100', styles.messengerState, {
                [styles.animationMessengerState]: mesState === 'loading'
              })}>
                <Spinner size='spinner-grow-sm' color='text-white' />
              </div>
            }
            {
              mesState !== 'loading' && mesState !== ''
              &&
              <div className={clsx('position-absolute w-100 text-center', styles.messengerState, {
                [styles.animationMessengerState]: mesState !== 'loading' && mesState !== '',
              })}>
                {mesState}
              </div>
            }
            <input
              className={clsx('w-100', styles.input)}
              type="text"
              placeholder='Chat'
              value={mesInput}
              onChange={e => setMesInput(e.target.value)}
              onKeyDown={handleEnterSend}
            />
            <div
              className='position-absolute'
              style={{
                top: '1.5rem',
                right: '1.6rem',
              }}
            >
              <Button
                className='d-flex align-items-center justify-content-center'
                style={{width: '4.5rem', height: '2.8rem', borderRadius: '1.5rem',}}
                onClick={handleSendMes}
              >
                <FontAwesomeIcon style={{width: '2rem', height: '2rem'}} icon={faPaperPlane} />
              </Button>
            </div>
          </div>
        </>
      }
      </div>
  )
}

export default Box
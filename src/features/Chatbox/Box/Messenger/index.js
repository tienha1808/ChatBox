import React, { useEffect, useRef, useState } from 'react'
import styles from './Messenger.module.scss'
import clsx from 'clsx'
import axios from 'axios'
import Avatar from '../../../../components/Avatar'
import { useDispatch, useSelector } from 'react-redux'
import { userCurrent } from '../../../Auth/SignIn/logInSlice' 
import Button from '../../../../components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { deleteMes, hiddenMessengersState, chatBoxCurrent, pushHiddenMes } from '../chatBoxSlice'
import TimeAgo from '../../../../components/TimeAgo'

function Messenger ({ id, date, content, dropId, setDropId }) {

  const [ member, setMember ] = useState()
  const [ dropdown, setDropdown ] = useState()
  const [ timeLast, setTimeLast ] = useState()
  const dropIdRef = useRef()
  const dispatch = useDispatch()
  const hiddenMessengers = useSelector(hiddenMessengersState)
  const user = useSelector(userCurrent)
  const box = useSelector(chatBoxCurrent)

  useEffect(() => {
    if (dropIdRef.current === dropId) {
      setDropdown(false)
    } else if (dropId === id) {
      setDropdown(true)
    } else {
      setDropdown(false)
    }
    dropIdRef.current = dropId
  }, [dropId])

  useEffect(() => {
    axios.get(`/api/messengers/${id}/user`)
      .then(res => res.data)
      .then(data => setMember(data.user))
  }, [])

  const handleDelMessenger = () => {
    if (box) {
      dispatch(deleteMes({
        messengerId: id,
        boxId: box.id
      }))
    }
  }

  const handleDropdown = () => {
    setDropdown(!dropdown)
    setDropId(id)
  }

  return (
    <React.Fragment>
      {
        member && user
        &&
        <li className={clsx('col-12 d-inline-flex align-items-end mb-3', {
          'flex-row-reverse': user.id === member.id,
          'd-none': hiddenMessengers.some(messengerId => messengerId === id),
        })}>
          <div className={clsx('col-1 d-flex align-items-end', {
            'justify-content-end': user.id === member.id
          })}>
              <Avatar avatar={member.avatar} name={member.name} className={styles.avatar} />
          </div>
          <div>
            <div className={clsx('fs-4 mb-2 fw-light', {
              'text-end': user.id === member.id
            })}>
              {member.name}
            </div>
            <div className={clsx(styles.messengerLine, 'px-4 py-2')}>
              {content}
            </div>
          </div>
          <div className='mx-3 position-relative'>
            <Button
              className={clsx(styles.extendBtn, 'd-flex align-items-end')}
              onClick={handleDropdown}
            >
              <FontAwesomeIcon icon={faEllipsis} />
            </Button>  
            <div className={clsx('d-flex flex-column justify-content-center shadow-sm position-absolute', styles.dropdownContent, {
              [styles.dropdownUser]: user.id === member.id,
              [styles.dropdownOther] : user.id !== member.id,
              [styles.dropdownVisible]: dropdown
            })}>
              <Button
                className={clsx('fs-3 text-start px-3', styles.dropdownBtn)}
                onClick={() => dispatch(pushHiddenMes(id))}
              >
                Hidden
              </Button>
              <Button
                className={clsx('fs-3 text-start px-3', styles.dropdownBtn)}
                onClick={handleDelMessenger}
              >
                Delete
              </Button>
            </div>
          </div>
          <div
            className='text-muted mb-2 col-2'
            style={{fontSize: '1.3rem'}}
          >
            <TimeAgo timestamp={date} />
          </div>
        </li>
      }
    </React.Fragment>
  )
}

export default Messenger
import React, { useEffect, useRef, useState } from 'react'
import styles from './Extended.module.scss'
import clsx from 'clsx'
import Avatar from '../../../components/Avatar'
import Button from '../../../components/Button'
import Spinner from '../../../components/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEraser, faPen, faPenToSquare, faRightFromBracket, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { chatBoxCurrent, extendedState, renameChatBox } from '../Box/chatBoxSlice'
import AddFriends from './AddFriends'
import SearchConversation from './SearchConversation'
import FriendList from './FriendList'
import { isLoggedOut, userCurrent } from '../../Auth/SignIn/logInSlice'
import { delGroup } from '../ChatList/chatListSlice'
import Member from './Member'

function Extended ({ setHidden }) {

  const chatBox = useSelector(chatBoxCurrent)
  const user = useSelector(userCurrent)
  const state = useSelector(extendedState)
  const dispatch = useDispatch()
  
  const inputRename = useRef()

  const [ renameInput, setRenameInput ] = useState('')
  const [ disabled, setDisabled ] = useState(true)

  useEffect(() => {
    if (!disabled) {
      inputRename.current.focus()
      inputRename.current.value = renameInput
    } else {
      if (chatBox) {
        inputRename.current.value = chatBox.name
      }
    }
  })

  const handleRename = () => {
    if (chatBox && user && renameInput.length > 0) {
      dispatch(renameChatBox({
        chatboxId: chatBox.id,
        newName: renameInput,
        userId: user.id,
      }))
      setDisabled(true)
    }
  }

  const handleLeaveAndDel = () => {
    if (chatBox && user) {
      dispatch(delGroup({
        groupId: chatBox.id,
        userId: user.id
    }))}
  }

  return (
    <React.Fragment>
      {
        chatBox
        &&
        <div className='d-flex flex-column border-start border-1 shadow-sm h-100 position-relative overflow-auto'>
          <div className='col-12 d-flex flex-column pt-5'>
            <Avatar
              avatar={chatBox.avatar}
              name={chatBox.name}
              className='mx-auto'
              style={{width: '8.8rem', height: '8.8rem'}}
            />
            <div className={clsx('mt-2', {
              'd-none': !(state === 'loading')
            })}>
              <Spinner size='spinner-grow-sm' />
            </div>
            <div className={clsx('col-8 mx-auto d-flex flex-column align-items-center justify-content-center', {
              'd-none': state === 'loading'
            })}>
              <input
                ref={inputRename}
                className={clsx(styles.input, 'col-10 fs-2 fw-bold text-center mt-2', 
                  !disabled && 'border-bottom border-1'
                )}
                type="text"
                disabled={disabled}
                onChange={e => setRenameInput(e.target.value)}
              />
              <Button
                className={clsx('mt-2 fs-3 px-3 py-1',
                  disabled ? 'd-none' : 'd-flex align-items-center justify-content-between'
                )}
                onClick={handleRename}
              >
                Change
                <FontAwesomeIcon className={styles.renameIcon} icon={faPenToSquare} />
              </Button>
            </div>
            <ul className='col-12 border-bottom border-1 shadow-sm mt-3 mb-0 p-0 w-100 d-flex flex-column'>
              <li>
                <Button
                  className={clsx('w-100 fs-3 d-flex align-items-center ps-5 py-3', styles.wrapBtn)}
                  onClick={() => setHidden(true)}
                >
                  <FontAwesomeIcon className='me-4 col-1' icon={faUserCircle} />
                  My Account
                </Button>
              </li>
              <AddFriends wrapBtn={styles.wrapBtn} />
              <SearchConversation wrapBtn={styles.wrapBtn} />
              <Member wrapBtn={styles.wrapBtn} />
              <li>
                <Button
                  className={clsx('w-100 fs-3 d-flex align-items-center ps-5 py-3', styles.wrapBtn, {              
                    [styles.focusBtn]: !disabled,
                    'text-white': !disabled
                  })}
                  onClick={() => setDisabled(!disabled)}
                >
                  <FontAwesomeIcon className='me-4 col-1' icon={faPen} />
                  Rename Conversation
                </Button>
              </li>
              <li>
                <Button
                  className={clsx('w-100 fs-3 d-flex align-items-center ps-5 py-3', styles.wrapBtn)}
                  onClick={handleLeaveAndDel}
                >
                  <FontAwesomeIcon className='me-4 col-1' icon={faEraser} />
                  Leave and Delete This Group
                </Button>
              </li>
              <li>
                <Button
                  className={clsx('w-100 fs-3 d-flex align-items-center ps-5 py-3', styles.wrapBtn)}
                  onClick={() => dispatch(isLoggedOut())}
                >
                  <FontAwesomeIcon className='me-4 col-1' icon={faRightFromBracket} />
                  Sign Out
                </Button>
              </li>
            </ul>
          </div>
          <FriendList />
        </div>
      }
    </React.Fragment>
  )
}

export default Extended
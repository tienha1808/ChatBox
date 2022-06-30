import React, { useEffect, useState } from 'react'
import styles from './ChatList.module.scss'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCirclePlus, faBarsStaggered } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../../components/Spinner'
import Avatar from '../../../components/Avatar'
import Button from '../../../components/Button'
import FormInput from '../../../components/FormInput'
import { chatListState, createNewGroup, delGroup, leaveGroup, stateApiChatList } from './chatListSlice'
import { userCurrent } from '../../Auth/SignIn/logInSlice'
import { getChatBox } from '../Box/chatBoxSlice'

function ChatList () {

    const [ search, setSearch ] = useState('')
    const [ chatListSearch, setChatListSearch ] = useState()
    const [ newBox, setNewBox ] = useState(false)
    const [ newBoxInput, setNewBoxInput ] = useState('')

    const user = useSelector(userCurrent)
    const chatList = useSelector(chatListState)
    const state = useSelector(stateApiChatList)
    const dispatch = useDispatch()

    useEffect(() => {
        if (chatList) {
            setChatListSearch(chatList.filter(chatBox => chatBox.name.toLowerCase().includes(search)))
        }
    }, [search])

    useEffect(() => {
        setNewBoxInput('')
        setChatListSearch('')
    }, [chatList])
    
    const handleAddGroup = () => {
        if (user && newBoxInput.length > 0) {
            dispatch(createNewGroup({
                newGroupName: newBoxInput,
                userId: user.id
            }))
            setNewBox(false)
        }
    }

    const handleDelGroup = groupId => {
        if (user) {
            dispatch(delGroup({
                groupId: groupId,
                userId: user.id
            }))
        }
    }

    const handleLeaveGroup = groupId => {
        if (user) {
            dispatch(leaveGroup({
                groupId: groupId,
                userId: user.id
            }))
        }
    }

  return (
    <div
        className='d-flex flex-column h-100'
    >
        <div className='col-12 d-flex align-items-center position-relative px-3 py-3'>
            <input
                className={styles.inputSearch}
                type="text"
                placeholder='Search'
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <FontAwesomeIcon className='position-absolute' icon={faMagnifyingGlass} style={{
                top: '2rem',
                right: '5.9rem',
                width: '1.8rem',
                height: '1.8rem',
                color: 'var(--secondary-color)',
            }} />
            <Button
                className='d-flex align-items-center justify-content-center ms-2'
                style={{borderRadius: '50%', width: '3.3rem', height: '3.3rem'}}
                onClick={() => setNewBox(!newBox)}
            >
                <FontAwesomeIcon icon={faCirclePlus} />
            </Button>
            <div
                className={clsx('position-absolute d-flex flex-column', styles.extenedAddBox, {
                    [styles.animationExtend]: newBox
                })}
            >
                <div className='fs-3 fw-bold mb-5' style={{color: 'var(--secondary-color)'}}>
                    Create New Group
                </div>
                <FormInput
                    style={{height: '6.2rem'}}
                    classNameInput={styles.inputAddBox}
                    type='text'
                    placeholder='Group Name'
                    forLabel='Group Name'
                    value={newBoxInput}
                    setValue={setNewBoxInput}
                    required
                />
                <div className='d-flex justify-content-end'>
                    <Button
                        className={clsx(styles.btnBox, 'fs-2 col-5 me-3')}
                        onClick={handleAddGroup}
                    >
                        Create
                    </Button>
                    <Button
                        className={clsx(styles.btnBox, 'fs-2 col-5')}
                        onClick={() => setNewBox(!newBox)}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
        <div className='col-12 flex-grow-1 border-top border-1' style={{height: '85vh', overflowY: 'auto', overflowX: 'hidden'}}>
            <ul className='pt-3'>
                {
                    chatList
                    ?
                    (chatListSearch ? chatListSearch : chatList).map(chatBox => (
                        <li key={chatBox.id}
                            className={clsx('py-3 border-bottom d-flex position-relative', styles.wrapperChatList)}
                            onClick={() => dispatch(getChatBox({id: chatBox.id}))}
                        >
                            <div className='d-flex col-12'>
                                <div className='col-3'>
                                    <Avatar avatar={chatBox.avatar} name={chatBox.name} />
                                </div>
                                <div
                                    className='col-6 fs-3 fw-bold p-0 me-auto overflow-hidden'
                                >
                                    {chatBox.name}
                                </div>
                            </div>
                            <div className={styles.dropdownChatBox}>
                                <Button
                                    className={clsx(styles.btnDropdown, 'd-flex align-items-center justify-content-center')}
                                    style={{right: '0.5rem', top: '1.5rem'}}
                                >
                                    <FontAwesomeIcon icon={faBarsStaggered} style={{width: '1.6rem', height: '1.6rem'}} />   
                                </Button>
                                <div className={styles.dropdownWrapContent}>
                                    <Button
                                        className={clsx(styles.dropdownContent, 'fs-3 py-2 px-4')}
                                        onClick={() => handleLeaveGroup(chatBox.id)}
                                    >
                                        Leave this group
                                    </Button>
                                    <Button
                                        className={clsx(styles.dropdownContent, 'fs-3 py-2 px-4')}
                                        onClick={() => handleDelGroup(chatBox.id)}
                                    >
                                        Delete this group
                                    </Button>
                                </div>
                            </div>
                        </li>
                    ))
                    :
                    <Spinner />
                }
            </ul>
        </div>
        {
            state === 'loading'
            && 
            <div>
                <Spinner />
            </div>
        }
    </div>
  )
}

export default ChatList
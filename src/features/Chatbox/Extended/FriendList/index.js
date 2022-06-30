import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { friendList, stateFriendList, unfriend } from './friendListSlice'
import clsx from 'clsx'
import styles from './FriendList.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp, faUserXmark, faMessage } from '@fortawesome/free-solid-svg-icons'
import Avatar from '../../../../components/Avatar'
import Button from '../../../../components/Button'
import Spinner from '../../../../components/Spinner'
import { userCurrent } from '../../../Auth/SignIn/logInSlice'
import { createNewGroup } from '../../ChatList/chatListSlice'

function FriendList () {

    const friends = useSelector(friendList)
    const user = useSelector(userCurrent)
    const stateList = useSelector(stateFriendList)

    const dispatch = useDispatch()

    const [ hiddenFriends, setHiddenFriends ] = useState()

    const handleCreateConversation = (friendId) => {
        const friendName = friends.find(friend => friend.id === friendId).name
        dispatch(createNewGroup({
            newGroupName: `${friendName} vs ${user.name}` ,
            userId: user.id,
            friendId: friendId
        }))
    }

    const handleUnfriend = (friendId) => {
        const friendIds = friends.map(friend => friend.id)
        const filterFriendIds = friendIds.filter(friend => friend !== friendId)
        dispatch(unfriend({
            newFriendIds: filterFriendIds,
            userId: user.id
        }))
    }

  return (
    <div className='flex-grow-1 d-flex flex-column overflow-auto'>
        <div
            className='d-flex justify-content-between align-items-center fs-2 fw-bold px-3 border-top border-bottom border-1 shadow-sm py-2'
            style={{cursor: 'pointer', userSelect: 'none'}}
            onClick={() => setHiddenFriends(!hiddenFriends)}
        >
            Friends
            {   
                !hiddenFriends
                ?
                <FontAwesomeIcon icon={faCaretDown} />
                :
                <FontAwesomeIcon icon={faCaretUp} />
            }
        </div>
        <ul className={clsx('p-0 m-0 flex-grow-1 overflow-auto', styles.wrapFriends, {
            'd-none': hiddenFriends
        })}>
            {
                stateList === 'loading'
                &&
                <Spinner size='spinner-grow-sm' />
            }
            {
                friends
                &&
                friends.map(friend => (
                    <li
                        className={clsx('p-3 border-bottom border-1', styles.wrap)}
                    >
                        {
                            friend
                            &&
                            <div className='d-flex align-items-center justify-content-between px-3 fs-3 fw-bold'>
                                <div className='d-flex align-items-center'>
                                    <Avatar className='me-4' avatar={friend.avatar} name={friend.name} style={{width: '4.2rem', height: '4.2rem'}} />
                                    {friend.name}
                                </div>
                                <div className='d-flex align-items-center'>
                                    <Button
                                        className={clsx(styles.btn, 'me-2')}
                                        onClick={() => handleCreateConversation(friend.id)}
                                    >
                                        <FontAwesomeIcon style={{width: '2rem', height: '2rem'}} icon={faMessage} />
                                    </Button>
                                    <Button
                                        className={styles.btn}
                                        onClick={() => handleUnfriend(friend.id)}
                                    >
                                        <FontAwesomeIcon style={{width: '2.2rem', height: '2.2rem'}} icon={faUserXmark} />
                                    </Button>
                                </div>
                            </div>
                        }
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default FriendList
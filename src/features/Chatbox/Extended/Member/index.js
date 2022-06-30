import { faPlusCircle, faUserMinus, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import Button from '../../../../components/Button'
import Spinner from '../../../../components/Spinner'
import Avatar from '../../../../components/Avatar'
import styles from './Member.module.scss'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { addMember, chatBoxCurrent, kickMember, memberState } from '../../Box/chatBoxSlice'
import axios from 'axios'
import { friendList } from '../FriendList/friendListSlice'

function Member ({ wrapBtn }) {

  const [ hidden, setHidden ] = useState(false)
  const [ search, setSearch ] = useState('')
  const [ userSearch, setUserSearch ] = useState()
  const [ members, setMembers ] = useState()

  const state = useSelector(memberState)
  const chatBox = useSelector(chatBoxCurrent)
  const friends = useSelector(friendList)

  const dispatch = useDispatch()

  useEffect(() => {
    if (members && friends) {
        const filterFriends = friends.filter(friend => !(members.some(member => member.id === friend.id)))
        setUserSearch(filterFriends.filter(friend => friend.name.toLowerCase().includes(search.toLowerCase())))
    }
  }, [search])

  useEffect(() => {
    if (chatBox) {
        axios.get(`/api/chatboxes/${chatBox.id}/users`)
            .then(res => res.data)
            .then(data => setMembers(data.users))
    }
  }, [chatBox])

  const handleKickMember = (memberId) => {
    const memberIds = members.map(member => member.id)
    const filterMemberIds = memberIds.filter(member => member !== memberId)
    dispatch(kickMember({
        chatboxId: chatBox.id,
        memberIds: filterMemberIds,
    }))
  }

  const handleAddMember = (friendId) => {
    const memberIds = members.map(member => member.id)
    const filterMemberIds = [...memberIds, friendId]
    dispatch(addMember({
        chatboxId: chatBox.id,
        memberIds: filterMemberIds,
    }))
  }

  return (
    <li>
        <Button
            className={clsx('w-100 fs-3 d-flex align-items-center ps-5 py-3', wrapBtn, {
                [styles.focusBtn]: hidden,
                'text-white': hidden
            })}
            onClick={() => setHidden(!hidden)}
        > 
            <FontAwesomeIcon className='me-4 col-1' icon={faUsers} />
            Member
        </Button>
        <div className={clsx(styles.wrapSearch, 'position-relative', {
            'd-block': hidden
        })}>
            {
                state === 'loading'
                &&
                <Spinner size='spinner-grow-sm' />
            }
            {
                
            }
            {
                members
                &&
                <ul className='p-0 m-0'>
                    {members.map(member => (
                        <li key={member.id} className='d-flex align-items-center justify-content-between py-3 px-4 border-bottom border-1'>
                            <div className='d-flex align-items-center fs-3 fw-bold'>
                                <Avatar style={{width: '4.6rem', height: '4.6rem'}} className='me-4' avatar={member.avatar} name={member.name} />
                                {member.name}
                            </div>
                            <Button
                                className={clsx(styles.btn)}
                                onClick={() => handleKickMember(member.id)}
                            >
                                <FontAwesomeIcon style={{width: '2.2rem', height: '2.2rem'}} icon={faUserMinus} />
                            </Button>
                        </li>
                    ))}
                </ul>
            }
            <div className='fs-3 fw-bold py-2 px-4 border-bottom border-1 shadow-sm'>
                Add Member
            </div>
            <input
                className={clsx(styles.inputSearch, {
                    'border-bottom border-1': !!userSearch
                })}
                type="text"
                placeholder='Search Name'
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <div>
                {
                    userSearch
                    &&
                    <ul className='p-0 m-0'>
                        {userSearch.map(friend => (
                            <li key={friend.id} className='d-flex align-items-center justify-content-between py-3 px-4 border-bottom border-1'>
                                <div className='d-flex align-items-center fs-3 fw-bold'>
                                    <Avatar style={{width: '4.6rem', height: '4.6rem'}} className='me-4' avatar={friend.avatar} name={friend.name} />
                                    {friend.name}
                                </div>
                                <Button
                                    className={clsx(styles.btn)}
                                    onClick={() => handleAddMember(friend.id)}
                                >
                                    <FontAwesomeIcon style={{width: '2.2rem', height: '2.2rem'}} icon={faPlusCircle} />
                                </Button>
                            </li>
                        ))}
                    </ul>
                }
            </div>
        </div>
    </li>
  )
}

export default Member
import React, { useEffect, useState } from 'react'
import styles from './AddFriends.module.scss'
import clsx from 'clsx'
import Button from '../../../../components/Button'
import Avatar from '../../../../components/Avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faUser, faUserCheck, faUserPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { userCurrent } from '../../../Auth/SignIn/logInSlice'
import { addfriend, friendList } from '../FriendList/friendListSlice'

function AddFriends ({ wrapBtn }) {

    const [ hidden, setHidden ] = useState()
    const [ userSearches, setUserSearches ] = useState()
    const [ userSearch, setUserSearch ] = useState()
    const [ search, setSearch ] = useState('')
    const [ stateFriend, setStateFriend ] = useState()

    const user = useSelector(userCurrent)
    const friends = useSelector(friendList)

    useEffect(() => {
        if (friends && user && userSearch) {
            friends.forEach(friend => {
                if (userSearch.id === user.id) {
                    setStateFriend('user')
                } else if (userSearch.id === friend.id) {
                    setStateFriend('friend')
                }
            })
        }
    }, [userSearch])

    const dispatch = useDispatch()

    useEffect(() => {
        axios.get('/api/users')
            .then(res => res.data)
            .then(data => setUserSearches(data.users))
    }, [])

    useEffect(() => {
        if (userSearches) {
            setUserSearch(userSearches.find(userSearch => Number(userSearch.phone) === Number(search)))
        }
    }, [search])

    const handleAddFriend = () => {
        if (user && userSearch && !stateFriend) {
            const friendIds = friends.map(friend => friend.id)
            dispatch(addfriend({
                userId: user.id,
                newFriendIds: [...friendIds, userSearch.id]
            }))
        }
    }

  return (
    <li className='d-flex flex-column'>
        <Button
            className={clsx('w-100 fs-3 d-flex align-items-center ps-5 py-3', wrapBtn, {
                [styles.focusBtn]: hidden,
                'text-white': hidden
            })}
            onClick={() => setHidden(!hidden)}
        > 
            <FontAwesomeIcon className='me-4 col-1' icon={faUserPlus} />
            Add Friend
        </Button>
        <div className={clsx(styles.wrapSearch, 'position-relative', {
            'd-block': hidden
        })}>
            <input
                className={clsx(styles.inputSearch, {
                    'border-bottom border-1': !!userSearch
                })}
                type="text"
                placeholder='Phone Number'
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <Button
                className={clsx(styles.closeBtn, 'd-flex align-items-center justify-content-center',
                    search.length > 0 ? 'visible' : 'invisible'
                )}
                onClick={() => setSearch('')}
            >
                <FontAwesomeIcon style={{color: 'rgb(205,205,205)', width: '1.2rem'}} icon={faXmark} />
            </Button>
            {
                userSearch
                &&
                <div className={clsx('col-10 mx-auto py-3 d-flex justify-content-start align-items-center')}>
                    <Avatar avtar={userSearch.avatar} name={userSearch.name} style={{width: '4.4rem', height: '4.4rem'}} />
                    <div className='mx-auto fs-3 fw-bold ms-4'> 
                        {userSearch.name}
                    </div>
                    {
                        !stateFriend
                        &&
                        <Button
                            className={styles.addBtn}
                            onClick={handleAddFriend}
                        >
                            <FontAwesomeIcon icon={faCirclePlus} />
                        </Button>
                    }
                    {
                        stateFriend === 'user'
                        &&
                        <Button
                            className={styles.addBtn}
                        >
                            <FontAwesomeIcon icon={faUser} style={{width: '1.8rem', height: '1.8rem'}} />
                        </Button>
                    }
                    {
                        stateFriend === 'friend'
                        &&
                        <Button
                            className={styles.addBtn}
                        >
                            <FontAwesomeIcon icon={faUserCheck} style={{width: '2.2rem', height: '2.2rem'}} />
                        </Button>
                    }
                </div>
            }
        </div>
    </li>
  )
}

export default AddFriends
import React, { useEffect, useState } from 'react'
import styles from './SearchConversation.module.scss'
import clsx from 'clsx'
import Button from '../../../../components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { messengers } from '../../Box/chatBoxSlice'

function SearchConversation ({ wrapBtn }) {
    
    const [ search, setSearch ] = useState('')
    const [ hidden, setHidden ] = useState(false)
    const [ filterMessengers, setFilterMessengers ] = useState([])
    const [ count, setCount ] = useState(1)

    const allMessengers = useSelector(messengers).allMessengers

    useEffect(() => {
        if (search) {
            setFilterMessengers(allMessengers.filter(messenger => messenger.messenger.toLowerCase().includes( search.toLowerCase())))
        }
    }, [search])

  return (
    <li className='d-flex flex-column'>
        <Button
            className={clsx('w-100 fs-3 d-flex align-items-center ps-5 py-3', wrapBtn, {
                [styles.focusBtn]: hidden,
                'text-white': hidden
            })}
            onClick={() => setHidden(!hidden)}
        > 
            <FontAwesomeIcon className='me-4 col-1' icon={faMagnifyingGlass} />
            Search in Conversation
        </Button>
        <div className={clsx(styles.wrapSearch, 'position-relative', {
            'd-block': hidden
        })}>
            <input
                className={clsx(styles.inputSearch, {
                    'border-bottom border-1': !!filterMessengers.length
                })}
                type="text"
                placeholder='Search'
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <div className={clsx(styles.wrapBtns,
                    search.length > 0 ? 'd-flex align-items-center' : 'd-none'
                )}>
                {
                    !!filterMessengers.length
                    &&
                    <div className='me-2' style={{color: 'rgb(205,205,205)'}}>
                        {count}/{filterMessengers.length}
                    </div>
                }
                <Button
                    className={styles.btn}
                    disabled={count <= 1}
                    onClick={() => setCount(prev => prev - 1)}
                >
                    <FontAwesomeIcon style={{color: 'rgb(205,205,205)', width: '1.6rem'}} icon={faAngleDown} />
                </Button>
                <Button
                    className={styles.btn}
                    disabled={count >= filterMessengers.length}
                    onClick={() => setCount(prev => prev + 1)}
                >
                    <FontAwesomeIcon style={{color: 'rgb(205,205,205)', width: '1.6rem'}} icon={faAngleUp} />
                </Button>
                <Button
                    className={styles.btn}
                    onClick={() => {
                        setSearch('')
                        setFilterMessengers([])
                    }}
                >
                    <FontAwesomeIcon style={{color: 'rgb(205,205,205)', width: '1.2rem'}} icon={faXmark} />
                </Button>
            </div>
            {
                !!filterMessengers.length
                &&
                <div className={clsx('col-10 mx-auto py-3 d-flex justify-content-start align-items-center')} style={{color: '#999'}}>
                    {filterMessengers[count-1].messenger}
                </div>
            }
        </div>
    </li>
  )
}

export default SearchConversation
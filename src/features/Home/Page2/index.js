import React from 'react'
import clsx from 'clsx'
import styles from './Page2.module.scss'
import IMG1 from '../../../app/images/IMG1.jpg'
import IMG2 from '../../../app/images/IMG2.jpg'
import IMG3 from '../../../app/images/IMG3.jpg'
import Button from '../../../components/Button'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signUp } from '../signSlice'
import Avatar from '../../../components/Avatar'

function Page2 ({ active }) {

    const dispatch = useDispatch()

    const listUsers = [
        {
            id: 1,
            name: 'Tien',
            avatar: ''
        },
        {
            id: 2,
            name: 'Bia',
            avatar: ''
        },
        {
            id: 3,
            name: 'Rum',
            avatar: ''
        },
        {
            id: 4,
            name: 'Sang',
            avatar: ''
        },
        {
            id: 5,
            name: 'Tung',
            avatar: ''
        }
    ]

  return (
      <div className={clsx(styles.wrapper, 'container-fluid', {
        [styles.activeSlide]: !active,
        [styles.activeSlideOpp]: active,
    })}>
        <div className='container-xl d-flex flex-column justify-content-evenly align-items-center h-100'>
            <div className='row order-1 order-xl-0 pt-xl-5'>
                <div className='col-12 col-xl-8'>
                    <div className={clsx('w-100', styles.wrapIMG)}>
                        <img className={clsx(styles.img)} src={IMG1} alt="" />
                    </div>
                </div>
                <div className='col-12 col-xl-4 d-none d-xl-flex flex-column justify-content-between ms-auto'>
                    <div className={clsx('w-100', styles.wrapIMG)}>
                        <img className={clsx(styles.img)} src={IMG2} alt="" />
                    </div>
                    <div className={clsx('w-100', styles.wrapIMG)}>
                        <img className={clsx(styles.img)} src={IMG3} alt="" />
                    </div>
                </div>
            </div>
            <div className='row order-0 order-xl-1 d-flex w-100'>
                <div className='order-1 order-xl-0 col-10 col-xl-6 mx-auto d-flex flex-column'>
                    <div className='row d-none d-xl-block mb-4'>
                        <ul className={clsx(styles.wrapAva, 'col-9 mx-auto d-flex')}>
                            {listUsers.map(user => (
                                <li>
                                    <Avatar avatar={user.avatar} name={user.name} className={styles.avatarUser} />
                                </li>
                            ))}
                            <li className={clsx(styles.avatarUser, 'fs-1 fw-bold d-flex align-items-center bg-dark ps-2 text-white')}>
                                1M+
                            </li>
                        </ul>
                    </div>
                    <div className='row'>
                        <Button
                            className='col-10 d-flex mx-auto p-0'
                            onClick={() => dispatch(signUp())}
                        >
                            <Link to='/auth' className='col-12 p-3'>
                                Sign Up
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className={clsx(styles.text, 'order-0 order-xl-1 col-12 col-xl-6 text-center mt-3')}>
                    CHATBOX
                </div>
            </div>
        </div>
    </div>
  )
}

export default Page2
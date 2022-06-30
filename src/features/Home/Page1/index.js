import React from 'react'
import clsx from 'clsx'
import styles from './Page1.module.scss'
import BG from '../../../app/images/BGChatBox.jpg'
import Button from '../../../components/Button'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signIn } from '../signSlice'

function Page1 ({ active }) {

    const dispatch = useDispatch()

  return (
    <div className={clsx('container-fluid p-0', {
        [styles.activeSlide]: !active,
        [styles.activeSlideOpp]: active,
    })} style={{width: '100vw', height: '100vh'}}>
        <img className='w-100 h-100' style={{objectFit: 'cover'}} src={BG} alt="" />
        <div className={styles.wrapper}>
            <div className='container-xl d-flex flex-column justify-content-between align-items-center py-5 h-100'>
                <div className={clsx('row d-flex justify-content-center fw-bold', styles.text)}>
                    CHATBOX
                    <div className='fs-1 text-center fw-light' style={{letterSpacing: '0.8rem', color: 'var(--primary-color)'}}>
                        Connect Communities
                    </div>
                </div>
                <div className='row w-100 d-flex justify-content-center'>
                    <Button
                        className='col-10 col-md-4 d-flex p-0 me-3'
                        onClick={() => dispatch(signIn())}
                    >
                        <Link to='/auth' className='col-12 p-3'>
                            Sign In
                        </Link>
                    </Button>
                    <Button className='col-10 col-md-4 d-flex p-0 ms-3' disabled={true} style={{cursor: 'pointer'}}>
                        <Link to='/' className='col-12 p-3'>
                            7-Day Trial Free
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Page1
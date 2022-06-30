import React, { useState } from 'react'
import clsx from 'clsx'
import styles from './SignIn.module.scss'
import FormInput from '../../../components/FormInput'
import Button from '../../../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { isLogging, logInState } from './logInSlice'

function SignIn ({ className }) {

    const dispatch = useDispatch()
    const state = useSelector(logInState)
    
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    
    const handleSignIn = () => {
        dispatch(isLogging({
            email,
            password,
        }))
    }

  return (
    <div className={clsx(styles.wrapper, className, 'd-flex align-items-center justify-content-center')}>
        <div className={clsx('col-11 col-lg-8 col-xl-11 p-5 d-flex align-items-center flex-column justify-content-between', styles.form)}>
            <div className='col-12 text-center fs-2 fw-bold' style={{color: 'var(--secondary-color)', letterSpacing: '0.3rem', userSelect: 'none'}}>
                WELCOME BACK TO CHATBOX
            </div>
            <div className='col-11 mx-auto'>
                <form>
                    <FormInput
                        style={{height: '7rem'}}
                        placeholder='Email'
                        forLabel='Email'
                        value={email}
                        setValue={setEmail}
                    />
                    <FormInput
                        style={{height: '7rem'}}
                        type='password'
                        placeholder='password'
                        forLabel='Password'
                        value={password}
                        setValue={setPassword}
                    />
                </form>
                <div className='col-12 mb-3 text-center text-danger fs-3 fw-bold'>
                    {
                        state !== 'loading' && state !== 'success'
                        &&
                        state
                    }
                </div>
                <div>
                    <Button
                        className='col-12 d-flex align-items-center justify-content-center'
                        onClick={handleSignIn}
                    >
                        {
                            state === 'loading'
                            &&
                            <div className="col-1 spinner-border" style={{width: '3rem', height: '3rem'}} role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        }
                        <div className='col-4 text-center p-3'>
                            Sign In
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignIn
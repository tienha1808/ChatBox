import React, { useState } from 'react'
import clsx from 'clsx'
import styles from './SignUp.module.scss'
import FormInput from '../../../components/FormInput'
import Button from '../../../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { isRegister, registerState } from './registerSlice'

function SignUp ({ className }) {

  const dispatch = useDispatch()
  const state = useSelector(registerState)

  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ phone, setPhone ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ confirmPassword, setConfirmPassword ] = useState('')
  const [ error, setError ] = useState({emailError: false, passwordError: false, phoneError: false, confirmPasswordError: false})
  const [ warning, setWarning ] = useState()

  const handleEmail = value => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      setError({ ...error, emailError: false })
    } else {
      setError({ ...error, emailError: true })
    }
  }

  const handlePhone = value => {
    if (/^[0-9]{10}$/.test(value)) {
      setError({...error, phoneError: false})
    } else {
      setError({...error, phoneError: true})
    }
  }

  const handlePassword = value => {
    if (value.length >= 6) {
      setError({...error, passwordError: false})
    } else {
      setError({...error, passwordError: true})
    }
  }

  const handleConfirmPassword = value => {
    if (value === password) {
      setError({...error, confirmPasswordError: false})
    } else {
      setError({...error, confirmPasswordError: true})
    }
  }
  
  const handleRegister = () => {
    if (firstName.length > 0 && !error.emailError && !error.passwordError && !error.confirmPasswordError && !error.phoneError) {
      setWarning(false)
      dispatch(isRegister({
        name: `${firstName} ${lastName}`,
        email,
        phone,
        password,
      }))
    } else {
      setWarning(true)
    }
  }

  return (
    <div className={clsx(styles.wrapper, className, 'd-flex align-items-center justify-content-center')}>
        <div className={clsx('col-11 col-lg-8 col-xl-11 p-5 d-flex align-items-center flex-column justify-content-between', styles.form)}>
            <div className='col-12 text-center fs-2 fw-bold' style={{color: 'var(--secondary-color)', letterSpacing: '0.3rem', userSelect: 'none'}}>
                WELCOME TO CHATBOX
            </div>
            <div className='col-11 mx-auto'>
              <form className='mb-3'>
                <div className='d-flex justify-content-between'>
                  <div className='col-6 pe-3'>
                    <FormInput      
                      style={{height: '7rem'}}
                      placeholder='First Name'
                      forLabel='First Name'
                      value={firstName}
                      setValue={setFirstName}
                      required={true}
                    />
                  </div>
                  <div className='col-6 ps-3'>
                    <FormInput      
                      style={{height: '7rem'}}
                      placeholder='Last Name'
                      forLabel='Last Name'
                      value={lastName}
                      setValue={setLastName}
                    />
                  </div>
                </div>
                <FormInput
                    style={{height: '7rem'}}
                    placeholder='Email'
                    forLabel='Email'
                    value={email}
                    setValue={setEmail}
                    required
                    error={error.emailError}
                    setCondition={handleEmail}
                    errorText="Email invalid"
                />
                <FormInput      
                  style={{height: '7rem'}}
                  placeholder='Phone'
                  forLabel='Phone'
                  value={phone}
                  setValue={setPhone}
                  required
                  error={error.phoneError}
                  setCondition={handlePhone}
                  errorText="It must be 10 digits in length"
                />
                <FormInput
                    style={{height: '7rem'}}
                    type='password'
                    placeholder='password'
                    forLabel='Password'
                    value={password}
                    setValue={setPassword}
                    required
                    error={error.passwordError}
                    setCondition={handlePassword}
                    errorText='It must be at least 6 characters in length'
                />
                <FormInput      
                  style={{height: '7rem'}}
                  type='password'
                  placeholder='Confirm Password'
                  forLabel='Confirm Password'
                  value={confirmPassword}
                  setValue={setConfirmPassword}
                  required
                  error={error.confirmPasswordError}
                  setCondition={handleConfirmPassword}
                  errorText='Please make sure your passwords match'
                />        
              </form>
              <div className='col-12 mb-3 text-center text-danger fs-3 fw-bold'>
                {
                  state !== 'loading' && state !== 'success'
                  &&
                  state
                }
                {
                  warning && 'Opps!!! There were some problems with your input.'
                }
              </div>
              <div>
                <Button
                  className='col-12 d-flex align-items-center justify-content-center'
                  onClick={handleRegister}
                >
                  {
                    state === 'loading'
                    &&
                    <div className="col-1 spinner-border" style={{width: '3rem', height: '3rem'}} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                  }
                  <div className='col-4 text-center p-3'>
                      Sign Up
                  </div>
                </Button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default SignUp
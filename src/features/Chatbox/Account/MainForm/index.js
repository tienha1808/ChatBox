import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import styles from './MainForm.module.scss'
import FormInput from '../../../../components/FormInput'
import Button from '../../../../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { isUpdating, updateState } from '../../../Auth/SignIn/logInSlice'

function MainForm ({ user, avatar }) {

    const [ fullName, setFullName ] =useState(user.name)
    const [ phone, setPhone ] = useState(user.phone)
    const [ age, setAge ] = useState(user.age)
    const [ newPassword, setNewPassword ] = useState(user.password)
    const [ confirmNewPassword, setConfirmNewPassword ] = useState(user.password)
    const [ hiddenPass, setHiddenPass ] = useState()
    const [ error, setError ] = useState({passwordError: false, phoneError: false, confirmPasswordError: false})
    const [ warning, setWarning ] = useState()

    const dispatch = useDispatch()
    const state = useSelector(updateState)
    
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
        if (value === newPassword) {
            setError({...error, confirmPasswordError: false})
        } else {
            setError({...error, confirmPasswordError: true})
        }
    }

    useEffect(() => {
        if (confirmNewPassword !== newPassword) {
            setError({...error, confirmPasswordError: true})
        }
    }, [newPassword])

    const handleUpdateProfile = () => {
        if (fullName.length > 0 && !error.passwordError && !error.confirmPasswordError && !error.phoneError) {
          setWarning(false)
          dispatch(isUpdating({
            userId: user.id,
            avatar: avatar,
            name: fullName,
            age: age,
            phone: phone,
            password: newPassword,
          }))
        } else {
          setWarning(true)
        }
    }
    
    
  return (
    <div className={clsx('h-100 col-7 ms-auto d-flex flex-column shadow-sm py-5', styles.bgWrapper)}>
        <div className='col-8 m-auto mt-5' style={{marginRight: '5.3rem'}}>
            <form className='position-relative'>
                <FormInput
                    style={{height: '7.2rem', letterSpacing: '0.1rem'}}
                    type='text'
                    forLabel='Full Name'
                    placehoder='Full Name'
                    value={fullName}
                    setValue={setFullName}
                />
                <FormInput
                    style={{height: '7.2rem', letterSpacing: '0.1rem'}}
                    type='text'
                    forLabel='Age'
                    placehoder='Age'
                    value={age}
                    setValue={setAge}
                />
                <FormInput
                    style={{height: '7.2rem', letterSpacing: '0.1rem'}}
                    type='text'
                    forLabel='Email'
                    placehoder='Email'
                    value={user.email}
                    disabled
                />
                <FormInput
                    style={{height: '7.2rem', letterSpacing: '0.1rem'}}
                    type='text'
                    forLabel='Phone'
                    placehoder='Phone'
                    value={phone}
                    setValue={setPhone}
                    error={error.phoneError}
                    setCondition={handlePhone}
                    errorText="It must be 10 digits in length"
                />
                <FormInput
                    style={{height: '7.2rem', letterSpacing: '0.1rem'}}
                    type={hiddenPass ? 'text' : 'password'}
                    forLabel='New Password'
                    placehoder='New Password'
                    value={newPassword}
                    setValue={setNewPassword}
                    error={error.passwordError}
                    setCondition={handlePassword}
                    errorText='It must be at least 6 characters in length'
                />
                <FormInput
                    style={{height: '7.2rem', letterSpacing: '0.1rem'}}
                    type={hiddenPass ? 'text' : 'password'}
                    forLabel='Confirm New Password'
                    placehoder='Confirm New Password'
                    value={confirmNewPassword}
                    setValue={setConfirmNewPassword}
                    error={error.confirmPasswordError}
                    setCondition={handleConfirmPassword}
                    errorText='Please make sure your passwords match'
                />
                <label
                    className={clsx(styles.showBtn, 'd-flex align-items-center')} htmlFor='show'
                    onClick={() => setHiddenPass(!hiddenPass)}
                >
                    <input
                        className={clsx(styles.inputCheckbox, 'me-3')}
                        name='show'
                        type='checkbox'
                        checked={hiddenPass}
                    />
                    Show Password
                </label>
            </form>
            <div className='col-12 mb-3 text-center text-danger fw-bold' style={{fontSize: '1.3rem'}}>
                {
                  state !== 'loading'
                  &&
                  state
                }
                {
                  warning && 'Opps!!! There were some problems with your input.'
                }
              </div>
            <Button
                className='w-100 py-3 d-flex align-items-center justify-content-center'
                onClick={handleUpdateProfile}
            >
                {
                    state === 'loading'
                    &&
                    <div className="col-1 spinner-border me-4" style={{width: '3rem', height: '3rem'}} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                  }
                Update Profile
            </Button>
        </div>
    </div>
  )
}

export default MainForm
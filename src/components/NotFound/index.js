import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { isLoggedIn } from '../../features/Auth/SignIn/logInSlice'
import Spinner from '../Spinner'

function NotFound () {
    
    const navigate = useNavigate()
    const loggedIn = useSelector(isLoggedIn)

    useEffect(() => {
        if(loggedIn) {
            navigate('/chatbox', {replace: true})
        } else {
            navigate('/auth', {replace: true})
        }
    }, [loggedIn])

  return (
    <div className='d-flex align-items-center justify-content-center' style={{width: '100vw', height: '100vh'}}>
        <Spinner />
    </div>
  )
}

export default NotFound
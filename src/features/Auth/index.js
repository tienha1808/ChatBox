import React, { useEffect, useState } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import AuthIMG from '../../app/images/AuthIMG.jpg'
import AuthIMG1 from '../../app/images/AuthIMG1.jpg'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { isLoggedIn } from './SignIn/logInSlice'
import { signSelector } from '../Home/signSlice'
import ChangeBtn from './ChangeBtn'

function Auth () {

  const sign = useSelector(signSelector)
  const loggedIn = useSelector(isLoggedIn)
  const navigate = useNavigate()

  const [ changeForm, setChangeForm ] = useState(sign)


  useEffect(() => {
    if(loggedIn) {
        navigate('/chatbox', {replace: true})
    }
}, [loggedIn])

  return (
    <div className='container-fluid w-100 h-100 overflow-hidden p-0'>
      <div className='row'>
        <div className='col-12 col-xl-6 pe-1 position-relative'
          style={{
            height: '100vh'
          }}
        >
          <img className='w-100 h-100' style={{objectFit: 'cover'}} src={AuthIMG} alt="" />
          {
            changeForm
            ?
            <SignIn className />
            :
            <ChangeBtn change={changeForm} setChange={setChangeForm}>
              Sign In
            </ChangeBtn>
          }
        </div>
        <div className='col-12 col-xl-6 ps-1 position-relative'
          style={{
            height: '100vh'
          }}
        >
          <img className='w-100 h-100' style={{objectFit: 'cover'}} src={AuthIMG1} alt="" />
          {
            changeForm
            ?
            <ChangeBtn change={changeForm} setChange={setChangeForm}>
              Sign Up
            </ChangeBtn>
            :
            <SignUp className />
          }
        </div>
      </div>
    </div>
  )
}

export default Auth
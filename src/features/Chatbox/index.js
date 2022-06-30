import React, { useEffect, useState } from 'react'
import Box from './Box'
import ChatList from './ChatList'
import Extended from './Extended'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { isLoggedIn } from '../Auth/SignIn/logInSlice'
import Account from './Account'

function Chatbox() {

  const loggedIn = useSelector(isLoggedIn)
  const navigate = useNavigate()

  const [ myAccount, setMyAccount ] = useState()

  useEffect(() => {
    if(!loggedIn) {
        navigate('/auth', {replace: true})
    }
}, [loggedIn])

  return (
    <div className='container-fluid p-0 overflow-hidden' style={{width: '100vw', height: '100vh'}}>
      <div className='d-flex p-0 h-100 over'>
        <div className='col-3 p-0 border-end border-1 shadow-sm'>
          <ChatList />
        </div>
        <div className='col-6 p-0'>
          <Box />
        </div>
        <div className='col-3 p-0'>
          <Extended setHidden={setMyAccount} />
        </div>
        <Account hidden={myAccount} setHidden={setMyAccount} />
      </div>
    </div>
  )
}

export default Chatbox
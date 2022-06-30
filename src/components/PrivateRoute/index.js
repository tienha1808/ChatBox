import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

function PrivateRoute ({isLoggedIn}) {

  return isLoggedIn ? <Outlet /> : <Navigate to='/auth' />
}

export default PrivateRoute
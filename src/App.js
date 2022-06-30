import React from "react";
import { BrowserRouter ,Route, Routes } from 'react-router-dom'
import Auth from "./features/Auth";
import Home from "./features/Home";
import Chatbox from "./features/Chatbox";
import PrivateRoute from "./components/PrivateRoute";
import { useSelector } from "react-redux";
import { isLoggedIn } from "./features/Auth/SignIn/logInSlice";
import NotFound from "./components/NotFound";

function App() {

  const loggedIn = useSelector(isLoggedIn)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route element={<PrivateRoute isLoggedIn={loggedIn} />}>
          <Route path='chatbox' element={<Chatbox />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

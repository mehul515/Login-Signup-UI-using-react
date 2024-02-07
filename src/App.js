import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './Components/Login'
import Register from './Components/Register'
import Home from './Pages/Home'
import ProtectedRoute from './Components/ProtectedRoute'
import ForgetPassword from './Components/ForgetPassword'
import ChangePassword from './Components/ChangePassword'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/user/reset/:id/:token' element={<ChangePassword />}></Route>
          <Route path='/resetPassword' element={<ForgetPassword />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/' element={<ProtectedRoute />}>
            <Route path='/home' element={<Home />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
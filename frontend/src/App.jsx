import React from 'react'
import { Routes, Route } from "react-router-dom"
import Login from './Pages/Account/Login'
import SignUp from './Pages/Account/SignUp'
import Post from './Pages/Post'
import Profile from './Pages/Profile'
import AddPost from './Pages/AddPost'
import EditProfile from './Pages/EditProfile'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/feed' element={<Post/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/add-post' element={<AddPost/>}/>
        <Route path='/edit-profile' element={<EditProfile/>}/>
      </Routes>
    </div>
  )
}

export default App
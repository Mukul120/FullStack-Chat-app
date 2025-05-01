import React, { useEffect } from 'react'
import "./App.css"
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import SettingPage from './pages/SettingPage'
import ProfilePage from './pages/ProfilePage'
import { authStore } from './store/authStore'
import { Loader } from "lucide-react"

const App = () => {
  const { checkAuth, authUser, isChecking, onlineUsers } = authStore()
  console.log(onlineUsers);
  useEffect(() => {
    checkAuth();
  }, [])
  // console.log(authUser);

  if (isChecking && !authUser) return (
    <div className="flex justify-center items-center h-screen">
      <Loader className='size-20 animate-spin' />
    </div>
  )

  return (
    <>
      <div className="" >
        <Toaster
          position="top-center"
          toastOptions={{
            success: {
              duration: 3000,
              style: {
                background: '#4CAF50',
                color: 'white',
              },
            },
            error: {
              duration: 4000,
              style: {
                background: 'white',
                color: 'black',
              },
            },
          }}
        />

        {authUser && <Navbar />}


        <Routes>
          <Route path='/' element={authUser ? <Home /> : <Navigate to="/login" />} />
          <Route path='/signup' element={!authUser ? <SignUp /> : <Navigate to="/" />} />
          <Route path='/login' element={!authUser ? <Login /> : <Navigate to="/" />} />
          <Route path='/setting' element={<SettingPage />} />
          <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        </Routes>


      </div>

    </>
  )
}

export default App
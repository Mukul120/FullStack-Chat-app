import React from 'react'
import { LogOutIcon, MessageCircle, Settings, User } from "lucide-react"
import { Link } from 'react-router-dom'
import { authStore } from '../store/authStore'

const Navbar = () => {
  const { authUser, logout } = authStore()

  return (

    <div className='flex flex-1 justify-between items-center w-full px-20 py-3 bg-base-200 h-[10vh] '>
      <Link to={"/"} className='flex justify-center items-center gap-2'><MessageCircle className='size-10' />
        <h1 className='font-semibold text-lg hidden sm:inline'>QuikConnect</h1></Link>
      <div className="">
        <ul className=' cursor-pointer flex justify-between items-center bg-amber w-full gap-10'>
          {/* <Link to={"/setting"} className='flex justify-center items-center gap-2 '> <Settings /><span className='hidden sm:inline'>Settings</span></Link> */}
          {authUser && (<>
            <Link to={"/profile"} className='flex gap-2'><User /><span className='hidden sm:inline'>profile</span> </Link>
            <button onClick={logout} className='flex gap-2'><LogOutIcon /> <span className='hidden sm:inline'>logout</span></button>
          </>)}
        </ul>
      </div>
    </div>
  )
}

export default Navbar
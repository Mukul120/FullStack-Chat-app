import React from 'react'
import { useChatStore } from '../store/useChatStore';
import { authStore } from "../store/authStore"
import { X } from 'lucide-react';


const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = authStore()


    const closeChat = () => {
        setSelectedUser()
    }


    return (
        <div>
            <div className="bg-green- w-full  flex p-1 justify-between bg-base-300   ">

                <div className="flex gap-3 ">
                    <img src={selectedUser.profilepic || "./public/user.png"} alt='dp hai'
                        className='size-12 rounded-full object-cover ring ring-white' />
                    <div className="">
                        <h1>{selectedUser.fullname} </h1>
                        <p>{onlineUsers.includes(selectedUser._id) ? "online" : "offline"}</p>
                    </div>
                </div>

                <button onClick={closeChat}>
                    <X className='size-5 hover:cursor-pointer' />
                </button>
            </div>
        </div>
    )
}

export default ChatHeader
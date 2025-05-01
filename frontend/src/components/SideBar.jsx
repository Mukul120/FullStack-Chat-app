import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { Users } from 'lucide-react'
import { authStore } from '../store/authStore';

const SideBar = () => {
    const { users, isUserLoading, selectedUser, getUsers, setSelectedUser, } = useChatStore();
    // const onlineUsers = [];
    const { onlineUsers } = authStore()

    useEffect(() => {
        // console.log(getUsers());
        getUsers();


    }, [getUsers])

    if (isUserLoading) return <div className="">loading.....</div>


    return (
        <div className='w-full h-full space-y-2  bg-base-200  '>
            <div className="border-b border-white py-3 ">

                <div className="flex items-center gap-2 md:pl-6 ">
                    <Users className='size-7' />
                    <span className=' font-semibold text-lg'>Contacts</span>
                </div>
                {/* <div className="flex items-center gap-2 pl-6 ">
                    <Users className='size-7' />
                    <h1 className='font-semibold text-lg '>Contacts</h1>
                </div> */}
                <div className="">
                    {/* onlinne user togggle */}
                </div>

            </div>

            <div className=" overflow-y-auto h-[80vh] ">
                <div className=" w-full  h-[10vh]   rounded-sm flex flex-col mt-2 gap-5  " >
                    {users.map((user) => {
                        return (
                            <div key={user._id}
                                onClick={() => { setSelectedUser(user) }}
                                className={`flex gap-2 ${selectedUser?._id === user._id ? "bg-base-300" : ""} w-full h-full items-center  p-2 hover:bg-base-100 hover:rounded-md`}>
                                <div className="relative">
                                    <img src={user.profilepic || '/user.png'} alt="dp hai bhai"
                                        className='size-10 md:size-14  rounded-full object-cover ring-1' />
                                    {onlineUsers.includes(user._id) && <span className=' size-2 md:size-3 bg-green-500 absolute rounded-full   right-0.5 bottom-0.5 md:right-1 ring-1 ring-zinc-100'></span>}
                                </div>
                                <div className=" min-w-0">
                                    <h1 className='font-semibold text-lg'>  {user.fullname}</h1>
                                    <h2 className='font-light text-md'>{onlineUsers.includes(user._id) ? "online" : "offline"} </h2>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>



        </div>
    )
}

export default SideBar
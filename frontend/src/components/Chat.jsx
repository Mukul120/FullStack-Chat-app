import { MessageCircle } from 'lucide-react'
import React from 'react'

const NoChat = () => {
    return (
        <>
            <div className="flex justify-center items-center w-full h-full">
                <div className="flex-col space-y-5 ">
                    <div className="flex-col space-y-3">
                        <MessageCircle className='text-2xl font-bold text-center text-slate-500  w-full size-30' />
                        <h1 className='text-white text-center  text-xl font-bold '>"Connect Instantly, Chat Effortlessly!"</h1>
                    </div>
                    <p className='text-center text-slate-400 font-medium '>"Stay connected with instant messaging and real-time conversations. <br />QuikConnect makes chatting seamless, fast, and secure !" </p>
                    <p className='text-center text-slate-400 font-medium '>Select User to Start chat !!...</p>
                </div>
            </div>
        </>
    )
}

export default NoChat
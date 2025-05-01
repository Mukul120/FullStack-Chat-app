import React from 'react'
import Chat from '../components/Chat'
import { useChatStore } from '../store/useChatStore'
import SideBar from '../components/SideBar'
import ChatContainer from '../components/ChatContainer'
import NoChat from '../components/Chat'

const Home = () => {
  const { selectedUser } = useChatStore();

  return (
    <>
      <div className=" h-[90vh] w-screen flex py-1 gap-1 overflow-hidden" >

        {/* //shows User List  */}
        <div className="w-[35vw] md:w-[25vw]   flex-col h-[89vh]  ">
          <SideBar />
        </div>

        <div className="  w-[65vw] md:w-[75vw] bg-base-300  flex-col  h-[89vh] ">
          <div className="w-full h-full ">

            {!selectedUser ? <NoChat /> : <ChatContainer />}

          </div>
        </div>

      </div>
    </>
  )
}

export default Home
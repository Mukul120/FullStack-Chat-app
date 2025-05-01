import React, { useEffect, useRef, useState } from 'react';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import { useChatStore } from '../store/useChatStore';
import MessageSkeleton from './Skeletons/MessageSkeleton';
import { authStore } from '../store/authStore';

const ChatContainer = () => {
  const {
    messages,
    isMessageLoading,
    selectedUser,
    getMessage,
    subscribeToMessages,
    unsubscribeFromMessages,
    deleteMessage,
    removeMessage,
  } = useChatStore();

  const { authUser } = authStore();
  const messageEndRef = useRef(null);

  const [activeMsgId, setActiveMsgId] = useState(null);

  useEffect(() => {
    getMessage(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleDelete = async (messageId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this message?");
    if (!confirmDelete) return;

    try {
      await deleteMessage(messageId);
      removeMessage(messageId);  // Removes from current window immediately
      // Emit socket event to inform other user of the deletion
      const socket = authStore.getState().socket;
      socket.emit("messageDeleted", messageId);
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  };

  // subscribe to the messageDeleted event and update UI
  useEffect(() => {
    const socket = authStore.getState().socket;

    const handleMessageDeleted = (messageId) => {
      removeMessage(messageId);
    };

    socket.on("messageDeleted", handleMessageDeleted);

    return () => {
      socket.off("messageDeleted", handleMessageDeleted);
    };
  }, []);

  if (isMessageLoading) return (
    <div className="flex-1 overflow-hidden">
      <ChatHeader />
      <MessageSkeleton />
      <MessageInput />
    </div>
  );

  return (
    <div className='h-full w-full flex-1 flex flex-col'>
      {/* header */}
      <ChatHeader />

      {/* messages */}
      <div className="flex-1 overflow-y-auto bg-base-200">
        {messages.map((elem) => {
          const isSender = elem.senderId === authUser._id;

          return (
            <div key={elem._id} className="p-4">
              <div
                className={`chat ${isSender ? "chat-end" : "chat-start"} relative`}
                onClick={() => isSender && setActiveMsgId(activeMsgId === elem._id ? null : elem._id)}
                ref={messageEndRef}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt=""
                      src={isSender ? authUser.profilepic || "./user.png" : selectedUser.profilepic || "./user.png"}
                    />
                  </div>
                </div>

                <div className="chat-bubble text-sm">
                  {elem.image && (
                    <img src={elem.image} className='max-w-[150px] rounded-md mb-1' />
                  )}
                  {elem.text}
                </div>

                <div className="chat-footer opacity-50">
                  <time>{formatDate(elem.createdAt)}</time>
                </div>

                {/* Options dropdown */}
                {activeMsgId === elem._id && (
                  <div className="absolute right-40 bottom-4  shadow-lg rounded-md z-50 px-2">
                    <button
                      className="block px-3 py-2 text-slate-300 hover:text-white bg-gray-500 rounded-2xl"
                      onClick={() => handleDelete(elem._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;

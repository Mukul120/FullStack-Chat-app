import React from 'react'

const MessageSkeleton = () => {
    const skeletonMessages = Array(6).fill(null);
    return (
        <div>
            <div className="overflow-y-auto p-2">
                {skeletonMessages.map((_, idx) => (
                    <div key={idx} className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}>
                        <div className="chat-image avatar">
                            <div className="size-7 rounded-full bg-gray-300 animate-pulse" />
                        </div>

                        <div className="chat-header mb-1">
                            <div className="h-4 w-16 bg-gray-300 animate-pulse rounded" />
                        </div>

                        <div className="chat-bubble bg-transparent p-0">
                            <div className="h-15 w-[200px] bg-gray-300 animate-pulse rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MessageSkeleton
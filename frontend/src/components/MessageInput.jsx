import { Image, SendIcon, X } from 'lucide-react'
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useChatStore } from '../store/useChatStore'

const MessageInput = () => {
    const { sendMessage } = useChatStore()
    const [text, setText] = useState("")
    const [imagePreview, setImagePreview] = useState(null)
    const Fileref = useRef();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
            toast.error("Please select a valid image file.");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result)
        }
        reader.readAsDataURL(file)

    }
    const removeImage = () => {
        setImagePreview(null);
        if (Fileref.current) Fileref.current.value = "";

    }

    const handleSendmessage = async (e) => {
        e.preventDefault();
        const messageData = {
            text: text.trim(),
            image: imagePreview
        }

        // console.log("sending data: ", messageData);
        try {
            await sendMessage(messageData)
            setText("")
            setImagePreview(null);
            if (Fileref.current) Fileref.current.value = "";

        } catch (error) {
            console.log("failedf to send", error);
        }

    }

    return (
        <div className='p-2 w-full'>
            {imagePreview && <div className="  flex items-center ">
                <div className="relative overflow-hidden rounded-md">

                    <img src={imagePreview}
                        className='size-30 object-cover'
                    />

                    <button className='absolute -top-1 -right-1 rounded-full bg-slate-400 flex items-center justify-center'
                        onClick={removeImage}>
                        <X className='size-5' />
                    </button>
                </div>
            </div>}

            <form className="flex space-x-10 justify-between items-center" onSubmit={(e) => handleSendmessage(e)} >
                <div className="flex gap-7 items-center w-full  ">
                    <input type="text"
                        placeholder='Type Message Here..'
                        className='mt-2 w-full p-2 outline-none border border-slate-600 rounded-md'
                        value={text}
                        onChange={(e) => setText(e.target.value)}

                    />
                    <input type="file"
                        accept="image/*"
                        className='hidden'
                        onChange={handleImageChange}
                        ref={Fileref}
                    />
                    <button className={`${imagePreview ? "text-emerald-500" : ""} hidden sm:flex`}
                        type='button'
                        onClick={() => Fileref.current?.click()}>
                        <Image />
                    </button>
                </div>

                <button type='submit'

                    disabled={!text.trim() && !imagePreview}
                    className={`${imagePreview ? "text-orange-400" : ""} hidden sm:flex cursor-pointer`}

                >
                    <SendIcon />
                </button>


            </form>
        </div >
    )
}

export default MessageInput
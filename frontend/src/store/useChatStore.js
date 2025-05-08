import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"
import { authStore } from "./authStore"


export const useChatStore = create((set, get) => ({
    users: [],
    messages: [],
    isUserLoading: false,
    isMessageLoading: false,
    selectedUser: null,

    getUsers: async () => {
        set({ isUserLoading: true })
        try {
            const res = await axiosInstance.get("/message/users")
            console.log("users",res.data);
            set({ users: res.data })
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally {
            set({ isUserLoading: false })

        }
    },
    getMessage: async (userId) => {
        set({ isMessageLoading: true })
        try {
            const res = await axiosInstance.get(`/message/${userId}`)
            set({ messages: res.data })
            console.log("message :", res.data);
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally {
            set({ isMessageLoading: false })
        }
    },
    // sendMessage: async (messageData) => {
    //     try {
    //         const { selectedUser, messages } = get();

    //         if (!selectedUser) {
    //             toast.error("Please select a user to send a message.");
    //             return;
    //         }

    //         console.log("Sending message to:", selectedUser._id);
    //         console.log("Message data:", messageData);

    //         const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);

    //         console.log("Message sent successfully:", res.data);
    //         set({ messages: [...messages, res.data] });

    //     } catch (error) {
    //         console.error("Send message error:", error);

    //         if (error.response) {
    //             console.error("Error Response Data:", error.response.data);
    //             toast.error(error.response.data.message || "Server error occurred.");
    //         } else if (error.request) {
    //             console.error("No response received:", error.request);
    //             toast.error("No response from server. Please try again.");
    //         } else {
    //             console.error("Request setup error:", error.message);
    //             toast.error("An unexpected error occurred.");
    //         }
    //     }
    // },

    sendMessage: async (messageData) => {
        try {
            const { selectedUser, messages } = get();

            if (!selectedUser) {
                toast.error("Please select a user to send a message.");
                return;
            }

            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data] });

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send message.");
        }
    },

    deleteMessage: async (messageId) => {
        try {
            await axiosInstance.delete(`/message/delete/${messageId}`);
            set({ messages: get().messages.filter(msg => msg._id !== messageId) });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete message");
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = authStore.getState().socket;

        socket.on("newMessage", (newMessage) => {


            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
            if (!isMessageSentFromSelectedUser) return;

            set({
                messages: [...get().messages, newMessage],
            });
        });
    },
    removeMessage: (messageId) => {
        set((state) => ({
            messages: state.messages.filter((msg) => msg._id !== messageId),
        }));
    },


    unsubscribeFromMessages: () => {
        const socket = authStore.getState().socket;
        socket.off("newMessage");
    },

    setSelectedUser: async (user) => { set({ selectedUser: user }) }

}))
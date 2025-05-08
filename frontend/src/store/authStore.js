import { create } from "zustand"
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast"
import { useChatStore } from "./useChatStore.js"
import { io } from "socket.io-client"


const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/"


export const authStore = create((set, get) => ({

    authUser: null,
    socket: null,
    isSignnin: false,
    isLogging: false,
    isProfileUpadating: false,
    isSubmitting: false,

    isChecking: true,
    onlineUsers: [],


    checkAuth: async () => {
        try {

            const res = await axiosInstance.get("/auth/check")
            set({ authUser: res.data })
            get().connectSocket()


        } catch (error) {
            set({ authUser: null })
            console.log("error in autstore: ", error.message);
        }
        finally {
            set({ isChecking: false })
        }
    },

    signup: async (data) => {
        set({ isSubmitting: true })
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            toast.success('Signup successful!');
            set({ authUser: res.data })
            get().connectSocket()


        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
            toast.error(errorMessage);
            console.error('Signup error:', error);
        } finally {
            set({ isSubmitting: false })
        }

    },

    login: async (data) => {
        try {
            const res = await axiosInstance.post("/auth/login", data)
            set({ authUser: res.data })
            toast.success('Login successfull!');
            console.log('Form submitted with:', data);
            get().connectSocket()

        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
            toast.error(errorMessage);
            setMessage('An error occurred. Please try again.');
            console.error('login error:', error);
        } finally {
            setIsSubmitting(false);
        }
    },



    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null })
            useChatStore.getState().setSelectedUser(null);
            toast.success("LogOut Sucessfully")
            get().disconnectSocket()

        } catch (error) {
            set({ authUser: null })
            console.log("error in autstore: ", error.message);
        }
        finally {
            set({ isChecking: false })
        }

    },

    upadateProfile: async (data) => {
        set({ isProfileUpadating: true })
        try {
            const res = await axiosInstance.put("/auth/profilepic", data);
            set({ authUser: res.data })
            toast.success("profile Pic Updated")

        } catch (error) {
            console.log("error in updateprofile", error.message);
            toast.error(error.message)

        }
        finally {
            set({ isProfileUpadating: false })

        }
    },

    connectSocket: () => {
        const { authUser } = get()
        if (!authUser || get().socket?.connected) return;
        const socket = io(BASE_URL, {

            query: {
                userId: authUser._id
            }
        }
        )
        socket.connect();
        set({ socket: socket })

        socket.on("onlineUsers", (userIds) => {
            set({ onlineUsers: userIds })
        })
    },
    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect()
    },



}))
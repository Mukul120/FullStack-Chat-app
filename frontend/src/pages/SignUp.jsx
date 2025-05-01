import React, { useState } from 'react';
import { LockIcon, Mail, MessageCircle, User, Eye, EyeOff } from "lucide-react";
import { authStore } from '../store/authStore';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { axiosInstance } from "../lib/axios.js"
// import { signup } from "../store/authStore.js"

const SignUp = () => {
  const nav = useNavigate()
  const { signup, isSubmitting } = authStore()
  // const { authUser } = authStore();
  // State for form fields
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: ''
  });

  // State for form submission status
  // const [isSubmitting, setIsSubmitting] = useState(false);

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Handle input changes (two-way binding)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsSubmitting(true); // Set submitting state to true when form is submitted


    // Validate form
    if (!formData.fullname || !formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      // setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      // setIsSubmitting(false);
      return;
    }
    // try {
    //   const res = await axiosInstance.post("/auth/signup", formData);
    //   const data = res.data;

    //   authStore.setState({ authUser: data });

    //   toast.success('Signup successful!');
    //   nav("/");

    //   setFormData({ fullname: '', email: '', password: '' });
    // } catch (error) {
    //   const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
    //   toast.error(errorMessage);
    //   console.error('Signup error:', error);
    // } finally {
    //   setIsSubmitting(false);  // ✅ Always reset submission state, even if an error occurs
    // }
    signup(formData)
    setFormData({ fullname: '', email: '', password: '' });

  };

  return (



    <div className="flex justify-center items-center min-h-screen   bg-gray-900 p-4 ">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <MessageCircle className='text-2xl font-bold text-center text-gray-800 mb-2 w-full size-15' />
        <h1 className='text-black text-center mb-5 text-lg font-semibold '>"Connect Instantly, Chat Effortlessly!"</h1>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">SignUp</h2>



        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <div>
            <label className="text-lg font-semibold text-gray-700">
              Full Name
            </label>

            <div className="flex justify-between items-center gap-2 mt-2">
              <User className='size-7' />
              <input
                type="text"

                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label className="text-lg font-semibold text-gray-700">
              Email Address
            </label>
            <div className="flex justify-between items-center gap-2 mt-2">
              <Mail />
              <input
                type="email"

                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div>
            <label className="text-lg font-semibold text-gray-700">
              Password
            </label>
            <div className="flex justify-between items-center gap-2 mt-2">
              <LockIcon />
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}

                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="********"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-blue-300"
          >
            {isSubmitting ? 'Signing up...' : 'Sign Up'}
          </button>
          <Link to="/login" className='text-center flex justify-center items-center gap-2 w-full'>Already Have an Account?<span className='underline text-blue-600'>Login</span></Link>
        </form>
      </div>
    </div>

  );
};

export default SignUp;
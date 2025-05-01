import React, { useState } from 'react';
import { authStore } from '../store/authStore';
import { Camera } from "lucide-react"
import toast from 'react-hot-toast';

const ProfilePage = () => {
  // '/IMG_20230114_145224.jpg'
  const [profileImage, setProfileImage] = useState(null);


  const { authUser, upadateProfile, isProfileUpadating } = authStore()

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 10 * 1024 * 1024) {  // Limit to 2MB
      toast.error("File size must be less than 10MB!");
      return;
    }
    if (!file) return;
    if (file && file.type.substring(0, 5) === 'image') {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result;
        setProfileImage(base64Image);
        await upadateProfile({ profilepic: base64Image });

      };
      reader.readAsDataURL(file);
    }
  };

  return (

    <div className=" p-6 ">
      <div className="flex flex-col items-center justify-center  p-5 max-w-xl mx-auto bg-base-300 rounded-lg shadow-md space-y-5 mt-5 ">
        <div className="flex flex-col items-center space-y-2">
          <h1 className='font-bold text-2xl'>{authUser.fullname}</h1>
          <h3 className='font-semibold text-lg'>Your Profile information</h3>
        </div>
        <div className="relative mb-6">
          <img
            src={authUser.profilepic ||  "./public/user.png"}
            alt="Profile"
            className="w-44 h-44 rounded-full object-cover border-4 border-gray-200"
          />
          <label
            htmlFor="profile-upload"
            className="absolute bottom-2 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-blue-600"
          >
            <Camera size={30} />
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {isProfileUpadating ? <h2 className='font-medium text-lg'>updating ....</h2> : ""}


        <div className="bg-amber- w-full  bg-base-100 px-3 py-5 rounded-xl  ">
          <div className="mb-3">
            <label htmlFor="" className=' font-bold text-lg '>Name</label>
            <input type="text"
              className='text-md font-semibold bg-white text-slate-950 w-full  rounded-md px-1 py-2 mt-1 '
              placeholder={authUser.fullname}
              disabled={true} />
          </div>

          <div className="">
            <label htmlFor="" className=' font-bold text-lg '>Email</label>
            <input type="text"
              className='text-md font-semibold bg-white text-slate-950 w-full  rounded-md px-1 py-2 mt-1 '
              placeholder={authUser.email}
              disabled={true} />
          </div>
        </div>




      </div>
    </div>

  );
};

export default ProfilePage;
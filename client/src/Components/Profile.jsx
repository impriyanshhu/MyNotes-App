import React, { useState } from 'react';
import { useAuth } from '../Context/ContextProvider';

const Profile = ({ onLogout }) => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    onLogout?.();
  };

  return (
    <div className='relative group'>

      <div
        className='w-10 h-10 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-blue-500 font-semibold bg-sky-100 cursor-pointer hover:scale-110 hover:bg-sky-200 transition-transform'
        onClick={() => setOpen(!open)}
      >
        {user?.fullName
          ? user.fullName.charAt(0).toUpperCase() +
          (user.fullName.split(" ")[1]?.charAt(0).toUpperCase() || "")
          : "U"}
      </div>


      <ul className={`absolute top-10 right-0 bg-white shadow border border-gray-200 p-2.5 rounded-md z-40 ${open ? "block" : "hidden"}`}>

        <li className='p-1.5 pl-3'>
          <p className='text-sm font-medium text-blue-950'>
            {user?.fullName || "Unknown User"}
          </p>
        </li>

        <li className='p-1.5 pl-3 hover:bg-blue-500/10 cursor-pointer rounded-md'>
          <button
            className='text-sm text-[#B45309] hover:underline hover:text-[#16A34A] transition-colors duration-200 cursor-pointer'
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>

      </ul>

    </div>
  );
};

export default Profile;

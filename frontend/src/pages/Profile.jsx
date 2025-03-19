import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/Profile/SideBar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import MobileNav from '../components/Profile/MobileNav';

const Profile = () => {
  // const isLoggedIn = useSelector();  // Uncomment and use if needed
  const [profile, setProfile] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v1/get-user-info", { headers });
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);
  return (
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row h-auto py-8 gap-4 text-white">
      {!profile && (
        <div className='w-full h-[100%] flex items-center justify-center'>
          <Loader />{" "}
        </div>
      )}
      {profile && (
        <>
          <div className="w-screen h-screen md:w-1/6">
            <SideBar data={profile} />
            <MobileNav />
          </div>
          <div className="w-5/6">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;

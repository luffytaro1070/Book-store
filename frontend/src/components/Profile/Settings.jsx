import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../Loader/Loader'
const Settings = () => {
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`
  }
  const[value,setValue]=useState({address:""});
  const[profileData,setProfileData]=useState("");
  useEffect(()=>{
    const fetch=async ()=>{
      const res=await axios.get("http://localhost:1000/api/v1/get-user-info",{headers});
      setProfileData(res.data);
      setValue({address:res.data.address});
    }
    fetch();
  },[])
  const change=(e)=>{
    setValue({address:e.target.value});
    console.log(value)
  }
  const submitAddress=async () => {
    const res=await axios.put("http://localhost:1000/api/v1/update-address",value,{headers})
    alert(res.data.message);
  }
  return (
    <div>
      {!profileData && <Loader/>}
      {profileData &&(
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>Settings</h1>
          <div className='flex gap-12'>
            <div>
              <label htmlFor="">username</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>{profileData.username}</p>
            </div>
            <div>
              <label htmlFor="">email</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>
                {profileData.email}
              </p>
            </div>
          </div>
          <div className='flex flex-col mt-4'>
            <label htmlFor="">Address</label> 
            <textarea name="adress" id="" className='p-2 rounded bg-zinc-800 mt-2 font-semibold' rows='5' placeholder='address' value={value.address} onChange={change}>{change}</textarea> 
          </div>
          <div className='flex m-4 justify-end'>
            <button className='bg-yellow-200 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400' onClick={submitAddress}>
              update
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings
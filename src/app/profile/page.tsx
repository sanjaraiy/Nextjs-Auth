'use client'

import React, { useState } from 'react'
import axios from 'axios'
import toast, { Toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


function Profile() {
 const router = useRouter();
 const [data, setData] = useState("");

 const getUserDetails = async () => {
   try {
    const res = await axios.post("/api/users/me");
    console.log(res.data.data._id);
    setData(res.data.data._id);
   } catch (error: any) {
    toast.error("Something went wrong!");
    console.log("error: ",error.message);
   }
}

const logout =  async () => {
    try {
        await axios.get('/api/users/logout');
        toast.success('logout success')
        router.push("/login")
    } catch (error: any) {
        console.log(error.message);
        toast.error(error.message);
    }
}

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
       <h1 className='text-4xl'>Profile page</h1>
       <hr />
       <h2>{data ? <Link href={`/profile/${data}`}>{data}</Link> : "Nothing"}</h2>
       <hr />
       <button className='bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={logout}>logout</button>
       <button className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={getUserDetails}>Get user details</button>
    </div>
  )
}

export default Profile
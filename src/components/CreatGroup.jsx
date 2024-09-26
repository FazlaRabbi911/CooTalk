import React from 'react'
import { HiUserGroup } from "react-icons/hi2"

const CreatGroup = () => {
  return (
    <div className='overflow-y-auto h-[90%]'>
      <h2 className='font-mono font-bold text-[24px] text-[#d4cff8] bg-[#272d9859] p-2 pl-4 flex gap-2'> <HiUserGroup className='text-4xl text-[#ffffff]' /> Group</h2>
      <div className=' overflow-hidden'>
        <div className=' flex justify-between p-2 items-center h-20 bg-[#2f357692] rounded-[20px] border-[1px] border-[#f1f1f137]'>
          <div className=' w-[20%] rounded-lg h-[100%]'><img className="rounded-[20px] h-[100%]" src="https://firebasestorage.googleapis.com/v0/b/cootalk-e6218.appspot.com/o/profile-pwwAPPoO7CR3b9JkUPwTeSJjpSD3?alt=media&token=430d4cb2-6212-4040-bf04-1e0d0291ef43"/></div>
          <div className=' w-[60%] text-left pl-8 '>
            <h2 className='font-mono font-bold text-[20px] text-[#c9c2ff]'>Fazla Rabbi</h2>
            <p className='font-mono font-bold text-[14px] text-[#c9c2ff] '>hi there</p>
          </div>
          <div  className=' w-[20%]'><button className=' p-2 rounded-lg font-bold text-[16px] transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 border-[1px] border-[#f1f1f160]'>Click</button></div>
        </div>
      </div>
    </div>
  )
}

export default CreatGroup

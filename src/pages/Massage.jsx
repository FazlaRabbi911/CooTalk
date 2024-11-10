import React from 'react'
import Groups from '../components/Groups'
import Friends from '../components/Friends'
import UserList from '../components/UserList'
import MassageSender from '../components/MassageSender'
import { useSelector } from 'react-redux'

const Massage = () => {

  return (
    <div class="flex flex-wrap gap-14 my-5 h-[90%] " >
      <div className='w-[30%] flex flex-col gap-5'>
      <div className='bg-[#242c59e0]  h-[49%] rounded-[10px] text-white overflow-scroll'>
        <Friends/>
    </div>
    <div className='bg-[#242c59e0]  h-[49%] rounded-[10px] text-white overflow-scroll'>
      <Groups/>
    </div>
      </div>

    <div className="bg-[url('/src/assets/chatimg.png')] bg-contain	scrollbar	 bg-size w-[62%] h-[90%] rounded-[10px] text-white overflow-y-scroll ">
      
      <MassageSender/>
    </div>

  </div>
  )
}

export default Massage

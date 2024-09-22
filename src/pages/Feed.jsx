import React from 'react'
import CreatGroup from '../components/CreatGroup'
import FriendRequest from '../components/FriendRequest'

const Feed = () => {
  return (
    // <div className='h-screen'>
    //   <h2 className='text-white'>feed</h2>
    // </div>
    <div class="flex flex-wrap gap-3 my-5 h-[90%]" >
    <div className='bg-[#242c59e0] w-[32%] h-[49%] rounded-[10px] text-white'>
      <CreatGroup/>
    </div>
    <div className='bg-[#242c59e0] w-[32%] h-[49%] rounded-[10px] text-white'>

    </div>
    <div className='bg-[#242c59e0] w-[32%] h-[49%] rounded-[10px] text-white overflow-scroll'>
      <FriendRequest/>
    </div>
    <div className='bg-[#242c59e0] w-[32%] h-[49%] rounded-[10px] text-white'></div>
    <div className='bg-[#242c59e0] w-[32%] h-[49%] rounded-[10px] text-white'></div>
    <div className='bg-[#242c59e0] w-[32%] h-[49%] rounded-[10px] text-white'></div>
  </div>
    
  )
}

export default Feed

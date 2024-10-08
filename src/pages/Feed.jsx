import React from 'react'
import CreatGroup from '../components/CreatGroup'
import UserList from '../components/UserList'
import FriendReaquest from '../components/FriendReaquest'
import Friends from '../components/Friends'
import Blocklist from '../components/Blocklist'

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
    <Friends/>
    </div>
    <div className='bg-[#242c59e0] w-[32%] h-[49%] rounded-[10px] text-white overflow-scroll'>
    <UserList/>
    </div>
    <div className='bg-[#242c59e0] w-[32%] h-[49%] rounded-[10px] text-white'>
      <FriendReaquest/>
    </div>
    <div className='bg-[#242c59e0] w-[32%] h-[49%] rounded-[10px] text-white'></div>
    <div className='bg-[#242c59e0] w-[32%] h-[49%] rounded-[10px] text-white'>
      <Blocklist/>
    </div>
  </div>
    
  )
}

export default Feed

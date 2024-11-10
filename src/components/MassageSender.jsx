import React from 'react'
import { useSelector } from 'react-redux'
const MassageSender = () => {
  let activesmguser = useSelector((state)=>state.storactiveMsg.value)
  return (

    <div className=''>
      <div className='flex absolute  z-10	  justify-between items-center p-1 bg-[#0000008d] '>
        
        <div  className= 'duration-300	 flex justify-between p-2 items-center  bg-[#353b7d] shadow-2xl rounded-[20px]  m-3' >
                  <div className=' w-[150px] rounded-lg  h-[100px] '>
                      <img className="rounded-[20px] h-full ml-2 object-cover" src={activesmguser?.activeuserProfile} />
                    </div>
                    <div className=' text-left pl-28 pr-12'>
                        <h2 className='font-mono font-bold text-[20px] text-[#c9c2ff]'>
                          {activesmguser?
                          activesmguser.activeUseName
                          : "Select to send massage"
                          }</h2>
                    </div>
                  </div>
  
        </div>

        <div className=" backdrop-brightness-50	">
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-green-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
                          <div className='bg-red-400 h-10 w-10'></div>
        </div>
    </div>


  )
}

export default MassageSender

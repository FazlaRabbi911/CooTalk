import React from 'react'
import { useSelector } from 'react-redux'
const MassageSender = () => {
  let activesmguser = useSelector((state)=>state.storactiveMsg.value)
  return (

    <div >
      <div className='flex absolute top-0 left-0 z-10	rounded-xl  justify-between items-center p-1 bg-[#0000008d] '>  
        <div  className= 'duration-300	 flex justify-between p-2 items-center  bg-[#232752] shadow-2xl rounded-[20px]  m-3' >
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

        <div className=''>


        </div>
        <div className='bg-black w-full absolute left-0 bottom-2  flex justify-center '>
              <input className='w-[80%] h-12 bg-[#2d324d88] rounded-full' type="text" placeholder='text'/>
            </div>
    </div>


  )
}

export default MassageSender

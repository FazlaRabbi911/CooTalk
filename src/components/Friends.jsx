import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect } from 'react'
import { FaUserFriends } from "react-icons/fa";

const Friends = () => {
    const db = getDatabase();
    
    useEffect(()=>{
        const starCountRef = ref(db, 'friend/' );
        onValue(starCountRef, (snapshot) => {
            snapshot.forEach((item)=>{
                coonsole.log(item.val())
            })
        });
    },[])

  return (
    <div>
     <div className='h-[90%]'>
      <h2 className='font-mono font-bold text-[24px] text-[#d4cff8] bg-[#272d9859] p-2 pl-4 flex gap-2 '> <FaUserFriends className='text-4xl text-[#ffffff]'/>Friends</h2>
              {(item=>( 
              <div className=' flex justify-between p-2 items-center h-20 bg-[#2f357692] shadow-2xl rounded-[20px] border-[1px] border-[#f1f1f137] m-3'>
                <div className=' w-[20%] rounded-lg h-[100%] '><img className="rounded-[20px] h-[100%] ml-2" src={item.who_SendRequest_profile}/></div>
                <div className=' w-[60%] text-left pl-8 '>
                  <h2 className='font-mono font-bold text-[20px] text-[#c9c2ff]'>{item.who_SendRequest_Name}</h2>
                  <p className='font-mono font-bold text-[14px] text-[#c9c2ff] '></p>
                </div>

              </div>
                ))} 
    </div>
    </div>
  )
}

export default Friends

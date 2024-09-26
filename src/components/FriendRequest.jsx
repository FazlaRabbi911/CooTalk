import React, { useEffect, useState } from 'react'
import { HiUserGroup } from "react-icons/hi2"
import { getDatabase, ref, onValue } from "firebase/database";
import { TiUserAdd } from "react-icons/ti";

const FriendRequest = () => {
    let [userinfo,setuserinfo] = useState([])
    const db = getDatabase();


    useEffect(()=>{
        const userData = ref(db, 'users' );
        onValue(userData, (snapshot) => {
            let arry =[]
            snapshot.forEach((item)=>{
                // snapshot give object data by using forEach we can iterate every key value 
                arry.push(item.val())
            })
            setuserinfo(arry)
            console.log(userinfo)
            });
    },[])

  return (
    <div>
     <div className='h-[90%]'>
      <h2 className='font-mono font-bold text-[24px] text-[#d4cff8] bg-[#272d9859] p-2 pl-4 flex gap-2'> <HiUserGroup className='text-4xl text-[#ffffff]' /> User List</h2>
              {userinfo.map((item)=>(
              <div className=' flex justify-between p-2 items-center h-20 bg-[#2f357692] rounded-[20px] border-[1px] border-[#f1f1f137]'>
                <div className=' w-[20%] rounded-lg h-[100%] '><img className="rounded-[20px] h-[100%] ml-2" src={item.profile_picture}/></div>
                <div className=' w-[60%] text-left pl-8 '>
                  <h2 className='font-mono font-bold text-[20px] text-[#c9c2ff]'>{item.username}</h2>
                  <p className='font-mono font-bold text-[14px] text-[#c9c2ff] '></p>
                </div>
                <div  className=' w-[20%]'><button className=' p-2 rounded-lg font-bold text-[16px] transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 border-[1px] border-[#f1f1f160]'><TiUserAdd className='text-3xl text-white'/> </button></div>
              </div>
                ))}
    </div>
    </div>
  )
}

export default FriendRequest

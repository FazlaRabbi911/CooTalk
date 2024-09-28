import React, { useEffect, useState } from 'react'
import { FaCodePullRequest } from "react-icons/fa6";
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useSelector } from 'react-redux';

const FriendReaquest = () => {

  const db = getDatabase();
  let [Request,setRequest] =useState([])
  let activeUserInfo = useSelector((state)=>state.storeuser.value)

  useEffect(()=>{
      const starCountRef = ref(db, 'FriendRequest' );
      onValue(starCountRef, (snapshot) => {
        let arry = []
        snapshot.forEach((item)=>{
        if(item.val().Receiver_Uid == activeUserInfo.uid){
          arry.push({
            ...item.val(),id:item.key
          })
        }
        })
        setRequest(arry)
      });
  },[])
  let handeleDelete =(item)=>{
    remove(ref(db,'FriendRequest/'+item.id))
  }
  let handeleaccept = (item)=>{
    set(push(ref(db, 'friend/')),{
      ...item
    }).then(()=>{
      remove(ref(db,'FriendRequest/'+item.id))
    })
  }


  return (
    <div>
     <div className='h-[90%]'>
      <h2 className='font-mono font-bold text-[24px] text-[#d4cff8] bg-[#272d9859] p-2 pl-4 flex gap-2 '> <FaCodePullRequest className='text-4xl text-[#24c44c]' /> Friend Request</h2>
              {Request.map(item=>( 
              <div className=' flex justify-between p-2 items-center h-20 bg-[#2f357692] shadow-2xl rounded-[20px] border-[1px] border-[#f1f1f137] m-3'>
                <div className=' w-[20%] rounded-lg h-[100%] '><img className="rounded-[20px] h-[100%] ml-2" src={item.who_SendRequest_profile}/></div>
                <div className=' w-[60%] text-left pl-8 '>
                  <h2 className='font-mono font-bold text-[20px] text-[#c9c2ff]'>{item.who_SendRequest_Name}</h2>
                  <p className='font-mono font-bold text-[14px] text-[#c9c2ff] '></p>
                </div>
                <div  className=' w-[17%] flex '>
                    <ImCross onClick={()=>handeleDelete(item)} className='text-3xl rounded-md shadow-2xl transition duration-500  text-red-900 hover:text-red-600 hover:text-4xl '/> </div>
                   <FaCheck onClick={()=>handeleaccept(item)} className='text-3xl rounded-md shadow-2xl transition duration-500 text-green-900 hover:text-green-500  mr-2'/> 
              </div>
                ))} 
    </div>
    </div>
  )
}

export default FriendReaquest

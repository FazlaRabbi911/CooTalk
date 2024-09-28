import React, { useEffect, useState } from 'react'



import { ImBlocked } from "react-icons/im";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useSelector } from 'react-redux';
import { CgUnblock } from "react-icons/cg";
import { IoAlertOutline } from "react-icons/io5";


const Blocklist = () => {
    let activeUserInfo = useSelector((state)=>state.storeuser.value)
    const db = getDatabase();
    let [BlockData,setBlockData]=useState([])
    useEffect(()=>{
        const starCountRef = ref(db, 'block_users/' );
        onValue(starCountRef, (snapshot) => {
            let arry = []
            snapshot.forEach((item)=>{
                if(activeUserInfo.uid == item.val().block_By_Id || activeUserInfo.uid == item.val().blocked_Id){
                    arry.push({...item.val(),BlockDBkey:item.key})
                  }
            })
            setBlockData(arry)
        });
    },[])
    let handelDelete =(item)=>{
        remove(ref(db, 'block_users/' + item.BlockDBkey))
    }
  return (
    <div className='h-[90%]'>
    <h2 className='font-mono font-bold text-[24px] text-[#d4cff8] bg-[#272d9859] p-2 pl-4 flex gap-2 '> <ImBlocked className='text-4xl text-[#c42424] mr-3' /> Block List</h2>
            {BlockData.map(item=>( 
            <div className=' flex justify-between p-2 items-center h-20 bg-[#2f357692] shadow-2xl rounded-[20px] border-[1px] border-[#f1f1f137] m-3'>
              <div className=' w-[20%] rounded-lg h-[100%] '>
                {item.block_By_Id == activeUserInfo.uid
                ?
                <img className="rounded-[20px] h-[100%] ml-2" src={item.blocked_profile}/>
                :
                <img className="rounded-[20px] h-[100%] ml-2" src={item.block_By_profile}/>
                }

                
                </div>
              <div className=' w-[60%] text-left pl-8 '>
              {item.block_By_Id == activeUserInfo.uid
                ?
                <h2 className='font-mono font-bold text-[20px] text-[#c9c2ff]'>{item.blocked_id_Name}</h2>
                :
                <h2 className='font-mono font-bold text-[20px] text-[#c9c2ff]'>{item.block_By_Name}</h2>
                }
              </div>
              {item.block_By_Id == activeUserInfo.uid
                ?
                <CgUnblock onClick={()=>handelDelete(item)} className='rotate-90 text-5xl rounded-md shadow-2xl transition duration-500 text-green-900 hover:text-green-500 mr-2'/> 
                :
                <IoAlertOutline className=' text-4xl rounded-md shadow-2xl transition duration-500 text-red-500 mr-2'/> 
                }
            </div>
              ))} 
  </div>

  )
}

export default Blocklist

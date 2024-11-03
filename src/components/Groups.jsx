import React, { useEffect, useState } from 'react'
import { FaLayerGroup } from "react-icons/fa";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux';


const Groups = () => {
  const db = getDatabase();
  let Admin = useSelector((state)=>state.storeuser.value)

    let [groupdata,setgroupdata]= useState([])
    useEffect(()=>{
        const Gruopdata = ref(db, 'Groups');
        onValue(Gruopdata, (snapshot) => {
            let arry = []
          snapshot.forEach((item)=>{
            if(item.val().AdminUid !== Admin.uid){
              arry.push({...item.val(),grpkey:item.key})
            }
          })
          setgroupdata(arry)
        });
    },[])
    let handleGroupRequest=(item)=>{
      set(push(ref(db, 'GroupJoinRequest'), {
        WhoWantJoinUid : Admin.uid,
        WhoWantJoinName : Admin.displayName,
        GroupName:item.GroupName,
        GroupId :item.grpkey,
        Adminuid :item.AdminUid,
        AdminName :item.AdminName,
      }));
    }
  return (
    <div>
     <div className='h-[90%]'>
      <h2 className='font-mono font-bold text-[24px] text-[#d4cff8] bg-[#272d9859] p-2 pl-4 flex gap-2 '> <FaLayerGroup className='text-4xl text-[#386cb0]' /> Groups</h2>
      {groupdata.map(item =>(
              <div className=' flex justify-between p-2 items-center h-20 bg-[#2f357692] shadow-2xl rounded-[20px] border-[1px] border-[#f1f1f137] m-3'>
              <div className=' w-[20%] rounded-lg h-[100%] '><img className="rounded-[20px] h-[100%] ml-2" /></div>
              <div className=' w-[60%] text-left pl-8 '>
                <h2 className='font-mono font-bold text-[20px] text-[#c9c2ff]'>{item.GroupName}</h2>
                <p className='font-mono font-bold text-[14px] text-[#c9c2ff] '></p>
              </div>
              <div  className=' w-[17%] flex '>
                <button onClick={()=>handleGroupRequest(item)} className='bg-slate-400 p-1.5 border-[1.3px] rounded-lg font-extralight'>Join</button>
                  </div>
            </div>
      ))}
    </div>
    </div>
  )
}

export default Groups

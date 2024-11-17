import React, { useEffect, useState } from 'react'
import { FaLayerGroup } from "react-icons/fa";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import { VscLoading } from "react-icons/vsc";

const Groups = () => {
  const db = getDatabase();
  let Admin = useSelector((state)=>state.storeuser.value)
  let dispatch = useDispatch()
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
    let [GroupMemberdata,setGroupMemberdata] = useState([]) 
    useEffect(()=>{
      const starCountRef = ref(db, 'GroupAndMembers');
        onValue(starCountRef, (snapshot) => {
          let arry = []
          snapshot.forEach((item)=> 
          {if(item.val().WhoWantJoinUid == Admin.uid){
            arry.push(item.val().GroupId+ item.val().WhoWantJoinUid) }
          })
          setGroupMemberdata(arry)
        })
    },[])
    let [GroupRequestdata,setGroupRequestdata] = useState([]) 
    useEffect(()=>{
      const starCountRef = ref(db, 'GroupJoinRequest');
        onValue(starCountRef, (snapshot) => {
          let arry = []
          snapshot.forEach((item)=> 
          {if(item.val().WhoWantJoinUid == Admin.uid){
            arry.push(item.val().GroupId + item.val().WhoWantJoinUid) }
          })
          setGroupRequestdata(arry)
        })
    },[])

  return (

     <div className='h-[90%] '>
      <h2 className='font-mono font-bold text-[24px] text-[#d4cff8] bg-[#272d9859] p-2 pl-4 flex gap-2	'> <FaLayerGroup className='text-4xl text-[#386cb0]' /> Groups</h2>
      {groupdata.map(item =>(
         GroupMemberdata.includes( item.grpkey + Admin.uid) ?
              <div onClick={()=>handleGrpSlice(item)} className=' flex justify-between p-2 items-center h-20  bg-[#2f357692] shadow-2xl rounded-[20px] border-[1px] border-[#04ff437d] m-3'>
              <div className=' w-[60%] text-left pl-8 '>
                <h2 className='font-mono font-bold text-[20px] text-[#c9c2ff]'>{item.GroupName}</h2>
                <p className='font-mono font-bold text-[14px] text-[#c9c2ff] pt-2'>Admin : {item.AdminName}</p>
              </div>
              <div  className=' w-[17%] flex '> 
              { GroupRequestdata.includes( item.grpkey + Admin.uid) 
               ?
                <button onClick={()=>handleGroupRequest(item)} className=' p-1.5 border-[1.3px] rounded-lg font-extralight'><VscLoading className='animate-spin text-2xl text-green-500 text-bold drop-shadow-2xl'/></button>
                :
                GroupMemberdata.includes( item.grpkey + Admin.uid) 
                ?
                <button  className='bg-slate-500 shadow-2xl border-2 p-1.5  rounded-lg font-extralight'></button>
                :
                <button onClick={()=>handleGroupRequest(item)} className='bg-slate-400 p-1.5 border-[1.3px] rounded-lg font-extralight'>join</button>

              }

                </div>
            </div>
            :
            <div className=' flex justify-between p-2 items-center h-20 bg-[#2f357692] shadow-2xl rounded-[20px] border-[1px] border-[#f1f1f137] m-3'>
              <div className=' w-[60%] text-left pl-8 '>
                <h2 className='font-mono font-bold text-[20px] text-[#c9c2ff]'>{item.GroupName}</h2>
                <p className='font-mono font-bold text-[14px] text-[#c9c2ff] pt-2'>Admin : {item.AdminName}</p>
              </div>
              <div  className=' w-[17%] flex '>
              { GroupRequestdata.includes( item.grpkey + Admin.uid) 
               ?
                <button className=' p-1.5 border-[1.3px] rounded-lg font-extralight'><VscLoading className='animate-spin text-2xl text-green-500 text-bold drop-shadow-2xl'/></button>
                :
                GroupMemberdata.includes( item.grpkey + Admin.uid) 
                ?
                <button  className='bg-slate-400 p-1.5 border-[1.3px] rounded-lg font-extralight'></button>
                :
                <button onClick={()=>handleGroupRequest(item)} className='bg-slate-400 p-1.5 border-[1.3px] rounded-xl  font-extrabold hover:text-green-500 hover:bg-white'>join</button>

              }

                </div>
            </div>
      ))}
    </div>

  )
}

export default Groups

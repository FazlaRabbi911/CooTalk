import React, { useEffect, useState } from 'react'
import { GrUserAdmin } from "react-icons/gr";
import { MdCreateNewFolder } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useSelector } from 'react-redux';

// modal



const MyGroup = () => {
    let Admin = useSelector((state)=>state.storeuser.value)

    const [Modalopen, setmodalOpen] = useState(false)
    // modal 2 grp request accept delete
    const [GrpModalopen, setgrpmodalOpen] = useState(false)

    let [grpName,setgrpName]= useState('')
    const db = getDatabase();
    let handleCreatGroup =()=>{
        setmodalOpen(!Modalopen)
        set(push(ref(db,'Groups' ), {
            GroupName :grpName,
            AdminName:Admin.displayName,
            AdminUid:Admin.uid
          }))
    }
    let handleGrorupname=(e)=>{
        setgrpName(e.target.value)
    }
    // myGroup data pull ⌵ 
    let [groupdata,setgroupdata]= useState([])
    useEffect(()=>{
        const Gruopdata = ref(db, 'Groups');
        onValue(Gruopdata, (snapshot) => {
            let arry = []
          snapshot.forEach((item)=>{
            if(item.val().AdminUid == Admin.uid){
              arry.push({...item.val(),grpkey:item.key})
            }
          })
          setgroupdata(arry)
        });
    },[])  
     // Group Request data pull ⌵ 
    let [GroupRequest,setGroupRequest]=useState([])
    useEffect(()=>{
      const starCountRef = ref(db, 'GroupJoinRequest/');
      onValue(starCountRef, (snapshot) => {
         let arry = []
          snapshot.forEach((item)=>{
            // console.log(Admin.uid == item.Adminuid)
            if(Admin.uid == item.val().Adminuid){
              arry.push({...item.val(),GrpRequestKey:item.key})
            }
          })
          setGroupRequest(arry)
          // console.log(arry[0])
      });
    },[])
    let handleRequestAccept=(item)=>{
      set(push(ref(db,'GroupAndMembers' )), {
          ...item
      }).then(()=>{
        remove(ref(db,'GroupJoinRequest/'+item.GrpRequestKey))
      })
      console.log(item.GrpRequestKey)
    }
    let handleRequestDelete=(item)=>{
      remove(ref(db,'GroupJoinRequest/'+item.GrpRequestKey))
      console.log(item.GrpRequestKey)
    }
    let [wwee,setwwee] = useState(true) 

      console.log(GroupRequest.
        Adminuid
        )

    
  return (
    <div>
    <div className='h-[90%]'>
      <div className='flex justify-between bg-[#272d9859]'>
        <div className='w-[50%] '><h2 className='font-mono font-bold text-[24px] text-[#d4cff8]  p-2 pl-4 flex gap-2 '> <GrUserAdmin className='text-4xl text-[#efa954f0]' /> My Groups</h2></div>
        <div className='w-[20%] '><h2 className='font-mono font-bold text-[24px] text-[#d4cff8]  p-2 pl-4 flex mr-[-80px] ' onClick={()=>setmodalOpen(true)}> <MdCreateNewFolder className='text-4xl text-[#83aaf7]' /> </h2></div>
        <div className='w-[20%] flex justify-end items-center'> <button onClick={()=>setgrpmodalOpen(!GrpModalopen)} className='border-[1.1px] px-2 py-2 mr-2  rounded-lg text-[15px] relative'>Requests {GroupRequest == 'sss'  &&  <div className='absolute bottom-1 right-0 text-[#57fd70] font-bold text-[61px] animate-pulse'> .</div>}</button></div>
      </div>
      {/* modal */}
      {Modalopen &&
        <div className='absolute top-0 flex justify-center items-center left-0 w-full h-full  backdrop-blur-sm'>
            <div className='p-4 bg-gray-300 rounded-md relative'>
            <IoClose className='absolute top-2 right-2 text-[25px] bg-red text-red-500'onClick={()=>setmodalOpen(!Modalopen)}/>
                              <button onClick={()=>setgrpmodalOpen(!GrpModalopen)} className='bg-blue-400 p-2 rounded-lg text-[11px]'>Request</button>
                <h2 className='text-dark font-bold font-sans mb-2'>Creat Group </h2>

                <input onChange={handleGrorupname} className='rounded-md p-1 text-black'  type="text" placeholder='group name' />
                <button onClick={()=>handleCreatGroup()} className='block bg-blue-700 text-center w-full mt-2 rounded-lg' >Creat</button>
            </div>
        </div>
      }{/* modal */}
      {/* Group Request data */}
      {groupdata.map(item =>(
              <div className=' flex justify-between p-2 items-center h-20 bg-[#2f357692] shadow-2xl rounded-[20px] border-[1px] border-[#f1f1f137] m-3'>
              <div className=' w-[80%] text-left pl-12 '>
                <h2 className='font-mono font-bold text-[20px] text-[#c9c2ff]'>{item.GroupName}</h2>
                <p className='font-mono font-bold text-[14px] text-[#c9c2ff] '></p>
              </div>
              <div  className=' w-[17%] flex '>

              </div>
            </div>
      ))}
      {/* Group Request accept delet  */}

      {GrpModalopen &&
        <div className='absolute top-0 flex justify-center items-center left-0 w-full h-full  backdrop-blur-sm'>
            <div className='p-4  rounded-md relative'>
            <IoClose className='absolute top-0 right-0  text-[35px] bg-red text-red-500'onClick={()=>setgrpmodalOpen(!GrpModalopen)}/>

            {GroupRequest.map(item =>(
              <div className='w-[400px] flex justify-between p-2 items-center h-20 bg-[#2f3576ea] shadow-2xl rounded-[20px] border-[1px] border-[#f1f1f137] m-3'>
              <div className=' w-[80%] text-left pl-12 '>
                <h2 className='font-mono font-bold text-[20px] text-[#c9c2ff]'>{item.GroupName}</h2>
                <p className='font-mono font-bold text-[14px] text-[#c9c2ff] '>{item.WhoWantJoinName}</p>
              </div>
              <div  className=' flex gap-3 mr-1'>
                <button onClick={()=>handleRequestAccept(item)} className='bg-blue-400 p-2 rounded-lg text-[11px]'>Accept</button>
                <button onClick={()=>handleRequestDelete(item)} className='bg-red-500 p-2 rounded-lg text-[11px]'>Delete</button>
              </div>
            </div>
            ))}

            </div>
        </div>
      }
    </div>
    </div>
  )
}

export default MyGroup

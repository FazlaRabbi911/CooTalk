import React, { useState } from 'react'
import { GrUserAdmin } from "react-icons/gr";
import { MdCreateNewFolder } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { getDatabase, push, ref, set } from "firebase/database";
import { useSelector } from 'react-redux';

// modal



const MyGroup = () => {
    let Admin = useSelector((state)=>state.storeuser.value)

    const [Modalopen, setmodalOpen] = useState(false)
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
    // console.log(grpName)

  return (
    <div className=''>
    <div className='h-[90%] bg-[#272d9859] flex justify-between'>
      <h2 className='font-mono font-bold text-[24px] text-[#d4cff8]  p-2 pl-4 flex gap-2 '> <GrUserAdmin className='text-4xl text-[#efa954f0]' /> My Groups</h2>
      <h2 className='font-mono font-bold text-[24px] text-[#d4cff8]  p-2 pl-4 flex gap-2 ' onClick={()=>setmodalOpen(true)}> <MdCreateNewFolder className='text-4xl text-[#83aaf7]' /> </h2>
      {Modalopen &&
        <div   className='absolute top-0 flex justify-center items-center left-0 w-full h-full  backdrop-blur-sm'>

            <div className='p-4 bg-gray-300 rounded-md relative'>
            <IoClose className='absolute top-2 right-2 text-[25px] bg-red text-red-500'onClick={()=>setmodalOpen(!Modalopen)}/>
                <h2 className='text-dark font-bold font-sans mb-2'>Creat Group </h2>

                <input onChange={handleGrorupname} className='rounded-md p-1 text-black'  type="text" placeholder='group name' />
                <button onClick={()=>handleCreatGroup()} className='block bg-blue-700 text-center w-full mt-2 rounded-lg' >Creat</button>
            </div>
        </div>
      }

    </div>
    </div>
  )
}

export default MyGroup

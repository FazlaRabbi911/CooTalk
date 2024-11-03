import React, { useEffect, useState } from 'react'
import { FaLayerGroup } from "react-icons/fa";
import { getDatabase, ref, onValue } from "firebase/database";


const Groups = () => {
    const db = getDatabase();
    let [Groupdata,setGroupdata]= useState('')

    useEffect(()=>{
        const Gruopdata = ref(db, 'Groups');
        onValue(Gruopdata, (snapshot) => {
            let arry = []
          snapshot.forEach((item)=>{
            arry.push(item.val())
          })
          setGroupdata(arry)
        });
    },[])
    console.log(Groupdata)
  return (
    <div>
     <div className='h-[90%]'>
      <h2 className='font-mono font-bold text-[24px] text-[#d4cff8] bg-[#272d9859] p-2 pl-4 flex gap-2 '> <FaLayerGroup className='text-4xl text-[#386cb0]' /> Groups</h2>

    </div>
    </div>
  )
}

export default Groups

import React, { useEffect, useRef, useState } from 'react'
import Groups from '../components/Groups'
import Friends from '../components/Friends'
import UserList from '../components/UserList'
import MassageSender from '../components/MassageSender'
import { useSelector } from 'react-redux'
import { getDatabase, onValue, ref } from 'firebase/database'


const Massage = () => {
  const db = getDatabase();
  const containerRef = useRef(null);

  let Admin = useSelector((state)=>state.storeuser.value)
  let activesmguser = useSelector((state)=>state.storactiveMsg.value)

  let [showmassage,setshowmassage] = useState([])
  useEffect(()=>{
      const massagedata = ref(db, 'Massages');
      onValue(massagedata, (snapshot) => {
        let arry =[]
        snapshot.forEach((item)=>{
          if(  item.val().massage_Sender_uid == Admin.uid && item.val().Massage_Reciver_uid == activesmguser.activeuseUid
          || item.val().Massage_Reciver_uid == Admin.uid && item.val().massage_Sender_uid == activesmguser.activeuseUid ){
            arry.push(item.val())
          }
        })
        setshowmassage(arry)
      });
 },[activesmguser])
  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
    console.log(containerRef.current.scrollHeight)
  }, [showmassage]);


  return (
    <div class="flex flex-wrap gap-14 my-5 h-[90%] " >
      <div className='w-[30%] flex flex-col gap-5'>
      <div className='bg-[#242c59e0]  h-[49%] rounded-[10px] text-white overflow-scroll'>
        <Friends/>
    </div>
    <div className='bg-[#242c59e0]  h-[49%] rounded-[10px] text-white overflow-scroll'>
      <Groups/>
    </div>
      </div>

    <div className='w-[62%] h-[85%] relative '>
      <div className='flex h-[15%] absolute top-0 left-0 z-10	rounded-xl  justify-between items-center p-1 bg-[#0000008d] '>  
          <div  className= 'duration-300 h-full	 flex justify-between p-2 items-center  bg-[#232752] shadow-2xl rounded-[20px]  m-3' >
                    <div className=' w-[150px] rounded-lg  h-full '>
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
        <div ref={containerRef} className="bg-gradient-overlay mt-24   bg-contain	scrollbar	w-full h-[90%] bg-size  rounded-[10px] text-white overflow-y-scroll  ">
            <MassageSender/>
        </div>

    </div>

  </div>
  )
}

export default Massage

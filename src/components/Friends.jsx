import { getDatabase, onValue, push, ref,remove,set } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { FaUserFriends } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { VscThreeBars } from "react-icons/vsc";
import { GoBellFill } from "react-icons/go";


const Friends = () => {
    const db = getDatabase();
    let activeUserInfo = useSelector((state)=>state.storeuser.value)
    let [Frinddata, setFrinddata]= useState([])
    useEffect(()=>{
        const starCountRef = ref(db, 'friend/' );
        onValue(starCountRef, (snapshot) => {
          let arry = []
            snapshot.forEach((item)=>{
              if(activeUserInfo.uid == item.val().who_SendRequest_Uid || activeUserInfo.uid == item.val().Receiver_Uid){
                arry.push({...item.val(),FrndDBkey:item.key})
              }
            })
            setFrinddata(arry)
        });
    },[])
    let [friendListOption,setfriendListOption] = useState(true)
    
    let handleOpen =()=>{
      setfriendListOption(!friendListOption)
    }

    let handleBlock =(item)=>{
      set(push(ref(db, 'block_users/')), {
        block_By_Name: activeUserInfo.displayName,
        block_By_Id: activeUserInfo.uid,
        block_By_profile: activeUserInfo.photoURL,

        who_SendRequest_Name: item.who_SendRequest_Name,
        blocked_Id: item.who_SendRequest_Uid,
        blocked_profile: item.who_SendRequest_profile,
      }).then(()=>{
        remove(ref(db, 'friend/' + item.FrndDBkey))
      })
      console.log("yes")
    }

  return (
    <div >
     <div className='h-[90%] '>
      <div className='flex justify-between items-center bg-[#272d9859]'>
        <h2 className=' font-mono font-bold text-[24px] text-[#d4cff8]  p-2 pl-4 flex gap-2 '> <FaUserFriends className='text-4xl text-[#ffffff]'/>Friends</h2>
        <div className='text-end '><VscThreeBars className={`${ friendListOption 
                      ? 
                      'text-4xl mr-4 '
                        :                   
                      'text-4xl mr-4 text-red-500'
                    }`} onClick={handleOpen}/> </div></div>
                {Frinddata.map(item=>( 
                 <div className='truncate	group  border-[#2b3462] w-[100%] rounded-lg h-[100%] '>
                  <div className=' relative'>

                    <div  className={`${friendListOption ? 'duration-300	 flex justify-between p-2 items-center h-20 bg-[#353b7d] shadow-2xl rounded-[20px]  m-3'
                      :
                      'z-1 transform  -translate-x-[200px] duration-300 flex justify-between p-2 items-center h-20 bg-[#353b7d] shadow-2xl rounded-[20px] border-[1px] border-[#f1f1f137] m-3 drop-shadow-2xl "'
                    }`} >
                          <div className=' w-[20%] rounded-lg h-[100%] '>
                          {item.Receiver_Uid == activeUserInfo.uid 
                            ?
                            <img className="rounded-[20px] h-[100%] ml-2" src={item.who_SendRequest_profile}/>
                            :
                            <img className="rounded-[20px] h-[100%] ml-2" src={item.Receiver_profile}/>
                            }                
                            </div>
                          <div className=' w-[60%] text-left pl-28 '>
                            {item.Receiver_Uid == activeUserInfo.uid 
                            ?
                            <h2 className='font-mono font-bold text-[20px] text-[#c9c2ff]'>{item.who_SendRequest_Name}</h2>
                            :
                            <h2 className='font-mono font-bold text-[20px] text-[#c9c2ff]'>{item.Receiver_Name}</h2>
                            }
                          </div>
                          <div className=' w-[20%] text-left pl-8 '>
                          <GoBellFill className='text-3xl' onClick={handleBlock}/>
                          </div>
                      </div>
                      <div className={`${ friendListOption 
                      ? 
                      ' absolute duration-500 m-auto rounded-xl  w-0  right-0 top-[20px] bottom-0'
                        :                   
                      'absolute  duration-500 z-[0] w-[180px] m-auto rounded-xl  right-0 top-[20px] bottom-0 '
                    }`}>
                        <div className='flex flex-col '>
                          <button onClick={()=>handleBlock(item)} className={`${friendListOption  ?
                          ' w-0 opacity-0 p-2 rounded-lg font-bold text-[16px] transition ease-in-out  bg-red-400 hover:-translate-y-1 hover:scale-110 hover:bg-red-600 border-[1px] border-[#4b2b2b42]'
                          :
                          ' duration-500 w-[80px]  p-2 rounded-lg font-bold text-[16px] transition ease-in-out delay-150 bg-red-500 hover:-translate-y-1 hover:scale-110 hover:bg-red-600 border-[1px] border-[#4b2b2b42]'
                        }`}>Block</button>
                        </div>
                      </div>
                  </div>
                </div>

                  ))} 
      </div>
    </div>
  )
}

export default Friends

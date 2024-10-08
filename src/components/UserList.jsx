import React, { useEffect, useState } from 'react'

import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { TiUserAdd } from "react-icons/ti";
import { useSelector } from 'react-redux';
import { FaClipboardList } from "react-icons/fa";

import { VscLoading } from "react-icons/vsc";
import { FaHandshakeSimple } from "react-icons/fa6";
import { ImBlocked } from "react-icons/im";


const UserList = () => {

    let [Userinfo,setUserinfo] = useState([])
    const db = getDatabase();
    let activeUserInfo = useSelector((state)=>state.storeuser.value)
    // console.log(activeUserInfo.uid )
    useEffect(()=>{
        const userData = ref(db, 'users' );
        onValue(userData, (snapshot) => {
            let arry =[]
            snapshot.forEach((item)=>{
                // snapshot give object data by using forEach we can iterate every key value 
                if(activeUserInfo.uid !== item.key){
                  arry.push({
                      key:item.key,
                      name:item.val().username,
                      email:item.val().email,
                      ProfilePic:item.val().profile_picture
                  })

                }
            })
            setUserinfo(arry)
            });
    },[])
    // console.log(Userinfo)
    let SendFriendRequest =(item)=>{
        console.log(item.uid)
        set(push(ref(db, 'FriendRequest/')), {
            who_SendRequest_Uid     : activeUserInfo.uid,              
            who_SendRequest_Name    : activeUserInfo.displayName,
            who_SendRequest_profile : activeUserInfo.photoURL ,         
            Receiver_Uid    :     item.key,
            Receiver_Name   :    item.name,
            Receiver_profile: item.ProfilePic,
          });
    }

    let [FriendRequestdata,setFriendRequestdata] = useState([])

    useEffect(()=>{
      const FriendRequest= ref(db, 'FriendRequest/' );
      onValue(FriendRequest, (snapshot) => {
          let arry =[]
          snapshot.forEach((item)=>{
                arry.push(item.val().who_SendRequest_Uid + item.val().Receiver_Uid)
          })
          setFriendRequestdata(arry)
          })
  },[])
  let [Frienddata,setFrienddat] = useState([])
  

  useEffect(()=>{
    const FriendRequest= ref(db, 'friend/' );
    onValue(FriendRequest, (snapshot) => {
        let arry =[]
        snapshot.forEach((item)=>{
              arry.push(item.val().who_SendRequest_Uid + item.val().Receiver_Uid)
        })
        setFrienddat(arry)
        })
  },[])
 
  let [BlockData , setBlockData] = useState([])
  useEffect(()=>{
    const FriendRequest= ref(db, 'block_users/' );
    onValue(FriendRequest, (snapshot) => {
        let arry =[]
        snapshot.forEach((item)=>{
              arry.push(item.val().block_By_Id + item.val().blocked_Id)
        })
        setBlockData(arry)
        })
  },[])

  return (
    <div>
     <div className='h-[90%]'>
      <h2 className='font-mono font-bold text-[24px] text-[#d4cff8] bg-[#272d9859] p-2 pl-4 flex gap-2 '> <FaClipboardList className='text-4xl text-[#6f8e9f]' /> User List</h2>
              {Userinfo.map((item)=>(                 
                   Frienddata.includes(item.key + activeUserInfo.uid) || Frienddata.includes(activeUserInfo.uid + item.key )   
                   ?
              <div className=' flex justify-between p-2 items-center h-20 bg-[#2f357692] shadow-2xl rounded-[20px] border-[1px] border-[#04ff437d] m-3'>
                <div className=' w-[20%] rounded-lg h-[100%] '><img className="rounded-[20px] h-[100%] ml-2" src={item.ProfilePic}/></div>
                <div className=' w-[60%] text-left pl-8 '>
                  <h2 className='font-mono font-bold text-[20px] text-[#c9c2ff]'>{item.name}</h2>
                  <p className='font-mono font-bold text-[14px] text-[#c9c2ff] '></p>
                </div>
                <div  className=' w-[20%]'>
                  {FriendRequestdata.includes(item.key + activeUserInfo.uid) || FriendRequestdata.includes(activeUserInfo.uid + item.key )
                    ?
                  <button type="button" className=' p-2 rounded-full font-bold text-[16px] transition ease-in-out delay-150 bg-[#ffffff] hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 border-[3px] border-[#868897] drop-shadow-2xl '><VscLoading className='animate-spin text-2xl text-green-500 text-bold drop-shadow-2xl'/></button>                
                    :
                    Frienddata.includes(item.key + activeUserInfo.uid) || Frienddata.includes(activeUserInfo.uid + item.key )   
                     ?
                        <FaHandshakeSimple className='text-4xl text-[#2aff35cb]'/>
                    :
                    Frienddata.includes(item.key + activeUserInfo.uid) || Frienddata.includes(activeUserInfo.uid + item.key )   
                    ?
                  <button className=' p-2 rounded-lg font-bold text-[16px] transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 border-[1px] border-[#f1f1f160]'><TiUserAdd onClick={()=>SendFriendRequest(item)}  className='text-3xl text-white'/> </button>
                    :
                    <button className=' p-2 rounded-lg font-bold text-[16px] transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 border-[1px] border-[#f1f1f160]'><TiUserAdd onClick={()=>SendFriendRequest(item)}  className='text-3xl text-white'/> </button>
                  }
                  </div>
              </div>
              :
              <div className=' flex justify-between p-2 items-center h-20 bg-[#2f357692] shadow-2xl rounded-[20px] border-[1px] border-[#f1f1f137] m-3'>
              <div className=' w-[20%] rounded-lg h-[100%] '><img className="rounded-[20px] h-[100%] ml-2" src={item.ProfilePic}/></div>
              <div className=' w-[60%] text-left pl-8 '>
                <h2 className='font-mono font-bold text-[20px] text-[#c9c2ff]'>{item.name}</h2>
                <p className='font-mono font-bold text-[14px] text-[#c9c2ff] '></p>
              </div>
              <div  className=' w-[20%]'>
                {FriendRequestdata.includes(item.key + activeUserInfo.uid) || FriendRequestdata.includes(activeUserInfo.uid + item.key )
                  ?
                <button type="button" className=' p-2 rounded-full font-bold text-[16px] transition ease-in-out delay-150 bg-[#ffffff] hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 border-[3px] border-[#868897] drop-shadow-2xl '><VscLoading className='animate-spin text-2xl text-green-500 text-bold drop-shadow-2xl'/></button>                
                  :
                  BlockData.includes(item.key + activeUserInfo.uid) || BlockData.includes(activeUserInfo.uid + item.key )   
                  ?
                    <ImBlocked className='text-3xl text-red-600'/> 
                  :
                  <button className=' p-2 rounded-lg font-bold text-[16px] transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 border-[1px] border-[#f1f1f160]'><TiUserAdd onClick={()=>SendFriendRequest(item)}  className='text-3xl text-white'/> </button>

                }
                </div>
            </div>
                ))}
    </div>
    </div>
  )
}

export default UserList






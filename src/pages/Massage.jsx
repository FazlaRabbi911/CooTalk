import React, { useEffect, useRef, useState } from 'react'
import Groups from '../components/Groups'
import Friends from '../components/Friends'
import UserList from '../components/UserList'
import MassageSender from '../components/MassageSender'
import { useDispatch, useSelector } from 'react-redux'
import { getDatabase, onValue, ref } from 'firebase/database'
import { activeMsguser } from '../activeMsgSlice'
import { groupdata12 } from '../groupSlice'
import { FaLayerGroup } from "react-icons/fa";


const Massage = () => {
  const db = getDatabase();
  const containerRef = useRef(null);
  let dispatch = useDispatch()
  let [Joinedgroup,setJoinedgroup] = useState([])

  let Admin = useSelector((state)=>state.storeuser.value)

  let activesmguser = useSelector((state)=>state.storactiveMsg.value)
  let groupSlice = useSelector((state)=>state.groupdataStore.value)
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
      let [groupdata,setgroupdata]= useState([])
    useEffect(()=>{                          // group massage
      const massagedata =  ref(db, 'GroupAndMembers');                      // problem is i can send grp sms in any group tho im not engaged 
      onValue( massagedata, (snapshot) => {
        let arry =[]
        snapshot.forEach((item)=> {
          if(item.val().Adminuid == Admin.uid ){
            if(!item.val().WhoWantJoinUid ){
              arry.push(item.val()) 
              console.log(item.val())
            }
          }else if( item.val().WhoWantJoinUid ==  Admin.uid  ){
            arry.push(item.val()) 
          }
        })
        setgroupdata(arry)
      });
    },[])


    let [groupMsgData,setgroupMsgData] = useState([])
    useEffect(()=>{
      const starCountRef = ref(db, 'GroupMassage' );
      onValue(starCountRef, (snapshot) => {
        let arry = []
          snapshot.forEach((item)=>{
            if( groupdata.GroupMemberId == item.val().GroupMemberId){
                arry.push(item.val())
            }
          })
          setgroupMsgData(arry)
      });
    },[groupdata])
  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [showmassage,groupMsgData]);

  let handleGrpSlice=(item)=>{
      dispatch(activeMsguser())
      dispatch(groupdata12())
      dispatch(groupdata12(item))

  }
  
  return (
    <div class="flex flex-wrap gap-14 my-5 h-[90%] " >
      <div className='w-[30%] flex flex-col gap-5'>
      <div className='bg-[#242c59e0]  h-[29%] rounded-[10px] text-white overflow-scroll'>
        <Friends/>
    </div>
    <div className='bg-[#242c59e0]  h-[49%] rounded-[10px] text-white '>
    <h2 className='font-mono font-bold text-[24px] text-[#d4cff8] bg-[#272d9859] p-2 pl-4 flex gap-2	'> <FaLayerGroup className='text-4xl text-[#386cb0]' /> Groups</h2>
    <div className='h-[50%] overflow-scroll'>
      {groupdata.map(item =>( 
              <div onClick={()=>handleGrpSlice(item)} className=' flex justify-between p-2 items-center h-20  bg-[#2f357692] shadow-2xl rounded-[20px] border-[1px] border-[#04ff437d] m-3'>
              <div className=' w-[60%] text-left pl-8 '>
                <h2 className='font-mono font-bold text-[20px] text-[#c9c2ff]'>{item.GroupName}</h2>
                <p className='font-mono font-bold text-[14px] text-[#c9c2ff] pt-2'>Admin : {item.AdminName}</p>
              </div>
            </div>
      ))}
     </div>
    </div>
      </div>

    <div className='w-[62%] h-[85%] relative '>
      <div className='flex h-[15%] absolute top-0 left-0 z-10	rounded-xl  justify-between items-center p-1 bg-[#0000008d] '>  
          <div  className= 'duration-300 h-full	 flex justify-between p-2 items-center  bg-[#232752] shadow-2xl rounded-[20px]  m-3' >
                      {!groupSlice &&
                      <div className=' w-[150px] rounded-lg  h-full '>  
                      <img className="rounded-[20px] h-full ml-2 object-cover" src={activesmguser?.activeuserProfile} />
                      </div>
                      }
                      <div className= {`text-left ${!groupSlice && 'pl-28'} p-12  pr-12`}>
                          <h2 className='font-mono font-bold text-[20px] text-[#c9c2ff]'>
                            
                            {groupSlice ?
                            groupSlice.GroupName 
                            : activesmguser?
                            activesmguser.activeUseName
                            : "Select to send massage"
                            }</h2>
                            {groupSlice && <p className='text-gray-300 pt-2 text-xl'>{groupSlice.Adminuid == Admin.uid ? "My Group" : groupSlice.AdminName}</p>}
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

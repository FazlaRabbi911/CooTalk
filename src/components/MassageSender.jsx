import React, { useEffect, useRef, useState } from 'react'

import { RiSendPlaneFill } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { TiArrowSortedUp } from "react-icons/ti";
import { getDatabase, onValue, push, ref, set } from "firebase/database";

const MassageSender = () => {
  const db = getDatabase();
  let Admin = useSelector((state)=>state.storeuser.value)
  let activesmguser = useSelector((state)=>state.storactiveMsg.value)

  const textareaRef = useRef(null);
  let [taxtarheight,settaxtarheight] = useState(``)

  let handleInputChange=(e)=>{
    if(e.target.value ){
      if(textareaRef.current){
        settaxtarheight(`${textareaRef.current.scrollHeight}px`)
      }
      setmsgData(e.target.value)
    }
    if(!e.target.value){
      settaxtarheight('40px')
    }
  
  }
  let [msgData , setmsgData ] = useState('')

  let handleMsgSend=()=>{
    set(push(ref(db, 'Massages' )), {
      massage_Sender_uid:Admin.uid,
      massage_Sender_Name:Admin.displayName,

      Massage_Reciver_uid:activesmguser.activeuseUid,
      Massage_Reciver_Name:activesmguser.activeUseName,
      Massage:msgData
    });
  textareaRef.current.value('')
    setmsgData('')
  }

  if(textareaRef.current){
    textareaRef.current.style.height = taxtarheight;
  }
  // console.log(textscrollheight)
  let [showmassage,setshowmassage] = useState([])
  useEffect(()=>{
      const massagedata = ref(db, 'Massages');
      onValue(massagedata, (snapshot) => {
        let arry =[]
        snapshot.forEach((item)=>{
          if(  item.val().massage_Sender_uid == Admin.uid && item.val().Massage_Reciver_uid == activesmguser.activeuseUid
          || item.val().Massage_Reciver_uid == Admin.uid && item.val().massage_Sender_uid == activesmguser.activeuseUid ){
            arry.push(item.val())
            // console.log(item.val() )
          }
          // console.log( item.val().massage_Sender_uid == Admin.uid && item.val().Massage_Reciver_uid == activesmguser.activeuseUid , 'wwww')
          // console.log( item.val().Massage_Reciver_uid == Admin.uid && item.val().massage_Sender_uid ==activesmguser.activeuseUid , 'aaaa')
        })
        setshowmassage(arry)
      });
      },[activesmguser.activeuseUid])
      // console.log(showmassage.map((item)=>  item.massage_Sender_uid == Admin.uid && item.Massage_Reciver_uid == activesmguser.activeuseUid ),'kkk2')


      const renderMessage = (item) => { // I divided this part, cause it was re-rendering 
        const isSender = item.massage_Sender_uid === Admin.uid;
        return (
          <p
            className={isSender ? 'text-right' : 'text-left ml-2'}
            key={`${item.massage_Sender_uid}-${item.Massage_Reciver_uid}-${item.Massage}`}
          >
            <span className="text-xl font-mono bg-[#293061] m-5 p-4 rounded-xl inline-block relative">
              {item.Massage}
              <TiArrowSortedUp
                className={`text-[#293061] rotate-60 absolute top-[-9px] ${
                  isSender ? 'right-[-30px]' : 'left-[-30px]'
                } text-6xl`}
              />
            </span>
          </p>
        );
      };
  return (

    <div >
        <div >
        <div>{showmassage.map(renderMessage)}</div>
        </div>
        <div className='bg-black w-full absolute left-0 bottom-0 p-3  flex justify-center gap-2 overflow-hidden'>
              {/* <input   type="text" placeholder='text'/> */}
              <textarea ref={textareaRef} onChange={(e)=>handleInputChange(e)}
               className='pt-2 pl-6 text-xl font-mono pr-6 max-h-[240px]  overflow-y-auto resize-none hover:resize w-[80%]  font-bold    bg-[#2d324d88] break-words rounded-3xl inputcustom-scrollbar relative' id="autoGrowTextarea" rows="2" placeholder="Type here..."
               ></textarea>
              {/* <taxtarea>sd</taxtarea> */}
              {activesmguser &&
                  <button onClick={() => handleMsgSend()} className="relative group">
                   <RiSendPlaneFill className="z-50 text-[#8da7ba] ease-out group-hover:text-[#44b1ff] text-4xl" />
                   <RiSendPlaneFill className=" absolute z-0 top-2 left-2 text-[#29a6ff] transform  transition-transform duration-200 ease-out text-4xl opacity-0 group-active:opacity-100 group-active:translate-x-10 group-active:-translate-y-10 shadow-[#79a1ff53] "
                   />
                  </button>
              }

        </div>
    </div>


  )
}

export default MassageSender
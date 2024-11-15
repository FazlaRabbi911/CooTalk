import React, { useEffect, useRef, useState } from 'react'

import { RiSendPlaneFill } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { TiArrowSortedUp } from "react-icons/ti";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { PiShareFatFill } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { FaSmile } from "react-icons/fa";


import moment from 'moment'
import EmojiPicker from 'emoji-picker-react';
const MassageSender = () => {
  const db = getDatabase();
  let Admin = useSelector((state)=>state.storeuser.value)
  let activesmguser = useSelector((state)=>state.storactiveMsg.value)
  const [text, setText] = useState('');

  const textareaRef = useRef(null);
  let [taxtarheight,settaxtarheight] = useState(``)

  let handleInputChange=(e)=>{
    setText(e.target.value)
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
      Massage:msgData,
      Time:`${ new Date().getFullYear()}/${new Date().getMonth()+1}/${new Date().getDate()}/${new Date().getHours()}/${new Date().getMinutes()}}`
    });
    setText('');
    settaxtarheight('40px')
  }
  if(textareaRef.current){
    textareaRef.current.style.height = taxtarheight;
  }
  let [showmassage,setshowmassage] = useState([])
  useEffect(()=>{                                       // massage data 
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
let [forwardshow,setforwardshow]=useState(false)
let handleforwardSwitch=()=>{
  setforwardshow(!forwardshow)
}
                               
   let [Frinddata, setFrinddata]= useState([])        // friend data 
    useEffect(()=>{
        const starCountRef = ref(db, 'friend/' );
        onValue(starCountRef, (snapshot) => {
          let arry = []
            snapshot.forEach((item)=>{
              if(Admin.uid == item.val().who_SendRequest_Uid || Admin.uid == item.val().Receiver_Uid){
                arry.push({...item.val(),FrndDBkey:item.key})
              }
            })
            setFrinddata(arry)
        });
    },[])

let [forwardmassageModal,setforwardmassageModal] = useState(false)
let [forwardMassage,setforwardMassage] =useState()
let ForwardMassage=(item)=>{
  setforwardMassage(item)
  setforwardmassageModal(!forwardmassageModal)
}

    
let handleactivemassage =(item)=>{
  if(Admin.uid==item.Receiver_Uid ){
    set(push(ref(db, 'Massages' )), {
      massage_Sender_uid:Admin.uid,
      massage_Sender_Name:Admin.displayName,

      Massage_Reciver_uid:item.who_SendRequest_Uid,
      Massage_Reciver_Name:item.who_SendRequest_Name,
      Massage:forwardMassage.Massage,
      Time:`${ new Date().getFullYear()}/${new Date().getMonth()+1}/${new Date().getDate()}/${new Date().getHours()}/${new Date().getMinutes()}}`
    });
  }else{    
    set(push(ref(db, 'Massages' )), {
      massage_Sender_uid:Admin.uid,
      massage_Sender_Name:Admin.displayName,

      Massage_Reciver_uid:item.Receiver_Uid,
      Massage_Reciver_Name:item.Receiver_Name,
      Massage:forwardMassage.Massage,
      Time:`${ new Date().getFullYear()}/${new Date().getMonth()+1}/${new Date().getDate()}/${new Date().getHours()}/${new Date().getMinutes()}}`
    });
  }
  setforwardmassageModal(!forwardmassageModal)
  setforwardshow(!forwardshow)
}
let [sendEmoji,SetsendEmoji] = useState(false)// emoji switch

      const renderMessage = (item) => { // I divided this part, cause it was re-rendering 
        const isSender = item.massage_Sender_uid === Admin.uid;
        return (
          <p 
            className={isSender ? 'text-right ' : 'text-left ml-2'} 
            key={`${item.massage_Sender_uid}-${item.Massage_Reciver_uid}-${item.Massage}`}
          >
            <div>
              {forwardshow && isSender && <span><PiShareFatFill onClick={()=>ForwardMassage(item)} className={isSender && ' transform scale-x-[-1] mr-3 inline-block text-xl cursor-pointer' }/></span>}
              <span onClick={handleforwardSwitch} className="text-xl font-mono bg-[#293061] m-5 p-4 rounded-xl inline-block relative">
                  {item.Massage}
                  <TiArrowSortedUp
                    className={`text-[#293061] rotate-60 absolute top-[-9px] ${
                      isSender ? 'right-[-30px]' : 'left-[-30px]'
                    } text-6xl`}
                  />
                </span>
                {forwardshow && !isSender && <span onClick={()=>ForwardMassage(item)} className='rotate-0 inline-block text-xl cursor-pointer'><PiShareFatFill /></span>}
              </div>
            <p className='text-[#8f8e8e79] font-mono text-[15px] mt-[-10px]'>{moment(item.Time, 'YYYYMMDD h:mm:ss ').fromNow()}</p>
          </p>
        );
      };
  return (

    <div>
        <div >
        <div className='my-[35px] '>{showmassage &&  showmassage.map(renderMessage)}</div>
        </div>
        <div className=' bg-black w-full absolute left-0 bottom-[-72px] py-8 p-3   gap-2 overflow-hidden'>
          <div className='flex justify-center items-center'>
              {/* <input   type="text" placeholder='text'/> */}
              <div className='w-[80%] relative'>
              <textarea  value={text} ref={textareaRef} onChange={(e)=>handleInputChange(e)}
               className='bg- pt-2 pl-6 text-xl font-mono pr-8 max-h-[240px]  overflow-y-auto resize-none hover:resize w-[100%]  font-bold    bg-[#2d324d88] break-words rounded-3xl inputcustom-scrollbar ' id="autoGrowTextarea" rows="2" placeholder="Type here..."
               ></textarea><FaSmile onClick={()=>SetsendEmoji(!sendEmoji)} className={`absolute right-2 text-2xl top-[16%] text-gray-300 cursor-pointer ${sendEmoji && 'text-green-400'}`} />
              </div>
              {/* <taxtarea>sd</taxtarea> */}
              {activesmguser && text&&
              <div >  
                  <button onClick={() => handleMsgSend()} className="relative group">
                   <RiSendPlaneFill className="z-50 text-[#8da7ba] ease-out group-hover:text-[#44b1ff] text-4xl" />
                   <RiSendPlaneFill className=" absolute z-0 top-2 left-2 text-[#29a6ff] transform  transition-transform duration-200 ease-out text-4xl opacity-0 group-active:opacity-100 group-active:translate-x-10 group-active:-translate-y-10 shadow-[#79a1ff53] "
                   />
                  </button>
              </div>  
              }
          </div>
              {sendEmoji&&
                <div className='flex justify-center h-[10%] py-3 '>
                <div className='overflow-hidden'>
                <EmojiPicker emojiStyle={"facebook"} Theme={'dark'} width={450}/>
                </div>
                </div>
              }
        </div>
        {forwardmassageModal &&
            <div className='absolute top-0 flex justify-center items-center left-0 w-full h-[90%]  backdrop-blur-sm overflow-y-scroll'>
            <div className='p-4  rounded-md  relative '>
              <div className='sticky flex justify-end top-[50%] ml-44 text-right w-full  '>
                <IoClose className='cursor-pointer text-[35px] bg-red text-red-500'onClick={()=>setforwardmassageModal(!forwardmassageModal)}/>
              </div>
            {Frinddata.map(item=>( 
                 <div className='truncate	group cursor-pointer border-[#2b3462] w-[400px] rounded-lg h-[100%]'>
                  <div className=' relative'>
                      <div onClick={()=>handleactivemassage(item)} className='duration-300	 flex justify-between p-2 items-center h-20 bg-[#353b7d] shadow-2xl rounded-[20px]  m-3 ' >
                          <div className=' w-[30%] rounded-lg h-[100%]  '>
                          {item.Receiver_Uid == Admin.uid 
                            ?
                            <img className="rounded-[20px] h-[100%] " src={item.who_SendRequest_profile}/>
                            :
                            <img className="rounded-[20px] h-[100%] " src={item.Receiver_profile}/>
                            }                
                            </div>
                          <div className=' w-[60%] ml-7'>
                            {item.Receiver_Uid == Admin.uid 
                            ?
                            <h2 className='font-mono font-bold text-[20px] text-[#c9c2ff]'>{item.who_SendRequest_Name}</h2>
                            :
                            <h2 className='font-mono font-bold text-[20px] text-[#c9c2ff]'>{item.Receiver_Name}</h2>
                            }
                          </div>
                      </div>
                  </div>
                </div>
            ))} 
            </div>
        </div>
      }
    </div>
  )
}

export default MassageSender
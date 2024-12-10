import React, { useEffect, useRef, useState } from 'react'

import { RiSendPlaneFill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { TiArrowSortedUp } from "react-icons/ti";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { PiShareFatFill } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { FaSmile } from "react-icons/fa";
import { FaFileArrowUp } from "react-icons/fa6";
import { FcImageFile } from "react-icons/fc";
import { FcVideoFile } from "react-icons/fc";
import { getStorage, uploadBytes ,ref as imgRef, getDownloadURL} from "firebase/storage";
import { IoMdMic } from "react-icons/io";
import { RiFileVideoFill } from "react-icons/ri";
import { RiFolderSettingsFill } from "react-icons/ri";


import moment from 'moment'
import EmojiPicker from 'emoji-picker-react';
const MassageSender = () => {
  const db = getDatabase();
  const storage = getStorage();
  let Admin = useSelector((state)=>state.storeuser.value)

  let activesmguser = useSelector((state)=>state.storactiveMsg.value)   //onclick massage slice
  let groupdata = useSelector((state)=>state.groupdataStore.value)      //onclick group slice
  
  const [text, setText] = useState('');
  const [GroupMsg, setGroupMsg] = useState('');
    

  const textareaRef = useRef(null);
  let [taxtarheight,settaxtarheight] = useState(``)
  let [msgData , setmsgData ] = useState('')
  let [sendEmoji,SetsendEmoji] = useState(false)// emoji switch
  let [groupMsgData,setgroupMsgData] = useState([])
  let handleInputChange=(e)=>{
    if(activesmguser){
      setText(e.target.value)
    }else if(groupdata){
      setGroupMsg(e.target.value)
    }
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


  let handleMsgSend=()=>{
    if(activesmguser){
      set(push(ref(db, 'Massages' )), {
        massage_Sender_uid:Admin.uid,
        massage_Sender_Name:Admin.displayName,
  
        Massage_Reciver_uid:activesmguser.activeuseUid,
        Massage_Reciver_Name:activesmguser.activeUseName,
        Massage:msgData,
        Time:`${ new Date().getFullYear()}/${new Date().getMonth()+1}/${new Date().getDate()}/${new Date().getHours()}/${new Date().getMinutes()}}`
      }).then(()=>{
        setText('');
        SetsendEmoji(false)
        settaxtarheight('40px')
        setmsgData('')
      })
    }else if(groupdata){
      set(push(ref(db, 'GroupMassage' )), {
        whosendGRP_MSG_Uid:Admin.uid,
        whosendGRP_MSG_Name:Admin.displayName,
  
        GroupAndMemberId:groupdata.GroupAndMemberId,
        GroupName_Name:groupdata.GroupName,
        Massage:GroupMsg,
        Time:`${ new Date().getFullYear()}/${new Date().getMonth()+1}/${new Date().getDate()}/${new Date().getHours()}/${new Date().getMinutes()}}`
      }).then(()=>{
        SetsendEmoji(false)
        settaxtarheight('40px')
        setGroupMsg('')
        SetsendEmoji(false)
      })
    }

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
    set(push(ref(db, 'Massages' )), {           // massage
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

  useEffect(()=>{
    const starCountRef = ref(db, 'GroupMassage' );    // group massage
    onValue(starCountRef, (snapshot) => {
      let arry = []
        snapshot.forEach((item)=>{
          if( groupdata.GroupAndMemberId == item.val().GroupAndMemberId){
          
              arry.push(item.val())
            
          }
          console.log(item.val())
        })
        setgroupMsgData(arry)
    });
  },[groupdata])
 let emojiData=(e)=>{
  if(activesmguser){
    setmsgData(msgData+e.emoji)
    setText(msgData+e.emoji)
  }else if(groupdata)

    setGroupMsg(GroupMsg+e.emoji)
 }
 let [fileopener,setfileopener] = useState(false)

 let handleImage=(e)=>{
  console.log('click')
  const storageRef = imgRef(storage, e.target.files[0].name);
  uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
    getDownloadURL(storageRef).then((DownloadURL) => {
    console.log(DownloadURL)
    if(activesmguser){
      set(push(ref(db, 'Massages' )), {
        massage_Sender_uid:Admin.uid,
        massage_Sender_Name:Admin.displayName,
  
        Massage_Reciver_uid:activesmguser.activeuseUid,
        Massage_Reciver_Name:activesmguser.activeUseName,
        ImgMassage:DownloadURL,
        Time:`${ new Date().getFullYear()}/${new Date().getMonth()+1}/${new Date().getDate()}/${new Date().getHours()}/${new Date().getMinutes()}}`
      }).then(()=>{
        setText('');
        SetsendEmoji(false)
        settaxtarheight('40px')
        setmsgData('')
        setfileopener(!fileopener)
      })
    }else if(groupdata){
      set(push(ref(db, 'GroupMassage' )), {
        whosendGRP_MSG_Uid:Admin.uid,
        whosendGRP_MSG_Name:Admin.displayName,
  
        GroupAndMemberId:groupdata.GroupAndMemberId,
        GroupName_Name:groupdata.GroupName,
        ImgMassage:DownloadURL,
        Time:`${ new Date().getFullYear()}/${new Date().getMonth()+1}/${new Date().getDate()}/${new Date().getHours()}/${new Date().getMinutes()}}`
      }).then(()=>{
        SetsendEmoji(false)
        settaxtarheight('40px')
        setGroupMsg('')
        SetsendEmoji(false)
        setfileopener(!fileopener)
      })
    }
  })
  });
 }

 let handleVideo=(e)=>{
  const storageRef = imgRef(storage, e.target.files[0].name);
  uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
    getDownloadURL(storageRef).then((DownloadURL) => {
    console.log(DownloadURL)
    if(activesmguser){
      set(push(ref(db, 'Massages' )), {
        massage_Sender_uid:Admin.uid,
        massage_Sender_Name:Admin.displayName,
  
        Massage_Reciver_uid:activesmguser.activeuseUid,
        Massage_Reciver_Name:activesmguser.activeUseName,
        Video:DownloadURL,
        Time:`${ new Date().getFullYear()}/${new Date().getMonth()+1}/${new Date().getDate()}/${new Date().getHours()}/${new Date().getMinutes()}}`
      }).then(()=>{
        setText('');
        SetsendEmoji(false)
        settaxtarheight('40px')
        setmsgData('')
        setfileopener(!fileopener)

      })
    }else if(groupdata){
      set(push(ref(db, 'GroupMassage' )), {
        whosendGRP_MSG_Uid:Admin.uid,
        whosendGRP_MSG_Name:Admin.displayName,
  
        GroupAndMemberId:groupdata.GroupAndMemberId,
        GroupName_Name:groupdata.GroupName,
        Video:DownloadURL,
        Time:`${ new Date().getFullYear()}/${new Date().getMonth()+1}/${new Date().getDate()}/${new Date().getHours()}/${new Date().getMinutes()}}`
      }).then(()=>{
        SetsendEmoji(false)
        settaxtarheight('40px')
        setGroupMsg('')
        SetsendEmoji(false)
        setfileopener(!fileopener)

      })
    }
  })
  });
 }

      const renderMessage = (item) => { // I divided this part, cause it was re-rendering 
        const isSender = item.massage_Sender_uid === Admin.uid;
        return (
          <p 
            className={isSender ? 'text-right' : 'text-left ml-2'} 
            key={`${item.massage_Sender_uid}-${item.Massage_Reciver_uid}-${item.Massage}-${item.ImgMassage}`}
          >
            <div className='w-full '>
              {forwardshow && isSender && <span><PiShareFatFill onClick={()=>ForwardMassage(item)} className={isSender && ' transform scale-x-[-1] mr-3 inline-block text-xl cursor-pointer' }/></span>}
              <span onClick={handleforwardSwitch} className="text-xl font-mono bg-[#293061] m-5 p-4 rounded-xl inline-block relative text-wrap">
                  {item.Massage}
                  <TiArrowSortedUp
                    className={`text-[#293061] rotate-60 absolute top-[-9px] ${
                      isSender ? 'right-[-30px]' : 'left-[-30px]'
                    } text-6xl`}
                  />
                </span>
                {item.ImgMassage && <div onClick={handleforwardSwitch} className={isSender ? 'w-[40%] ml-auto ' : 'w-[40%] ml-auto '} ><img className='rounded-sm object-fill mb-4 ' src={item.ImgMassage} alt="" /></div>}
                {item.Video &&
                <div onClick={handleforwardSwitch} className={isSender ? 'w-[40%] ml-auto ' : 'w-[40%] ml-auto '} >
                    <video src={item.Video} controls ></video>
                  </div>}
                {forwardshow && !isSender && <span onClick={()=>ForwardMassage(item)} className='rotate-0 inline-block text-xl cursor-pointer'><PiShareFatFill /></span>}

              </div>
            <p className='text-[#8f8e8e79] font-mono text-[15px] mt-[-10px]'>{moment(item.Time, 'YYYYMMDD h:mm:ss ').fromNow()}</p>
          </p>
        );
      };
      const renderGroupMessage = (item) => { // I divided this part, cause it was re-rendering 
        const isSender = item.whosendGRP_MSG_Uid  == Admin.uid;
        return (
          <p 
            className={isSender ? 'text-right ' : 'text-left ml-2 '} 
            key={`${item.whosendGRP_MSG_Uid}-${item.GroupAndMemberId}-${item.Massage }-${item.ImgMassage}`}
          >
            <div>
              {forwardshow && isSender && <span><PiShareFatFill onClick={()=>ForwardMassage(item)} className={isSender && ' transform scale-x-[-1] mr-3 inline-block text-xl cursor-pointer' }/></span>}
              <span onClick={handleforwardSwitch} className="text-xl font-mono bg-[#293061] m-5 p-4 rounded-xl inline-block relative">
                  {item.Massage} <p className='text-sm mt-1 font-bold text-gray-500 font-mono'>{item.whosendGRP_MSG_Name}</p>
                  <TiArrowSortedUp
                    className={`text-[#293061] rotate-60 absolute top-[-9px] ${
                      isSender ? 'right-[-30px]' : 'left-[-30px]'
                    } text-6xl`}
                  />
                </span>
                {item.ImgMassage && <div onClick={handleforwardSwitch} className={isSender ? 'w-[40%] ml-auto ' : 'w-[40%] ml-auto '} ><img className='rounded-sm object-fill mb-4 ' src={item.ImgMassage} alt="" /></div>}
                {item.Video &&
                <div onClick={handleforwardSwitch} className={isSender ? 'w-[40%] ml-auto ' : 'w-[40%] ml-auto '} >
                    <video src={item.Video} controls ></video>
                </div>}
                {forwardshow && !isSender && <span onClick={()=>ForwardMassage(item)} className='rotate-0 inline-block text-xl cursor-pointer'><PiShareFatFill /></span>}
              </div>
            <p className='text-[#8f8e8e79] font-mono text-[15px] mt-[-10px]'>{moment(item.Time, 'YYYYMMDD h:mm:ss ').fromNow()}</p>
          </p>
        );
      };
  return (

    <div>
        <div >
        <div className='my-[35px] mb-12'>{activesmguser  && showmassage  ?  showmassage.map(renderMessage) : groupdata && groupMsgData && groupMsgData.map(renderGroupMessage)}</div>
        </div>
        <div className=' bg-black w-full absolute left-0 bottom-[-72px] py-7 p-3   gap-2 overflow-hidden'>
          <div className='flex justify-center items-center '>

          {fileopener &&
                <button  onClick={()=>setfileopener(!fileopener)}  className={`text-4xl cursor-pointer text-right transition-all duration-500   ${fileopener ? 'w-10 opacity-100 ' : 'w-0 opacity-0 '}`}>x</button>
              }
            <div  className={` relative flex  text-[40px] mr-5 gap-4 transition-all duration-800 ${fileopener ? 'h-10 w-[20%]' : 'h-0'} `} >
              <RiFolderSettingsFill onClick={()=>setfileopener(!fileopener)} className={` cursor-pointer mt-[-25px] transition-all duration-500 ${fileopener ? 'h-0 opacity-0 ' : 'h-10 opacity-100 text-3xl '}  `} />

                    <div className='hover:bg-gray-800  hover:rounded-xl'>
                      <input onChange={(e)=>handleImage(e)} type="file" id='image' hidden />
                      <label for='image'><mark><FcImageFile className={`'cursor-pointer transition-all duration-6000 w-0 ${fileopener &&'rounded-lg w-10'} '`}/></mark></label>
                    </div>
                    <div className='hover:bg-gray-800  hover:rounded-xl'>
                      <input onChange={(e)=>handleVideo(e)} type="file" id='video' hidden />
                      <label for='video'><mark><RiFileVideoFill  className={`'bg-gray-800 text-[#e3bf7f] cursor-pointer transition-all duration-1500 w-0 ${fileopener &&'rounded-lg w-10'} '`}/></mark></label>
                    </div>
                    <div className='hover:bg-gray-800  hover:rounded-xl'>
                      <input onChange={(e)=>handleVideo(e)} type="file" id='video' hidden />
                      <label for='video'><mark><IoMdMic  className={`' text-white cursor-pointer transition-all duration-1500 w-0 ${fileopener &&'rounded-lg w-10'} '`}/></mark></label>
                    </div>
            </div>

              <div className={` relative duration-800  ${fileopener ? 'w-[70%] ' : 'w-[80%]'} `}>
              <textarea  value={activesmguser ?  text : groupdata &&  GroupMsg } ref={textareaRef} onChange={(e)=>handleInputChange(e)}
               className='bg- pt-2 pl-6 text-xl font-mono pr-8 max-h-[240px] h-10 overflow-y-auto resize-none hover:resize w-[100%]  font-bold    bg-[#2d324d88] break-words rounded-3xl inputcustom-scrollbar ' id="autoGrowTextarea" rows="2" placeholder="Type here..."
               ></textarea><FaSmile onClick={()=>SetsendEmoji(!sendEmoji)} className={`absolute right-2 text-2xl top-[16%] text-gray-300 cursor-pointer ${sendEmoji && 'text-green-400'}`} />
               </div>
              {/* <taxtarea>sd</taxtarea> */}
              {groupdata &&  GroupMsg &&
              <div >  
                  <button onClick={() => handleMsgSend()} className="relative group ml-4">
                   <RiSendPlaneFill className="z-50 text-[#8da7ba] ease-out group-hover:text-[#44b1ff] text-4xl" />
                   <RiSendPlaneFill className=" absolute z-0 top-2 left-2 text-[#29a6ff] transform  transition-transform duration-200 ease-out text-4xl opacity-0 group-active:opacity-100 group-active:translate-x-10 group-active:-translate-y-10 shadow-[#79a1ff53] "
                   />
                  </button>
              </div>  
              }
              {activesmguser &&  text &&
              <div >  
                  <button onClick={() => handleMsgSend()} className="relative group ml-4">
                   <RiSendPlaneFill className="z-50 text-[#8da7ba] ease-out group-hover:text-[#44b1ff] text-4xl" />
                   <RiSendPlaneFill className=" absolute z-0 top-2 left-2 text-[#29a6ff] transform  transition-transform duration-200 ease-out text-4xl opacity-0 group-active:opacity-100 group-active:translate-x-10 group-active:-translate-y-10 shadow-[#79a1ff53] "
                   />
                  </button>
              </div>  
              }

          </div>
              {sendEmoji &&  
                <div className='flex justify-center h-[10%] py-3 '>
                <div className='overflow-hidden'>
                <EmojiPicker onEmojiClick={emojiData}  emojiStyle={"facebook"} Theme={'dark'} width={450}/>
                </div>
                </div>
              }
        </div>
        {forwardmassageModal &&
            <div className='absolute top-[16%] flex justify-center items-center left-0 w-full h-[100%]  backdrop-blur-sm overflow-y-scroll'>
            <div className='p-4  rounded-md  relative '>
              <div className='sticky flex justify-end top-[50%] ml-44 text-right w-full  '>
                <IoClose className='cursor-pointer text-[35px] bg-red text-red-500'onClick={()=>setforwardmassageModal(!forwardmassageModal)}/>
              </div>
            {Frinddata.map(item=>( 
                 <div className='truncate	group cursor-pointer border-[#2b3462] w-[400px] rounded-lg h-[100%] '>
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
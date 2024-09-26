import React, { createRef, useEffect, useState } from 'react'
import { SiHomeadvisor } from "react-icons/si";
import { IoIosNotifications } from "react-icons/io";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";

import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaFileImage } from "react-icons/fa";
import { getDownloadURL, getStorage,ref,  uploadString } from "firebase/storage";
import { getAuth,  updateProfile } from "firebase/auth";
// croper
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getDatabase, update } from 'firebase/database';
import {activeuser} from '../userslice'

const defaultSrc =
  "https://firebasestorage.googleapis.com/v0/b/cootalk-e6218.appspot.com/o/Avatar%2Fprofile.png?alt=media&token=64426eeb-04d5-430c-8377-dcc0a7aed9e9";
// croper
const Navbar = () => {
  // nav page location react-router
  let location = useLocation()
  // nav page location react-router
  const auth = getAuth();
  // croper
  const storage = getStorage();
    // croper
    const [image, setImage] = useState(defaultSrc);
    const [cropData, setCropData] = useState("#");
    const cropperRef = createRef();
    // croper
  const db = getDatabase();

  let dispatch = useDispatch()
  let activeUserInfo = useSelector((state)=>state.storeuser.value)
  
  let navigate = useNavigate()
  // croper



  const handelimgupload = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

// console.log(userInfo)
  const getCropData = () => {
    setShowModal(false)
      // setCropData=(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const storageRef = ref(storage, `profile-${activeUserInfo.uid}`);
      const message4 = (cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      uploadString(storageRef, message4, 'data_url').then((snapshot) => {

        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
          photoURL: downloadURL,
          }).then((downloadURL) => {
            update(db, 'users/' + activeUserInfo.user.uid, {
              profilePicture: downloadURL
            })
           localStorage.setItem("activeUserdata",JSON.stringify({...activeuser,photoURL:downloadURL}))
           dispatch(activeuser({...activeuser,photoURL:downloadURL}))

           .then((downloadURL)=>{
            // update(db, 'users/' + activeUserInfo.user.uid, {
            //   profilePicture: downloadURL
            // })
            console.log(downloadURL)
           })

          })
        });

      });
  };



  let handleLogOut=()=>{
    localStorage.removeItem("activeUserdata")
    navigate('/login')
  }
  const [showModal, setShowModal] = React.useState(false);

  let [activeLinkdata,setactiveLinkdata] = useState(false)
  // console.log(activeLinkdata == true ? "true" :"false")
    let activeLINK = ""
    let notactiveLINK = "bg-[#404042] rounded-3xl relative  transition-all delay-100 ease-in-out	 duration-300  "

// console.log(activeLINK)

{/* <IoIosSettings className='text-[54px] text-[#d4d4db]  shadow-lg rounded-3xl shadow-[#000000]'/>  */}
  return (
    <div className='flex flex-col items-end	pr-8	bg-[#05061c] text-white h-screen gap-[7%] '>
       <div className='	w-[70%] mt-3 ' onClick={() => setShowModal(true)}>
        <img className='rounded-full w-100% cursor-pointer'  src={activeUserInfo.photoURL} alt="" />
        <h2 className='mt-4 text-center'>{activeUserInfo.displayName}</h2>
        </div>
        <div><Link to='/home/feed' ><div className={`${ location.pathname =="/home/feed" ? 'rounded-3xl p-2 relative bg-[#2e2e8f] transition-all delay-100 ease-in-out	 duration-300 group': 'bg-[#404042] rounded-3xl p-1	relative transition-all delay-100 ease-in-out	 duration-300 group'}`}><SiHomeadvisor className='text-[60px] text-[#d4d4db]  shadow-lg rounded-3xl shadow-[#000000]'/>   <div className={`${ location.pathname == "/home/feed" ?  'absolute bg-white h-10 duration-300  rounded-xl w-2 left-[-50px]  top-4 ' : 'absolute bg-white  duration-300 h-0 rounded-xl w-2 left-[-50px] top-4 '}`}></div></div></Link></div>
        <div><Link className={location.pathname =="/home/massage" && "active"} to='/home/massage' ><div className={`${ location.pathname =="/home/massage" ? 'rounded-3xl p-3 relative bg-[#2e2e8f] transition-all delay-100 ease-in-out	 duration-300 group': 'bg-[#404042] rounded-3xl p-2	relative transition-all delay-100 ease-in-out	 duration-300 group'}`}><FaEnvelopeOpenText className='text-[44px] text-[#d4d4db]  shadow-lg rounded-3xl shadow-[#000000]'/>    <div className={`${ location.pathname == "/home/massage" ?  'absolute bg-white h-10 duration-300  rounded-xl w-2 left-[-50px] top-4 ' : 'absolute bg-white  duration-300 h-0 rounded-xl w-2 left-[-50px] top-4 '}`}></div></div></Link></div>
        <div><Link className={location.pathname =="/home/notification" && "active"} to='/home/notification' ><div className={`${ location.pathname =="/home/notification" ? 'rounded-3xl p-2 relative bg-[#2e2e8f] transition-all delay-100 ease-in-out	 duration-300 group': 'bg-[#404042] rounded-3xl p-1	relative transition-all delay-100 ease-in-out	 duration-300 group'}`}><IoIosNotifications className='text-[54px] text-[#d4d4db]  shadow-lg rounded-3xl shadow-[#000000]'/>    <div className={`${ location.pathname == "/home/notification" ?  'absolute bg-white h-10 duration-300  rounded-xl w-2 left-[-50px] top-4 ' : 'absolute bg-white  duration-300 h-0 rounded-xl w-2 left-[-50px] top-4 '}`}></div></div></Link></div>
        <div><Link className={location.pathname =="/home/setting" && "active"} to='/home/setting' ><div className={`${ location.pathname =="/home/setting" ? 'rounded-3xl p-2 relative bg-[#2e2e8f] transition-all delay-100 ease-in-out	 duration-300 group': 'bg-[#404042] rounded-3xl p-1	relative transition-all delay-100 ease-in-out	 duration-300 group'}`}><IoIosSettings className='text-[54px] text-[#d4d4db]  shadow-lg rounded-3xl shadow-[#000000]'/>     <div className={`${ location.pathname == "/home/setting" ?  'absolute bg-white h-10 duration-300  rounded-xl w-2 left-[-50px] top-4 ' : 'absolute bg-white  duration-300 h-0 rounded-xl w-2 left-[-50px] top-4 '}`}></div></div></Link></div>
        <div><Link ><div  className='bg-[#050506] rounded-3xl hover:p-1	 hover:bg-[#060607]  hover:border-[#2e2e8f] ansition-all delay-100 ease-in-out	 duration-300 group'><IoMdLogOut onClick={()=>handleLogOut()} className='text-[64px] text-red-400 group-hover:text-red-500 boder-1 '/></div>
        </Link></div>
       {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className=" rounded-xl shadow-lg relative flex flex-col w-full bg-[#3232326f] outline-none focus:outline-none">
                {/*header*/}
                <div className=" shadow-2xl flex items-start  p-5  ">
                  <h3 className="text-3xl font-semibold">
                    <div className='w-[100%]'>
                      <input className='ml-10 file:bg-gray-200 file:rounded-xl hover:file:text-white hover:file:bg-[#094940] focus:cursor-pointer'   type="file"  onChange={handelimgupload}  />
                      <FaFileImage className='absolute top-6 left-4 text-[#fbae3bf6]'/>
                      <br />
                      <br />
                      <Cropper
                        ref={cropperRef}
                        style={{ height: 400, width: "100%" }}
                        zoomTo={0.5}
                        initialAspectRatio={1}
                        preview=".img-preview"
                        src={image}
                        viewMode={1}
                        minCropBoxHeight={10}
                        minCropBoxWidth={10}
                        background={false}
                        responsive={true}
                        autoCropArea={1}
                        // checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                        guides={true}
                      />
                    </div>
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                  </button>
                </div>
                {/*body*/}

                {/*footer*/}
                <div className="flex items-center justify-center gap-8 p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-dark rounded-lg text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"onClick={getCropData}
                  >
                    Save 
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  )
}

export default Navbar

import React from 'react'
import { SiHomeadvisor } from "react-icons/si";
import { IoIosNotifications } from "react-icons/io";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";

const Navbar = () => {
  return (
    <div className='flex flex-col items-end	pr-8	bg-[#05061c] text-white h-screen gap-[7%] '>
       <div>profile</div>
       <div className='bg-[#404042] rounded-3xl hover:p-1	relative hover:bg-[#2e2e8f] transition-all delay-100 ease-in-out	 duration-300 group'><SiHomeadvisor className='text-[64px] text-[#d4d4db]  shadow-lg rounded-3xl shadow-[#000000]'/> <div className='absolute bg-white group-hover:h-10 duration-300 h-2 rounded-xl w-2 left-[-100px] top-4 '></div> </div>
       <div className='bg-[#404042] rounded-3xl p-2 hover:p-3 	relative hover:bg-[#2e2e8f] transition-all delay-100 ease-in-out	 duration-300 group'><FaEnvelopeOpenText className='text-[44px] text-[#d4d4db]  shadow-lg rounded-3xl shadow-[#000000]'/>  <div className='absolute bg-white group-hover:h-10 duration-300 h-2 rounded-xl w-2 left-[-100px] top-4 '></div> </div>
       <div  className='bg-[#404042] rounded-3xl hover:p-1	relative hover:bg-[#2e2e8f] transition-all delay-100 ease-in-out	 duration-300 group'><IoIosNotifications className='text-[54px] text-[#d4d4db]  shadow-lg rounded-3xl shadow-[#000000]'/>  <div className='absolute bg-white group-hover:h-10 duration-300 h-2 rounded-xl w-2 left-[-100px] top-4 '></div> </div>
       <div className='bg-[#404042] rounded-3xl hover:p-1	relative hover:bg-[#2e2e8f] transition-all delay-100 ease-in-out	 duration-300 group'><IoIosSettings className='text-[54px] text-[#d4d4db]  shadow-lg rounded-3xl shadow-[#000000]'/>  <div className='absolute bg-white group-hover:h-10 duration-300 h-2 rounded-xl w-2 left-[-100px] top-4 '></div> </div>
       <div className='bg-[#050506] rounded-3xl hover:p-1	 hover:bg-[#060607]  hover:border-[#2e2e8f] ansition-all delay-100 ease-in-out	 duration-300 group'><IoMdLogOut className='text-[64px] text-red-400 group-hover:text-red-500 boder-1 '/></div>

    </div>
  )
}

export default Navbar

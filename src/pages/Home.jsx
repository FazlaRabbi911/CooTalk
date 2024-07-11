import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'



const Home = () => {
  let activeuser = useSelector((state)=>state.storeuser.value)
  let navigate = useNavigate()
  useEffect(()=>{
    if(!activeuser?.email){
      navigate('/login')
    }
  },[])
  return (
    <div className='flex bg-dark h-screen'>
      <div className=' w-[15%]'>
        <Navbar/>
      </div>
      <div className='  w-[85%]' >
        <Outlet/>
      </div>
    </div>
  )
}

export default Home

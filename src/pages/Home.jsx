import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex bg-dark h-100%'>
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

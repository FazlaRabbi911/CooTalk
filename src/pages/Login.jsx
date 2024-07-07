import React, { useState } from 'react'
import { FaCaretRight } from "react-icons/fa";
import { BiSolidError } from "react-icons/bi";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { InfinitySpin } from 'react-loader-spinner';
import { IoMdEye } from "react-icons/io";
import { RiEyeCloseFill } from "react-icons/ri";

const Login = () => {
    const auth = getAuth();
    let [loader,setloader] = useState(false)
    let [showpassword,setshowpassword] =useState(false)
    let navigate = useNavigate()
    let [inputdata,setinputdata]=useState({
        email:'',
        password:''
    })
    let [errorinputdata,seterrorinputdata]=useState({
        email:'',
        password:''
    })
    let handlechange=(e)=>{
        setinputdata({...inputdata,[e.target.name]:e.target.value})
        seterrorinputdata({...errorinputdata,[e.target.name]:''})
    }

    let handleclick=()=>{
        let pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let result = pattern.test(inputdata.email);
        if(!inputdata.email){
            seterrorinputdata({...errorinputdata, email:'Please fill in this field'})
        }else if(!result){
            seterrorinputdata({...errorinputdata, email:'Please give valid email!!'})
        }else  if(!inputdata.password){
            seterrorinputdata({...errorinputdata, password:'Please fill in this field'})
        }else if(inputdata.password.length < 6){
            seterrorinputdata({...errorinputdata, password:'password should be bigger than 6 character'})
        }else{setloader(true)
            signInWithEmailAndPassword(auth, inputdata.email, inputdata.password)
            .then((userCredential) => {
                toast.success('🐰 Sign in successful', {
                    position: "bottom-center",
                    autoClose: 5000,
                    theme: "light",
                    });
                    setloader(false)
            })
            .catch((error) => {
                toast.error('Error!! Invalid credential', {
                    position: "bottom-center",
                    autoClose: 5000,
                    theme: "light",
                    });
                    setloader(false)
            });
        }
    }
  return (
    <div className='bg-dark h-screen relative'>
        <div className=' absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/4' >
            <div className='text-center flex flex-col justify-center items-center'>
                <img className='w-20 m-0 p-0 rounded-[25%]  bg-black ' src="./src/assets/logo.jpg" alt="#" />
                <h1 className='text-white text-2xl	pt-8 pb-5'>Login to CooTalk</h1> 
            </div>
            <div className='bg-glass border-[.20px] border-[#ffffff22] overflow-hidden pt-5 pb-4 pr-4 pl-4 rounded-md '>
                <h2 className='text-sml text-white'>Email address</h2>
                <input onChange={handlechange}  name='email' className='relative w-[262px] mt-2 mb-4 rounded h-8 text-white pl-3	bg-dark focus:outline-none focus:ring-0 focus:border-blue-500	border-[1px] border-[#8a8a8a]		' type="text"/>

                {errorinputdata.email &&
                <h2 className='absolute z-10 bg-[#575757] border-[0.25px] text-white rounded-md flex p-1'> <div className='relative'><FaCaretRight className=' left-6 top-[-25px] text-[#575757] text-[40px] rotate-[-90deg] absolute'/></div><BiSolidError className= 'text-[18px] text-[#ffa54c] mt-1 mr-1'  />{errorinputdata.email} </h2>
                }

                {errorinputdata.name &&
                <h2 className='absolute z-10 bg-[#575757] border-[0.25px] text-white rounded-md flex p-1'> <div className='relative'><FaCaretRight className=' left-6 top-[-25px] text-[#575757] text-[40px] rotate-[-90deg] absolute'/></div><BiSolidError className= 'text-[18px] text-[#ffa54c] mt-1 mr-1'  />{errorinputdata.name} </h2>
                }
                <p className='text-sml text-white'>Password</p>
                <div className='relative'> 
                <input onChange={handlechange}   name='password'  type={!showpassword && "password"}  className='w-[262px] mt-2 mb-2 rounded h-8 text-white pl-3 bg-dark focus:outline-none focus:ring-0 focus:border-blue-500	border-[1px] border-[#8a8a8a] ]'/>
                {showpassword ?
                <IoMdEye onClick={()=>setshowpassword(!showpassword)} className='absolute top-4 right-5  text-white' />
                :
                <RiEyeCloseFill onClick={()=>setshowpassword(!showpassword)}  className='absolute top-4 right-5  text-white' />
                }
                </div>
                {errorinputdata.password &&
                <h2 className='absolute z-10 bg-[#575757] border-[0.25px] text-white rounded-md flex p-1'> <div className='relative'><FaCaretRight className=' left-6 top-[-25px] text-[#575757] text-[40px] rotate-[-90deg] absolute'/></div><BiSolidError className= 'text-[18px] text-[#ffa54c] mt-1 mr-1'  />{errorinputdata.password} </h2>
                }
                <div className='text-center'>
                { loader ?
                   ( <div className='w-[84%] flex justify-center' >
                        <div>
                        <InfinitySpin 
                            visible={true}
                            width="100"
                            color="#4fa94d"
                            aline="center"
                            ariaLabel="infinity-spin-loading"
                            />
                        </div>
                    </div>)
                    :
                    <button onClick={handleclick} className='bg-green-600 mt-6 pt-1 pb-1 text-white w-full rounded-md  items-center'>Sing Up</button>

                }                
                </div>
            </div>
            <div className='bg-[#30363d25] border-[.20px] border-[#ffffff22] overflow-hidden pt-5 pb-4 pr-4 pl-4 rounded-md mt-6'>
                <p className='text-white text-sml'>Dont Have an accunt ? <a onClick={()=>{navigate("/"),console.log("ok")}} href="#" className='text-blue-500'>Sing up</a></p>
            </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Login

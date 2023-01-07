import React, { useEffect, useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { DataHandler } from '../../utils/DataHandler';
import {login} from '../../Api/auth/AuthAPI'
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";


type LoginDataType = {
  username : string,
  password : string
}


const Form = () => {
  const [password, setPassword] =  useState(false)
  const [loading , setLoading] = useState(false)
  const navigate = useNavigate()

  const [cookie, setCookies] = useCookies(['users']);


  const [loginData , setLoginData] = useState<LoginDataType> ({
    username : '',
    password : ''
  })

  const HandleSubmit = async (e : React.FormEvent) => {
    e.preventDefault()
    setLoading(true)  
    const data = await login(loginData.username, loginData.password)
    
    if(data.code == 200) {
      console.log(data)
      setLoading(false)
      setCookies('users', JSON.stringify(data.content))

      if(data.content?.type === "Student"){
      
       navigate('/student/dashboard')
      }
      if(data.content?.type === "Teacher"){
        console.log("asdasdadas")
        navigate('/teacher/dashboard')
      }
      console.log("your are", data.content?.type)
      
    }


     

  }
  const LoginDataHandler = (e : React.ChangeEvent) =>  {
      DataHandler<LoginDataType>(e, setLoginData)
  }
 

  return (
    <div className="bg-white rounded " style={{maxWidth : '1500px'}} >
         <div className='p-10'>
          <h1 className='text-2xl font-semibold mb-5'>Sign in</h1>
          <span className='text-sm text-slate-500'>Please sign in to your account.</span>
          <div className='mt-3'>
            <form onSubmit={HandleSubmit}>
              <div className='flex flex-col gap-2 mb-3'>
                <label htmlFor=""  className='text-sm text-slate-600'>Username</label>
                <input type="text" placeholder='Enter school.username' name='username' className='border rounded-lg p-2 outline-regal-blue outline-1'  onChange={LoginDataHandler} />
              </div>
              <div className='flex flex-col gap-2 mb-3'>
                <label htmlFor="" className='text-sm text-slate-600'>Password</label>
                <div className='relative w-full'>
                  <input type={password ? "text" : "password"} name='password'  placeholder='Enter password' className='border rounded-lg p-2 w-full outline-regal-blue outline-1'  onChange={LoginDataHandler}/>
                  <button type='button' className='text-regal-blue absolute right-2 bottom-0 top-0 text-xl' onClick={() =>{setPassword(prev => !prev)}}> {password ? <AiFillEyeInvisible/>: <AiFillEye/> }</button>
                </div>

              </div>
              <div className="footer-form text-center">
                <button type='submit' className='bg-regal-blue w-full rounded-lg px-2 py-2 text-white font-semi-bold my-2'> 
                     {loading ? "Loading....": 'Sign in'}
                </button>
                <br />
                <a href="" className='text-slate-500 text-sm'>Go back to previous version </a>
              </div>
              
            </form>
          </div>

         </div>
    </div>
  )
}

export default Form
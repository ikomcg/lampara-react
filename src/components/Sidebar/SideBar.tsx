import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

import {MdSpaceDashboard} from 'react-icons/md'
import {SiBookstack} from 'react-icons/si'
import {GrWorkshop} from 'react-icons/gr'

const TeacherLink = [
    {link : '/teacher/dashboard' , name : 'My Dashboard', icon : <MdSpaceDashboard/>},
    {link : '/teacher/subject-management', name : 'Subject Management', icon : <SiBookstack/>},
    {link : '/teacher/class-management', name : 'Class Management', icon : <GrWorkshop/>}
]
const StudentLink = [
    {link : '/student/dashboard' , name : 'My Dashboard'},
    {link : '/student/subject-management', name : 'Subject Management'}
]



const SideBar = () => {

    const getCookie : any = useCookies(['users'])
    const [sideBar, setSideBar] = useState <any[] | null>(null)

    useEffect(() => {
        if(getCookie[0].users.type === "Teacher"){
            setSideBar(TeacherLink)
        }
        else if(getCookie[0].users.type === "Student"){
            setSideBar(StudentLink)
        }
    
    },[getCookie])
    console.log("sadsadsad",sideBar)
   
  return (
    <div className='bg-white h-screen w-full shadow-md' style={{maxWidth : '280px', width : '100%'}}>
        <nav className='p-3'>
            <ul>
               {sideBar && sideBar.map((items,  key) => {
                return (
                    <li  key={key} className=' bg-slate-200 hover:bg-slate-300 mb-2 p-2 text-md border-y border-x border-solid border-slate-400 rounded ' >
                         <Link className='flex flex-row items-center gap-2 text-black w-full' key={key} to={items.link}>
                            <span>{items.icon}</span> 
                                {items.name}
                        </Link>
                    </li>
                )
               })}
            </ul>
        </nav>
    </div>
  )
}

export default SideBar
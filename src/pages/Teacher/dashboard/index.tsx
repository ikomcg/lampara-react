import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Outlet } from 'react-router-dom'

import Header from '../../../components/Header/Header'
import SideBar from '../../../components/Sidebar/SideBar'
import {RxDoubleArrowRight} from 'react-icons/rx'
import { GetSectionAPI } from '../../../Api/teacher/dashboard'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const spanStyle :  any = {
    wordWrap:' break-word',
    whiteSpace:' normal',
    overflow: 'hidden',
    display: '-webkit-box',
    textOverflow:' ellipsis',
    webkitBoxOrient: 'vertical',
    webkitLineClamp: '2'
   
}

const Dashboard = () => {
    const getCookie  = useCookies(['users'])
    const cookies  = getCookie[0].users

    const [sections, setSections] = useState<any[] | null>(null)

    useEffect(() => {
      getSection()
    },[])

    const getSection =async () => {
      const userSection  = await GetSectionAPI( cookies.access_token)
      setSections(userSection)
      console.log("Sections", sections)           
    }
    const getSubjects =(section_id : any )=> {
      const filterSubject = sections?.filter((item : any )=> item.section.id === `${section_id}`).map((items : any)=> {
        return items.curriculum_subject
      })
      return filterSubject
   }
   const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1, 
    arrows: false,
    className: 'notes-slider',
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover:false,
    fade: true
  };

  
    return (
    <div>
        <h1 className='text-lg font-semibold my-5'>My Sections</h1>

        <div className='flex flex-row flex-wrap gap-y-5'>
          {
            sections?.map((items, key) => (
            <div key={key} className='flex w-3/12 '>
              <div className='flex flex-col justify-between bg-white rounded-xl overflow-hidden shadow-md w-95 mx-auto'>
                <div>
                <Slider {...settings} >
                  <div>
                  <img src="/Image/subject-preschool.jpg" alt="" />
                  </div>
                  <div>
                  <img src="/Image/subject2.jpg" alt="" />
                  </div>
                  <div>
                  <img src="/Image/subject3.jpg" alt="" />
                  </div>
                  <div>
                  <img src="/Image/subject4.jpg" alt="" />
                  </div>
                </Slider>
                  <div className='p-5'>
                    <h2 className='font-bold text-xl text-black'>{items.section.name}</h2>
                    <span style={spanStyle} className='text-md text-slate-500'>
                      {getSubjects(items.section.id)?.map((subjects : any)=> {
                          return (
                                subjects.name+"/"
                                )
                      })}
                    </span>
                    
                   
                    <br />
                  </div>
                </div>
                
                  <button className='flex flex-row items-center p-3 justify-center gap-3 text-white text-bold bg-green-500 mt-5 w-full'>
                  <RxDoubleArrowRight/> Goto To {items.section.name}
                  </button>
              </div>
            </div>
            ))
          }

          
          

        </div>
    </div>
  )
}

export default Dashboard
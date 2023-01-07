import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import SideBar from '../Sidebar/SideBar'

const Teacher = () => {
  return (
    <div className='w-full h-full bg-slate-200'>
        <Header/>
        <section className='flex flex-row gap-5'>
          <SideBar/>
          <main className='w-10/12'>
            <Outlet/>
          </main>
        </section>
    </div>
  )
}

export default Teacher
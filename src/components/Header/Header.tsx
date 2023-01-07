import React from 'react'
import { useCookies } from 'react-cookie'

const Header = () => {
  const getCookies : any = useCookies(['users'])
  const user = getCookies[0].users;
  const userName : string  = `${user.last_name}, ${user.first_name}, ${user.middle_name[0]}.`

  return (
    <header className='bg-regal-blue'>
      <div className='flex flex-row justify-between items-center p-5'>
        <div className='flex flex-row items-center gap-2'>
          <div className='bg-slate-300 border-white border-4 rounded-full' style={{maxWidth: '50px' , width: '100%'}}>
            <img src={user.userInfo.picture} alt={user.userInfo.picture} />
          </div>
          <span className='text-white font-bold text-md'>{userName}</span>
        </div>
        <div>
          <button className='text-white font-bold text-md'>Log out</button>
        </div>
      </div>
      
    </header>
  )
}

export default Header
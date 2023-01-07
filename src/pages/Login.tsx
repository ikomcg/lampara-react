import React from 'react'
import Form from './Login/Form'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import '../styles/Login/style.css'

const Login = () => {
  return (
        <div className='bg-regal-blue login-container h-full '>
          <div className="mx-5 flex justify-center gap-32 items-center h-full">
            <LazyLoadImage
              alt='Lampara'
              effect="blur"
              src={'Image/lamparaLogo.png'}
              width= '100%'
            />
            <div className="lampara-form">
              <Form/>
            </div>
          </div>
        </div>
  )
}

export default Login 
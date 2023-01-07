import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'
import Login from './Login'
import './styles/index.css'

const root = document.getElementById('root')
createRoot(root).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>)
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './components/Header/Header'
import Dashboard from './pages/Teacher/dashboard';
import Login from './Login';
import Teacher from './components/Layout/Teacher';
import SubjectManagement from './pages/Teacher/subjectmanagement';


const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element ={<Login/>}/>
        <Route element={<Teacher/>}>
          <Route path='/teacher/dashboard' element={<Dashboard/>} />
          <Route path='/teacher/subject-management' element={<SubjectManagement/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
import { useState } from 'react'
import './App.css'
import HomePage from './Components/Dasboard/HomePage'
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Login from './components/auth/login/login';
import Signup from './components/auth/signup/signup';
import ForgotPassword from './Components/Auth/ForgotPassword/ForgotPassword';
import About from './Components/Dasboard/About/About';
import Contact from './Components/Dasboard/Contact/Contact';
import ActionHistory from './Components/Dasboard/actionhistory/Actionhistory';

function App() {
  const appRouter = createBrowserRouter([
    {
      path:'/',
      element:<HomePage/>
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/signup',
      element:<Signup/>
    },
    {
      path:'/forgot-password',
      element:<ForgotPassword/>
    },
    {
      path:'/about',
      element:<About/>
    },
    {
      path:'/contact',
      element:<Contact/>
    },
    {
      path:'/action-history',
      element:<ActionHistory/>
    }
  ])
  
  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  )
}

export default App

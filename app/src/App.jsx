import { useState } from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import './App.css'
function App() {
  
 
  const router=createBrowserRouter([
   
    
    {
      path:'/',
      element:    <><Dashboard/></>
    },
   
    
  ])
  return (
    <> 
    <RouterProvider router={router} />
   
    </>
  )
}

export default App

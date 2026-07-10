import { Route, Routes } from 'react-router-dom'

import './App.css'
import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword'

function App() {

  return (
    <div className='w-screen min-h-screen bg-[#121212] flex flex-col'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>

        {/* login, signup */}

        <Route path='forgot-password' 
        element={
          // openroute - non logged in users could access
          // <OpenRoute>  
              <ForgotPassword/>
          // </OpenRoute>
        } />

        <Route path='update-password/:id' element={<UpdatePassword/>}/>
      </Routes>
    </div>
  )
}

export default App

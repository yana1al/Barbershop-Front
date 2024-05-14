import './App.css'
import { useState, useEffect } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import { CheckSession } from './services/Auth'
import Home from './components/Home'
import Header from './components/Header'
import DesktopNav from './components/DesktopNav'
import MobileNav from './components/MobileNav'
import Barbers from './components/Barbers'
import Admin from './components/Admin'
import AddBarber from './components/AddBarber'
import Services from './components/Services'
import AddService from './components/AddService'
import AddAppointment from './components/AddAppointment'

function App() {

  const [user, setUser] = useState(null)

  const checkToken = async (token) => {
    const user = await CheckSession(token)
    setUser(user)
  }

  useEffect(() =>{
    const token = localStorage.getItem('token')
    if(token){
        checkToken(token)
      }
  }, [])
  

  return (
    <div>
      <Header />
      <DesktopNav user={user} />
      <MobileNav user={user} />
    
      <main>
        <Routes>
          <Route path='/' element={ <Home />}/>
          <Route path='/barbers' element={ <Barbers />} />
          <Route path='/signin' element={ <Admin setUser={setUser} />} />
          <Route path='/barbers/add' element={ <AddBarber />} />
          <Route path='/services' element={<Services />} />
          <Route path='/services/add' element={<AddService />} />
          <Route path='/appointments/add' element={<AddAppointment />} />
        </Routes>


      </main>
      <footer></footer>
    </div>
  )
}

export default App

import React from 'react'
import Navbar from '../../components/company/Navbar'
import NotificationList from '../../components/company/NotificationList'
import Footer from '../../components/Footer'
import '../../css/other.css'


const Notifications = () => {
  return (
    <div className='site-content'>
        <Navbar/>
        <div className='container'>
        <NotificationList />

        </div>
        <Footer/>
    </div>
  )
}

export default Notifications
import React from 'react'
import Navbar from '../../components/company/Navbar'
import NotificationList from '../../components/company/NotificationList'
import Footer from '../../components/Footer'


const Notifications = () => {
  return (
    <div>
        <Navbar/>
        <div className='container'>
        <NotificationList />

        </div>
        <Footer/>
    </div>
  )
}

export default Notifications
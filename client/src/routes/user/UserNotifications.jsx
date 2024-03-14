import React from 'react'
import Navbar from '../../components/user/Navbar'
import UserNotificationPage from '../../components/user/UserNotificationPage'
import Footer from '../../components/Footer'
import '../../css/other.css'
const UserNotifications = () => {
  return (
    <div className='user-image'>
        <Navbar/>
        <div className='container'>

            <UserNotificationPage/>
        </div>
        <Footer/>
    </div>
  )
}

export default UserNotifications
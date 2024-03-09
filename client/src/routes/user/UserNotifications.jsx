import React from 'react'
import Navbar from '../../components/user/Navbar'
import UserNotificationPage from '../../components/user/UserNotificationPage'
import Footer from '../../components/Footer'

const UserNotifications = () => {
  return (
    <div>
        <Navbar/>
        <div className='container'>

            <UserNotificationPage/>
        </div>
        <Footer/>
    </div>
  )
}

export default UserNotifications
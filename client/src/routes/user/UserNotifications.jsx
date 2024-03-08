import React from 'react'
import Navbar from '../../components/user/Navbar'
import UserNotificationPage from '../../components/user/UserNotificationPage'

const UserNotifications = () => {
  return (
    <div>
        <Navbar/>
        <div className='container'>

            <UserNotificationPage/>
        </div>
    </div>
  )
}

export default UserNotifications
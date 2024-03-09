import React from 'react'
import Navbar from '../../components/company/Navbar'
import EmployeeList from '../../components/company/EmployeeList'
import Footer from '../../components/Footer'


const Employees = () => {
  return (
    <div>
        <Navbar/>
        <div className='container'>
        <EmployeeList/>
        </div>
        <Footer/>
        
    </div>
  )
}

export default Employees
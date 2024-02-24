import React from 'react'
import { Fragment } from 'react'
import Navbar from '../../components/user/Navbar'
import CompanyList from '../../components/user/CompanyList'
import SearchBar from '../../components/user/SearchBar'

const Companies = () => {
  return (
    <div>
        <Navbar/>
        {/* <SearchBar/> */}
        <div className='container'>
        <CompanyList/>
        </div>
    </div>
  )
}

export default Companies
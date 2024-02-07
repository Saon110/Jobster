import React from 'react'
import Header from '../../components/user/Header'
import AddCompany from '../../components/user/AddCompany'
import CompanyList from '../../components/user/CompanyList'

const Home = () => {
  return (
    <div>
        <Header/>
        <AddCompany/>
        <CompanyList/>
    </div>
  )
}

export default Home
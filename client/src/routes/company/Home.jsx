import React from 'react'
import Navbar from '../../components/company/Navbar'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import CompanyFinder from '../../apis/CompanyFinder'


const Home = () => {

  const { id } = useParams()

  const [Name, setName] = useState([])

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const response = await CompanyFinder.get(`/Company/${id}`);
        setName(response.data.data.company.name);
        console.log(response.data.data.company.name);

      } catch (error) {

      }

    };
    fetchData2();
  }, [id])


  return (
    <div>

      <Navbar />
      <h1>
        Welcome to the home page

      </h1>
      <h1>
        <Link to={`/Employer/${id}`}>
          {Name}
        </Link>
      </h1>



    </div>
  )
}

export default Home
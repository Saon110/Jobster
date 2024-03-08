import React from 'react'
import Navbar from '../../components/company/Navbar'
import { Link } from 'react-router-dom'
// import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import CompanyFinder from '../../apis/CompanyFinder'


const Home = () => {

    // const { id } = useParams()

    const [Name, setName] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authToken = localStorage.token;
                console.log(authToken);
                const response = await CompanyFinder.get('/Company', {
                    headers: {
                        authToken: `${authToken}`
                    }
                });
                setName(response.data.data.profile[0].name);
                console.log(response.data.data.profile[0].name);

            } catch (error) {

            }

        };
        fetchData();
    }, [])


    return (
        <div>

            <Navbar />
            <h1>
                Welcome to the home page

            </h1>
            <h1>
                <Link to={`/Employer/profile`}>
                    {Name}
                </Link>
            </h1>



        </div>
    )
}

export default Home
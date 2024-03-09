import React, {useEffect, useState} from 'react'
import CompanyFinder from '../../apis/CompanyFinder'
import {useNavigate} from 'react-router-dom'

const UpdateProfile = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [website, setWebsite] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authToken = localStorage.token
                const response = await CompanyFinder.get('/Employer/profile/', {
                    headers: {
                        authToken: `${authToken}`,
                    },
                })
                console.log(response.data.data.profile[0])
                setName(response.data.data.profile[0].name)
                setAddress(response.data.data.profile[0].address)
                setWebsite(response.data.data.profile[0].website)
                setEmail(response.data.data.profile[0].email)
                setPassword(response.data.data.profile[0].password)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [setName])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const authToken = localStorage.token
            console.log(authToken)
            const updatedprofile = await CompanyFinder.put(
                '/Employer/profile',
                {
                    name,
                    address,
                    website,
                    email,
                    password,
                },
                {
                    headers: {
                        authToken: `${authToken}`,
                    },
                }
            )
            console.log(updatedprofile)
            navigate('/Employer/profile')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <form action="">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="name"
                        className="form-control"
                        type="text"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        id="address"
                        className="form-control"
                        type="text"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contact_no">Contact No</label>
                    <input
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        id="website"
                        className="form-control"
                        type="text"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        className="form-control"
                        type="text"
                    />
                </div>
                <div className='form-group'>
                        <label htmlFor="password">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            className="form-control"
                            type="password"
                        />
                </div>
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn btn-primary"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default UpdateProfile
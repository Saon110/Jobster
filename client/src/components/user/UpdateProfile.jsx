import React from 'react'
import { useState, useEffect } from 'react';
import CompanyFinder from '../../apis/CompanyFinder';
import { useNavigate } from 'react-router-dom';


const UpdateProfile = () => 

{
   const navigate = useNavigate ();
   const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const[contact_no,setContact_no] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.token;
                const response = await CompanyFinder.get("/User/Myprofile/", {
                    headers: {
                        authToken: `${authToken}`,
                    },
                });
                console.log (response.data.data.profile[0]);
                setName(response.data.data.profile[0].name);
                setAddress(response.data.data.profile[0].address);
                setContact_no(response.data.data.profile[0].contact_no);
                setEmail(response.data.data.profile[0].email);
        
        
      } catch (error) {
        console.log (error);
        
      }
    }
    fetchData();
  }, [setName])

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const authToken = localStorage.token;
      console.log (authToken);
      const updatedprofile = await CompanyFinder.put(
        "/User/MyProfile/Update",
        {  name,
          contact_no,
          email,
          address,
        },
        {
           headers : {
            authToken: `${authToken}`, 
          }
        } 
        
      );
  
      // console.log(updatedprofile);
    } catch (error) {
      console.log(error);
    }


    navigate  ('/User/Myprofile');



  };
  


   
  return (
<div  className='container'>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input value={name} onChange={e => setName(e.target.value)} id="name" className="form-control" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="address">contact no</label>
          <input value={contact_no} onChange={e => setContact_no(e.target.value)} id="contact_no" className="form-control" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} id="email" className="form-control" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="">address</label>
          <input value={address} onChange={e => setAddress(e.target.value)} id="address" className="form-control" type="text" />
        </div>
       
        <button onClick ={(e) => handleSubmit(e)} type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>  )
}

export default UpdateProfile 
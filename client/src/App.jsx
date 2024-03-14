import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/user/Home';
import CompanyDetails from './routes/user/CompanyDetails';
//import CompanyUpdate from './components/CompanyUpdate';
import { CompanyContextProvider } from './context/CompanyContext';
import UpdatePage from './routes/user/UpdatePage';
import Login from './routes/Login';

import CompanyLogin from './routes/company/CompanyLogin';
import Companies from './routes/user/Companies';
import Jobs from './routes/user/Jobs';
import Myprofile from './routes/user/Myprofile';
import UpdateProfile from './routes/user/ProfileUpdate';
// import SearchBar from './components/user/SearchBar';
import AddCompany from './components/user/AddCompany';
import UpdateSkills from './routes/user/SkillUpdate';
import MyApplications from './routes/user/MyApplications' ;
import Interviews from './routes/user/Interviews';
import Job_history from './routes/user/Job_history';
import UserNotifications from './routes/user/UserNotifications';

import AddJob from './routes/company/AddJob';
import Applications from './routes/company/ApplicationList';
import Application from './routes/company/Application';
import Employees from './routes/company/Employees';
import CompanyHome from './routes/company/Home';
import Job from './routes/company/Jobs';
import InterviewList from './routes/company/Interviews';
import NotificationList from './routes/company/Notifications';
import CompanyProfile from './routes/company/Profile';
import CompanyUpdateprofile from './routes/company/ProfileUpdate';
import CompnayJobDetails from './routes/company/JobDetails';
import JobUpdate from './routes/company/UpdateJob';




const App = () => {
  return (

    <CompanyContextProvider>

    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/company/:companyId" element={<CompanyDetails/>} />
                <Route path="/company/:companyId/update" element={<UpdatePage/>} />
                <Route path ="/User/home" element = {<Home/> } />
                <Route path ="/User/Companies" element = {<Companies/> } />
                <Route path ="/User/Jobs" element = {<Jobs/> } />
                <Route path ="/User/Applications" element = {<MyApplications/> } />
                <Route path ="/User/Interview" element = {<Interviews/> } />
                <Route path ="/User/JobHistory" element = {<Job_history/> } />
                <Route path ="/User/Notifications" element = {<UserNotifications />} />


                <Route path = "/User/Myprofile"element = {<Myprofile/>} />
                <Route path = "/User/Myprofile/Update" element = {<UpdateProfile/> } />
                <Route path = "/User/Myprofile/UpdateSkills" element = {<UpdateSkills/>} />

                <Route path ="/dummy" element = {<AddCompany/>} />

                <Route path ="/CompanyLogin" element = {<CompanyLogin/>} />
                <Route path ="/Employer/addjob" element = {<AddJob/>} />
                <Route path ="/Employer/applications" element = {<Applications/>} />
                <Route path ="/Employer/applications/:id" element = {<Application/>} />
                <Route path ="/Employer/employees" element = {<Employees/>} />
                <Route path ="/Employer/jobs" element = {<Job/>} />
                <Route path ="/Employer/home" element = {<CompanyHome/>} />
                <Route path ="/Employer/interviews" element = {<InterviewList/>} />
                <Route path ="/Employer/notifications" element = {<NotificationList/>} />
                <Route path ="/Employer/profile" element = {<CompanyProfile/>} />
                <Route path ="/Employer/profile/update" element = {<CompanyUpdateprofile/>} />
                <Route path ="/Employer/jobs/:id" element = {<CompnayJobDetails/>} />
                <Route path ="/Employer/jobs/:id/update" element = {<JobUpdate/>} />
            </Routes>
        </BrowserRouter>
    </div>

    </CompanyContextProvider>
  );
};

export default App;


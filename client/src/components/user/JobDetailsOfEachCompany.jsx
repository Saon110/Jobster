import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CompanyFinder from '../../apis/CompanyFinder';
import Modal from 'react-modal';
import SearchBar from './SearchBar'; // Import the SearchBar component
import '../../css/jobdetails.css'; // Import the CSS file

Modal.setAppElement('#root');

const JobDetailsOfEachCompany = () => {
  const { companyId } = useParams();
  const [jobs, setJobs] = useState([]);
  const [companyName, setName] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [skills, setSkills] = useState([]);
  const [originalList, setOriginalList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CompanyFinder.get(`User/Company/${companyId}/jobs`);
        setJobs(response.data.data.jobs);
        setOriginalList(response.data.data.jobs);
        setName(response.data.data.jobs[0].company_name);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchData();
  }, [companyId]);

  const handleApply = async (jobId) => {

    try {
      const authToken = localStorage.token ;
//console.log (authToken);
     console.log ("hello");
      const response = await CompanyFinder.get (`/User/Jobs/${jobId}/Apply` , {
       headers: {
         authToken: `${authToken}`,
          },
      });
      console.log (response);
      if (response.data.status.success === true)
      {
       console.log(`Applying for job with ID: ${jobId}`);
      alert(`Application submitted! ${jobId}`);

      }
      else 
      {
      // console.log(response.notice_text);
       alert (response.data.status.notice_text);


      }
    } catch (error) {
     console.log (error);
     
    }
   
 };
  const handleViewRequirements = (job) => {
    setCurrentJob(job);
    setIsOpen(true);
  };

  const closeModal = () => {
    setCurrentJob(null);
    setSkills([]);
    setIsOpen(false);
  };

  const handleSearch = async (selectedOption, searchText) => {
    console.log(selectedOption + " " + searchText);

    if (selectedOption === 'All') {
      setJobs(originalList);
    } else {
      try {
        console.log("dlskfaj;" );
        const response = await CompanyFinder.get(`/User/Company/${companyId}/jobs/Search`, {
          headers: {
            type: `${selectedOption}`,
            value: `${searchText}`
          }
        });
        console.log("dlskfaj;" );
        setJobs(response.data.data.jobs);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    const fetchSkills = async () => {
      if (currentJob) {
        try {
          const response = await CompanyFinder.get(`/User/Jobs/${currentJob.job_id}/skill`);
          setSkills(response.data.data.skills);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchSkills();
  }, [currentJob]);

  return (
    <div>
      <h2 style={{ color: '#fff' }}>Job Details of: {companyName}</h2>
      {/* Integrate the SearchBar component */}
      <SearchBar  options={[
                  { value: 'All', label: 'All' },
                  { value: 'Name', label: 'By Name' },
                  { value: 'Skill', label: 'By Skill' },
          // Add more options as needed
        ]} onSearch={handleSearch} />

      {jobs.map((job, index) => (
        <div key={index} className="job-details-box">
          <div className="job-info">
            <h3>{job.name}</h3>
            <p>
              <strong>Salary:</strong> {job.salary}
            </p>
            <p>
              <strong>Description:</strong> {job.description}
            </p>
            <p>
              <strong>Status:</strong> {job.status}
            </p>
          </div>
          <div className="job-details-buttons">
            <button onClick={() => handleViewRequirements(job)} className="view-requirements-button">
              View Requirements
            </button>
            <button onClick={() => handleApply(job.job_id)} className="apply-button">
              Apply
            </button>
          </div>
        </div>
      ))}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Job Requirements"
        style={{
          content: {
            width: '50%',
            height: '50%',
            margin: 'auto',
            borderRadius: '5px',
            overflow: 'auto',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <div className="job-details-box">
          <div className="job-details-content">
          <h2
              style={{
                color: '#fff',
                fontWeight: 'bold',
                marginBottom: '10px',
                background: '#3498db', // Background color for the h2 element
                padding: '10px', // Optional padding for better appearance
                borderRadius: '5px', // Optional border-radius for rounded corners
              }}
            >
              Skill Requirements
            </h2>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <h3>{skill.name}</h3>
                  <p>{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="job-details-buttons">
            <button onClick={closeModal} className="apply-button float-end">
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default JobDetailsOfEachCompany;

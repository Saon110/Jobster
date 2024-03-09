// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import CompanyFinder from '../../apis/CompanyFinder';
import Modal from 'react-modal';
import '../../css/jobdetails.css';
import SearchBar from './SearchBar'; // Import the SearchBar component
import { ToastContainer, toast } from 'react-toastify'; // Import the ToastContainer and toast from react-toastify
import 'react-toastify/dist/ReactToastify.css';
// Import the CSS file

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const JobDetails = () => {
  // State variables
  const [jobs, setJobs] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [skills, setSkills] = useState([]);
  const [originalList, setOriginalList] = useState([]);
// Add filteredJobs state
 
  // Fetch jobs on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CompanyFinder.get('/User/Jobs');
        setJobs(response.data.data.jobs);
        setOriginalList(response.data.data.jobs);

      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setJobs]);

  // Fetch skills for the selected job
  useEffect(() => {
    const fetchSkills = async () => {
      if (currentJob) {
        try {
          const response = await CompanyFinder.get(`/User/Jobs/${currentJob.job_id}/skill`);
          setSkills(response.data.data.skills);
          console.log(response.data.data.skills);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchSkills();
  }, [currentJob]);

  // Apply logic
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

  // View requirements logic
  const handleViewRequirements = (job) => {
    setCurrentJob(job);
    setIsOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setCurrentJob(null);
    setSkills([]);
    setIsOpen(false);
  };

  // Search function
  const handleSearch = async (selectedOption, searchText,minSalary,maxSalary) => {
    console.log (minSalary+ " " + maxSalary);
    console.log(selectedOption + " " + searchText);

    if (selectedOption === 'All') {
      setJobs(originalList);
    }
    else if (selectedOption === "Salary")
    {
      try {
        const response = await CompanyFinder.get('/User/Jobs/SearchBySalary', {
          headers: {
            minSalary: minSalary, // Include minSalary in the headers
            maxSalary: maxSalary, // Include maxSalary in the headers
          },
        });

        setJobs(response.data.data.jobs);

        
      } catch (error) {
        console.log (error);
        
      }
    } 
    else {
      try {
        const response = await CompanyFinder.get("/User/Jobs/Search", {
          headers: {
            type: `${selectedOption}`,
            value: `${searchText}`
          }
        });
        setJobs(response.data.data.jobs);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <SearchBar options={[
          { value: 'All', label: 'All' },
          { value: 'Name', label: 'By Name' },
          { value: 'Skill', label: 'By Skill' },
          { value: 'Company', label: 'By Company'},
          { value : 'Salary' , label: 'By Salary Range'}
          // Add more options as needed
        ]} onSearch={handleSearch} />

      {jobs.map((job, index) => (
        <div key={index} className="job-details-box">
          <div className="job-details-content">
            <h3>{job.name}</h3>
            <p>
              <strong>Salary:</strong> {job.salary}
            </p>
            <p>
              <strong>Description:</strong> {job.description}
            </p>
            <p>
              <strong>Company:</strong> {job.company_name}
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

      {/* Modal component */}
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
            <button onClick={closeModal} className="apply-button float-right">
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default JobDetails;

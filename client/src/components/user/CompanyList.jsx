import React, { useContext, useEffect, useState } from 'react';
import { CompanyContext } from '../../context/CompanyContext';
import CompanyFinder from '../../apis/CompanyFinder';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../../css/all.css';
import SearchBar from './SearchBar';

const CompanyList = (props) => {
  const { company, setCompany } = useContext(CompanyContext);
  const navigate = useNavigate();
  const [originalList, setOriginalList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CompanyFinder.get("/User/Company");
        setCompany(response.data.data.companies);
        setOriginalList(response.data.data.companies);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [setCompany]);

  const handleSearch = async (selectedOption, searchText) => {
    console.log(selectedOption + " " + searchText);

    if (selectedOption === 'All') {
      setCompany(originalList);
    } else {
      try {
        const response = await CompanyFinder.get("/User/Company/Search", {
          headers: {
            type: `${selectedOption}`,
            value: `${searchText}`
          }
        });
        setCompany(response.data.data.companies);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <h2 style={{ color: '#000' }}>Company list </h2>
      <SearchBar
        options={[
          { value: 'All', label: 'All' },
          { value: 'Name', label: 'By Name' },
          { value: 'Address', label: 'By Address' },
          // Add more options as needed
        ]}
        onSearch={handleSearch}
      />

      <div className="company-list">
        {company.map((comp, index) => (
          <div key={index} className="smart-box">
            <h3>
              <Link to={`/company/${comp.company_id}`}>{comp.name}</Link>
            </h3>
            <p>
              <strong>Address:</strong> {comp.address}
            </p>
            <p>
              <strong>Website:</strong> {comp.website}
            </p>
            <p>
              <strong>Email:</strong> {comp.email}
            </p>
            <p>
              <strong>Total Jobs:</strong> {comp.total_jobs}
            </p>
            <p>
              <strong>Total Employees:</strong> {comp.total_employees}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyList;

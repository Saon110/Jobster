import React, { useState, useEffect } from 'react';
import CompanyFinder from '../../apis/CompanyFinder';
import { useNavigate } from 'react-router-dom';
import '../../css/applicationdetails.css'; // Import the CSS file

const UserNotificationPage = () => {
  // State variables
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  // Fetch notifications on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.token;
        console.log(authToken);
        const response = await CompanyFinder.get('/User/MyProfile/Notifications', {
          headers: {
            authToken: `${authToken}`,
          },
        });

        console.log (response.data.data.notifications);
        setNotifications(response.data.data.notifications);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setNotifications]);

  return (
    <div>
      {notifications.map((notification, index) => (
        <div key={index} className="application-details-box">
          <div className="application-details-content">
            <p>
              <strong>Notification Content:</strong> {notification.content}
            </p>
            <p>
              <strong>Job Name:</strong> {notification.job_name}
            </p>
            <p>
              <strong>Company Name:</strong> {notification.company_name}
            </p>
            <p>
              <strong> Status :</strong> {notification.status}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserNotificationPage;

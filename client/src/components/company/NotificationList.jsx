import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CompanyFinder from "../../apis/CompanyFinder";
import "../../css/all.css"; // Import CSS for styling

const NotificationList = () => {
    const { id } = useParams();
    const [notifications, setNotifications] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authToken = localStorage.token;

                const response = await CompanyFinder.get(`/Employer/notifications`, {
                    headers: {
                        authToken: `${authToken}`,
                    },
                });

                setNotifications(response.data.data.notifications);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchName = async () => {
            try {
                const authToken = localStorage.token;
                const profileResponse = await CompanyFinder.get("/Employer/profile", {
                    headers: {
                        authToken: `${authToken}`,
                    },
                });
                setName(profileResponse.data.data.profile[0].name);
            } catch (error) {
                console.log(error);
            }
        };
        fetchName();
    }, []);


    const markAsRead = async (notificationId) => {
        try {
            const authToken = localStorage.token;

            await CompanyFinder.put(`/Employer/${notificationId}/markAsRead`, null, {
                headers: {
                    authToken: `${authToken}`,
                },
            });

            // After marking as read, update the state to reflect the change
            setNotifications(prevNotifications => prevNotifications.map(notification => {
                if (notification.notification_id === notificationId) {
                    return { ...notification, status: 'Read' };
                }
                return notification;
            }));
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    return (
        <div className="grid-container">
            <h1>{name}</h1>
            {notifications && notifications.map((notification) => (
                <div key={notification.notification_id} className="grid-item">
                    <p><strong>Notification:</strong> {notification.content}</p>
                    <p><strong>Status:</strong> {notification.status}</p>
                    <p><strong>Date:</strong> {notification.timestamp}</p>
                    {notification.status === 'Unread' && ( // Show button only if status is Unread
                        <button className="btn-mark-as-read" onClick={() => markAsRead(notification.notification_id)}>
                            Mark as Read
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default NotificationList;

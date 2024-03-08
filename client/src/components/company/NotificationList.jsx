import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CompanyFinder from "../../apis/CompanyFinder";

const NotificationList = () => {
    const { id } = useParams();
    const [notifications, setNotifications] = useState([]);

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
        <div>
            <h1>Notifications</h1>
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Notification</th>
                        <th scope="col">Status</th>
                        <th scope="col">Date</th>
                        <th scope="col">Actions</th> {/* Added column for actions */}
                    </tr>
                </thead>
                <tbody>
                    {notifications && notifications.map((notification) => {
                        return (
                            <tr key={notification.notification_id}>
                                <td>{notification.content}</td>
                                <td>{notification.status}</td>
                                <td>{notification.timestamp}</td>
                                <td>
                                    {notification.status === 'Unread' && ( // Show button only if status is Unread
                                        <button onClick={() => markAsRead(notification.notification_id)}>
                                            Mark as Read
                                        </button>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default NotificationList;

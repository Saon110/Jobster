const Router = require('express').Router();
const { getNotifications, markAsRead } = require('../../controller/company/Notification');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../../middlewares/company/companyAuthorization');
Router.use(cookieParser());

// get all the notifications of a company

Router.get('/notifications', authenticateToken, async (req, res) => {
    if (req.user) {
        const company_id = req.user.company_id;
        try {
            const results = await getNotifications(company_id);
            res.status(200).json({
                status: "success",
                data: {
                    notifications: results.rows
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}
);

// mark a notification as read

Router.post('/notifications/:id/markAsRead', authenticateToken, async (req, res) => {
    if (req.user) {
        try {
            const results = await markAsRead(req.params.id);
            res.status(200).json({
                status: "success",
                data: {
                    notification: results.rows
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}
);


module.exports = Router;

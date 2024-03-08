const Router = require('express').Router();
const { getInterviews, acceptInterview, rejectInterview } = require('../../controller/company/Interview');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../../middlewares/company/companyAuthorization');
Router.use(cookieParser());

Router.get('/interviews', authenticateToken, async (req, res) => {
    if (req.user) {
        const company_id = req.user.company_id;
        console.log(company_id);
        try {
            const results = await getInterviews(req,company_id);
            res.status(200).json({
                status: "success",
                data: {
                    interviews: results.rows
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
});

// accept an interview

Router.post('/interviews/:id/accept', authenticateToken, async (req, res) => {
    if (req.user) {
        const company_id = req.user.company_id;
        try {
            const results = await acceptInterview(req.params.id, company_id);
            res.status(200).json({
                status: "success",
                data: {
                    interview: results.rows
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}
);

// reject an interview

Router.post('/interviews/:id/reject', authenticateToken, async (req, res) => {
    if (req.user) {
        const company_id = req.user.company_id;
        try {
            const results = await rejectInterview(req.params.id, company_id);
            res.status(200).json({
                status: "success",
                data: {
                    interview: results.rows
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}
);

module.exports = Router;
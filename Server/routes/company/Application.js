const Router = require('express').Router();
const { getApplications, getJobApplications, getApplication, approveApplication ,rejectApplication,checkEligible} = require('../../controller/company/Application');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../../middlewares/company/companyAuthorization');
Router.use(cookieParser());

Router.get('/applications', authenticateToken, async (req, res) => {
    if (req.user) {
        const company_id = req.user.company_id;
        console.log(company_id);
        try {
            const results = await getApplications(req,company_id);
            res.status(200).json({
                status: "success",
                data: {
                    applications: results.rows
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
});

// get an appllication details of a company

Router.get('/applications/:id', authenticateToken, async (req, res) => {
    if (req.user) {
        const company_id = req.user.company_id;
        try {
            const results = await getApplication(req, company_id);
            res.status(200).json({
                status: "success",
                data: {
                    application: results.rows
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
});

//check if the applicant is eligible for the job

// Router.get('/applications/isEligible', authenticateToken, async (req, res) => {
//     if (req.user) {
//         // const company_id = req.user.company_id;
//         try {
//             const results = await checkEligible(req.query.job_id, req.query.applicant_id, req);
//             res.status(200).json({
//                 status: "success",
//                 data: {
//                     isEligible: results.rows
//                 }
//             });
//         } catch (error) {
//             console.log(error);
//         }
//     }
// });


// accept an application of a company

Router.put('/applications/:id/accept', authenticateToken, async (req, res) => {
    if (req.user) {
        const company_id = req.user.company_id;
        console.log("company id is:")
        console.log(company_id);
        try {
            const results = await approveApplication(req.params.id, company_id);
            res.status(200).json({
                status: "success",
                data: {
                    application: results.rows
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
});

// reject an application of a company

Router.put('/applications/:id/reject', authenticateToken, async (req, res) => {
    if (req.user) {
        const company_id = req.user.company_id;
        try {
            const results = await rejectApplication(req.params.id, company_id);
            res.status(200).json({
                status: "success",
                data: {
                    application: results.rows
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
});

// check if the applicant is eligible for the job

Router.get('/applications/:id/isEligible', authenticateToken, async (req, res) => {
    console.log('inside isEligible route');
    console.log(req.params);
    console.log(req.headers);
    if (req.user) {
        try {
            const results = await checkEligible(req.params.id, req.headers.mingpa);
            console.log(results);
            res.status(200).json({
                status: "success",
                data: {
                    isEligible: results
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
});

module.exports = Router;
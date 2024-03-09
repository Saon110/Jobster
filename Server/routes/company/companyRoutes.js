const Router = require('express').Router();
const { getJobs, getEmployees, getJob, getEmployee, addJob, getProfileDetails, updateProfile, fireEmployee, getEmployeesByName, getEmployeesBySalary, getJobsByName, getJobsBySalary,updateJob } = require('../../controller/company/companyController');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


const { authenticateToken } = require('../../middlewares/company/companyAuthorization');
Router.use(cookieParser());

Router.get('/jobs', authenticateToken, async (req, res) => {
    console.log("hello hi");
    if (req.user) {
        const company_id = req.user.company_id;
        try {
            const results = await getJobs(company_id);//
            res.status(200).json({
                status: "success",
                data: {
                    jobs: results.rows
                }

            });

        } catch (error) {
            console.log(error);

        }
    }


});

Router.get('/employees', authenticateToken, async (req, res) => {
    console.log("hello hi");
    if (req.user) {
        const company_id = req.user.company_id;
        try {
            const results = await getEmployees(company_id);//
            res.status(200).json({
                status: "success",
                data: {
                    employees: results.rows
                }

            });

        } catch (error) {
            console.log(error);

        }
    }
    else {
        console.log("not authorized");
    }


});

// search jobs

Router.get('/jobs/Search', authenticateToken, async (req, res) => {
    console.log("hello");
    if (req.user) {
        const company_id = req.user.company_id;
        const value = req.headers.value;
        console.log(req.headers.value);
        let results;
        try {
            if (req.headers.type === 'Name') {
                results = await getJobsByName(req.headers.value, company_id);//

            }
            if (req.headers.type === 'Salary Range') {
                results = await getJobsBySalary(req.headers.value, company_id);//
            }

            res.status(200).json({
                status: "success",
                data: {
                    jobs: results.rows
                }

            });

        } catch (error) {
            console.log(error);

        }
    }
});


// get a single job of a company

Router.get('/jobs/:id',authenticateToken, async (req, res) => {
    if (req.user) {
        const company_id = req.user.company_id;
        try {
            const results = await getJob(req.params.id, company_id);//
            res.status(200).json({
                status: "success",
                data: {
                    job: results.rows
                }

            });

        } catch (error) {
            console.log(error);

        }
    }
    else {
        console.log("not authorized");
    }

});

//update a job of a company

Router.put('/jobs/:id', authenticateToken, async (req, res) => {
    console.log("hello");
    if (req.user) {
        const company_id = req.user.company_id;
        try {
            const results = await updateJob(req, company_id);//
            res.status(200).json({
                status: "success",
                data: {
                    job: results.rows
                }
                
            });

        } catch (error) {
            console.log(error);

        }
    }

});




Router.get('/:id/employees/:id', async (req, res) => {
    try {
        const results = await getEmployee(req);//
        res.status(200).json({
            status: "success",
            data: {
                employee: results.rows
            }

        });

    } catch (error) {
        console.log(error);

    }

});

// add a job

Router.post('/addjob', authenticateToken, async (req, res) => {
    console.log("hello");
    if (req.user) {
        const company_id = req.user.company_id;
        try {
            const results = await addJob(req, company_id);//
            res.status(200).json({
                status: "success",
                data: {
                    job: results.rows
                }

            });

        } catch (error) {
            console.log(error);

        }
    }


});

// fire an employee

Router.delete('/employees/:id', authenticateToken, async (req, res) => {
    console.log("hello");
    if (req.user) {
        const company_id = req.user.company_id;

        try {
            const results = await fireEmployee(req.params.id);//
            res.status(200).json({
                status: "success",
                data: {
                    employee: results.rows
                }

            });

        } catch (error) {
            console.log(error);

        }
    }

});


// get profile details

Router.get('/profile', authenticateToken, async (req, res) => {
    console.log("hello");
    if (req.user) {
        const company_id = req.user.company_id;
        try {
            const results = await getProfileDetails(company_id);//
            res.status(200).json({
                status: "success",
                data: {
                    profile: results.rows
                }

            });

        } catch (error) {
            console.log(error);

        }
    }

});

// update profile details

Router.put('/profile', authenticateToken, async (req, res) => {
    console.log("hello");
    if (req.user) {
        const company_id = req.user.company_id;
        try {
            const results = await updateProfile(req, company_id);//
            res.status(200).json({
                status: "success",
                data: {
                    profile: results.rows
                }

            });

        } catch (error) {
            console.log(error);

        }
    }

});

// search employees

Router.get('/employees/Search', authenticateToken, async (req, res) => {
    console.log("hello");
    if (req.user) {
        const company_id = req.user.company_id;
        const value = req.headers.value;
        console.log(req.headers.value);
        let results;
        try {
            if (req.headers.type === 'Name') {
                results = await getEmployeesByName(req.headers.value, company_id);//

            }
            if (req.headers.type === 'Salary Range') {
                results = await getEmployeesBySalary(req.headers.value, company_id);//
            }

            res.status(200).json({
                status: "success",
                data: {
                    employees: results.rows
                }

            });

        } catch (error) {
            console.log(error);

        }
    }


});




// check eligibility

// Router.post('/checkeligible', async (req, res) => {
//     try {
//         console.log ("hello ");
//         const results = await checkEligible(req);//
//         res.status(200).json({
//             status: "success",
//             data: {
//                 isEligible: results.rows[0]
//             }

//         });

//     } catch (error) {
//         console.log(error);

//     }

// }

// );

module.exports = Router;
const Router = require('express').Router();
const { getJobs, getEmployees, getJob, getEmployee, addJob, getProfileDetails,updateProfile , fireEmployee} = require('../../controller/company/companyController');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


const { authenticateToken } = require('../../middlewares/company/companyAuthorization');
Router.use(cookieParser());

Router.get('/jobs', authenticateToken ,async (req, res) => {
    console.log("hello hi");
    if(req.user) {
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

Router.get('/employees', authenticateToken,async (req, res) => {
    console.log("hello hi");
    if(req.user) {
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
    else 
    {
        console.log ("not authorized");
    }
    

});

Router.get('/:id/jobs/:id', async (req, res) => {
    try {
        const results = await getJob(req);//
        res.status(200).json({
            status: "success",
            data: {
                job: results.rows
            }

        });

    } catch (error) {
        console.log(error);

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

Router.post('/addjob',authenticateToken, async (req, res) => {
    console.log("hello");
    if(req.user) {
        const company_id = req.user.company_id;
        try {
            const results = await addJob(req,company_id);//
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

Router.delete('/employees/:id',authenticateToken, async (req, res) => {
    console.log("hello");
    if(req.user) {
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
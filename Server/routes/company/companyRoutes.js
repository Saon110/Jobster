const Router = require('express').Router();
const { getJobs, getEmployees, getJob, getEmployee, addJob, checkEligible } = require('../../controller/company/companyController');


Router.get('/:id/jobs', async (req, res) => {
    try {
        const results = await getJobs(req);//
        res.status(200).json({
            status: "success",
            data: {
                jobs: results.rows
            }

        });

    } catch (error) {
        console.log(error);

    }

});

Router.get('/:id/employees', async (req, res) => {
    try {
        const results = await getEmployees(req);//
        res.status(200).json({
            status: "success",
            data: {
                employees: results.rows
            }

        });

    } catch (error) {
        console.log(error);

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

Router.post('/:id/addjob', async (req, res) => {
    try {
        const results = await addJob(req);//
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


// check eligibility

Router.post('/checkeligible', async (req, res) => {
    try {
        console.log ("hello ");
        const results = await checkEligible(req);//
        res.status(200).json({
            status: "success",
            data: {
                isEligible: results.rows[0]
            }

        });

    } catch (error) {
        console.log(error);

    }

}

);

module.exports = Router;
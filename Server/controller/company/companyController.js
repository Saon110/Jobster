const db = require('../../db/index');


// Get all jobs of a company
const getJobs = async (obj) => {
    try {
        const results = await db.query("SELECT * FROM jobs WHERE company_id = $1", [obj.params.id]);
        console.log(results);
        return results;
    } catch (error) {
        console.log(error);
    }
}

// get all employees of a company

const getEmployees = async (obj) => {
    try {
        const results = await db.query("SELECT e.employee_id, u.name AS employee_name, u.email AS employee_email, e.hire_date, e.commission_pct FROM employee e JOIN users u ON e.user_id = u.user_id JOIN company c ON e.job_id = c.company_id WHERE c.company_id = $1", [obj.params.id]);
        console.log(results);
        return results;
    } catch (error) {
        console.log(error);
    }
}

// get a job of a company

const getJob = async (obj) => {
    try {
        const results = await db.query("SELECT * FROM jobs WHERE job_id = $1", [obj.params.id]);
        console.log(results);
        return results;
    } catch (error) {
        console.log(error);
    }
}

// get an employee of a company

const getEmployee = async (obj) => {
    try {
        const results = await db.query("SELECT e.employee_id, u.name AS employee_name, u.email AS employee_email, e.hire_date, e.commission_pct FROM employee e JOIN users u ON e.user_id = u.user_id WHERE e.employee_id = $1", [obj.params.id]);
        console.log(results);
        return results;
    } catch (error) {
        console.log(error);
    }
}

// add a job to a company

const addJob = async (obj) => {
    try {
        const results = await db.query("SELECT * FROM insert_job($1, $2, $3, $4, $5)", [obj.body.name, obj.body.salary, obj.body.description, obj.body.status, obj.params.id]);
        console.log(results);
        return results;
    }
    catch (error) {
        console.log(error);
    }
}

// check if an applicant is eligible via calling the function check eligible

const checkEligible = async (obj) => {
    try {
        const results = await db.query("SELECT * FROM check_eligible($1, $2, $3)", [obj.body.user_id, obj.body.job_id, obj.body.gpa]);
        console.log(results);
        return results;
    }
    catch (error) {
        console.log(error);
    }
}





module.exports = { getJobs, getEmployees, getJob, getEmployee, addJob , checkEligible};

// const query = 'SELECT * FROM insert_job($1, $2, $3, $4, $5)';
//     const values = ['Software Engineer', 90000, 'Developing software applications', 1, 1];
//     const result = await client.query(query, values);


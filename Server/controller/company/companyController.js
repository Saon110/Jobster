const db = require ('../../db/index');


// Get all jobs of a company
const getJobs = async (obj) =>
{
    try {
        const results = await db.query("SELECT * FROM jobs WHERE company_id = $1", [obj.params.id]);
        console.log(results);
        return results;
    } catch (error) {
        console.log (error);
    }
}

// get all employees of a company

const getEmployees = async (obj) =>
{
    try {
        const results = await db.query("SELECT e.employee_id, u.name AS employee_name, u.email AS employee_email, e.hire_date, e.commission_pct FROM employee e JOIN users u ON e.user_id = u.user_id JOIN company c ON e.job_id = c.company_id WHERE c.company_id = $1", [obj.params.id]);
        console.log(results);
        return results;
    } catch (error) {
        console.log (error);
    }
}

// get a job of a company

const getJob = async (obj) =>
{
    try {
        const results = await db.query("SELECT * FROM jobs WHERE job_id = $1", [obj.params.id]);
        console.log(results);
        return results;
    } catch (error) {
        console.log (error);
    }
}

// get an employee of a company

const getEmployee = async (obj) =>
{
    try {
        const results = await db.query("SELECT e.employee_id, u.name AS employee_name, u.email AS employee_email, e.hire_date, e.commission_pct FROM employee e JOIN users u ON e.user_id = u.user_id WHERE e.employee_id = $1", [obj.params.id]);
        console.log(results);
        return results;
    } catch (error) {
        console.log (error);
    }
}

module.exports = {getJobs,getEmployees,getJob,getEmployee} ;


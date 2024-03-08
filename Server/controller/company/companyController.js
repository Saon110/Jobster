const db = require('../../db/index');


// Get all jobs of a company
const getJobs = async (company_id) => {
    try {
        const query = `
        SELECT * FROM jobs WHERE company_id = $1;`;
        // const results = await db.query("SELECT * FROM jobs WHERE company_id = $1", [obj.params.id]);
        const results = await db.query(query, [company_id]);
        console.log(results);
        return results;
    } catch (error) {
        console.log(error);
    }
}

// get all employees of a company

const getEmployees = async (company_id) => {
    try {
        const results = await db.query("SELECT e.employee_id, u.name AS employee_name, u.email AS employee_email, e.hire_date, e.commission_pct FROM employee e JOIN users u ON e.user_id = u.user_id JOIN company c ON e.job_id = c.company_id WHERE c.company_id = $1", [company_id]);
        console.log(results);
        return results;
    } catch (error) {
        console.log(error);
    }
}

// get a job of a company

const getJob = async (obj) => {
    try {
        const results = await db.query("SELECT * FROM jobs WHERE job_id = $1", [`%${obj}%`]);
        console.log(results);
        return results;
    } catch (error) {
        console.log(error);
    }
}

// get an employee of a company

const getEmployee = async (obj) => {
    try {
        const results = await db.query("SELECT e.employee_id, u.name AS employee_name, u.email AS employee_email, e.hire_date, e.commission_pct FROM employee e JOIN users u ON e.user_id = u.user_id WHERE e.employee_id = $1", [`%${obj}%`]);
        console.log(results);
        return results;
    } catch (error) {
        console.log(error);
    }
}

// add a job to a company

const addJob = async (obj,company_id) => {
    try {
        const results = await db.query("SELECT * FROM insert_job($1, $2, $3, $4, $5)", [obj.body.name, obj.body.salary, obj.body.description, obj.body.status, company_id]);
        console.log(results);
        return results;
    }
    catch (error) {
        console.log(error);
    }
}

// check if an applicant is eligible via calling the function check eligible

// const checkEligible = async (obj) => {
//     try {
//         const results = await db.query("SELECT * FROM check_eligible($1, $2, $3)", [obj.body.user_id, obj.body.job_id, obj.body.gpa]);
//         console.log(results);
//         return results;
//     }
//     catch (error) {
//         console.log(error);
//     }
// }


const getProfileDetails = async (company_id) =>
{
    try {
        const query = `select * from users 
        where user_id = ${company_id} ;`

        const results = await db.query(query);
        //console.log ("heelo hi howhosedf");
        //console.log(results);
        return results ;

        
    } catch (error) {
        console.log(error);
        
    }
}


const updateProfile = async(obj,company_id) => 
{
    console.log (obj.body.name);
    console.log (obj.body.address);
    console.log (obj.body.website);
    console.log (obj.body.email);
    console.log (obj.body.password);

    try {
        
            const query = `
                UPDATE company
                SET
                    name = $1,
                    address = $4,
                    website = $2,
                    email = $3,
                    password = $4
                WHERE
                    company_id = $5
                RETURNING *;`;
    
            const values = [
                obj.body.name,
                obj.body.address,
                obj.body.website,
                obj.body.email,
                obj.body.password,
                company_id, // Assuming you want to update the user with company_id = 3
            ];
    
            const results = await db.query(query, values);
            console.log(results);
            return results;
    
        
    } catch (error) {
        console.log (error);
        
    }

}


// fire an employee of a company

const fireEmployee = async (obj) => {
    try {
        const results = await db.query("CALL fire_employee($1)", [obj]);
        console.log(results);
        return results;
    } catch (error) {
        console.log(error);
    }
}



module.exports = { getJobs, getEmployees, getJob, getEmployee, addJob ,getProfileDetails, updateProfile, fireEmployee};

// const query = 'SELECT * FROM insert_job($1, $2, $3, $4, $5)';
//     const values = ['Software Engineer', 90000, 'Developing software applications', 1, 1];
//     const result = await client.query(query, values);


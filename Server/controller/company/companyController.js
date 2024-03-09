const db = require('../../db/index');


// Get all jobs of a company
const getJobs = async (company_id) => {
    try {
        const query = `
        SELECT 
            j.*, 
            COUNT(e.employee_id) AS num_of_employees
        FROM 
            jobs j
        LEFT JOIN 
            employee e ON j.job_id = e.job_id
        WHERE 
    
            j.company_id = $1
        GROUP BY 
            j.job_id;`;
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
        const query = `
        SELECT
        e.employee_id,
        u.name,j.salary,
        u.birth_date,
        u.profile_picture,
        u.contact_no,
        u.email,
        u.resume,
        u.address,
        j.name AS job_name,
        
        EXTRACT(YEAR FROM age(current_date, e.hire_date)) AS years_of_service
    FROM
        employee e
    JOIN
        users u ON e.user_id = u.user_id
    JOIN
        jobs j ON e.job_id = j.job_id
    WHERE
        j.company_id = $1;
    
        `;
        const results = await db.query(query, [company_id]);
        console.log(results);
        return results;
    } catch (error) {
        console.log(error);
    }
}

// get a job of a company

const getJob = async (obj,company_id) => {
    console.log('hi job');
    try {
        console.log('inside get job');
        const query = `
        SELECT 
            j.*, 
            COUNT(e.employee_id) AS num_of_employees
        FROM 
            jobs j
        LEFT JOIN 
            employee e ON j.job_id = e.job_id
        WHERE 
            j.job_id = $1 
        AND j.company_id = $2
        GROUP BY 
            j.job_id;

        `;
        const results = await db.query(query, [obj, company_id]);
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
        const query = `
        SELECT * FROM get_company_info($1);`;

        const results = await db.query(query, [company_id]);
        console.log ("heelo hi howhosedf");
        console.log(results);
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
                    address = $2,
                    website = $3,
                    email = $4,
                    password = $5
                WHERE
                    company_id = $6
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

// get employees by name , if name starts with the given string

const getEmployeesByName = async (obj,company_id) => {
    try {
        const results = await db.query("SELECT * FROM get_employees_by_name($1,$2)", [obj,company_id]);
        console.log(results);
        return results;
    } catch (error) {
        console.log(error);
    }
}

// get employees by salary range

const getEmployeesBySalary = async (obj,company_id) => {
    try {
        const results = await db.query("SELECT * FROM get_employees_by_salary($1, $2)", [obj,company_id]);
        console.log(results);
        return results;
    } catch (error) {
        console.log(error);
    }
}

// get jobs by name for a company

const getJobsByName = async ( jobName,companyId) => {
    console.log("inside getJobsByName");
    try {
        const query = `
        SELECT 
        j.*, 
        COUNT(e.employee_id) AS num_of_employees
        FROM 
            jobs j
        LEFT JOIN 
            employee e ON j.job_id = e.job_id
        WHERE 
            j.company_id = $1 
        AND LOWER(j.name) LIKE LOWER($2 || '%')
        GROUP BY 
        j.job_id;

        `;

        const results = await db.query(query, [companyId, jobName]);
        return results;
    } catch (error) {
        console.log(error);
    }
}

// get jobs by salary range for a company

const getJobsBySalary = async (obj,companyId) => {
    try {
        const query = `
        SELECT 
           j.*,
           COUNT(e.employee_id) AS num_of_employees
        
        FROM 
            jobs j
        LEFT JOIN 
            employee e ON j.job_id = e.job_id
        WHERE 
            j.company_id = $1
        AND j.salary BETWEEN CAST(SPLIT_PART($2, '-', 1) AS NUMERIC)
                        AND CAST(SPLIT_PART($2, '-', 2) AS NUMERIC)
        GROUP BY 
            j.job_id;
				

        `;

        const results = await db.query(query, [companyId, obj]);

        console.log(results);
        return results;
    } catch (error) {
        console.log(error);
    }
}

// update a job of a company

const updateJob = async (obj,company_id) => {
    try {
        const query = `
        UPDATE jobs
        SET
            name = $1,
            description = $2,
            salary = $3,
            status = $4
        WHERE
            job_id = $5
        AND company_id = $6
        RETURNING *;`;

        const values = [
            obj.body.name,
            obj.body.description,
            obj.body.salary,
            obj.body.status,
            obj.params.id,
            company_id
        ];

        const results = await db.query(query, values);
        console.log(results);
        return results;
    } catch (error) {
        console.log(error);
    }
}




module.exports = { getJobs, getEmployees, getJob, getEmployee, addJob ,getProfileDetails, updateProfile, fireEmployee, getEmployeesByName, getEmployeesBySalary, getJobsByName, getJobsBySalary, updateJob};

// const query = 'SELECT * FROM insert_job($1, $2, $3, $4, $5)';
//     const values = ['Software Engineer', 90000, 'Developing software applications', 1, 1];
//     const result = await client.query(query, values);


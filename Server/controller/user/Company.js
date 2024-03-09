const db = require('../../db/index');



// for getting all the company list 
const getCompany = async (obj) => {
    try {
        const results = await db.query("SELECT c.*, COUNT(DISTINCT j.job_id) AS total_jobs, COUNT(DISTINCT e.employee_id) AS total_employees FROM company c LEFT JOIN jobs j ON c.company_id = j.company_id LEFT JOIN employee e ON j.job_id = e.job_id GROUP BY c.company_id;");

        console.log(results);
        return results;


    } catch (error) {
        console.log(error);

    }
}




// get all company searched by name 
const getCompanyByName = async (obj) => {
    
    try {
        const query = `
        SELECT c.*, 
               COUNT(DISTINCT j.job_id) AS total_jobs, 
               COUNT(DISTINCT e.employee_id) AS total_employees 
        FROM company c
        LEFT JOIN jobs j ON c.company_id = j.company_id 
        LEFT JOIN employee e ON j.job_id = e.job_id 
        WHERE LOWER(c.name) LIKE LOWER($1)
        GROUP BY c.company_id;
      `;

        const results = await db.query(query, [`%${obj}%`]);
        return results;

    } catch (error) {
        console.log(error);

    }
}




// get alll company searched by address 
const getCompanyByAddress = async (obj) => {
    
    try {
        const query = `
        SELECT c.*, 
               COUNT(DISTINCT j.job_id) AS total_jobs, 
               COUNT(DISTINCT e.employee_id) AS total_employees 
        FROM company c
        LEFT JOIN jobs j ON c.company_id = j.company_id 
        LEFT JOIN employee e ON j.job_id = e.job_id 
        WHERE LOWER(c.address) LIKE LOWER($1)
        GROUP BY c.company_id;
      `;

        const results = await db.query(query, [`%${obj}%`]);
        return results;

    } catch (error) {
        console.log(error);

    }

}


//get all the job for a particular company
const getJobOfCompany = async (obj) => {
    try {
        const results = await db.query("SELECT j.* , c.name AS company_name FROM jobs j JOIN  company c ON j.company_id = c.company_id  WHERE j.company_id = $1; ", [obj.params.id]);
        console.log(results);
        return results;

    } catch (error) {
        console.log(error);

    }
}


// get jobs by name for a company
const getJobsByNameForCompany = async (companyId, jobName) => {
    try {
        const query = `
            SELECT J.*, 
                   J.name AS job_name,
                   J.description AS job_description,
                   J.salary AS job_salary,
                   C.name AS company_name
            FROM jobs J
            JOIN company C ON J.company_id = C.company_id
            WHERE J.company_id = $1
              AND LOWER(J.name) LIKE LOWER($2);
        `;

        const results = await db.query(query, [companyId, `%${jobName}%`]);
        return results;
    } catch (error) {
        console.log(error);
    }
};


// get jobs by skill for a company
const getJobsBySkillForCompany = async (companyId, skillName) => {
    try {
        const query = `
            SELECT J.*, 
                   J.name AS job_name,
                   J.description AS job_description,
                   J.salary AS job_salary,
                   C.name AS company_name
            FROM jobs J
            JOIN company C ON J.company_id = C.company_id
            JOIN job_skill JS ON J.job_id = JS.job_id
            JOIN skill S ON JS.skill_id = S.skill_id
            WHERE J.company_id = $1
              AND LOWER(S.name) LIKE LOWER($2);
        `;

        const results = await db.query(query, [companyId, `%${skillName}%`]);
        return results;
    } catch (error) {
        console.log(error);
    }
};


// get jobs by salary range for a company
const getJobsBySalaryRangeForCompany = async (companyId, minSalary, maxSalary) => {
    try {
        const query = `
            SELECT J.*, 
                   J.name AS job_name,
                   J.description AS job_description,
                   J.salary AS job_salary,
                   C.name AS company_name
            FROM jobs J
            JOIN company C ON J.company_id = C.company_id
            WHERE J.company_id = $1
              AND J.salary BETWEEN $2 AND $3;
        `;

        const results = await db.query(query, [companyId, minSalary, maxSalary]);
        return results;
    } catch (error) {
        console.log(error);
    }
};


module.exports = { getJobOfCompany, getCompany, getCompanyByName, getCompanyByAddress ,getJobsByNameForCompany,getJobsBySkillForCompany,getJobsBySalaryRangeForCompany};

const db = require ('../db/index');

const getCompany = async (obj) => 
{
    try {
        const results = await db.query("SELECT c.*, COUNT(DISTINCT j.job_id) AS total_jobs, COUNT(DISTINCT e.employee_id) AS total_employees FROM company c LEFT JOIN jobs j ON c.company_id = j.company_id LEFT JOIN employee e ON j.job_id = e.job_id GROUP BY c.company_id;");
   
        console.log(results);
        return results;
        
        
    } catch (error) {
        console.log (error);
        
    }
}

const getJobOfCompany = async (obj) => 
{
    try {
        const results =  await db.query("SELECT j.* , c.name AS company_name FROM jobs j JOIN  company c ON j.company_id = c.company_id  WHERE j.company_id = $1; ", [obj.params.id]);
        console.log (results);
        return results;
        
    } catch (error) {
        console.log (error);
        
    }
}

module.exports = {getJobOfCompany,getCompany} ;

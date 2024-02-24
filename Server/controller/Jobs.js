const db = require ('../db/index');

const getAllJob = async () =>
{
    try {
        const results = await db.query ("SELECT J.*,J.name as name , J.description as description, J.salary as salary , (select name from company where company_id= J.company_id)as company_name from jobs J");
        console.log (results);
        return results ;
        
    } catch (error) {
        console.log (error);
        
    }
}


// get job by name
const getJobByName = async (obj) => {
    try {
      const query = `
        SELECT J.*, 
               J.name as name,
               J.description as description,
               J.salary as salary,
               (select name from company where company_id = J.company_id) as company_name
        FROM jobs J
        WHERE LOWER(J.name) LIKE LOWER($1);
      `;
  
      const results = await db.query(query, [`%${obj}%`]);
      return results;
    } catch (error) {
      console.log(error);
    }
  };


  //get job by company name
  const getJobsByCompanyName = async (obj) => {
    try {
      const query = `
        SELECT J.*, 
               J.name as job_name,
               J.description as job_description,
               J.salary as job_salary,
               C.name as company_name
        FROM jobs J
        JOIN company C ON J.company_id = C.company_id
        WHERE LOWER(C.name) LIKE LOWER($1);
      `;
  
      const results = await db.query(query, [`%${obj}%`]);
      return results;
    } catch (error) {
      console.log(error);
    }
  };

 // get jobs by skill name
  const getJobsBySkillName = async (obj) => {
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
        WHERE LOWER(S.name) LIKE LOWER($1);
      `;
  
      const results = await db.query(query, [`%${obj}%`]);
      return results;
    } catch (error) {
      console.log(error);
    }
  };
  
  
  
//getskillsofJob
const getSkillsofJob = async (obj) =>{
    try {
        const query = `
        SELECT s.*
        FROM job_skill js
        JOIN skill s ON js.skill_id = s.skill_id
        WHERE js.job_id = ${obj.params.id};
        `
        const results = await db.query(query);
        console.log (results);
        return results ;
        
    } catch (error) {
        console.log (error);
    }

}



module.exports = {getAllJob,getSkillsofJob,getJobByName,getJobsBySkillName,getJobsByCompanyName};
const db = require ('../../db/index');



//get applications for user

const getApplicationOFuser = async (obj) =>
{
    try {
        const query = `
        SELECT
                a.application_id,
                a.apply_date,
                j.name AS job_name,
                c.name AS company_name,
                a.status AS application_status
            FROM
                application a
            JOIN
                jobs j ON a.job_id = j.job_id
            JOIN
                company c ON j.company_id = c.company_id
            WHERE
                a.user_id = ${obj}
            ORDER BY a.apply_date desc
                ;
        `
        const results = await db.query(query);
        console.log (results);
        return results ;
        
    } catch (error) {
        console.log (error);
    }


}


// get interview list for user

const getInterviewOfUser = async (obj) =>
{
    try {
        const query = `
        


                SELECT
                interview.*,
                application.apply_date,
                job.name AS job_name,
                company.name AS company_name
                FROM
                interview
                JOIN
                application ON interview.application_id = application.application_id
                JOIN
                jobs AS job ON application.job_id = job.job_id
                JOIN
                company ON job.company_id = company.company_id
                WHERE
                application.user_id = ${obj}
                AND interview.time > CURRENT_DATE
                ORDER BY
                interview.time ASC;
        `
        const results = await db.query(query);
        console.log (results);
        return results ;
        
    } catch (error) {
        console.log (error);
    }


}



module.exports = {getApplicationOFuser,getInterviewOfUser} ;
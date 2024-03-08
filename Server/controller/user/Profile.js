const db = require ('../../db/index');

const getProfileDetails = async (user_id) =>
{
    try {
        const query = `select * from users 
        where user_id = ${user_id} ;`

        const results = await db.query(query);
       // console.log ("heelo hi howhosedf");
        //console.log(results);
        return results ;

        
    } catch (error) {
        console.log(error);
        
    }
}


const updateProfile = async(obj,user_id) => 
{
    console.log (obj.body.name);
    console.log (obj.body.contact_no);
    console.log (obj.body.email);
    console.log (obj.body.address);

    try {
        
            const query = `
                UPDATE users
                SET
                    name = $1,
                    contact_no = $2,
                    email = $3,
                    address = $4
                WHERE
                    user_id = $5
                RETURNING *;`;
    
            const values = [
                obj.body.name,
                obj.body.contact_no,
                obj.body.email,
                obj.body.address,
                user_id, // Assuming you want to update the user with user_id = 3
            ];
    
            const results = await db.query(query, values);
            console.log(results);
            return results;
    
        
    } catch (error) {
        console.log (error);
        
    }

}

const getSkillofUser = async (user_id) =>
{
    try {
        const query = `SELECT  
        s.*
 FROM users u
 JOIN user_skill us ON u.user_id = us.user_id
 JOIN skill s ON us.skill_id = s.skill_id
 WHERE u.user_id = ${user_id}`;
 
 
 
        const results = await db.query(query);
       // console.log ("heelo hi howhosedf");
        console.log(results);
        return results ;

        
    } catch (error) {
        console.log(error);
        
    }
}


const updateSkillofUser = async (user_id, selectedSkills) => {
    try {
        console.log(user_id, selectedSkills);
        
        if (selectedSkills.length === 0) {
            // If empty, set user's skills to an empty array (or handle it as needed)
            console.log('Selected skills array is empty. Setting user skills to zero.');
            const query = `DELETE FROM user_skill
                  WHERE user_id = ${user_id};
             ` ;
             await db.query(query);
            return "ads;lk";
        }
        // Call the stored procedure using the anonymous code block
        const query = `
        CALL update_user_skills(${user_id}, ARRAY[${selectedSkills}]); 
    `;
    
    await db.query(query);

    
        console.log('User skills updated successfully!');
        return "asdlkfja" ;
    } catch (error) {
        console.error('Error updating user skills:', error);
        throw error; // Rethrow the error to be caught by the calling function if needed
    }
};

const getMyCompany = async (user_id) =>{
    try {
        const query = `
            SELECT
                e.employee_id,
                e.job_id,
                e.hire_date,
                e.commission_pct,
                u.name AS employee_name,
                j.name AS job_name,
                j.salary,
                j.description AS job_description,
                c.name AS company_name
            FROM
                employee e 
            JOIN
                users u ON e.user_id = u.user_id
            JOIN
                jobs j ON e.job_id = j.job_id
            JOIN
                company c ON j.company_id = c.company_id
            WHERE
                        e.user_id = ${user_id};
        `
        const results = await db.query(query);
        // console.log ("heelo hi howhosedf");
         console.log(results);
         return results ;
        
    } catch (error) {
        console.log (error);
        
    }

}


const getJobHistory = async (user_id) =>{
    try {
        const query = `	
                
            SELECT 
                        jh.job_history_id,
                        j.job_id,
                        j.name AS job_name,
                        c.name AS company_name,
                        jh.start_date,
                        jh.end_date
            FROM 
                        job_history jh
                        JOIN 
                        jobs j ON jh.job_id = j.job_id
                        JOIN
                        company c ON j.company_id = c.company_id
            WHERE 
                        jh.user_id = ${user_id}
                        ORDER BY 
                        jh.start_date DESC;
        `
        const results = await db.query(query);
        // console.log ("heelo hi howhosedf");
         console.log(results.rows);
         return results ;
        
    } catch (error) {
        console.log (error);
        
    }

}

const getNotification = async (user_id) =>{
    try {
        const query = `	
		
        SELECT
                notification.*,
                jobs.name AS job_name,
                company.name AS company_name
            FROM
                notification
            JOIN
                jobs ON jobs.job_id = notification.job_id
            JOIN
                company ON company.company_id = jobs.company_id
            WHERE
                user_id = ${user_id} AND
                notification_type = 'company_to_user';


        `
        const results = await db.query(query);
        // console.log ("heelo hi howhosedf");
         console.log(results.rows);
         return results ;
        
    } catch (error) {
        console.log (error);
        
    }

}



const UserResign = async (user_id) => {
    try {
        console.log(user_id);
    
        // Call the stored procedure using the anonymous code block
        const query = `CALL resign_employee(${user_id});
        `
    
    await db.query(query);

    
    } catch (error) {
        throw error; // Rethrow the error to be caught by the calling function if needed
    }
};




module.exports = {getProfileDetails,updateProfile,getSkillofUser,updateSkillofUser,getMyCompany , getJobHistory,getNotification , UserResign} ;
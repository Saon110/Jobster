const db = require('../../db/index');


// get all the notifications of a company

const getNotifications = async (company_id) => {
    
        try{
            const query = `
            SELECT * FROM notification
            WHERE job_id IN
            (
	            SELECT job_id from jobs where company_id = $1
            )
            and notification_type = 'user_to_company';`;
            const results = await db.query(query, [company_id]);
            console.log(results);
            return results;
        }
        catch(err){
            console.log(err);
        }
    }

// mark a notification as read

const markAsRead = async (obj) => {
    try{
        const query = `
        UPDATE notification SET status = 'Read' WHERE notification_id = $1 RETURNING *;`;
        const results = await db.query(query, [obj]);
        console.log(results);
        return results;
    }
    catch(err){
        console.log(err);
    }
}


module.exports = { getNotifications, markAsRead };
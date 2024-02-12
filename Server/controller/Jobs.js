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



module.exports = {getAllJob};
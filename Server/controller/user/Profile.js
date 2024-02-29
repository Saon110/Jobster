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


module.exports = {getProfileDetails,updateProfile} ;
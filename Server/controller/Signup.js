const db = require ('../db/index');



const checkIfExist = async (obj) => 
{
    try{
        console.log ("") ;
        console.log (obj);
        const result = await db.query ("SELECT * FROM users WHERE email = $1  ;",[obj.email]);
        return result ;


    }
    catch (error)
    {
        console.log (error)
    }
}

const SignUpUser = async (obj ) => {
    try {
        const result = await db.query('INSERT INTO users (name, email, password, contact_no) VALUES ($1, $2, $3, $4) RETURNING *;', [obj.name, obj.email, obj.password, obj.contact_no]);
        console.log (result);
        return result ;

    } catch (error) {
        console.log (error);
        
    }


}

module.exports = {SignUpUser, checkIfExist};
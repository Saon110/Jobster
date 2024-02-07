const db = require('../db/index');

const checkUser = async (obj)=>
{
    try {
        console.log("obj is");
        console.log(obj);
        //const result = await db.query("select * from users ;");
        const result = await db.query ("SELECT * FROM users WHERE email = $1 AND password = $2 ;",[obj.email,obj.password]);
       //const result = {add : "dlkd", addd : "dklsf"};
        console.log (result);
        return result; 
        
    } catch (error) {
        console.log (error);
    }
    


}


module.exports ={ checkUser };
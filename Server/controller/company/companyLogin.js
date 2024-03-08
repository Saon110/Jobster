const db = require('../../db/index');

const checkCompany = async (obj)=>
{
    try {
        console.log("obj is");
        console.log(obj);
        //const result = await db.query("select * from users ;");
        const result = await db.query ("SELECT * FROM company WHERE email = $1 AND password = $2 ;",[obj.email,obj.password]);
       //const result = {add : "dlkd", addd : "dklsf"};
       // console.log (result);
       console.log("here is the result");
        return result; 
        
    } catch (error) {
        console.log (error);
    }
}


module.exports ={ checkCompany };
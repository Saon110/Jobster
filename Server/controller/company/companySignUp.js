const db = require('../../db/index');



const checkIfExist = async (obj) => {
    try {
        console.log("");
        console.log(obj);
        const result = await db.query("SELECT * FROM company WHERE email = $1  ;", [obj.email]);
        return result;


    }
    catch (error) {
        console.log(error)
    }
}

const SignUpCompany = async (obj) => {
    try {
        const result = await db.query('INSERT INTO company (name,address,website, email, password) VALUES ($1, $2, $3, $4,$5) RETURNING *;', [obj.name, obj.address, obj.website, obj.email, obj.password]);
        console.log(result);
        return result;

    } catch (error) {
        console.log(error);

    }


}

module.exports = { SignUpCompany, checkIfExist };
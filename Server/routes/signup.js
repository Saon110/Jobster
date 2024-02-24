const router = require ('express').Router();

const {SignUpUser,checkIfExist} = require ('../controller/Signup');


router.post ('/', async (req,res)=> {
    try {
        const result = await checkIfExist (req.body);
     
        if (result.rowCount ===  1)
        {
            console.log("email already registered") ;
            res.status(409).send ("not signed up");
        }
        else 
        {
            const result = await SignUpUser(req.body);
            console.log (result);
            res.status (201).send ("signed up");

        }
        
        
    } catch (error) {
        console.log (error);
        
    }
}) 

module.exports = router ;
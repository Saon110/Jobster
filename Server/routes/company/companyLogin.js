const router = require('express').Router ();
const cookieParser = require ('cookie-parser');
const jwt = require ('jsonwebtoken');

const {checkCompany} = require ('../../controller/company/companyLogin');
const {authenticateToken}= require('../../middlewares/company/companyAuthorization');

router.use(cookieParser());


router.post('/', async (req,res) =>
{
    try {
    //    console.log(req.body);
     const result = await checkCompany (req.body);
   // console.log(req.body);
   // console.log ("result is :");
    if (result.rowCount === 1)
    {
       // console.log (result.rows[0].user_id);
        const token = jwt.sign({ company_id: result.rows[0].company_id },process.env.ACCESS_TOKEN_SECRET);
        res.cookie('authToken', token, { httpOnly: true, maxAge: 3600000 });

        console.log( " ok ");
        res.status (200).send(token);

    }
   

    else res.status (201).send ("not ok ");
 

        
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
    

});

router.get('/',authenticateToken ,async (req, res) => {
    // If you want to check if the user is authenticated in the non-protected route
    if (req.user) {
        
        const userId = req.user.user_id;
        res.send(`Welcome to the public route, Authenticated User ID: ${userId}`);
    } else {
        res.send("Welcome to the public route, Not Authenticated");
    }
});



module.exports = router ;
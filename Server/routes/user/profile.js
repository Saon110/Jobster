const router = require('express').Router();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


const { authenticateToken } = require('../../middlewares/authorization');
const { getProfileDetails,updateProfile} = require('../../controller/Profile');
router.use(cookieParser());


// router for getting the info a particular user 
router.get('/', authenticateToken, async (req, res) => {
    console.log("hello hi");
    if (req.user) {

        const user_id = req.user.user_id;
        try {
            console.log("authenticated");
            const results = await getProfileDetails(user_id);
             // console.log (results);
            res.status(200).json({
                status: "success",
                results: results.rows.length,
                data: {
                    profile: results.rows
                }

            });

        } catch (error) {
            console.log(error);

        }


    }
    else {
        console.log("not authenticated");
    }

})



router.put ('/Update',authenticateToken,async (req,res)=>
{ 
    console.log ("hello man");
    let user_id; 
    if (req.user){
         user_id = req.user.user_id ;
        console.log (user_id);
    }
    try {
        console.log ("sdlkfja;skldfja");
        const results = await updateProfile (req,user_id);
        console.log (results);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                user : results.rows[0]
            }

        });
        
    } catch (error) {
        console.log(error);
        
    }
})


module.exports = router;
const router = require('express').Router();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const db = require ('../../db/index');

const { authenticateToken } = require('../../middlewares/authorization');
const { getProfileDetails,updateProfile, getSkillofUser, updateSkillofUser, getMyCompany, getJobHistory, getNotification, UserResign} = require('../../controller/user/Profile');
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

router.get('/Skills', authenticateToken, async (req, res) => {
    console.log("hello hi");
    if (req.user) {

        const user_id = req.user.user_id;
        try {
            console.log("authenticated");
            const results = await getSkillofUser(user_id);
             // console.log (results);
            res.status(200).json({
                status: "success",
                results: results.rows.length,
                data: {
                    skills: results.rows
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



router.put('/Skills/Update', authenticateToken, async (req, res) => {
    console.log("hello hi");
    console.log ("kire ");
    if (req.user) {

        const user_id = req.user.user_id;
        try {
            console.log("authenticated");
            const results = await updateSkillofUser(user_id,req.body.skills);
            // console.log (results);
             res.send ("success") ;
            // res.status(200).json({
            //     status: "success",
            //     results: results.rows.length,
            //     data: {
            //         skills: results.rows
            //     }

            // });

        } catch (error) {
            console.log(error);

        }


    }
    else {
        console.log("not authenticated");
    }

})

router.get ('/MyCompany', authenticateToken, async (req, res) => {
    console.log("hello hi");
    if (req.user) {

        const user_id = req.user.user_id;
        try {
            const result = await db.query('SELECT is_employee($1) AS is_employee', [user_id]);
            console.log (result.rows[0].is_employee);
            console.log("authenticated");

            console.log (result)
            let results ;
            let success ;

           
            if ( result.rows[0].is_employee === true )
            {
                results = await getMyCompany (user_id);
                console.log (results);
                success = true ;

            }
            else 
            {
                success = false ;


            }
            res.status(200).json({
                
                success ,
                data: {
                    company : results
                }
        
            });



           // const results = await updateSkillofUser(user_id,req.body.skills);
             //console.log (result);
            // res.send ("success") ;
          

        } catch (error) {
            console.log(error);

        }


    }
    else {
        console.log("not authenticated");
    }

})




router.get('/JobHistory', authenticateToken, async (req, res) => {
    console.log("hello hi");
    if (req.user) {

        const user_id = req.user.user_id;
        try {
            console.log("authenticated");
            const results = await getJobHistory(user_id);
             // console.log (results);
            res.status(200).json({
                status: "success",
                results: results.rows.length,
                data: {
                    jobHistory: results.rows
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





router.get('/Notifications', authenticateToken, async (req, res) => {
    console.log("hello hi");
    if (req.user) {

        const user_id = req.user.user_id;
        try {
            console.log("authenticated");
            const results = await getNotification(user_id);
             // console.log (results);
            res.status(200).json({
                status: "success",
                results: results.rows.length,
                data: {
                    notifications: results.rows
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



router.get ('/Resign',authenticateToken,async(req,res)=>
{
     console.log("hello hi");
if (req.user) {

    const user_id = req.user.user_id;
    try {
        console.log("authenticated");
        await UserResign (user_id);
        res.send ("ok");
       // const results = await getNotification(user_id);
         // console.log (results);
        // res.status(200).json({
        //     status: "success",
        //     results: results.rows.length,
        //     data: {
        //         notifications: results.rows
        //     }

        // });

    } catch (error) {
        console.log(error);

    }


}
else {
    console.log("not authenticated");
}

})


module.exports = router;
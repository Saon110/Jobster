const router = require('express').Router ();
const {checkUser} = require ('../controller/login');


router.post('/', async (req,res) =>
{
    try {
     const result = await checkUser (req.body);
   // console.log(req.body);
   // console.log ("result is :");
    if (result.rowCount === 1)
    res.send("ok");

    else res.send ("not ok");
   // console.log (result);
     //console.log ("hello");
    // res.send("dklfd");
     //res.json ({add : "sdlkf"});

        
    } catch (error) {
        console.log(error);
    }
    

});

router.get('/', async (req,res) =>
{
    res.send("adil parena");
})

module.exports = router ;
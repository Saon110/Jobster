const router = require ('express').Router();

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const {getAllJob,getSkillsofJob,getJobByName,getJobsByCompanyName,getJobsBySkillName, postApply} = require ('../../controller/user/Jobs');
const { authenticateToken } = require('../../middlewares/authorization');





router.get ('/',async(req,res)=>{
    try {
        const results = await getAllJob ();
        console.log (results);
        res.status(200).json({
            status:"200" , 
            data : {
                jobs : results.rows 
            }
        });
        
    } catch (error) {
        console.log (error);
        
    }
})




router.get('/Search', async (req, res) => {
    try {
      let results;
  
      if (req.headers.type === 'Name') {
        results = await getJobByName(req.headers.value);
      } else if (req.headers.type === 'Company') {
        results = await getJobsByCompanyName(req.headers.value);
      } else if (req.headers.type === 'Skill') {
        results = await getJobsBySkillName(req.headers.value);
      } 
  
      console.log("hello ");
      console.log(results.rows);
      console.log("hi");
  
      res.status(200).json({
        status: "success",
        data: {
          jobs: results.rows
        }
      });
    } catch (error) {
      console.log(error);
     
    }
  });

router.get ('/:id/skill',async (req,res) =>{
    try {
        const results = await getSkillsofJob(req);
        res.status(200).json({
            status: "success",
            data: {
                skills : results.rows
            }
    
        });
        

        
    } catch (error) {
        console.log (error);
        
    }
})


router.get ('/:id/Apply',authenticateToken,async(req,res)=>{
   console.log ('ashche ekhane');
   if (req.user)
   {
    const user_id = req.user.user_id ;
    try {
      console.log ("authenticated");
      const results = await postApply (user_id, req.params.id);
      console.log (results);
      console.log (results.success) ;
      console.log (results.notice_text);
      res.status(200).json({
        status: results ,
       
    });

    
    } catch (error) {
      console.log (error);
      
    }

   }
   else {
    console.log ("not authenticated");
   }
 
})

module.exports = router ;
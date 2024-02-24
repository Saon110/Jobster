const router = require ('express').Router();
const {getAllJob,getSkillsofJob,getJobByName,getJobsByCompanyName,getJobsBySkillName} = require ('../../controller/Jobs');





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

module.exports = router ;
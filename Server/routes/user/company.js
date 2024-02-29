const router = require('express').Router();
const { getCompany, getCompanyByAddress ,getCompanyByName} = require('../../controller/user/Company');
const { getJobOfCompany , getJobsByNameForCompany,getJobsBySkillForCompany } = require('../../controller/user/Company');


router.get('/', async (req, res) => {
    try {
        const results = await getCompany(req.body);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                companies: results.rows
            }

        });

    } catch (error) {
        console.log(error);
    }

});

router.get('/:id/jobs', async (req, res) => {
    try {
      
        const results = await getJobOfCompany(req);//
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


router.get('/:id/jobs/Search', async (req, res) => {
  try {
    let results;
    console.log ("hello");

    if (req.headers.type === 'Name') {
      results = await getJobsBySkillForCompany(req.params.id,req.headers.value);
    }  else if (req.headers.type === 'Skill') {
      results = await getJobsBySkillForCompany(req.params.id,req.headers.value);
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




router.get('/Search', async (req, res) => {
    try {
      let results;
  
      if (req.headers.type === 'Name') {
        results = await getCompanyByName(req.headers.value);
      } else if (req.headers.type === 'Address') {
        results = await getCompanyByAddress(req.headers.value);
      } 
  
      console.log("hello ");
      console.log(results.rows);
      console.log("hi");
  
      res.status(200).json({
        status: "success",
        data: {
          companies: results.rows
        }
      });
    } catch (error) {
      console.log(error);
      
    }
  });
  

module.exports = router;
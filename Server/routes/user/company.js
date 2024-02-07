const router = require('express').Router ();
const {getCompany} = require ('../../controller/Company');
const {getJobOfCompany}=require ('../../controller/Company');


router.get('/Company',async (req,res) =>{
   try {
    const results = await getCompany (req.body);
    res.status(200).json({
        status: "success",
        results: results.rows.length,
        data: {
            companies: results.rows
        }

    });
    
   } catch (error) {
     console.log (error);
   }

});

router.get ('/Company/:id/jobs',async (req,res) => {
    try {
        const results = await getJobOfCompany (req);//
    res.status(200).json({
        status: "success",
        data: {
            jobs : results.rows
        }

    });
        
    } catch (error) {
        console.log (error);
        
    }

});


module.exports = router ;
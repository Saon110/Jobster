const router = require ('express').Router();
const {getAllJob} = require ('../../controller/Jobs');





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

module.exports = router ;
const router = require ('express').Router ();

const { getApplicationOFuser, getInterviewOfUser } = require('../../controller/user/Application');
const {authenticateToken} = require ('../../middlewares/authorization');



router.get ('/',authenticateToken,async (req,res)=> {
    console.log ('ashche ekhane');
    if (req.user)
    {
     const user_id = req.user.user_id ;
     try {
       console.log ("authenticated");
      // const results = await postApply (user_id, req.params.id);
      const results = await getApplicationOFuser (user_id);
       console.log (results);
       
       res.status(200).json({
        status: "success",
        data: {
            applications : results.rows
        }

    });
    
     
     } catch (error) {
       console.log (error);
       
     }
 
    }
    else {
     console.log ("not authenticated");
    }
    
})




router.get ('/Interview',authenticateToken,async (req,res)=> {
  console.log ('ashche ekhane');
  if (req.user)
  {
   const user_id = req.user.user_id ;
   try {
     console.log ("authenticated");
    // const results = await postApply (user_id, req.params.id);
    const results = await getInterviewOfUser (user_id);
     console.log (results);
     
     res.status(200).json({
      status: "success",
      data: {
          interviews : results.rows
      }

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
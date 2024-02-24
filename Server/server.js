require("dotenv").config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require("./db");






// routes







const app = express();

app.use(morgan("dev"));



//middlware

app.use(cors());
app.use(express.json());





const loginRouter = require ('./routes/login');
app.use ('/api/v1/login', loginRouter);

const signUpRouter = require ('./routes/signup');
app.use ('/api/v1/signup', signUpRouter);

const UserCompanyRouter = require ('./routes/user/company');
app.use ('/api/v1/User/Company',UserCompanyRouter);


const UserJobRouter = require ('./routes/user/jobs');
app.use ('/api/v1/User/Jobs',UserJobRouter);


const UserProfileRouter = require ('./routes/user/profile');
app.use ('/api/v1/User/Myprofile', UserProfileRouter);










// app.get('/api/v1/Company', async (req, res) => {

//     try {
//         const results = await db.query("SELECT * FROM company");
   
//         console.log(results);
//         res.status(200).json({
//             status: "success",
//             results: results.rows.length,
//             data: {
//                 companies: results.rows
//             }

//         });
//     }
//     catch (err) {
//         console.log(err);
//     }
// });



// advance query finding total_jobs and employee along with employee name




// // get a single company
// app.get('/api/v1/Company/:id', async(req, res) => {
//     console.log(req.params.id);

//    try{
//     const results = await db.query("SELECT * FROM company WHERE company_id = $1", [req.params.id]);
//     res.status(200).json({
//         status: "success",
//         data: {
//             company: results.rows[0]
//         }

//     });
//    }
//    catch(err){
//        console.log(err);
//    }
// });

// // create a company

// app.post('/api/v1/Company', async(req, res) => {
//     console.log(req.body);

//     try{
//         const results = await db.query("INSERT INTO company (name,address,website,email) values ($1,$2,$3,$4) returning *", [req.body.name, req.body.address, req.body.website,req.body.email]);
//         console.log(results);
//         res.status(201).json({
//             status: "success",
//             data: {
//                 company: results.rows[0]
//             }
    
//         });
//        }
//          catch(err){
//               console.log(err);
//          }
    
// });

// // update company

// app.put('/api/v1/Company/:id', async(req, res) => {
//     console.log(req.params);
//     console.log(req.body);

   
//     try{
//         const results = await db.query("UPDATE company SET name = $1, address = $2, website = $3 ,email = $4 where company_id = $5 returning *", [req.body.name, req.body.address, req.body.website, req.body.email,req.params.id]);
//         console.log(results);
//         res.status(200).json({
//             status: "success",
//             data: {
//                 company: results.rows[0]
//             }
    
//         });
//        }
//          catch(err){
//               console.log(err);
//          }
// });

// // delete company

// app.delete('/api/v1/Company/:id',async (req, res) => {
//     console.log(req.params.id);

//     try{
//         const result = await db.query("DELETE FROM company WHERE company_id = $1 RETURNING *", [req.params.id]);

//         //const results2 = db.query("DELETE FROM jobs WHERE company_id = $1", [req.params.id]);
     
//         res.status(204).json(result.rows);
//     }
//     catch(err){
//         console.log(err);
//     }
// });

// // add a job for a company

// app.post('/api/v1/Company/:id/jobs', async(req, res) => {
//     console.log(req.body);

//     try{
//         const results = await db.query("INSERT INTO jobs (job_id,name,company_id,salary,status) values ($1,$2,$3,$4,$5) returning *", [req.body.ID,  req.body.name, req.params.id,req.body.salary,req.body.Status]);
//         console.log(results);
//         res.status(201).json({
//             status: "success",
//             data: {
//                 job: results.rows[0]
//             }
    
//         });
//        }
//          catch(err){
//               console.log(err);
//          }
    
// });

// // find jobs of a company

// // app.get('/api/v1/Company/:id/jobs', async(req, res) => {
// //     console.log(req.params.id);

// //    try{
// //     const results = await db.query("SELECT * FROM jobs WHERE company_id = $1", [req.params.id]);
// //     res.status(200).json({
// //         status: "success",
// //         data: {
// //             jobs : results.rows
// //         }

// //     });
// //    }
// //    catch(err){
// //        console.log(err);
// //    }
// // });

// // delete a job of a company

// app.delete('/api/v1/Company/:id/jobs/:job_id', (req, res) => {
//     console.log(req.params);

//     try{
//         const results = db.query("DELETE FROM jobs WHERE job_id = $1", [req.params.job_id]);
     
//         res.status(204).json({
//             status: "success",
//         });
//     }
//     catch(err){
//         console.log(err);
//     }
// });




// link routes to routers  





const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('Server running on port ' + port);
});



const db = require('../../db/index');


// get all the upcoming interviews of a company

const getInterviews = async (obj, company_id) => {

    try{
        const query = `
        SELECT * FROM get_upcoming_interviews($1);`;
        const results = await db.query(query, [company_id]);
        console.log(results);
        return results;
    }
    catch(err){
        console.log(err);
    }
}

// accept an interview of a company

const acceptInterview = async (obj, company_id) => {
    try{
        const query = `
        CALL accept_interview($1);`;
        const results = await db.query(query, [obj]);
        console.log(results);
        return results;
    }
    catch(err){
        console.log(err);
    }
}

// reject an interview of a company

const rejectInterview = async (obj, company_id) => {
    try{
        const query = `
        CALL reject_interview($1);`;
        const results = await db.query(query, [obj]);
        console.log(results);
        return results;
    }
    catch(err){
        console.log(err);
    }
}

module.exports = { getInterviews, acceptInterview, rejectInterview };
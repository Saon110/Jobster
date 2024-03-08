const db = require('../../db/index');


// Get all the applications of a company

const getApplications = async (obj, company_id) => {
    try {
        const query = `
        SELECT a.*
        FROM application a
        JOIN jobs j ON a.job_id = j.job_id
        WHERE j.company_id = $1 and a.status = 'Pending';
        `;
        const results = await db.query(query, [company_id]);
        console.log(results);
        return results;
    } catch (error) {
        console.log(error);
    }
}


// get all applications of a job of a company

const getJobApplications = async (obj, company_id) => {
    try {
        const query = `
        SELECT * FROM application WHERE job_id = $1 AND company_id = $2;`;
        const results = await db.query(query, [obj, company_id]);
        console.log(results);
        return results;
    }
    catch (error) {
        console.log(error);
    }
}

// get details of an application of a company

const getApplication = async (obj, company_id) => {
    console.log('object: ');
    console.log(obj);
    console.log('params id: ');
    console.log(obj.params.id);
    console.log('inside get application');
    try {
        const query = `
        SELECT
        u.name AS applicant_name,
        j.name AS job_title,
        STRING_AGG(s.name, ', ') AS applicant_skills,
        e.degree AS education_degree,
        e.major AS education_major,
        e.university AS education_university,
        e.graduation_date AS education_graduation_date,
        e.GPA AS education_GPA
        FROM
        application a
        JOIN
        users u ON a.user_id = u.user_id
        JOIN
        jobs j ON a.job_id = j.job_id
        LEFT JOIN
        user_skill us ON u.user_id = us.user_id
        LEFT JOIN
        skill s ON us.skill_id = s.skill_id
        LEFT JOIN
        education e ON u.user_id = e.user_id
        WHERE
        a.application_id = $1
        GROUP BY
        u.name, j.name, e.degree, e.major, e.university, e.graduation_date, e.GPA;
        `;
        const results = await db.query(query, [obj.params.id]);
        console.log(results);
        return results;
    } catch (error) {
        console.log(error);
    }
}

// Approve an application of a company

const approveApplication = async (obj, company_id) => {
    try {
        const query = `
        UPDATE application SET status = 'Accepted' where application_id = $1 RETURNING *;`;
        const results = await db.query(query, [obj]);
        console.log(results);
        return results;

    }
    catch (error) {
        console.log(error);
    }
}

// Reject an application of a company

const rejectApplication = async (obj, company_id) => {

    try {
        const query = `
        UPDATE application SET status = 'Rejected' where application_id = $1 RETURNING *;`;
        const results = await db.query(query, [obj]);
        console.log(results);
        return results;

    }
    catch (error) {
        console.log(error);
    }
}


// check eligibility of a job of a company

const checkEligible = async (application_id,min_gpa) => {
    try {
        console.log('inside checkEligible');
        console.log(application_id);
        console.log(min_gpa);
        const results = await db.query('SELECT check_eligibility($1, $2) AS is_eligible', [application_id,min_gpa]);
        console.log(results);
        console.log(results.rows[0].is_eligible);
        return results.rows[0].is_eligible;
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = { getApplications, getJobApplications, getApplication, approveApplication, rejectApplication, checkEligible };
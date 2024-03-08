--1 
CREATE OR REPLACE FUNCTION apply_for_job(user_id_param INT, job_id_param INT) RETURNS TABLE(success BOOLEAN, notice_text TEXT) AS $$
DECLARE
    application_count INT;
BEGIN
    -- Count the number of applications for the given user and job with 'Pending' status
    SELECT COUNT(*)
    INTO application_count
    FROM application
    WHERE user_id = user_id_param AND job_id = job_id_param AND status = 'Pending';

    -- Check if there is no pending application
    IF application_count = 0 THEN
        -- Insert the new application
        INSERT INTO application (apply_date, status, user_id, job_id)
        VALUES (CURRENT_DATE, 'Pending', user_id_param, job_id_param);
        RETURN QUERY SELECT true AS success, 'Application inserted successfully.' AS notice_text;
    ELSE
        RETURN QUERY SELECT false AS success, 'User already has a pending application for this job.' AS notice_text;
    END IF;
END;
$$ LANGUAGE plpgsql;





-- 2 isEmployee
-- Function to check if a user is an employee
CREATE OR REPLACE FUNCTION is_employee(p_user_id INT) RETURNS BOOLEAN AS $$
BEGIN
    -- Check if the user_id exists in the employee table
    IF EXISTS (SELECT 1 FROM employee WHERE user_id = p_user_id) THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
$$ LANGUAGE plpgsql;






--3 //check eligibilty
CREATE OR REPLACE FUNCTION check_eligibility(
    application_id_input INT,
    min_gpa_input NUMERIC
) RETURNS BOOLEAN AS $$
DECLARE
    user_id_val INT;
    has_required_skills BOOLEAN;
    meets_education_criteria BOOLEAN;
BEGIN
    -- Get the user_id associated with the application_id
    SELECT user_id INTO user_id_val
    FROM application
    WHERE application_id = application_id_input;

    -- Check if the applicant meets the minimum education criteria (GPA)
    SELECT (GPA >= min_gpa_input) INTO meets_education_criteria
    FROM education
    WHERE user_id = user_id_val;

    -- Check if the applicant has the required skills for the job
    SELECT COUNT(*) > 0 INTO has_required_skills
    FROM user_skill
    WHERE user_id = user_id_val
    AND skill_id IN (
        SELECT skill_id
        FROM job_skill
        WHERE job_id = (
            SELECT job_id
            FROM application
            WHERE application_id = application_id_input
        )
    );

    -- Return true if the applicant meets education criteria and has required skills, otherwise false
    RETURN meets_education_criteria AND has_required_skills;
END;
$$ LANGUAGE plpgsql;



--		
				
---4 get interview 	// upcoming inetrviews
CREATE OR REPLACE FUNCTION get_upcoming_interviews(company_id_input INT)
RETURNS TABLE (
    interview_id INT,
    interview_time DATE,
    status VARCHAR(100),
    location VARCHAR(1000),
    application_id INT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        i.interview_id,
        i.time AS interview_time,
        i.status,
        i.location,
        i.application_id
    FROM 
        interview i
    JOIN 
        application a ON i.application_id = a.application_id
    JOIN 
        jobs j ON a.job_id = j.job_id
    WHERE 
        j.company_id = company_id_input
        AND i.time > CURRENT_DATE
		ORDER BY interview_time;
END;
$$ LANGUAGE plpgsql;			


--5 //insert job
CREATE OR REPLACE FUNCTION insert_job(
    p_name VARCHAR(100),
    p_salary NUMERIC,
    p_description VARCHAR(1000),
    p_status INT,
    p_company_id INT
) RETURNS VOID AS $$
BEGIN
    INSERT INTO jobs (name, salary, description, status, company_id)
    VALUES (p_name, p_salary, p_description, p_status, p_company_id);
END;
$$ LANGUAGE plpgsql;
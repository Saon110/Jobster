--1.  Update user SKills 
CREATE OR REPLACE PROCEDURE update_user_skills(
    p_user_id INT,
    p_selected_skills INT[]
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Check if the array is empty
    IF array_length(p_selected_skills, 1) IS NULL THEN
       
        RETURN;
    END IF;

    -- Step 1: Add New Skills
    INSERT INTO user_skill (user_id, skill_id)
    SELECT p_user_id, skill_id
    FROM unnest(p_selected_skills) skill_id
    ON CONFLICT DO NOTHING;

    -- Step 2: Remove Unselected Skills
    DELETE FROM user_skill
    WHERE user_id = p_user_id
    AND skill_id NOT IN (SELECT unnest(p_selected_skills));

   
END;
$$;



--2 resign from employee side
CREATE OR REPLACE PROCEDURE resign_employee(
    p_user_id INT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_user_name VARCHAR(100);
    v_job_name VARCHAR(100);
    v_company_name VARCHAR(100);
    v_job_id INT;
BEGIN
    -- Check if user_id exists in the employee table
    IF EXISTS (SELECT 1 FROM employee WHERE user_id = p_user_id) THEN
        -- Get user details
        SELECT name INTO v_user_name FROM users WHERE user_id = p_user_id;

        -- Get job details
        SELECT j.name, j.job_id, c.name
        INTO v_job_name, v_job_id, v_company_name
        FROM employee e
        JOIN jobs j ON e.job_id = j.job_id
        JOIN company c ON j.company_id = c.company_id
        WHERE e.user_id = p_user_id;

        -- Delete employee record
        DELETE FROM employee WHERE user_id = p_user_id;

        -- Insert resignation notification
        INSERT INTO notification (content, user_id, job_id, notification_type, status)
        VALUES (
            format('%s resigned from %s in your company %s', v_user_name, v_job_name, v_company_name),
            p_user_id,
            v_job_id,
            'user_to_company',
            'unread'
        );
    END IF;
END;
$$;





--3 //fire an employee
CREATE OR REPLACE PROCEDURE fire_employee(
    p_user_id INT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_user_name VARCHAR(100);
    v_job_name VARCHAR(100);
    v_company_name VARCHAR(100);
    v_job_id INT;
BEGIN
    -- Check if user_id exists in the employee table
    IF EXISTS (SELECT 1 FROM employee WHERE user_id = p_user_id) THEN
        -- Get user details
        SELECT name INTO v_user_name FROM users WHERE user_id = p_user_id;

        -- Get job details
        SELECT j.name, j.job_id, c.name
        INTO v_job_name, v_job_id, v_company_name
        FROM employee e
        JOIN jobs j ON e.job_id = j.job_id
        JOIN company c ON j.company_id = c.company_id
        WHERE e.user_id = p_user_id;

        -- Delete employee record
        DELETE FROM employee WHERE user_id = p_user_id;

        -- Insert resignation notification
        INSERT INTO notification (content, user_id, job_id, notification_type, status)
        VALUES (
            format('Mr. %s, %s company terminated your job in post %s', v_user_name, v_company_name, v_job_name),
            p_user_id,
            v_job_id,
            'company_to_user',
            'unread'
        );
    END IF;
END;
$$;





--4 accept _interview
CREATE OR REPLACE PROCEDURE accept_interview(
    p_interview_id INT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_user_id INT;
    v_job_id INT;
    v_job_name VARCHAR(100);
    v_company_name VARCHAR(100);
    v_notification_content VARCHAR(1000);
BEGIN
    -- Get user_id and job_id associated with the interview
    SELECT a.user_id, a.job_id, j.name, c.name
    INTO v_user_id, v_job_id, v_job_name, v_company_name
    FROM interview i
    JOIN application a ON i.application_id = a.application_id
    JOIN jobs j ON a.job_id = j.job_id
    JOIN company c ON j.company_id = c.company_id
    WHERE i.interview_id = p_interview_id;

    -- Insert a notification for the user
    v_notification_content := 'Your interview for the position of ' || v_job_name || ' in ' || v_company_name || ' has been accepted. Hope to see you soon!';
    INSERT INTO notification (content, user_id, job_id, notification_type, status)
    VALUES (v_notification_content, v_user_id, v_job_id, 'company_to_user', 'unread');

    -- Update the interview status to Accepted
    UPDATE interview
    SET status = 'Accepted'
    WHERE interview_id = p_interview_id;
END;
$$;


-- 5 // reject an employee
CREATE OR REPLACE PROCEDURE reject_interview(
    p_interview_id INT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_user_id INT;
    v_job_id INT;
    v_job_name VARCHAR(100);
    v_company_name VARCHAR(100);
    v_notification_content VARCHAR(1000);
BEGIN
    -- Get user_id and job_id associated with the interview
    SELECT a.user_id, a.job_id, j.name, c.name
    INTO v_user_id, v_job_id, v_job_name, v_company_name
    FROM interview i
    JOIN application a ON i.application_id = a.application_id
    JOIN jobs j ON a.job_id = j.job_id
    JOIN company c ON j.company_id = c.company_id
    WHERE i.interview_id = p_interview_id;

    -- Insert a notification for the user
    v_notification_content := 'Your interview for the position of ' || v_job_name || ' in ' || v_company_name || ' has been rejected. We appreciate your interest.';
    INSERT INTO notification (content, user_id, job_id, notification_type, status)
    VALUES (v_notification_content, v_user_id, v_job_id, 'company_to_user', 'unread');

    -- Update the interview status to Rejected
    UPDATE interview
    SET status = 'Rejected'
    WHERE interview_id = p_interview_id;
END;
$$;


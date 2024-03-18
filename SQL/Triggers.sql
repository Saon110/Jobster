---1 
-- interview table a accepted hole ei trigger ta execute hobe
-- employee table e add hobe 
CREATE OR REPLACE FUNCTION update_employee_status()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'Accepted' THEN
        -- Check if the user is not already an employee
        IF NOT EXISTS (SELECT 1 FROM employee WHERE user_id = (SELECT user_id FROM application WHERE application_id = NEW.application_id)) THEN
            INSERT INTO employee (user_id, job_id, hire_date, commission_pct)
            SELECT a.user_id, a.job_id, CURRENT_DATE, 0.1
            FROM application a
            WHERE a.application_id = NEW.application_id;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_employee_status_trigger
BEFORE UPDATE ON interview
FOR EACH ROW
EXECUTE FUNCTION update_employee_status();



--2 ---
-- Create a function to insert a notification
CREATE OR REPLACE FUNCTION insert_employee_notification()
RETURNS TRIGGER AS $$
DECLARE
    company_name VARCHAR(100);
    job_name VARCHAR(100);
BEGIN
    -- Get the name of the company
    SELECT name INTO company_name FROM company WHERE company_id = NEW.job_id;

    -- Get the name of the job
    SELECT name INTO job_name FROM jobs WHERE job_id = NEW.job_id;

    -- Insert a notification for the user
    INSERT INTO notification (user_id, job_id, notification_type, content, status)
    VALUES (NEW.user_id, NEW.job_id, 'company_to_user', 
            'Congratulations! You have been hired for the position of ' || job_name || ' at ' || company_name, 'unread');

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to call the function after each insert on the employee table
CREATE TRIGGER employee_insert_notification_trigger
AFTER INSERT ON employee
FOR EACH ROW
EXECUTE FUNCTION insert_employee_notification();



-- 3 	
		
CREATE OR REPLACE FUNCTION before_delete_employee()
RETURNS TRIGGER AS $$
DECLARE
    v_user_id INT;
    v_job_id INT;
BEGIN
    -- Get user_id and job_id before deletion
    v_user_id := OLD.user_id;
    v_job_id := OLD.job_id;

    -- Insert data into job_history table
    INSERT INTO job_history (user_id, job_id, start_date, end_date)
    VALUES (v_user_id, v_job_id, OLD.hire_date, CURRENT_DATE);

    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
CREATE TRIGGER before_delete_employee_trigger
BEFORE DELETE ON employee
FOR EACH ROW
EXECUTE FUNCTION before_delete_employee();





--4   // creates an interview if application is 
CREATE OR REPLACE FUNCTION create_interview()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'Accepted' THEN
        INSERT INTO interview (time, status, location, application_id)
        VALUES (CURRENT_DATE + INTERVAL '7 days', 'Pending', (SELECT name || ' office' FROM company WHERE company_id = (SELECT company_id FROM jobs WHERE job_id = NEW.job_id)), NEW.application_id);
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER application_accepted_trigger
AFTER UPDATE OF status ON application
FOR EACH ROW
WHEN (OLD.status IS DISTINCT FROM NEW.status)
EXECUTE FUNCTION create_interview();





-- 5 notify applicant trigger
CREATE OR REPLACE FUNCTION notify_applicant()
RETURNS TRIGGER AS $$
DECLARE
    notification_content VARCHAR(1000);
BEGIN
    -- Check if the application status is changed to 'Accepted' or 'Rejected'
    IF NEW.status = 'Accepted' THEN
        -- Construct the notification content for accepted applicants
        notification_content := 'Congratulations! Your application has been accepted for an interview scheduled on ' || (CURRENT_DATE + INTERVAL '7 days')::TEXT;
				 INSERT INTO notification (content, user_id, job_id, notification_type, status)
    VALUES (notification_content, NEW.user_id, NEW.job_id, 'company_to_user', 'Unread');
    ELSEIF NEW.status = 'Rejected' THEN
        -- Construct the notification content for rejected applicants
        notification_content := 'We regret to inform you that your application has been rejected.';
				 INSERT INTO notification (content, user_id, job_id, notification_type, status)
    VALUES (notification_content, NEW.user_id, NEW.job_id, 'company_to_user', 'Unread');
    END IF;

    -- Insert a new row into the notification table
   

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger to execute the function after an application status is updated
CREATE OR REPLACE TRIGGER notify_applicant_trigger
AFTER UPDATE OF status ON application
FOR EACH ROW
WHEN (OLD.status IS DISTINCT FROM NEW.status)
EXECUTE FUNCTION notify_applicant();
getting MyCompany
            SELECT
                e.employee_id,
                e.job_id,
                e.hire_date,
                e.commission_pct,
                u.name AS employee_name,
                j.name AS job_name,
                j.salary,
                j.description AS job_description,
                c.name AS company_name
            FROM
                employee e 
            JOIN
                users u ON e.user_id = u.user_id
            JOIN
                jobs j ON e.job_id = j.job_id
            JOIN
                company c ON j.company_id = c.company_id
            WHERE
                        e.user_id = ${user_id};
        `


  -- get job by  salary

  `SELECT 
           j.*,
           COUNT(e.employee_id) AS num_of_employees
        
        FROM 
            jobs j
        LEFT JOIN 
            employee e ON j.job_id = e.job_id
        WHERE 
            j.company_id = $1
        AND j.salary BETWEEN CAST(SPLIT_PART($2, '-', 1) AS NUMERIC)
                        AND CAST(SPLIT_PART($2, '-', 2) AS NUMERIC)
        GROUP BY 
            j.job_id;  `


   -- get job by name

   `
   SELECT 
        j.*, 
        COUNT(e.employee_id) AS num_of_employees
        FROM 
            jobs j
        LEFT JOIN 
            employee e ON j.job_id = e.job_id
        WHERE 
            j.company_id = $1 
        AND LOWER(j.name) LIKE LOWER($2 || '%')
        GROUP BY 
        j.job_id;

   `             

-- get job

   `SELECT 
            j.*, 
            COUNT(e.employee_id) AS num_of_employees
        FROM 
            jobs j
        LEFT JOIN 
            employee e ON j.job_id = e.job_id
        WHERE 
            j.job_id = $1 
        AND j.company_id = $2
        GROUP BY 
            j.job_id;`

--get emplyees
   `SELECT
        e.employee_id,
        u.name,j.salary,
        u.birth_date,
        u.profile_picture,
        u.contact_no,
        u.email,
        u.resume,
        u.address,
        j.name AS job_name,
        
        EXTRACT(YEAR FROM age(current_date, e.hire_date)) AS years_of_service
    FROM
        employee e
    JOIN
        users u ON e.user_id = u.user_id
    JOIN
        jobs j ON e.job_id = j.job_id
    WHERE
        j.company_id = $1;`         



        --get jobs

        `
        SELECT 
            j.*, 
            COUNT(e.employee_id) AS num_of_employees
        FROM 
            jobs j
        LEFT JOIN 
            employee e ON j.job_id = e.job_id
        WHERE 
    
            j.company_id = $1
        GROUP BY 
            j.job_id;`


            -- get appliactions

            `
        SELECT
    a.*,
    u.name AS username,
    j.name AS job_name
FROM
    application a
JOIN
    jobs j ON a.job_id = j.job_id
JOIN
    users u ON a.user_id = u.user_id
WHERE
    j.company_id = $1
    AND a.status = 'Pending';

        `

        -- get applications of a job

        

         `
        SELECT
    a.*,
    u.name AS username,
    j.name AS job_name
FROM
    application a
JOIN
    jobs j ON a.job_id = j.job_id
JOIN
    users u ON a.user_id = u.user_id
WHERE
    a.job_id = $1
    AND j.company_id = $2;`


-- get application details

`
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
        `

        --get my company

         `SELECT
    e.employee_id,
    e.job_id,
    e.hire_date,
    e.commission_pct,
    u.name AS employee_name,
    j.name AS job_name,
    j.salary,
    j.description AS job_description,
    c.name AS company_name
FROM
    (
        SELECT
            e.employee_id,
            e.job_id,
            e.hire_date,
            e.commission_pct,
            e.user_id,
            j.company_id
        FROM
            employee e
        WHERE
            e.user_id = ${user_id}
    ) AS e
JOIN
    users u ON e.user_id = u.user_id
JOIN
    jobs j ON e.job_id = j.job_id
JOIN
    company c ON j.company_id = c.company_id;`
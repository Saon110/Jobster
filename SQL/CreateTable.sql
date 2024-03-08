--1 users

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY ,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    birth_date DATE,
    profile_picture BYTEA,
		contact_no VARCHAR(50) NOT NULL , 
    email VARCHAR(50) NOT NULL,
    resume BYTEA,
    address VARCHAR(1000)
);

--2 company
CREATE TABLE company (
    company_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(1000) NOT NULL,
    website VARCHAR(255) NOT NULL,
    logo BYTEA,
    review FLOAT,
    email VARCHAR(50) NOT NULL
);

ALTER TABLE company
ADD COLUMN password VARCHAR(255);

--3 jobs
CREATE TABLE jobs (
    job_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    salary NUMERIC, -- 
    description VARCHAR(1000) NOT NULL,
    status INT,
		company_id INT REFERENCES company (company_id) ON DELETE CASCADE
		
);


--4 skill  
CREATE TABLE skill (
    skill_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(1000) NOT NULL
);


--5 application
CREATE TABLE application (
    application_id SERIAL PRIMARY KEY,
    apply_date DATE,
		status VARCHAR(50) ,
		user_id INT REFERENCES users (user_id) ON DELETE CASCADE,
    job_id INT REFERENCES jobs (job_id) ON DELETE CASCADE
);

--6 interview
CREATE TABLE interview (
    interview_id SERIAL PRIMARY KEY,
    time DATE,
    status VARCHAR(100),
    location VARCHAR(1000),
    application_id INT REFERENCES application (application_id) ON DELETE CASCADE
);


--7 internship 
CREATE TABLE internship (
    internship_id SERIAL PRIMARY KEY,
    start_date DATE,
    end_date DATE,
		projects VARCHAR(1000),
    user_id INT REFERENCES users (user_id),
    company_id INT REFERENCES company (company_id)
);


--8 employee
CREATE TABLE employee (
    employee_id SERIAL PRIMARY KEY,
    user_id INT  REFERENCES users(user_id),
		
		job_id INT REFERENCES jobs (job_id) ON DELETE CASCADE, 
  
		hire_date DATE ,
		commission_pct NUMERIC

);


--9 notification 
CREATE TABLE notification (
    notification_id SERIAL PRIMARY KEY,
    content VARCHAR(1000),
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    job_id INT REFERENCES jobs(job_id),
    notification_type VARCHAR(50),
    status VARCHAR(50),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


--10 education
CREATE TABLE education (
    education_id SERIAL PRIMARY KEY,
    user_id INT  REFERENCES users(user_id),
    degree VARCHAR(100) NOT NULL,
    major VARCHAR(100),
    university VARCHAR(255) NOT NULL,
    graduation_date DATE,
    GPA NUMERIC(3, 2) 
);




-- many to many relationships


-- 11 job-skill  
CREATE TABLE job_skill (
    job_id INT REFERENCES jobs(job_id),
    skill_id INT REFERENCES skill(skill_id),
    PRIMARY KEY (job_id, skill_id)
);


-- 12 user-skill
CREATE TABLE user_skill (
    user_id INT REFERENCES users(user_id),
    skill_id INT REFERENCES skill(skill_id),
    PRIMARY KEY (user_id, skill_id)
);


-- 13 job_history
CREATE TABLE job_history (
    job_history_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    job_id INT REFERENCES jobs(job_id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE,
    CONSTRAINT chk_dates CHECK (start_date <= COALESCE(end_date, CURRENT_DATE))
);




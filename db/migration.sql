-- Creating Database
MariaDB [(none)]> create database college_app;
Query OK, 1 row affected (0.002 sec)

-- Using database college_app
MariaDB [(none)]> use college_app;

-- CREATING TABLE COURSES
MariaDB [college_app]> create table courses(
    -> course_id INT NOT NULL AUTO_INCREMENT,
    -> course_title VARCHAR(100) NOT NULL,
    -> created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -> PRIMARY KEY (course_id)
    -> );

-- creating students table
MariaDB [college_app]> create table students (
    -> student_id INT NOT NULL AUTO_INCREMENT,
    -> reg_id BIGINT NOT NULL,
    -> course_id INT,
    -> student_name VARCHAR(100) NOT NULL,
    -> created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -> PRIMARY KEY (student_id),
    -> FOREIGN KEY (course_id) REFERENCES courses(course_id)
    -> );
Query OK, 0 rows affected (0.120 sec)

-- creating teachers table
MariaDB [college_app]> create table teachers(
    -> teacher_id INT NOT NULL AUTO_INCREMENT,
    -> reg_id BIGINT NOT NULL,
    -> course_id INT,
    -> teacher_name VARCHAR(100) NOT NULL,
    -> created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -> PRIMARY KEY (teacher_id),
    -> FOREIGN KEY (course_id) REFERENCES courses(course_id)
    -> );
Query OK, 0 rows affected (0.022 sec)
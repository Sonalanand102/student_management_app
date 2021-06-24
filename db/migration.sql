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
    -> student_email VARCHAR(100) NOT NULL,
    -> student_name VARCHAR(100) NOT NULL,
    -> created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -> PRIMARY KEY (student_id)
    -> );

-- creating teachers table
MariaDB [college_app]> create table teachers (
    -> teacher_id INT NOT NULL AUTO_INCREMENT,
    -> teacher_email VARCHAR(100) NOT NULL,
    -> teacher_name VARCHAR(100) NOT NULL,
    -> created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -> PRIMARY KEY (teacher_id)
    -> );
Query OK, 0 rows affected (0.021 sec)

-- creating student details
MariaDB [college_app]> create table student_details(
    -> id INT NOT NULL AUTO_INCREMENT,
    -> student_id INT NOT NULL,
    -> course_id INT NOT NULL,
    -> created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -> PRIMARY KEY (id)
    -> );
Query OK, 0 rows affected (0.023 sec)

-- creating teacher details
MariaDB [college_app]> create table teacher_details(
    -> id INT NOT NULL AUTO_INCREMENT,
    -> teacher_id INT NOT NULL,
    -> course_id INT NOT NULL,
    -> created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -> PRIMARY KEY (id)
    -> );
Query OK, 0 rows affected (0.014 sec)
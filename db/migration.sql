-- creating database
create database student_management_app;

-- using database
use student_management_app;

-- creating table courses
create table courses(id INT NOT NULL AUTO_INCREMENT,course_title VARCHAR(100) NOT NULL UNIQUE,created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),PRIMARY KEY (id));

--  creating table students
create table students(id INT NOT NULL AUTO_INCREMENT,reg_id INT NOT NULL UNIQUE,name VARCHAR(100) NOT NULL,created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),PRIMARY KEY (id),UNIQUE (email));

-- creating table teachers
create table teachers(id INT NOT NULL AUTO_INCREMENT,reg_id INT NOT NULL UNIQUE,name VARCHAR(100) NOT NULL,created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),PRIMARY KEY (id),UNIQUE (email));

-- creating table student_details
create table student_details(id INT NOT NULL AUTO_INCREMENT,student_id INT,course_id INT,PRIMARY KEY (id),FOREIGN KEY (student_id) REFERENCES students(id),FOREIGN KEY (course_id) REFERENCES courses(id));

--  creating table teacher_details
 create table teacher_details(id INT NOT NULL AUTO_INCREMENT,teacher_id INT,course_id INT,PRIMARY KEY (id),FOREIGN KEY (teacher_id) REFERENCES teachers(id),FOREIGN KEY (course_id) REFERENCES courses(id));
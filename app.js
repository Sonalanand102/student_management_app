// const mySql = require('./startUps/mySql.js');

const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('joi');
let app = express();

var jsonParser = bodyParser.json()

 
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser)
app.use(express.json());


// connection details
const mysql = require('mysql');

let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'college_app'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

// post courses
app.post('/api/addCourses',(req,res)=>{
    let course_title = req.body.course_title;
    let sql = "SELECT * FROM `courses` WHERE course_title = ?";
    let query = connection.query(sql,course_title,(err,result)=>{
        if(err){
            console.error('error connecting: ' + err.stack);           
            return;
        }else{
            if(result.length == 0){
                let sql = `INSERT INTO courses( course_title) VALUES ('${course_title}')`;
                let query = connection.query(sql,(err,result)=>{
                    if(err){
                        console.error('error connecting: ' + err.stack);           
                        return;
                    }else{
                        console.log(result);
                        res.status(201).send({message:'Course added successfully'});
                    }
                })
            }else{
                console.log('course already exists');
                res.status(200).send({message:'course already exists please retry!!!'});
            }
        }
    })
})

// post students
app.post('/api/addStudents',  function (req, res) {
    let studentEmail = req.body.student_email;
    // let courseId = req.body.course_id;
    let studentName = req.body.student_name;
    let sql = `SELECT * FROM students WHERE student_email = ?`;
    let query = connection.query(sql,studentEmail,(err,result)=>{
        if(err){
            console.error('error connecting: ' + err.stack);
            
            return;
        }else{
            if(result.length == 0){
                let sql = "INSERT INTO `students`(`student_email`, `student_name`) VALUES (?,?)";
                let query = connection.query(sql,[studentEmail,studentName],(err,result)=>{
                    if(err){
                        console.error('error : ' + err.stack);
                        return;
                    }else{
                        console.log(result);
                        res.status(201).send({message:'student added successfully'});
                    }

                })

            }else{
                console.log('student already exists');
                res.status(200).send({message:'student already exists please retry!!!'});

            }
        }
    })
  })

// Post teachers
app.post('/api/addTeachers',(req,res)=>{
    let teacherEmail = req.body.teacher_email;
    let teacherName = req.body.teacher_name;
    let sql = "SELECT * FROM `teachers` WHERE teacher_email = ?";
    let query = connection.query(sql,teacherEmail,(err,result)=>{
        if(err){
            console.error("error : "+ err.stack);
            return;
        }else{
            if(result.length == 0){
                let sql = "INSERT INTO `teachers`(`teacher_email`, `teacher_name`) VALUES (?,?)";
                let query = connection.query(sql,[teacherEmail,teacherName],(err,result)=>{
                    if(err){
                        console.error("error : "+ err.stack);
                return;
                    }else{
                        console.log(result);
                        res.status(201).send({message:'teacher added successfully'});
                    }
                })
            }else{
                console.log(result);
                res.status(200).send({message:'teacher already exists please retry!!!'});

            }
        }
    })

})

// add teacher details -- post
app.post('/api/addTeacherDetails',(req,res)=>{
    let teacher_email = req.body.teacher_email;
    let course_title = req.body.course_title;
    let sql = "select teacher_id from teachers where teacher_email = ?";
    let query = connection.query(sql,teacher_email,(err,result)=>{
        console.log( 'result is', result)
        // let teacher_id = result[0].teacher_id;
        if(err){
            console.error(error.stack);
            return;
        }else{
            if(result.length == 0){
                console.log('teachers does not exists')
                res.status(400).send({message:'teacher does not exists...'})
            }else{
                let teacher_id = result[0].teacher_id;
                let sql = "select course_id from courses where course_title = ?"
                let query = connection.query(sql, course_title,(err,result) => {
                    let course_id = result[0].course_id;
                    if(err){
                        console.error(error.stack);
                        return;
                    }else{
                        if(result.length == 0){
                            console.log('course not available')
                            res.status(400).send({message:'course not available...'})
                        }else{
                            console.log('Teacher id is ', teacher_id, result[0])
                            let sql = "INSERT INTO `teacher_details`(`teacher_id`, `course_id`) VALUES (?,?)";
                            let query = connection.query(sql,[teacher_id,course_id],(err,result)=>{
                                if(err){
                                    console.error(err.stack);
                                    return;
                                }else{
                                    console.log('teacher details added successfully');
                                    res.status(200).send({message:'teacher details added successfully.'})
                                    console.log(teacher_id);
                                    console.log(course_id)
                                }
                            })
                        }
                    }
                })
            }
        }
    })
})

// add student details --post
app.post('/api/addStudentDetails',(req,res)=>{
    let student_email = req.body.student_email;
    let course_title = req.body.course_title;
    let sql ="select student_id from students where student_email = ?";
    let query = connection.query(sql,student_email,(err,result)=>{
        let student_id = result[0].student_id;
        if(err){
            console.error(error.stack);
            return;
        }else{
            if(result.length == 0){
                console.log('student does not exist...');
                res.status(400).send({message:'student does not exists...'})

            }else{
                let sql = "select course_id from courses where course_title = ?";
                let query = connection.query(sql,course_title,(err,result)=>{
                    let course_id = result[0].course_id;
                    if(err){
                        console.error(error.stack);
                        return;
                    }else{
                        if(result.length==0){
                            console.log('course does not exist...');
                            res.status(400).send({message:'course not available...'})

                        }else{
                            let sql = "insert into student_details (student_id,course_id) values (?,?)";
                            let query = connection.query(sql,[student_id,course_id],(err,result)=>{
                                if(err){
                                    console.error(error.stack);
                                    return;
                                }else{
                                    console.log("student detail added successfully...")
                                    res.status(200).send({message:'student details added successfully.'})

                                }

                            })
                        }
                    }
                })
            }
        }
    })
})


// get queries
app.get('/', (req,res)=>{
    res.send('hello');
})
//get all courses
app.get('/api/courses',(req,res) =>{
    let sql="select * from courses";
    let query = connection.query(sql,(err,result) => {
        if(err) {
            console.error('error connecting: ' + err.stack);
            return;
          }
          if(result.length !==0){
          console.log("courses fetched successfully");
          res.status(200).send(result);
          res.send(result);
          }
    })

})

// get all students
app.get('/api/students',(req,res) =>{
    let sql=`SELECT * FROM students`;
    let query = connection.query(sql,(err,result) => {
        if(err) {
            console.error('error connecting: ' + err.stack);
            return;
          }if(result.length !== 0){
        
          console.log('students fetched...');
          res.status(200).send(result);
          }
    })

})

// get all teachers
app.get('/api/teachers',(req,res) =>{
    let sql=`SELECT * FROM teachers`;
    let query = connection.query(sql,(err,result) => {
        if(err) {
            console.error('error connecting: ' + err.stack);
            return;
          }
          if(result.length !== 0 ){
          console.log('Teachers fetched');
          res.status(200).send(result)
          }
    })

})

// get teacher + course taken
app.get('/api/courseByTeacher',(req,res)=>{
    // let sql = "SELECT users.name AS user, products.name AS favorite FROM users LEFT JOIN products ON users.favorite_product = products.id";

   let sql =  "SELECT teachers.teacher_id,teachers.teacher_name,courses.course_id,courses.course_title FROM teacher_details INNER JOIN teachers ON teachers.teacher_id = teacher_details.teacher_id INNER JOIN courses ON courses.course_id = teacheer_details.course_id ORDER BY teachers.teacher_name ASC"
   let query = connection.query(sql,(err,result)=>{
       if(err){
           console.error(error.stack)
           return;
       }else{
           if(result.length !== 0){
           res.status(200).send(result);
           console.log("data fetched");
           }else{
               res.status(404).send({message:"can't fetch details..."});
           }
       }
   })
})

app.get('/api/courseByStudents',(req,res)=>{
    // let sql = "SELECT users.name AS user, products.name AS favorite FROM users LEFT JOIN products ON users.favorite_product = products.id";

   let sql =  "SELECT students.student_id,students.student_name,courses.course_id,courses.course_title FROM student_details INNER JOIN students ON students.student_id = student_details.student_id INNER JOIN courses ON courses.course_id = student_details.course_id ORDER BY students.student_name ASC"
   let query = connection.query(sql,(err,result)=>{
       if(err){
           console.error(error.stack)
           return;
       }else{
           if(result.length !==0){
           res.status(200).send(result);
           console.log("data fetched");
           }else{
               res.status(404).send({message:"can't fetch data..."})
           }
       }
   })
})

// teacher detail by email
app.get('/api/teacherDetails',(req,res)=>{
    let teacher_email = req.body.teacher_email;
    let sql = "select * from teachers where teacher_email = ?";
    let query = connection.query(sql,teacher_email,(err,result)=>{
        if(err){
            console.error(error.stack);
            return;
        }else{
            let teacher_id = result[0].teacher_id;
            let teacher_name = result[0].teacher_name;
            let sql = "select * from teacher_details where teacher_id = ?";
            let query = connection.query(sql,teacher_id,(err,result)=>{
                if(err){
                    console.error(error.stack);
                    return;
                }else{
                    let course_id = result[0].course_id;
                    if(result !== 0){
                        let sql = "select * from courses where course_id = ?";
                        let query = connection.query(sql,course_id,(err,result)=>{
                            if(err){
                                console.error(error.stack);
                                return;
                            }else{
                                if(result.length !== 0){
                                    res.status(404).send({"teacherEmail" : teacher_email,"teacher name":teacher_name,"course name":result[0].course_title});
                                    console.log("details fetched");
                                }
                            }
                        })
                    }
                }
            })
            
        }
    })
})

// student detail by email
app.get('/api/studentDetails',(req,res)=>{
    let student_email = req.params.student_email;
    let sql = "select * from students where student_email = ?";
    let query = connection.query(sql,student_email,(err,result)=>{
        if(err){
            console.error(error.stack);
            return;
        }else{
            let student_id = result[0].student_id;
            let student_name = result[0].student_name;
            let sql = "select * from student_details where student_id = ?";
            let query = connection.query(sql,student_id,(err,result)=>{
                if(err){
                    console.error(error.stack);
                    return;
                }else{
                    let course_id = result[0].course_id;
                    if(result !== 0){
                        let sql = "select * from courses where course_id = ?";
                        let query = connection.query(sql,course_id,(err,result)=>{
                            if(err){
                                console.error(error.stack);
                                return;
                            }else{
                                if(result.length !== 0){
                                    res.status(404).send({"student email" : student_email,"student name":student_name,"course name":result[0].course_title});
                                    console.log("details fetched");
                                }
                            }
                        })
                    }
                }
            })
            
        }
    })
})



app.listen(3000, function () {
    console.log('Example app listening on port 3000...!');
});
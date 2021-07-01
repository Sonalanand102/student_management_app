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
  password : '',
  database : 'student_management_app'
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
                let sql = `INSERT INTO courses(course_title) VALUES (?)`;
                let query = connection.query(sql,course_title,(err,result)=>{
                    if(err){
                        console.error('error connecting: ' + err.stack);  
                        res.status(404).send(err.stack)         
                        return;
                    }else{
                        console.log(result);
                        res.status(201).send({message:'Course added successfully'});
                    }
              
    })
})

// post students
app.post('/api/addStudents',  function (req, res) {
    let studentRegId = req.body.reg_id;
    let studentName = req.body.name;
                let sql = "INSERT INTO `students`(`reg_id`, `name`) VALUES (?,?)";
                let query = connection.query(sql,[studentRegId,studentName],(err,result)=>{
                    if(err){
                        console.error('error : ' + err.stack);
                        res.status(404).send(err.stack);
                        return;
                    }else{
                        console.log(result);
                        res.status(201).send({message:'student added successfully'});
                    }

                })
  })

// Post teachers
app.post('/api/addTeachers',(req,res)=>{
    let teacherReg_id = req.body.reg_id;
    let teacherName = req.body.name;
    
                let sql = "INSERT INTO `teachers`(`reg_id`, `name`) VALUES (?,?)";
                let query = connection.query(sql,[teacherReg_id,teacherName],(err,result)=>{
                    if(err){
                        console.error("error : "+ err.stack);
                        res.status(404).send(err.stack);
                return;
                    }else{
                        console.log(result);
                        res.status(201).send({message:'teacher added successfully'});
                    }
                })

})

// add teacher details -- post
app.post('/api/addTeacherDetails',(req,res)=>{
    let reg_id = req.body.reg_id;
    let course_title = req.body.course_title;
    let sql = "select id from teachers where reg_id = ?";
    let query = connection.query(sql,reg_id,(err,result)=>{
        if(err){
            console.error(err.stack);
            return;
        }else{
            if(result.length == 0){
                console.log('teachers does not exists')
                res.status(400).send({message:'teacher does not exists...'})
            }else{
                let teacher_id = result[0].id;
                let sql = "select id from courses where course_title = ?"
                let query = connection.query(sql, course_title,(err,result) => {
                    if(err){
                        console.error(err.stack);
                        return;
                    }else{
                        if(result.length == 0){
                            console.log('course not available')
                            res.status(400).send({message:'course not available...'})
                        }else{
                            let course_id = result[0].id;
                            let sql = "INSERT INTO `teacher_details`(`teacher_id`, `course_id`) VALUES (?,?)";
                            let query = connection.query(sql,[teacher_id,course_id],(err,result)=>{
                                if(err){
                                    console.error(err.stack);
                                    return;
                                }else{
                                    console.log(result);
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
    let reg_id = req.body.reg_id;
    let course_title = req.body.course_title;
    let sql ="select id from students where reg_id = ?";
    let query = connection.query(sql,reg_id,(err,result)=>{
        if(err){
            console.error(error.stack);
            return;
        }else{
            if(result.length == 0){
                console.log('student does not exist...');
                res.status(400).send({message:'student does not exists...'})

            }else{
                let student_id = result[0].id;
                let sql = "select id from courses where course_title = ?";
                let query = connection.query(sql,course_title,(err,result)=>{
                    if(err){
                        console.error(err.stack);
                        return;
                    }else{
                        if(result.length==0){
                            console.log('course does not exist...');
                            res.status(400).send({message:'course not available...'})

                        }else{
                            let course_id = result[0].id;
                            let sql = "insert into student_details (student_id,course_id) values (?,?)";
                            let query = connection.query(sql,[student_id,course_id],(err,result)=>{
                                if(err){
                                    console.error(err.stack);
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
            res.status(404).send(err.stack);
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
   let sql =  "SELECT teachers.name,courses.course_title FROM teacher_details INNER JOIN teachers ON teachers.id = teacher_details.teacher_id INNER JOIN courses ON courses.id = teacher_details.course_id ORDER BY teachers.name ASC"
   let query = connection.query(sql,(err,result)=>{
       if(err){
           console.error(err.stack)
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
   let sql =  "SELECT students.name,courses.course_title FROM student_details INNER JOIN students ON students.id = student_details.student_id INNER JOIN courses ON courses.id = student_details.course_id ORDER BY students.name ASC"
   let query = connection.query(sql,(err,result)=>{
       if(err){
           console.error(err.stack);
           res.status(404).send(err.stack);
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

// teacher detail by registration id
app.get('/api/teacherDetails/:reg_id',(req,res)=>{
    let reg_id = req.params.reg_id;
    let sql = "SELECT teachers.name,courses.course_title FROM teacher_details INNER JOIN teachers ON teachers.id = teacher_details.teacher_id INNER JOIN courses ON courses.id = teacher_details.course_id where teachers.reg_id = ?";
    let query = connection.query(sql,reg_id,(err,result)=>{
        if(err){
            console.error(err.stack);
            res.status(404).send(err.stack);
            return;
        }else{
            if(result.length !== 0){
                res.status(200).send(result)
            }else{
                res.status(400).send("No data available");
            }
        }
    })
})
// student detail by reg_id
app.get('/api/studentDetails/:reg_id',(req,res)=>{
    let reg_id = req.params.reg_id;
    let sql = "SELECT students.name,courses.course_title FROM student_details INNER JOIN students ON students.id = student_details.student_id INNER JOIN courses ON courses.id = student_details.course_id where students.reg_id = ?";
    let query = connection.query(sql,reg_id,(err,result)=>{
        if(err){
            console.error(err.stack);
            res.status(404).send(err.stack);
            return;
        }else{
            if(result.length !== 0){
                res.status(200).send(result)
            }else{
                res.status(400).send("No data available");
            }
        }
    })       
})

// Update Logics
// Update Student 
app.put('/api/updateStudents/',(req,res)=>{
    let reg_id = req.body.reg_id;
    let student_name = req.body.name;
    let sql = "select * from students where reg_id = ?";
    let query = connection.query(sql,reg_id,(err,result)=>{
        if(err){
            console.error(err.stack);
            res.status(404).send(err.stack);
            return;
        }else{
            if(result.length !== 0){
                let sql = "UPDATE `students` SET `name`= ? WHERE reg_id = ?";
                let query = connection.query(sql,[student_name,reg_id],(err,result)=>{
                    if(err){
                        console.error(err.stack);
                        res.status(404).send(err.stack);
                        return;
                    }else{
                        console.log("student updated successfully")
                        res.status(200).send({message:"student updated successfully"});
                    }
                })


            }else{
                res.status(400).send({message : "Student not found"})
                console.log("student not found");
            }
        }
    })

})
// Update Teacher 
app.put('/api/updateTeachers/',(req,res)=>{
    let reg_id = req.body.reg_id;
    let teacher_name = req.body.name;
    let sql = "select * from teachers where reg_id = ?";
    let query = connection.query(sql,reg_id,(err,result)=>{
        if(err){
            console.error(err.stack);
            res.status(404).send(err.stack);
            return;
        }else{
            if(result.length !== 0){
                let sql = "UPDATE `teachers` SET `name`= ? WHERE reg_id = ?";
                let query = connection.query(sql,[teacher_name,reg_id],(err,result)=>{
                    if(err){
                        console.error(err.stack);
                        res.status(404).send(err.stack);
                        return;
                    }else{
                        console.log("teacher updated successfully")
                        res.status(200).send({message:"teacher updated successfully"});
                    }
                })


            }else{
                res.status(400).send({message : "teacher not found"})
                console.log("teacher not found");
            }
        }
    })

})
// Upadte Student_details

app.put('/api/putStudentDetails/',(req,res)=>{

    let reg_id = req.body.reg_id;
    let student_name = req.body.name;
    let course_title = req.body.course_title;
    let sql ="select id from students where reg_id = ? && name = ?";
    let query = connection.query(sql,[reg_id,student_name],(err,result)=>{
        if(err){
            console.error(err.stack);
            return;
        }else{
            if(result.length == 0){
                console.log('student does not exist...');
                res.status(400).send({message:'student does not exists...'})

            }else{
                let student_id = result[0].id;
                let sql = "select id from courses where course_title = ?";
                let query = connection.query(sql,course_title,(err,result)=>{
                    if(err){
                        console.error(err.stack);
                        return;
                    }else{
                        if(result.length==0){
                            console.log('course does not exist...');
                            res.status(400).send({message:'course not available...'})

                        }else{
                            let course_id = result[0].id;
                            let sql = "select * from student_details where student_id =?";
                            let query = connection.query(sql,student_id,(err,result)=>{
                                if(err){

                                }else{
                                    if(result.length !== 0){
                                        let sql = "update student_details set  course_id = ?";
                                        let query = connection.query(sql,[course_id],(err,result)=>{
                                            if(err){
                                            console.error(err.stack);
                                            return;
                                        }else{
                                            console.log("student detail updated successfully...")
                                            res.status(200).send({message:'student details updated successfully.'})

                                        }

                                    })
                                    }else{
                                        res.status(400).send(`No Course found for ${student_name}`)
                                    }
                                }
                            })
                            
                        }
                    }
                })
            }
        }
    })
})




// Update Teacher_details
app.put('/api/putTeacherDetails/',(req,res)=>{

    let reg_id = req.body.reg_id;
    let teacher_name = req.body.name;
    let course_title = req.body.course_title;
    let sql ="select id from teachers where reg_id = ? && name = ?";
    let query = connection.query(sql,[reg_id,teacher_name],(err,result)=>{
        if(err){
            console.error(err.stack);
            return;
        }else{
            if(result.length == 0){
                console.log('teacher does not exist...');
                res.status(400).send({message:'teacher does not exists...'})

            }else{
                let teacher_id = result[0].id;
                let sql = "select id from courses where course_title = ?";
                let query = connection.query(sql,course_title,(err,result)=>{
                    if(err){
                        console.error(err.stack);
                        return;
                    }else{
                        if(result.length==0){
                            console.log('course does not exist...');
                            res.status(400).send({message:'course not available...'})

                        }else{
                            let course_id = result[0].id;
                            let sql = "select * from teacher_details where teacher_id =?";
                            let query = connection.query(sql,teacher_id,(err,result)=>{
                                if(err){

                                }else{
                                    if(result.length !== 0){
                                        let sql = "update teacher_details set  course_id = ?";
                                        let query = connection.query(sql,[course_id],(err,result)=>{
                                            if(err){
                                            console.error(err.stack);
                                            return;
                                        }else{
                                            console.log("teacher detail updated successfully...")
                                            res.status(200).send({message:'teacher details updated successfully.'})

                                        }

                                    })
                                    }else{
                                        res.status(400).send(`No Course found for ${teacher_name}`)
                                    }
                                }
                            })
                            
                        }
                    }
                })
            }
        }
    })
})


// Delete Queries
// Delete Students
app.delete('/api/deleteStudents',(req,res)=>{
    let reg_id = req.body.reg_id;
    let sql = "select * from students where reg_id = ? ";
    let query = connection.query(sql,reg_id,(err,result)=>{
        if(err){
            console.error(err.stack);
            res.status(404).send(err.stack);
            return;
        }else{
            if(result.length !== 0){
                let sql = "DELETE FROM `students` WHERE reg_id = ?";
                let query = connection.query(sql,reg_id,(err,result)=>{
                    if(err){
                        console.error(err.stack);
                        res.status(404).send(err.stack);
                        return;
                    }else{
                        console.log("student deleted successfully")
                        res.status(200).send({message:"student deleted successfully"});
                    }
                })


            }else{
                res.status(400).send({message : "Student not found"})
                console.log("student not found");
            }
        }
    })

})
// Delete Teachers
app.delete('/api/deleteTeachers/',(req,res)=>{
    let reg_id = req.body.reg_id;
    let sql = "select * from teachers where reg_id = ?";
    let query = connection.query(sql,reg_id,(err,result)=>{
        if(err){
            console.error(err.stack);
            res.status(404).send(err.stack);
            return;
        }else{
            if(result.length !== 0){
                let sql = "delete from teachers where reg_id = ?";
                let query = connection.query(sql,reg_id,(err,result)=>{
                    if(err){
                        console.error(err.stack);
                        res.status(404).send(err.stack);
                        return;
                    }else{
                        console.log("teacher deleted successfully")
                        res.status(200).send({message:"teacher deleted successfully"});
                    }
                })


            }else{
                res.status(400).send({message : "teacher not found"})
                console.log("teacher not found");
            }
        }
    })

})
// Delete Student_details
app.delete('/api/deleteStudentDetails/',(req,res)=>{
    let reg_id = req.body.reg_id;
    let course_title = req.body.course_title;
    let sql = "SELECT student_details.id,student_details.student_id,student_details.course_id,students.name,courses.course_title FROM student_details INNER JOIN students ON students.id = student_details.student_id INNER JOIN courses ON courses.id = student_details.course_id where students.reg_id = ? AND courses.course_title = ?";
    let query = connection.query(sql,[reg_id,course_title],(err,result)=>{
        if(err){
            console.error(err.stack);
            res.status(404).send(err.stack);
            return;
        }else{
            if(result.length !== 0){
                let student_details_id = result[0].id;
                console.log(result[0])
                let student_id = result[0].student_id;
                let course_id = result[0].course_id;

                let sql = "delete from student_details where id = ? && student_id = ? && course_id =?";
                let query = connection.query(sql,[student_details_id,student_id,course_id],(err,result)=>{
                    if(err){
                        console.error(err.stack);
                        res.send(404).send(err.stack);
                        return;
                    }else{
                        if(result.length !== 0){
                            res.status(200).send({message:"student details deleted successfully"})
                        }
                    }
                })
            }else{
                res.status(400).send("No data available");
            }
        }
    })       
})
// Delete Teacher_details
app.delete('/api/deleteTeacherDetails/',(req,res)=>{
    let reg_id = req.body.reg_id;
    let course_title = req.body.course_title;
    let sql = "SELECT teacher_details.id,teacher_details.teacher_id,teacher_details.course_id,teachers.name,courses.course_title FROM teacher_details INNER JOIN teachers ON teachers.id = teacher_details.teacher_id INNER JOIN courses ON courses.id = teacher_details.course_id where teachers.reg_id = ? AND courses.course_title = ?";
    let query = connection.query(sql,[reg_id,course_title],(err,result)=>{
        if(err){
            console.error(err.stack);
            res.status(404).send(err.stack);
            return;
        }else{
            if(result.length !== 0){
                let teacher_details_id = result[0].id;
                console.log(result[0])
                let teacher_id = result[0].teacher_id;
                let course_id = result[0].course_id;

                let sql = "delete from teacher_details where id = ? && teacher_id = ? && course_id = ?";
                let query = connection.query(sql,[teacher_details_id,teacher_id,course_id],(err,result)=>{
                    if(err){
                        console.error(err.stack);
                        res.send(404).send(err.stack);
                        return;
                    }else{
                        if(result.length !== 0){
                            res.status(200).send({message:"teacher details deleted successfully"})
                        }
                    }
                })
            }else{
                res.status(400).send("No data available");
            }
        }
    })       
})


app.listen(3000, function () {
    console.log('Example app listening on port 3000...!');
});
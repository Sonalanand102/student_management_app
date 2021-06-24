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
        let teacher_id = result[0];
        if(err){
            console.error(error.stack);
            return;
        }else{
            if(result.length == 0){
                console.log('teachers does not exists')
            }else{
                let sql = "select course_id from courses where course_title = ?"
                let query = connection.query(sql, course_title,(err,result) => {
                    let course_id = result[0];
                    if(err){
                        console.error(error.stack);
                        return;
                    }else{
                        if(result.length == 0){
                            console.log('course not available')
                        }else{
                            let sql = "INSERT INTO `teacher_details`(`teacher_id`, `course_id`) VALUES (?,?)";
                            let query = connection.query(sql,[teacher_id,course_id],(err,result)=>{
                                if(err){
                                    console.error(error.stack);
                                    return;
                                }else{
                                    console.log('teacher details added successfully');
                                    res.send(result);
                                }
                            })
                        }
                    }
                })
            }
        }
    })
})

app.get('/', (req,res)=>{
    res.send('hello');
})
//getting courses
app.get('/getCourses',(req,res) =>{
    let sql=`SELECT * FROM courses`;
    let query = connection.query(sql,(err,results) => {
        if(err) {
            console.error('error connecting: ' + err.stack);
            return;
          }
        
          console.log(results);
          res.send('Courses Fetched...')
    })

})

//getting courses using id
app.get('/getCourses/:id',(req,res) =>{
    let sql=`SELECT * FROM courses WHERE id = ${req.params.id}`;
    let query = connection.query(sql,(err,results) => {
        if(err) {
            console.error('error connecting: ' + err.stack);
            return;
          }
        
          console.log(results);
          res.send(`Courses Fetched... for id = ${req.params.id}`)
    })

})

//getting students
app.get('/getStudents',(req,res) =>{
    let sql=`SELECT * FROM students`;
    let query = connection.query(sql,(err,results) => {
        if(err) {
            console.error('error connecting: ' + err.stack);
            return;
          }
        
          console.log('students fetched...');
          res.send(results)
    })

})

//getting students using id
app.get('/getStudents/:id',(req,res) =>{
    let sql=`SELECT * FROM students WHERE id = ${req.params.id}`;
    let query = connection.query(sql,(err,results) => {
        if(err) {
            console.error('error connecting: ' + err.stack);
            return;
          }
        
          console.log(results);
          res.send(`Students Fetched... for id = ${req.params.id}`)
    })

})

//getting students by courseId
app.get('/getStudentsbyCourse/:courseId',(req,res) =>{
    let sql=`SELECT * FROM students WHERE course_id  = ${req.params.courseId}`;
    let query = connection.query(sql,(err,results) => {
        if(err) {
            console.error('error connecting: ' + err.stack);
            return;
          }
        
          console.log(results);
          res.send(`Courses Fetched... for course_id = ${req.params.courseId}`)
    })

})

//getting teachers
app.get('/getTeachers',(req,res) =>{
    let sql=`SELECT * FROM teachers`;
    let query = connection.query(sql,(err,results) => {
        if(err) {
            console.error('error connecting: ' + err.stack);
            return;
          }
        
          console.log(results);
          res.send('Teachers Fetched...')
    })

})

//getting teachers using id
app.get('/getTeachers/:id',(req,res) =>{
    let sql=`SELECT * FROM teachers WHERE id = ${req.params.id}`;
    let query = connection.query(sql,(err,results) => {
        if(err) {
            console.error('error connecting: ' + err.stack);
            return;
          }
        
          console.log(results);
          res.send(`Teachers Fetched... for id = ${req.params.id}`)
    })

})


app.listen(3000, function () {
    console.log('Example app listening on port 3000...!');
});
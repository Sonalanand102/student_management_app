// const mySql = require('./startUps/mySql.js');

const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('joi');
let app = express();

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
        
          console.log(results);
          res.send('Students Fetched...')
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
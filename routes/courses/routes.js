
// const showCourses = require("./helpers.js");
// const routes = require('./routes.js');
const express = require('express');
const bodyParser = require('body-parser');

let app = express();
var router = express.Router()

let courses = router.get('/', (req, res) => {
    let sql = "SELECT * FROM `courses`";
     connection.query(sql,(err,results,fields) => {
        if(err){
            console.error('error connecting: ' + err.stack);
            return;
        }
        res.send('results');
     });
});

// module.exports = courses;
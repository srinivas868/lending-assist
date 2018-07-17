//import Express from 'express';
// import mongoose from 'mongoose';
// import routes from '../client/routes';
// import serverConfig from './config';

var express = require('express')
//var mongoose = require('mongoose')
//var routes = require('../client/routes')
var serverConfig = require('./config')
// Initialize the Express App
const app = express();

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'ibmintern@2018',
  database : 'LendingAssist'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

connection.query('SELECT * from applicant_information', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0]);
});

connection.end();

app.get('/', function(req,res){
  res.sendFile(__dirname+'/client/src/index.html');
});
app.use('/assets', function(req,res,next){
  next();
});
app.get('/api/applications', function(req,res){
  const applications = [
    {"id":"100001","firstName":"user1","lastName":"sangishetty","status":"Good"},
    {"id":"100002","firstName":"user2","lastName":"sangishetty","status":"Bad"},
    {"id":"100003","firstName":"user3","lastName":"sangishetty","status":"Good"}
  ];

  var mysql      = require('mysql');
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'ibmintern@2018',
    database : 'LendingAssist'
  });

  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }

    console.log('connected as id ' + connection.threadId);
  });

  connection.query('SELECT * from applicant_information', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    res.json(results);
  });
});

// start app
app.listen(5000, (error) => {
  if (!error) {
    console.log('App is running on port: 5000'); // eslint-disable-line
  }
});

//export default app;

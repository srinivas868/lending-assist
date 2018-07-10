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

app.get('/', function(req,res){
  res.sendFile(__dirname+'/client/src/index.html');
});
app.use('/assets', function(req,res,next){
  next();
});

// start app
app.listen(5000, (error) => {
  if (!error) {
    console.log('App is running on port: 5000'); // eslint-disable-line
  }
});

//export default app;

//import Express from 'express';
// import mongoose from 'mongoose';
// import routes from '../client/routes';
// import serverConfig from './config';
//var routes = require('../client/routes')

var express = require('express')
var serverConfig = require('./config')
var fileUpload = require('express-fileupload');
var saveFileController = require('./controllers/SaveFile')
var formSubmitController = require('./controllers/FormSubmit')
var riskPredictionController = require('./controllers/WatsonStudio/RiskPrediction')
var dbConnection = require('./util/DbConnection')
var discovery = require('./util/WatsonDiscoveryConnection')
var mysql = require('mysql')
require('isomorphic-fetch')
const queryString = require('query-string')
const queryBuilder = require('./util/QueryBuilder')
const app = express();
// var user = require('./users/user')

//mysql connection
// Connect to MySQL on start
var mysql = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'ibmintern@2018',
//   database : 'LendingAssist'
// });
// var mysql = require('mysql');
var connection = mysql.createConnection({
 host     : 'sl-us-south-1-portal.29.dblayer.com',
 user     : 'interns',
 password : 'ibmintern',
 database : 'Loan_Application',
 port     : 47143,
});
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack)
      return
    }
    console.log('MySQL connected as id ' + connection.threadId)
})

dbConnection.connection = connection

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

//local strategy
passport.use(new LocalStrategy(
  function(username, password, next) {
    var sql="SELECT id, username FROM users WHERE username='"+username+"' and password='"+password+"'";                           
    dbConnection.connection.query(sql, function(err, results){    
      if(err) res.sendFile(__dirname+'/client/src/index.html');

      req.session.userId = results[0].id;
      req.session.user = results[0];
      console.log(results[0].id);
      next();        
    }); 
  }
));
//use session
app.use(session({
  secret: 'cats',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(function(email, done) {
  dbConnection.connection.query("SELECT * FROM users WHERE email='" +email+ "'", function (err, user) {
    done(err, user);
  });
});

// for user login server 
app.get('/login' , function(req,res){
  res.sendFile(__dirname+'/client/src/views/Pages/Login/login.html');
});//call for login page

app.get('/signup' , function(req,res){
  res.sendFile(__dirname+'/client/src/views/Pages/Login/signup.html');
});//call for signup page

app.post('/login', 
// passport.authenticate('local', { successRedirect: '/',
//                                                     failureRedirect: '/login',
//                                                     failureFlash: true }), 
  function(req,res){
    console.log('received')//test
    res.send('received');
  }
);

app.post('/signup', function(req,res) {
  new_user_sql = "INSERT INTO USER(Username, Password, Email) "
  +"values('"+req.body.username+"','"+req.body.password+"','"+req.body.email+"')"

  dbConnection.connect.query(new_user_sql, (err, user)=>{
    if(err) res.redirect('/signup')
    console.log(user)
  })
  res.redirect('/')
  // sendFile(__dirname+'/client/src/index.html');
});

app.get('/', function(req,res){
  res.sendFile(__dirname+'/client/src/index.html');
});

app.use(fileUpload());
app.use('/assets', function(req,res,next){
  next();
});

//applications request call
app.get('/api/applications', function(req,res){
  dbConnection.connection.query('SELECT * from Applicants_Info_Table', function (error, results, fields) {
    if (error) throw error;
    //console.log('The solution is: ', results);
    for(var i=0; i<results.length; i++)
    {
        results[i]['Full_Name'] = results[i]['First_Name']+" "+results[i]['Last_Name']
    }
    res.json(results);
  });
});

//applications request call
app.post('/api/applications/profile', function(req,res){
  var profileId = req.body.profileId
  //var profileId = 1
  console.log('received ',profileId)
  dbConnection.connection.query("SELECT * from Applicants_Info_Table where Application_ID='"+profileId+"'", function (error, results, fields) {
    if (error) throw error;
    console.log('Profile: ', results);
    res.json(results);
  });
});

app.post('/api/wds/query', function(req,res){
  const query = req.body.query
  console.log("Query ",query)
  const environmentId = discovery.environmentId;
  const collectionId = discovery.collectionId;
  queryBuilder.setEnvironmentId(environmentId);
  queryBuilder.setCollectionId(collectionId);
  discovery.query(queryBuilder.search({ natural_language_query: query }))
      .then(response => {
          //console.log("Query response ",response)
          res.json(response)
        })
      .catch(error => {
        if (error.message === 'Number of free queries per month exceeded') {
          res.status(429).json(error);
        } else {
          //res.status(error.code).json(error)
          console.log("Error ",error)
        }
      });
})

//activating controller
saveFileController(app)
formSubmitController(app)
riskPredictionController(app)
// start app
port = 3000
app.listen(port, (error) => {
  if (!error) {
    console.log('App is running on port: '+port); // eslint-disable-line
  }
});

//export default app;

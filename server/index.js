var express = require('express')
var serverConfig = require('./config')
var fileUpload = require('express-fileupload');
var saveFileController = require('./controllers/SaveFile')
var formSubmitController = require('./controllers/FormSubmit')
var riskPredictionController = require('./controllers/WatsonStudio/RiskPrediction')
var roiPredictionController = require('./controllers/WatsonStudio/ROIPrediction')
var dbConnection = require('./util/DbConnection')
var discovery = require('./util/WatsonDiscoveryConnection')
var mysql = require('mysql')
require('isomorphic-fetch')
const queryString = require('query-string')
const queryBuilder = require('./util/QueryBuilder')
const app = express();

//mysql connection
// var mysql = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'ibmintern@2018',
//   database : 'LendingAssist'
// });
// Connect to MySQL on start
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'sl-us-south-1-portal.29.dblayer.com',
  user     : 'interns',
  password : 'ibmintern',
  database : 'Loan_Application',
  port     : 47143,
});

//cross origin XMLHttpRequest Authorization
app.use(function (req, res, next) {
    //res.setHeader('Access-Control-Allow-Origin', 'https://lending-assist.mybluemix.net');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack)
      return
    }
    console.log('MySQL connected as id ' + connection.threadId)
})

dbConnection.connection = connection

app.get('/', function(req,res){
  res.sendFile(__dirname+'/client/src/index.html');
});

app.use(fileUpload());
app.use('/assets', function(req,res,next){
  next();
});

//pending applications request call
app.get('/api/pending-applications', function(req,res){
  dbConnection.connection.query('SELECT * from Applicants_Info_Table WHERE Risk_Score is null', function (error, results, fields) {
    if (error) throw error;
    //console.log('The solution is: ', results);
    for(var i=0; i<results.length; i++)
    {
        results[i]['Full_Name'] = results[i]['First_Name']+" "+results[i]['Last_Name']
    }
    res.json(results);
  });
});

//completed applications
app.get('/api/completed-applications', function(req,res){
  dbConnection.connection.query('SELECT * from Applicants_Info_Table WHERE Risk_Score is not null', function (error, results, fields) {
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
  //console.log('received ',profileId)
  dbConnection.connection.query("SELECT * from Applicants_Info_Table where Application_ID='"+profileId+"'", function (error, results, fields) {
    if (error) {console.log("Error while retrieving profile -->> ",error)}
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
roiPredictionController(app)

// start app
app.listen(8080, (error) => {
  if (!error) {
    console.log('App is running on port: 8080'); // eslint-disable-line
  }
});

//export default app;

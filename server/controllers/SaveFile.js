module.exports = function(app){

  const csv=require('csvtojson')
  var fs = require('fs')
  var dbConnection = require('../util/DbConnection')

  app.post('/api/upload-file', function(req,res){
    //console.log("File upload request received", req);
    var fileName = req.files.file.name
    var csvFile = req.files.file
    var csvFilePath = './temp/'+fileName
    var ext = fileName.substring(fileName.indexOf('.'));
    //console.log('ext',ext)
    if(ext != '.csv'){
       return res.status(500).send('File not supported');
     }

    csvFile.mv(csvFilePath, function(err) {
      if (err) {
        return res.status(500).send('Error while moving file');
      }
      //console.log('File moved')
    });

    //convert csv to json/Save to db
    dbConnection.connection.beginTransaction(function(err) {
      if (err) {
        console.log("Error while updating comments -->> ",error)
        res.json({'success':'false'})
        return
      }
      csv()
         .fromFile(csvFilePath)
         .then((jsonArray)=>{
           //console.log(json);
           jsonArray.forEach(function(json){
             log_annual_income = Math.log10(Number.parseInt(json.Annual_Income)).toFixed(2)
             console.log("log_annual_income ",log_annual_income)
             var query = "INSERT INTO Applicants_Info_Table(First_Name,Last_Name,Interest_Rate,Term,"
                      +"FICO_Score,Installment,"
                      +"Loan_Amount,"
                      +"Public_Record_Bankruptcies,Debt_to_Income_Ratio,"
                      +"Employment_Length,Annual_Income,Log_Annual_Income, Delinquent_2_Years) "
                      +"values('"+json.First_Name+"','"+json.Last_Name+"','"
                      +json.Interest_Rate+"','"+json.Term+"','"+json.FICO_Score+"','"+json.Installment+"','"+json.Loan_Amount+"','"
                      +json.Public_Record_Bankruptcies+"','"+json.Debt_to_Income_Ratio+"','"+json.Employment_Length+"','"
                      +json.Annual_Income+"','"+log_annual_income+"','"+json.Delinquent_2_Years+"')"
             query = query.replace(/undefined/g,'')
             console.log("query ",query)
             //saving to db
             dbConnection.connection.query(query, function (error,result) {
               if (error) {
                 console.log("Error -->> ",error)
                 res.json({'success':'false'})
                 return
               }
               console.log('Saved')
               json['Application_ID'] = result.insertId
             })
          })
          dbConnection.connection.commit(function(err) {
            if (err) {
              console.log('Error while committing!');
              return dbConnection.connection.rollback(function() {
                throw err;
              });
              res.json({'success':'false'})
            }
            res.json({'applications':jsonArray,'success':'true'})
            console.log('success!');
          });
      })
    })

    //delete uploaded file
    fs.exists(csvFilePath, function(exists) {
        if (exists) {
          // fs.unlink(csvFilePath, function(err) {
          //   if (err) console.log("Error while deleting file")
          //   console.log('Deleted!!');
          // });
        }
    });
    //res.json({"success":true})
  });
}

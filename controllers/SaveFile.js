module.exports = function(app){

  const csv=require('csvtojson')
  var fs = require('fs')
  var dbConnection = require('../util/DbConnection')

  app.post('/api/upload-file', function(req,res){
    console.log("File upload request received", req);
    var fileName = req.files.file.name
    var csvFile = req.files.file
    var csvFilePath = './temp/'+fileName
    var ext = fileName.substring(fileName.indexOf('.'));
    console.log('ext',ext)
    if(ext != '.csv'){
       return res.status(500).send('File not supported');
     }

    csvFile.mv(csvFilePath, function(err) {
      if (err) {
        return res.status(500).send('Error while moving file');
      }
      console.log('File moved')
    });

    //test db DbConnection
    //convert csv to json
    csv()
       .fromFile(csvFilePath)
       .then((jsonArray)=>{
         //console.log(json);
         jsonArray.forEach(function(json){
           var query = "INSERT INTO Applicants_Info_Table(First_Name,Last_Name,Date_of_Birth,Occupation,"
                    +"Telephone_Number,Application_Type,Loan_Amount,Loan_Grade,Loan_Sub_Grade,Home_Ownership,"
                    +"Verification_Status,Purpose,Public_Record_Bankruptcies,Debt_to_Income_Ratio,Open_Account,"
                    +"Revolving_Utilization,Annual_Income,Total_Accounts,Employment_Length,Account_Now_Delinquent,Delinquent_Amount,Delinquent_2_Years) "
                    +"values('"+json.First_Name+"','"+json.Last_Name+"','"
                    +json.Date_of_Birth+"','"+json.Occupation+"','"+json.Telephone_Number.replace(/-/g,'')+"','"
                    +json.Application_Type+"','"+json.Loan_Amount+"','"+json.Loan_Grade+"','"
                    +json.Loan_Sub_Grade+"','"+json.Home_Ownership+"','"+json.Verification_Status+"','"
                    +json.Purpose+"','"+json.Public_Record_Bankruptcies+"','"+json.Debt_to_Income_Ratio+"','"
                    +json.Open_Account+"','"+json.Revolving_Utilization+"','"+json.Annual_Income+"','"
                    +json.Total_Accounts+"','"+json.Employment_Length+"','"+json.Account_Now_Delinquent+"','"
                    +json.Delinquent_Amount+"','"+json.Delinquent_2_Years+"')"

           //saving to db
           dbConnection.connection.query(query, function (error) {
             if (error) throw error;
             console.log('Saved');
           });
           console.log("Query ",query)
         })
       });

    //delete uploaded file
    fs.exists(csvFilePath, function(exists) {
        if (exists) {
          fs.unlink(csvFilePath, function(err) {
            if (err) {
                console.log("Error while deleting file")
            }
            console.log('Deleted!!');
          });
        }
    });
    res.json({"success":true})
  });
}

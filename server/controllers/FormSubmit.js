module.exports = function(app){

  var dbConnection = require('../util/DbConnection')

  app.post('/api/add/form-submit', function(req,res){
    console.log("Form submit request received");
    //test db DbConnection
    if(req.body.annual_income > 0){
      log_annual_income = Math.log10(req.body.annual_income)
    }
    var query = "INSERT INTO Applicants_Info_Table(First_Name,Last_Name,"
             +"Loan_Amount,Public_Record_Bankruptcies,Debt_to_Income_Ratio,"
             +"Employment_Length,"
             +"Interest_Rate,Term,FICO_Score,Annual_Income,Log_Annual_Income,Installment, Delinquent_2_Years) "
             +"values('"+req.body.first_name+"','"+req.body.last_name+"','"
             +req.body.loan_amount+"','"+req.body.pub_rec_bankruptcies+"','"
             +req.body.debt_to_income_ratio+"','"+req.body.employment_length+"','"
             +req.body.interest_rate+"','"+req.body.term+"','"
             +req.body.fico_score+"','"+req.body.annual_income+"','"+log_annual_income+"','"
             +req.body.installment+"','"+req.body.delinq_2yrs+"')"

    query = query.replace(/undefined/g,'')
    console.log('query ',query)
    //saving to db
    dbConnection.connection.query(query, function (error, result) {
        if (error) throw error;
        console.log('Saved');
        res.json({"profileId":result.insertId})
    })
  })

  app.post('/api/update/form-submit', function(req,res){
    console.log("Update form submit request received");
    if(req.body.annual_income > 0){
      log_annual_income = Math.log10(req.body.annual_income).toFixed(2)
    }
    else{
      log_annual_income = 0
    }
    var query = "UPDATE Applicants_Info_Table SET "
             +"First_Name='"+req.body.first_name+"',Last_Name='"+req.body.last_name+"',"
             +"Loan_Amount='"+req.body.loan_amount+"',"
             +"Public_Record_Bankruptcies='"+req.body.pub_rec_bankruptcies+"',Debt_to_Income_Ratio='"+req.body.debt_to_income_ratio+"',"
             +"Employment_Length='"+req.body.employment_length+"',Annual_Income='"+req.body.annual_income+"',Log_Annual_Income='"+log_annual_income+"',"
             +"Interest_Rate='"+req.body.interest_rate+"',Term='"+req.body.term+"',"
             +"FICO_Score='"+req.body.fico_score+"',Installment='"+req.body.installment+"',Delinquent_2_Years='"+req.body.delinq_2yrs+"' "
             +"WHERE Application_ID='"+req.body.application_id+"'"
    query = query.replace(/undefined/g,'')
    console.log('query ',query)
    //update in db
    dbConnection.connection.query(query, function (error, result) {
        if (error) throw error;
        console.log('Saved');
        res.json({"profileId":req.body.application_id})
    })
  })

  app.post('/api/comments/form-submit', function(req,res){
    console.log("Comments form submit request received");
    var text = req.body.comments
    var query = "UPDATE Applicants_Info_Table SET Comments='"+text+"' WHERE Application_ID='"+req.body.application_id+"'"
    query = query.replace(/undefined/g,'')
    //update in db
    dbConnection.connection.query(query, function (error, result) {
        if (error) throw error;
        console.log('Saved');
        res.json({"comments":text})
    })
  })
}

module.exports = function(app){

  var dbConnection = require('../util/DbConnection')

  app.post('/api/add/form-submit', function(req,res){
    console.log("Form submit request received");
    //test db DbConnection
    var query = "INSERT INTO Applicants_Info_Table(First_Name,Last_Name,Date_of_Birth,Occupation,"
             +"Telephone_Number,Application_Type,Loan_Amount,Loan_Grade,Loan_Sub_Grade,Home_Ownership,"
             +"Verification_Status,Purpose,Public_Record_Bankruptcies,Debt_to_Income_Ratio,Open_Account,"
             +"Revolving_Utilization,Annual_Income,Total_Accounts,Employment_Length,Account_Now_Delinquent,Delinquent_Amount,Delinquent_2_Years) "
             +"values('"+req.body.first_name+"','"+req.body.last_name+"','"+req.body.dob+"','','','"
             +req.body.application_type+"','"+req.body.loan_amount+"','"
             +req.body.grade+"','"+req.body.sub_grade+"','"+req.body.home_ownership+"','"
             +req.body.verification_status+"','"+req.body.purpose+"','"+req.body.pub_rec_bankruptcies+"','"
             +req.body.debt_to_income_ratio+"','"+req.body.open_accounts+"','"+req.body.revoling_utilization+"','"
             +req.body.annual_income+"','"+req.body.total_accounts+"','"+req.body.employment_length+"','"
             +req.body.acc_now_delinq+"','"+req.body.delinquent_amount+"','"+req.body.delinquent_2_years+"')"

    query = query.replace(/undefined/g,'')
    console.log('query ',query)
    //saving to db
    dbConnection.connection.query(query, function (error, result) {
        if (error) throw error;
        console.log('Saved');
        res.json({"profileId":result.insertId})
    })
  })
}

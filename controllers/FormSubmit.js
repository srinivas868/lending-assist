module.exports = function(app){

  var dbConnection = require('../util/DbConnection')

  app.post('/api/add/form-submit', function(req,res){
    console.log("Form submit request received");
    //test db DbConnection
    var query = "INSERT INTO Applicants_Info_Table(First_Name,Last_Name,Date_of_Birth,Occupation,"
             +"Telephone_Number,Application_Type,Loan_Amount,Loan_Grade,Loan_Sub_Grade,Home_Ownership,"
             +"Verification_Status,Purpose,Public_Record_Bankruptcies,Debt_to_Income_Ratio,Open_Account,"
             +"Revolving_Utilization,Annual_Income,Total_Accounts,Employment_Length,Account_Now_Delinquent,Delinquent_Amount,Delinquent_2_Years,Log_Annual_Income) "
             +"values('"+req.body.first_name+"','"+req.body.last_name+"','"+req.body.dob+"','','','"
             +req.body.application_type+"','"+req.body.loan_amount+"','"
             +req.body.grade+"','"+req.body.grade+req.body.sub_grade+"','"+req.body.home_ownership+"','"
             +req.body.verification_status+"','"+req.body.purpose+"','"+req.body.pub_rec_bankruptcies+"','"
             +req.body.debt_to_income_ratio+"','"+req.body.open_accounts+"','"+req.body.revoling_utilization+"','"
             +req.body.annual_income+"','"+req.body.total_accounts+"','"+req.body.employment_length+"','"
             +req.body.acc_now_delinq+"','"+req.body.delinquent_amount+"','"+req.body.delinquent_2_years+"','"+req.body.log_annual_income+"')"

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

    var query = "UPDATE Applicants_Info_Table SET "
             +"First_Name='"+req.body.first_name+"',Last_Name='"+req.body.last_name+"',Date_of_Birth='"+req.body.dob+"',"
             +"Application_Type='"+req.body.application_type+"',Loan_Amount='"+req.body.loan_amount+"',Loan_Grade='"+req.body.grade+"',"
             +"Loan_Sub_Grade='"+req.body.grade+req.body.sub_grade+"',Home_Ownership='"+req.body.home_ownership+"',Verification_Status='"+req.body.verification_status+"',"
             +"Purpose='"+req.body.purpose+"',Public_Record_Bankruptcies='"+req.body.pub_rec_bankruptcies+"',Debt_to_Income_Ratio='"+req.body.debt_to_income_ratio+"',"
             +"Open_Account='"+req.body.open_accounts+"',Address_State='"+req.body.state+"',Revolving_Utilization='"+req.body.revoling_utilization+"',"
             +"Annual_Income='"+req.body.annual_income+"',Total_Accounts='"+req.body.total_accounts+"',Employment_Length='"+req.body.employment_length+"',"
             +"Account_Now_Delinquent='"+req.body.acc_now_delinq+"',Delinquent_Amount='"+req.body.delinquent_amount+"',Delinquent_2_Years='"+req.body.delinquent_2_years+"',"
             +"Log_Annual_Income='"+req.body.log_annual_income+"',Interest_Rate='"+req.body.interest_rate+"',Term='"+req.body.term+"',"
             +"FICO_Score='"+req.body.fico_score+"',Installment='"+req.body.installment+"' "
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
}

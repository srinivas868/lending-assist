module.exports = function(app){

  var dbConnection = require('../../util/DbConnection')
  var WatsonStudioConnection = require('../../util/WatsonStudioConnection')

  app.post('/api/watson-studio/risk-prediction', function(request,response){
    console.log("Risk prediction request received "+request.body.application);
    var application = JSON.parse(request.body.application)
    WatsonStudioConnection.authenticate(
    	function (res) {
            let parsedGetResponse;
            try {
                parsedGetResponse = JSON.parse(this.responseText);
                console.log("Authentication response ",parsedGetResponse)
            } catch(ex) {
                console.log("Error ",ex)
            }
            if (parsedGetResponse && parsedGetResponse.token) {
                const token = parsedGetResponse.token
                const wmlToken = "Bearer " + token;

                // NOTE: manually define and pass the array(s) of values to be scored in the next line
    			      var pl = '{"fields": ["loan_amnt", "term", "int_rate", "installment", "emp_length", "dti", "pub_rec_bankruptcies", "log_annual_inc", "fico_score"], '
                                +'"values": [['+application.Loan_Amount+','+application.Term+','+application.Interest_Rate+','
                                +application.Installment+','+application.Employment_Length+','+application.Debt_to_Income_Ratio+','
                                +application.Public_Record_Bankruptcies+','+application.Log_Annual_Income+','+application.FICO_Score+']]}'

                const payload = pl.replace(/null/g,'0')
                console.log("payload ",payload)

                WatsonStudioConnection.score(wmlToken, payload, function (resp) {
                    let parsedPostResponse, risk_score;
                    try {
                        parsedPostResponse = JSON.parse(this.responseText)
                        if(parsedPostResponse){
                          risk_score = parsedPostResponse.values[0][13][1]
                          risk_score = parseFloat(Math.round(risk_score * 100)).toFixed(2)
                        }
                        response.json({"result":parsedPostResponse,"risk_score":risk_score})
                    } catch (ex) {
                        console.log("Error ",ex)
                    }
                    console.log("Scoring response");
                    console.log(parsedPostResponse);

                    //save prediction to
                    var query = "UPDATE Applicants_Info_Table SET Risk_Score='"+risk_score+"' WHERE Application_ID='"+application.Application_ID+"'"
                    query = query.replace(/undefined/g,'')
                    //console.log('query ',query)
                    //update in db
                    dbConnection.connection.query(query, function (error, result) {
                        if (error) throw error;
                        //console.log('Saved');
                    })
                }, function (error) {
                    console.log(error);
                });
            } else {
                console.log("Failed to retrieve Bearer token");
            }
    	}, function (err) {
    		console.log(err);
    	});

  })
}

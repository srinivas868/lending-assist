module.exports = function(app){

  var dbConnection = require('../../util/DbConnection')
  var WatsonStudioConnection = require('../../util/WatsonStudioConnection')

  app.post('/api/watson-studio/roi-prediction', function(request,response){
    console.log("ROI prediction request received "+request.body.application);
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
    			      var pl = '{"fields": ["int_rate", "dti", "annual_inc", "delinq_2yrs"], '
                                +'"values": [['+application.Interest_Rate+','+application.Debt_to_Income_Ratio+','+application.Annual_Income+','
                                +application.Delinquent_2_Years+']]}'

                const payload = pl.replace(/null/g,'0')
                console.log("payload ",payload)

                WatsonStudioConnection.roiScore(wmlToken, payload, function (resp) {
                    let parsedPostResponse, risk_score, roi;
                    try {
                        parsedPostResponse = JSON.parse(this.responseText)
                        if(parsedPostResponse){
                          roi = parsedPostResponse.values[0][5] % 1
                          roi = parseFloat(roi * 100).toFixed(2)
                        }
                        response.json({"result":parsedPostResponse,"roi":roi})
                    } catch (ex) {
                        console.log("Error ",ex)
                    }
                    console.log("Scoring response");
                    console.log(parsedPostResponse);

                    //save prediction to
                    var query = "UPDATE Applicants_Info_Table SET ROI='"+roi+"' WHERE Application_ID='"+application.Application_ID+"'"
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

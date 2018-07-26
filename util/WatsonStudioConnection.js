var wml_service_credentials = require('./json/wml_service_credentials.json')
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const btoa = require("btoa");

module.exports = {
  authenticate : function(loadCallback, errorCallback){
  	const oReq = new XMLHttpRequest();
  	const tokenHeader = "Basic " + btoa((wml_service_credentials.username + ":" + wml_service_credentials.password));
  	const tokenUrl = wml_service_credentials.url + "/v3/identity/token";

  	oReq.addEventListener("load", loadCallback);
  	oReq.addEventListener("error", errorCallback);
  	oReq.open("GET", tokenUrl);
  	oReq.setRequestHeader("Authorization", tokenHeader);
  	oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  	oReq.send();
  },
  score: function (token, payload, loadCallback, errorCallback){
  	const oReq = new XMLHttpRequest();
  	oReq.addEventListener("load", loadCallback);
  	oReq.addEventListener("error", errorCallback);
  	oReq.open("POST", wml_service_credentials.scoring_url);
  	oReq.setRequestHeader("Accept", "application/json");
  	oReq.setRequestHeader("Authorization", token);
  	oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  	oReq.send(payload);
  }};

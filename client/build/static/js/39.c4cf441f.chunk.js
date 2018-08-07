webpackJsonp([39],{282:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),c=n.n(r),s=n(9),i=n(3),m=n.n(i),u=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),p=n(100),d=function(e){function t(e){a(this,t);var n=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.toggleLoanInfo=n.toggleLoanInfo.bind(n),n.toggleLoanResults=n.toggleLoanResults.bind(n),n.handleRunPrediction=n.handleRunPrediction.bind(n),n.handleCommentsSubmit=n.handleCommentsSubmit.bind(n),n.toggleComments=n.toggleComments.bind(n),n.showPrediction=n.showPrediction.bind(n),n.state={collapseLoanInfo:!1,collapseResults:!1,collapseNoPrediction:!1,collapsePrediction:!1,fadeIn:!0,timeout:300,status:"Closed",applications:[],profileId:n.props.match.params.id,activeTab:"1",risk_score:"",roi:"",result:null,collapseCommentsForm:!1,collapseCommentsContent:!1,comments:""},n}return o(t,e),u(t,[{key:"toggle",value:function(e){this.state.activeTab!==e&&this.setState({activeTab:e})}},{key:"toggleLoanInfo",value:function(){this.setState({collapseLoanInfo:!this.state.collapseLoanInfo,collapseResults:!1})}},{key:"showPrediction",value:function(){this.setState({collapseNoPrediction:!1,collapsePrediction:!0})}},{key:"toggleLoanResults",value:function(){this.setState({collapseLoanInfo:!1,collapseResults:!this.state.collapseResults})}},{key:"toggleComments",value:function(){this.setState({collapseCommentsContent:!this.state.collapseCommentsContent,collapseCommentsForm:!this.state.collapseCommentsForm})}},{key:"componentDidMount",value:function(){var e=this,t=new FormData;console.log("Mount ",this.state.profileId),t.append("profileId",this.state.profileId),fetch(p.root_url+"/api/applications/profile",{method:"POST",body:t}).then(function(t){t.json().then(function(t){e.setState({applications:t,risk_score:t[0].Risk_Score,roi:t[0].ROI}),e.setState({collapseCommentsContent:""!=t[0].Comments}),e.setState({collapseCommentsForm:""==t[0].Comments}),e.setState({comments:t[0].Comments}),console.log("Comments ",e.state.comments),e.state.risk_score>0&&e.state.roi>0?e.setState({collapseNoPrediction:!1,collapsePrediction:!0}):e.setState({collapseNoPrediction:!0,collapsePrediction:!1})})})}},{key:"handleRunPrediction",value:function(){var e=this,t=new FormData;console.log("App ",this.state.applications[0]),t.append("application",JSON.stringify(this.state.applications[0]));fetch(p.root_url+"/api/watson-studio/risk-prediction",{method:"POST",body:t}).then(function(t){t.json().then(function(t){console.log("Body ",t.risk_score),e.setState({risk_score:t.risk_score})})}),fetch(p.root_url+"/api/watson-studio/roi-prediction",{method:"POST",body:t}).then(function(t){t.json().then(function(t){console.log("Body ",t.roi),e.setState({roi:t.roi})})}),this.showPrediction(),this.toggle("2")}},{key:"handleCommentsSubmit",value:function(e){var t=this,n=new FormData(e.target);e.preventDefault(),console.log("Handle ",n.comments),fetch(p.root_url+"/api/comments/form-submit",{method:"POST",body:n}).then(function(e){e.json().then(function(e){t.toggleComments(),t.setState({comments:e.comments})})})}},{key:"render",value:function(){var e=this;return c.a.createElement("div",{className:"animated fadeIn"},c.a.createElement(s.i,{style:{width:"70%",margin:"0px auto"}},c.a.createElement(s.n,null),c.a.createElement(s.j,null,c.a.createElement(s._6,{className:"align-items-center"},c.a.createElement(s.t,{col:"12",xl:!0,className:"mb-3 mb-xl-0"},this.state.applications.map(function(e){return c.a.createElement("h3",null,e.First_Name," ",e.Last_Name," ")})),c.a.createElement(s.t,{col:"2",xl:!0,className:"mb-3 mb-xl-0"},this.state.applications.map(function(e){return c.a.createElement(s.e,{color:"primary",href:"/#/applications/update/"+e.Application_ID,style:{float:"right"},size:"lg"},"Edit this application")}))),c.a.createElement("p",null,"You can review the application here and run the prediction button at the bottom"),c.a.createElement(s.T,{tabs:!0},c.a.createElement(s.U,null,c.a.createElement(s.V,{className:m()({active:"1"===this.state.activeTab}),onClick:function(){e.toggle("1")}},"Application Info")),c.a.createElement(s.U,null,c.a.createElement(s.V,{className:m()({active:"2"===this.state.activeTab}),onClick:function(){e.toggle("2")}},"Prediction results")),c.a.createElement(s.U,null,c.a.createElement(s.V,{className:m()({active:"3"===this.state.activeTab}),onClick:function(){e.toggle("3")}},"Comments"))),c.a.createElement(s._7,{activeTab:this.state.activeTab},c.a.createElement(s._8,{tabId:"1"},c.a.createElement(s._9,{responsive:!0},c.a.createElement("tbody",null,this.state.applications.map(function(e){return c.a.createElement("tr",null,c.a.createElement("td",null,c.a.createElement("strong",null,"Name ")),c.a.createElement("td",null,e.First_Name," ",e.Last_Name))}),this.state.applications.map(function(e){return c.a.createElement("tr",null,c.a.createElement("td",null,c.a.createElement("strong",null,"Loan amount ")),c.a.createElement("td",null,"$",e.Loan_Amount))}),this.state.applications.map(function(e){return c.a.createElement("tr",null,c.a.createElement("td",null,c.a.createElement("strong",null,"Interest rate :")),c.a.createElement("td",null,e.Interest_Rate,"%"))}),this.state.applications.map(function(e){return c.a.createElement("tr",null,c.a.createElement("td",null,c.a.createElement("strong",null,"Term :")),c.a.createElement("td",null,e.Term," months"))}),this.state.applications.map(function(e){return c.a.createElement("tr",null,c.a.createElement("td",null,c.a.createElement("strong",null,"FICO Score :")),c.a.createElement("td",null,e.FICO_Score))}),this.state.applications.map(function(e){return c.a.createElement("tr",null,c.a.createElement("td",null,c.a.createElement("strong",null,"Installment :")),c.a.createElement("td",null,"$",e.Installment," per month"))}),this.state.applications.map(function(e){return c.a.createElement("tr",null,c.a.createElement("td",null,c.a.createElement("strong",null,"Annual Income :")),c.a.createElement("td",null,"$",e.Annual_Income))}),this.state.applications.map(function(e){return c.a.createElement("tr",null,c.a.createElement("td",null,c.a.createElement("strong",null,"Log Annual Income :")),c.a.createElement("td",null,e.Log_Annual_Income))}),this.state.applications.map(function(e){return c.a.createElement("tr",null,c.a.createElement("td",null,c.a.createElement("strong",null,"Public record bankruptcies :")),c.a.createElement("td",null,e.Public_Record_Bankruptcies))}),this.state.applications.map(function(e){return c.a.createElement("tr",null,c.a.createElement("td",null,c.a.createElement("strong",null,"Debt to income ratio :")),c.a.createElement("td",null,e.Debt_to_Income_Ratio,"%"))}),this.state.applications.map(function(e,t){return c.a.createElement("tr",{key:t},c.a.createElement("td",null,c.a.createElement("strong",null,"Employment length :")),c.a.createElement("td",null,e.Employment_Length," years"))}),this.state.applications.map(function(e,t){return c.a.createElement("tr",{key:t},c.a.createElement("td",null,c.a.createElement("strong",null,"Delinquencies in past 2 Years :")),c.a.createElement("td",null,e.Delinquent_2_Years))}))),c.a.createElement("div",{align:"center"},c.a.createElement(s.e,{color:"primary",onClick:this.handleRunPrediction,style:{marginBottom:"1rem",margin:"0 auto",width:"50%"}},"Run prediction"))),c.a.createElement(s._8,{tabId:"2"},c.a.createElement("h4",null,"Prediction results"),c.a.createElement("br",null),c.a.createElement(s.u,{isOpen:this.state.collapseNoPrediction},c.a.createElement(s._6,null,c.a.createElement(s.t,{col:"12",xl:!0,className:"mb-3 mb-xl-0"},c.a.createElement("p",null,"You have not run the prediction yet. Use the button on the right")),c.a.createElement(s.t,{col:"2",xl:!0,className:"mb-3 mb-xl-0"},c.a.createElement(s.e,{color:"primary",onClick:this.handleRunPrediction,style:{float:"right",marginBottom:"1rem",margin:"0 auto",width:"50%"}},"Run prediction")))),c.a.createElement(s.u,{isOpen:this.state.collapsePrediction},c.a.createElement(s._9,{responsive:!0},c.a.createElement("tbody",null,c.a.createElement("tr",null,c.a.createElement("td",null,c.a.createElement("strong",null,"Risk Prediction "),c.a.createElement("br",null),c.a.createElement("b",null),c.a.createElement("p",null,"There is a ",c.a.createElement("b",null,this.state.risk_score,"%")," chance this loan will be charged-off")),c.a.createElement("td",{style:{"padding-top":"5%"}},c.a.createElement("div",{style:{float:"left","margin-right":"5%"}},c.a.createElement("p",{style:{"font-size":"small"}},c.a.createElement("b",null,"Good"))),c.a.createElement("div",{style:{float:"right","margin-left":"5%"}},c.a.createElement("p",{style:{"font-size":"small"}},c.a.createElement("b",null,"Risky"))),c.a.createElement(s._5,{animated:!0,color:this.state.risk_score>30?"danger":"success",value:this.state.risk_score},c.a.createElement("b",null,this.state.risk_score,"%")))),c.a.createElement("tr",null,c.a.createElement("td",null,c.a.createElement("strong",null,"Return on Investment "),c.a.createElement("p",null,"You will receive ",c.a.createElement("b",null,this.state.roi,"%")," return on investment")),c.a.createElement("td",{style:{"padding-top":"5%"},align:"center"},c.a.createElement("b",null,this.state.roi,"%"))))))),c.a.createElement(s._8,{tabId:"3"},c.a.createElement(s.u,{isOpen:this.state.collapseCommentsForm},c.a.createElement(s.B,{id:"comments",onSubmit:this.handleCommentsSubmit,method:"post",encType:"multipart/form-data",className:"form-horizontal"},c.a.createElement(s.j,null,c.a.createElement(s.D,{row:!0},c.a.createElement(s.t,{md:"4"},c.a.createElement(s.K,{htmlFor:"file-input"},"Feedback")),c.a.createElement(s.t,{xs:"12",md:"8"},c.a.createElement(s.F,{type:"textarea",name:"comments",id:"comments",rows:"9",placeholder:"Write something..."})))),c.a.createElement(s.l,null,c.a.createElement(s._6,{className:"align-items-center"},c.a.createElement(s.t,{col:"12",xl:!0,className:"mb-3 mb-xl-0"},c.a.createElement(s.e,{type:"submit",block:!0,color:"success"},c.a.createElement("i",{className:"fa fa-dot-circle-o"})," Submit")),c.a.createElement(s.t,{col:"12",xl:!0,className:"mb-3 mb-xl-0"},c.a.createElement(s.e,{type:"reset",onClick:this.toggleComments,block:!0,color:"danger"},c.a.createElement("i",{className:"fa fa-ban"})," Cancel")))),this.state.applications.map(function(e){return c.a.createElement(s.F,{type:"hidden",name:"application_id",id:"application-id",value:e.Application_ID})}))),c.a.createElement(s.u,{isOpen:this.state.collapseCommentsContent},c.a.createElement("p",{style:{float:"left"}},"Click button on the right to update comments"),c.a.createElement(s.e,{color:"primary",onClick:this.toggleComments,style:{float:"right"},size:"sm"},"Update comments"),c.a.createElement(s._9,{responsive:!0},c.a.createElement("tbody",null,c.a.createElement("tr",null,c.a.createElement("td",null,c.a.createElement("strong",null,"Comments ")),c.a.createElement("td",null,this.state.comments))))))))))}}]),t}(r.Component);t.default=d}});
//# sourceMappingURL=39.c4cf441f.chunk.js.map
webpackJsonp([5],{284:function(e,t,l){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function r(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o=l(0),s=l.n(o),c=l(9),u=l(553),i=l.n(u),m=function(){function e(e,t){for(var l=0;l<t.length;l++){var n=t[l];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,l,n){return l&&e(t.prototype,l),n&&e(t,n),t}}(),p=l(100),h=function(e){function t(e){n(this,t);var l=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return l.toggleStory=l.toggleStory.bind(l),l.setSearchOutput=l.setSearchOutput.bind(l),l.toggleSearchResults=l.toggleSearchResults.bind(l),l.handleFormSubmit=l.handleFormSubmit.bind(l),l.state={collapseResults:!1,test_results:[{title:"ABC",text:"Text 1",url:"http://www.google.com"},{title:"ABC",text:"Text 2",url:"http://www.google.com"}],searchOutput:null,results:[],collapseStories:[],collapse:!1,accordion:[!0,!1,!1]},l}return r(t,e),m(t,[{key:"toggleSearchResults",value:function(){this.setState({collapseResults:!0})}},{key:"toggleStory",value:function(e){console.log("Toggle ",this.state.collapseStories)}},{key:"setSearchOutput",value:function(e){this.setState({results:e.results}),console.log("Search ",this.state.searchOutput)}},{key:"handleFormSubmit",value:function(e){var t=this,l=new FormData(e.target);e.preventDefault(),fetch(p.root_url+"/api/wds/query",{method:"POST",body:l}).then(function(e){e.json().then(function(e){console.log("Body ",e.results),t.setSearchOutput(e),console.log("Body output ",t.state.searchOutput),t.setSearchOutput(e),t.toggleSearchResults()})})}},{key:"render",value:function(){var e=this;if(this.state.results){var t=new Array(this.state.results.length).fill(!0);this.state.collapseStories=t}return console.log("boolArray ",this.state.collapseStories),s.a.createElement("div",{className:"animated fadeIn"},s.a.createElement(c.i,null,s.a.createElement(c.n,null,s.a.createElement("h1",null,"Watson Discovery Service")),s.a.createElement(c.j,null,s.a.createElement(c._6,null,s.a.createElement("div",{style:{width:"80%",marginLeft:"1%"}},s.a.createElement("p",null,"Watson Discovery Service brings you all the relevant news from the industry, helping you perform more in-depth market research."))),s.a.createElement("div",{style:{display:"flex",justifyContent:"center"}},s.a.createElement("img",{style:{width:"15%",height:"15%"},align:"center",src:i.a})),s.a.createElement("br",null),s.a.createElement(c._6,{style:{width:"50%",margin:"0px auto"}},s.a.createElement(c.B,{onSubmit:this.handleFormSubmit,method:"post",encType:"multipart/form-data",style:{display:"contents"}},s.a.createElement(c.F,{type:"text",id:"query",name:"query",placeholder:"Search",required:!0,style:{width:"90%"}}),s.a.createElement(c.e,{type:"submit",style:{display:"contents"}},s.a.createElement("i",{style:{marginTop:"0.5rem",float:"left",marginLeft:"1%"},className:"icon-magnifier icons font-2xl d-block"})))),s.a.createElement("br",null),s.a.createElement(c.u,{isOpen:this.state.collapseResults},s.a.createElement("h4",null,"Top stories"),s.a.createElement(c.i,null,s.a.createElement(c.j,null,s.a.createElement("div",{id:"accordion"},this.state.results.map(function(t,l){return s.a.createElement(c.i,null,s.a.createElement(c.n,null,s.a.createElement("h5",{style:{textAlign:"center"}},t.title)),s.a.createElement(c.u,{isOpen:e.state.collapseStories[l],"data-parent":"#accordion",id:"collapseOne","aria-labelledby":"headingOne"},s.a.createElement(c.j,null,s.a.createElement(c._9,{responsive:!0},s.a.createElement("tbody",null,s.a.createElement("tr",null,s.a.createElement("td",null,s.a.createElement("strong",null,"Description ")),s.a.createElement("td",null,t.text)),s.a.createElement("tr",null,s.a.createElement("td",null,s.a.createElement("strong",null,"url ")),s.a.createElement("td",null,s.a.createElement("a",{href:t.url,target:"_blank"},t.url))),s.a.createElement("tr",null,s.a.createElement("td",null,s.a.createElement("strong",null,"Sentiment ")),s.a.createElement("td",null,t.enriched_text.sentiment.document.label)))))))}))))))))}}]),t}(o.Component);t.default=h},553:function(e,t,l){e.exports=l.p+"static/media/wds_logo.fad3a0e4.png"}});
//# sourceMappingURL=5.d8a6ee2f.chunk.js.map
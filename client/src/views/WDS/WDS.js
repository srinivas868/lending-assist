import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Form, Button, Input,  ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Collapse} from 'reactstrap';
import logo from '../../assets/img/wds_logo.png'

class WDS extends Component {

  constructor(props) {
    super(props);

    this.toggleStory = this.toggleStory.bind(this);
    this.setSearchOutput = this.setSearchOutput.bind(this);
    this.toggleSearchResults = this.toggleSearchResults.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this)

    this.state = {
      collapseResults: false,
      test_results:[{'title':'ABC','text':'Text 1','url':'http://www.google.com'},
              {'title':'ABC','text':'Text 2','url':'http://www.google.com'}],
      searchOutput: null,
      results:[],
      collapseStories: [],
      collapse: false,
      accordion: [true, false, false],
    };
  }

  toggleSearchResults(){
    this.setState({collapseResults:true})
  }

  toggleStory(index){
    //this.state.collapseStories[index] = !this.state.collapseStories[index]
    //const prevState = this.state.collapseStories;
    //const state = prevState.map((x, index) => tab === index ? !x : false);
    //this.state.collapseStories[index] = true
    console.log("Toggle ",this.state.collapseStories)
  }

  setSearchOutput(searchOutput){
    this.setState({results:searchOutput.results})
    console.log("Search ",this.state.searchOutput)
  }
  // addStoryOutput(){
  //   var anyBoxesChecked = new Array(numeroPerguntas).fill(false);
  //   this.state.collapseStories.push(false)
  // }

  // showResults(){
  //   this.setState({collapseResults: true})
  // }


  handleFormSubmit(event){
    const data = new FormData(event.target)
    event.preventDefault()
    //console.log("App ",this.state.applications[0])
    fetch('/api/wds/query', {
        method: 'POST',
        body: data,
        }).then((response) => {
        response.json().then((body) => {
          console.log("Body ",body.results)
          //this.setState({results:body.results})
          this.setSearchOutput(body)
          console.log("Body output ",this.state.searchOutput)
          this.setSearchOutput(body)
          this.toggleSearchResults()
        });
      });
    //window.location.href = '/#/applications/profile'
  }

  render(){
      if(this.state.results){
        var boolArray = new Array(this.state.results.length).fill(true)
        this.state.collapseStories = boolArray
      }
      console.log("boolArray ",this.state.collapseStories)
      return (
        <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <h1>Watson Discovery Service</h1>
          </CardHeader>
          <CardBody>
            <Row>
              <div style={{width:'80%','margin-left':'1%'}}>
                <p>Watson Discovery Service brings you all the relevant news from the industry, helping you perform more in-depth market research.</p>
              </div>
            </Row>
            <div style={{'display': 'flex', 'justify-content': 'center'}}>
              <img style={{width:'15%',height:'15%'}} align="center" src={logo}/>
            </div><br/>
            <Row style={{width: '50%',margin: '0px auto'}}>
              <Form onSubmit={this.handleFormSubmit} method="post" encType="multipart/form-data" style={{display: 'contents'}}>
                  <Input type="text" id="query" name="query" placeholder="Search" required style={{width: '90%'}}/>
                  <Button type="submit" style={{display: 'contents'}}>
                    <i style={{'margin-top': '0.5rem', float: 'left', 'margin-left': '1%'}} className="icon-magnifier icons font-2xl d-block"></i>
                  </Button>
              </Form>
            </Row><br/>
            <Collapse isOpen={this.state.collapseResults}>
            <h4>Top stories</h4>
            <Card>
              <CardBody>
              <div id="accordion">
                {this.state.results.map((result,index) => (
                  <Card>
                    <CardHeader>
                        <h5 style={{'text-align': 'center'}}>{result.title}</h5>
                    </CardHeader>
                    <Collapse isOpen={this.state.collapseStories[index]} data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne">
                      <CardBody>
                      <Table responsive>
                        <tbody>
                          <tr>
                            <td><strong>Description </strong></td>
                            <td>{result.text}</td>
                          </tr>
                          <tr>
                            <td><strong>url </strong></td>
                            <td><a href={result.url} target="_blank">{result.url}</a></td>
                          </tr>
                          <tr>
                            <td><strong>Sentiment </strong></td>
                            <td>{result.enriched_text.sentiment.document.label}</td>
                          </tr>
                        </tbody>
                      </Table>
                      </CardBody>
                    </Collapse>
                  </Card>
                ))}
              </div>
              </CardBody>
            </Card>
            </Collapse>
        </CardBody>
        </Card>
        </div>
      )
    }
}

export default WDS;

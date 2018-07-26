import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Input,  ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText} from 'reactstrap';
import logo from '../../assets/img/wds_logo.png'

class WDS extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    //this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      collapseResults: [],
      results:[{'title':'ABC','text':'Text 1','url':'http://www.google.com'},
              {'title':'ABC','text':'Text 1','url':'http://www.google.com'}]
    };
  }

  // showResults(){
  //   this.setState({collapseResults: true})
  // }

  render(){
      return (
        <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <h1>Watson Discovery Services</h1>
          </CardHeader>
          <CardBody>
            <Row>
              <Col style={{width:'70%'}} col="12" xl className="mb-3 mb-xl-0">
                <p>Watson Discovery Services brings you all the relevant news from the industry, helping you perform more in-depth marekt research.</p>
              </Col>
              <Col style={{width:'30%'}} col="2" xl className="mb-3 mb-xl-0">
                <Button color="primary" target="_blank" href="https://www.ibm.com/watson/services/discovery/" style={{float:'right'}} size="lg">Learn More About WDS</Button><br/><br/><br/>
              </Col>
            </Row>
            <div style={{'display': 'flex', 'justify-content': 'center'}}>
              <img style={{width:'15%',height:'15%'}} align="center" src={logo}/>
            </div><br/>
            <Row>
              <Col style={{width:'95%'}} col="12" xl className="mb-3 mb-xl-0">
                <Input type="text" id="name" placeholder="Search" required />
              </Col>
              <Col style={{width:'5%'}} col="12" xl className="mb-3 mb-xl-0">
                <i style={{'margin-top': '0.5rem'}} className="icon-magnifier icons font-2xl d-block"></i>
              </Col>
            </Row>
            {/*{this.state.results.map((result, index) => (
              <Card>
                <CardHeader id={"result"index}>
                  <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(2)} aria-expanded={this.state.accordion[2]} aria-controls="collapseThree">
                    {result.title}
                  </Button>
                </CardHeader>
                <Collapse isOpen={this.state.collapseResults[2]} data-parent="#accordion" id="collapseThree">
                  <CardBody>
                    3. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non
                    cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
                    on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
                    nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                    beer farm-to-table, raw denim aesthetic synth nesciunt you probably havent heard of them accusamus labore sustainable VHS.
                  </CardBody>
                </Collapse>
              </Card>
            ))}*/}
        </CardBody>
        </Card>
        </div>
      )
    }
}

export default WDS;

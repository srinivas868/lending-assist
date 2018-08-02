import React, { Component } from 'react';
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import application_info_dictionary from '../../../assets/application_info_dictionary.json';
import classnames from 'classnames';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import '../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.js';

function actionFormatter(cell, row) {
  //console.log("Cell ",cell)
    return (
      <a href={"/#/applications/profile/"+cell} rel="noreferrer noopener" target="_blank" className="card-header-action">
        <i className="fa fa-edit fa-lg"></i>
      </a>
    );
}

class Add extends Component {
  constructor(props) {
    super(props)

    this.toggleUploadPreview = this.toggleUploadPreview.bind(this)
    this.handleUploadFile = this.handleUploadFile.bind(this)
    this.toggle = this.toggle.bind(this)
    this.state = {
      collapseUploadPreview: false,
      collapseUploadForm: true,
      fadeIn: true,
      timeout: 300,
      status: 'Closed',
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  toggleUploadPreview() {
    this.setState(
      { collapseUploadForm: false,
        collapseUploadPreview: true })
  }

  setApplicationsData(applications) {
    this.setState(
      { applications: applications })
  }

  handleUploadFile(event){
    //console.log("Submitting file ...")
    event.preventDefault()
    const data = new FormData(event.target);
    //console.log("Request ",data)
    //data.append('file', this.uploadInput[0]);
    fetch('/api/upload-file', {
        method: 'POST',
        body: data,
        }).then((response) => {
        response.json().then((body) => {
          if(body.success == 'true'){
            this.toggleUploadPreview()
            this.setApplicationsData(body.applications)
            alert("File submitted successfully!")
          }
          else{
            alert("Bad file!")
          }
          //console.log("Upload fetched",body.applications)
        });
      });
  }

  handleFormSubmit(event){
    event.preventDefault()
    const data = new FormData(event.target)
    fetch('/api/add/form-submit', {
        method: 'POST',
        body: data,
        }).then((response) => {
        response.json().then((body) => {
          //alert("Submit "+body.profileId)
          window.location.href = '/#/applications/profile/'+body.profileId
        });
      });
    //window.location.href = '/#/applications/profile'
  }

  render() {
    const options = {
      sizePerPage:5,
      hideSizePerPage: true,
      clearSearch: true
    }
    return (
      <div className="animated fadeIn">
            <Card style={{width:'70%',margin:'0px auto'}}>
              <CardHeader>
                <strong>ADD NEW APPLICATION</strong>
              </CardHeader>
              <br/>
              <CardBody>
                <Nav tabs>
                  <NavItem>
                    <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
                      Form
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
                      Upload
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <Form onSubmit={this.handleFormSubmit} method="post" encType="multipart/form-data" className="form-horizontal">
                      <CardBody>
                        <FormGroup row>
                          <Col md="4">
                            <Label htmlFor="first-name">First Name</Label>
                          </Col>
                          <Col xs="12" md="8">
                            <Input type="text" id="first-name" name="first_name" placeholder="Enter a text" required/>
                            <FormText className="help-block">For example: Alex, Roy, etc.</FormText>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md="4">
                            <Label htmlFor="last-name">Last Name</Label>
                          </Col>
                          <Col xs="12" md="8">
                            <Input type="text" id="last-name" name="last_name" placeholder="Enter a text" />
                            <FormText className="help-block">For example: Watson</FormText>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md="4">
                              <Label htmlFor="text-input">Loan amount</Label>
                          </Col>
                          <Col xs="12" md="8">
                            <InputGroup className="input-prepend">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>$</InputGroupText>
                              </InputGroupAddon>
                              <Input type="number" id="loan-amount" name="loan_amount" placeholder="Enter a number" />
                            </InputGroup>
                            <FormText className="help-block">For example: $10000</FormText>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md="4">
                            <Label htmlFor="interest-rate">Interest rate</Label>
                          </Col>
                          <Col xs="12" md="8">
                            <InputGroup className="input-prepend">
                              <Input type="text" id="interest-rate" name="interest_rate" placeholder="Enter a number" />
                              <InputGroupAddon addonType="append">
                                <InputGroupText>%</InputGroupText>
                              </InputGroupAddon>
                            </InputGroup>
                            <FormText className="help-block">For example: 12%</FormText>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md="4">
                            <Label htmlFor="term">Term</Label>
                          </Col>
                          <Col xs="12" md="8">
                          <InputGroup className="input-prepend">
                            <Input type="text" id="term" name="term" placeholder="Enter a number" />
                            <InputGroupAddon addonType="append">
                              <InputGroupText>months</InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                          <FormText className="help-block">For example: 36 months</FormText>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md="4">
                            <Label htmlFor="last-name">FICO Score</Label>
                          </Col>
                          <Col xs="12" md="8">
                            <Input type="text" id="fico-score" name="fico_score" placeholder="Enter a number" />
                            <FormText className="help-block">For example: 724</FormText>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md="4">
                            <Label htmlFor="installment">Installment</Label>
                          </Col>
                          <Col xs="12" md="8">
                          <InputGroup className="input-prepend">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>$</InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" id="installment" name="installment" placeholder="Enter a number" />
                          </InputGroup>
                          <FormText className="help-block">For example: $300</FormText>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md="4">
                            <Label htmlFor="last-name">Annual Income</Label>
                          </Col>
                          <Col xs="12" md="8">
                            <InputGroup className="input-prepend">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>$</InputGroupText>
                              </InputGroupAddon>
                              <Input type="text" id="log-annual-income" name="annual_income" placeholder="Enter a number" />
                            </InputGroup>
                            <FormText className="help-block">For example: $80000</FormText>
                          </Col>
                        </FormGroup>
                        {/*<FormGroup row>
                          <Col md="4">
                            <Label htmlFor="date-input">Date of birth</Label>
                          </Col>
                          <Col xs="12" md="8">
                            <Input type="date" id="dob" name="dob" placeholder="date" />
                            <FormText className="help-block">For example: 08/01/1990</FormText>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md="4">
                            <Label htmlFor="select">Grade</Label>
                          </Col>
                          <Col xs="3" md="3">
                            <Input type="select" name="grade" id="grade" bsSize="sm">
                              <option value="" disabled selected>Please select</option>
                              {application_info_dictionary.grades.map((grade, index) => (
                                <option key={index} value={grade.code}>{grade.code}</option>
                              ))}
                            </Input>
                          </Col>
                          <Col md="2">
                            <Label htmlFor="select">Sub Grade</Label>
                          </Col>
                          <Col xs="3" md="3">
                            <Input type="select" name="sub_grade" id="sub-grade" bsSize="sm">
                              <option value="" disabled selected>Please select</option>
                              {application_info_dictionary.subGrades.map((subGrade, index) => (
                                <option key={index} value={subGrade.code}>{subGrade.code}</option>
                              ))}
                            </Input>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md="4">
                            <Label htmlFor="select">Home Ownership</Label>
                          </Col>
                          <Col xs="12" md="8">
                            <Input type="select" name="home_ownership" id="home-ownership" bsSize="sm">
                              <option value="" disabled selected>Please select</option>
                              {application_info_dictionary.homeOwnerships.map((homeOwnership, index) => (
                                <option key={index} value={homeOwnership.code}>{homeOwnership.code}</option>
                              ))}
                            </Input>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md="4">
                            <Label htmlFor="select">Verification Status</Label>
                          </Col>
                          <Col xs="12" md="8">
                            <Input type="select" name="verification_status" id="verification-status" bsSize="sm">
                              <option value="" disabled selected>Please select</option>
                              {application_info_dictionary.verificationStatus.map((status, index) => (
                                <option key={index} value={status.code}>{status.code}</option>
                              ))}
                            </Input>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md="4">
                            <Label htmlFor="select">Purpose</Label>
                          </Col>
                          <Col xs="12" md="8">
                            <Input type="select" name="purpose" id="purpose" bsSize="sm">
                              <option value="" disabled selected>Please select</option>
                              {application_info_dictionary.purposes.map((purpose, index) => (
                                <option key={index} value={purpose.code}>{purpose.code}</option>
                              ))}
                            </Input>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md="4">
                            <Label htmlFor="select">State</Label>
                          </Col>
                          <Col xs="12" md="8">
                            <Input type="select" name="state" id="state" bsSize="sm">
                              <option value="" disabled selected>Please select</option>
                              {application_info_dictionary.stateCodes.map((stateCode, index) => (
                                <option key={index} value={stateCode.code}>{stateCode.name}</option>
                              ))}
                            </Input>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md="4">
                            <Label htmlFor="select">Application type</Label>
                          </Col>
                          <Col xs="12" md="8">
                            <Input type="select" name="application_type" id="application-type" bsSize="sm">
                              <option value="" disabled selected>Please select</option>
                              {application_info_dictionary.applicationTypes.map((type, index) => (
                                <option key={index} value={type.code}>{type.code}</option>
                              ))}
                            </Input>
                          </Col>
                        </FormGroup>*/}
                        <FormGroup row>
                          <Col md="4">
                            <Label htmlFor="text-input">Public record bankruptcies</Label>
                          </Col>
                          <Col xs="12" md="8">
                            <Input type="text" id="pub-rec-bankruptcies" name="pub_rec_bankruptcies" placeholder="Enter a number" />
                            <FormText className="help-block">For example: 1</FormText>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md="4">
                            <Label htmlFor="text-input">Debt to income ratio</Label>
                          </Col>
                          <Col xs="12" md="8">
                            <InputGroup className="input-prepend">
                              <Input type="text" id="debt-to-income-ratio" name="debt_to_income_ratio" placeholder="Enter a number" />
                              <InputGroupAddon addonType="append">
                                <InputGroupText>%</InputGroupText>
                              </InputGroupAddon>
                            </InputGroup>
                            <FormText className="help-block">For example: 23%</FormText>
                          </Col>
                        </FormGroup>
                        {/*<FormGroup row>
                          <Col md="4">
                            <Label htmlFor="text-input">Number of open accounts</Label>
                          </Col>
                          <Col xs="12" md="8">
                            <Input type="number" id="open-accounts" name="open_accounts" placeholder="Enter a number" />
                            <FormText className="help-block">For example: 2</FormText>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md="4">
                            <Label htmlFor="text-input">Revolving utilization</Label>
                          </Col>
                          <Col xs="12" md="8">
                            <Input type="number" id="revoling-utilization" name="revoling_utilization" placeholder="Enter a number" />
                            <FormText className="help-block">For example: 2</FormText>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md="4">
                            <Label htmlFor="text-input">Annual income</Label>
                          </Col>
                          <Col xs="12" md="8">
                            <InputGroup className="input-prepend">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>$</InputGroupText>
                              </InputGroupAddon>
                              <Input type="number" id="annual-income" name="annual_income" placeholder="Enter a number" />
                            </InputGroup>
                            <FormText className="help-block">For example: $80000</FormText>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md="4">
                            <Label htmlFor="text-input">Total number of accounts</Label>
                          </Col>
                          <Col xs="12" md="8">
                            <Input type="number" id="total-accounts" name="total_accounts" placeholder="Enter a number" />
                            <FormText className="help-block">For example: 3</FormText>
                          </Col>
                        </FormGroup>*/}
                        <FormGroup row>
                          <Col md="4">
                            <Label htmlFor="text-input">Employment length</Label>
                          </Col>
                          <Col xs="12" md="8">
                            <InputGroup className="input-prepend">
                              <Input type="text" id="employment-length" name="employment_length" placeholder="Enter a number" />
                              <InputGroupAddon addonType="append">
                                <InputGroupText>years</InputGroupText>
                              </InputGroupAddon>
                            </InputGroup>
                            <FormText className="help-block">For example: 4 years</FormText>
                          </Col>
                        </FormGroup>
                        {/*<FormGroup row>
                          <Col md="4">
                            <Label htmlFor="text-input">Account now delinquent</Label>
                          </Col>
                          <Col xs="12" md="8">
                            <Input type="number" id="acc-now-delinq" name="acc_now_delinq" placeholder="Enter a number" />
                            <FormText className="help-block">For example: 2</FormText>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md="4">
                            <Label htmlFor="text-input">Delinquent amount</Label>
                          </Col>
                          <Col xs="12" md="8">
                            <InputGroup className="input-prepend">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>$</InputGroupText>
                              </InputGroupAddon>
                              <Input type="number" id="delinquent-amount" name="delinquent_amount" placeholder="Enter a number" />
                            </InputGroup>
                            <FormText className="help-block">For example: $1000</FormText>
                          </Col>
                        </FormGroup>*/}
                        <FormGroup row>
                          <Col md="4">
                            <Label htmlFor="text-input">Delinquencies in past 2 Years</Label>
                          </Col>
                          <Col xs="12" md="8">
                            <Input type="number" id="delinquent-2-years" name="delinq_2yrs" placeholder="Enter a number" />
                            <FormText className="help-block">For example: 2</FormText>
                          </Col>
                        </FormGroup>
                      </CardBody>
                      <CardFooter>
                        <Row className="align-items-center">
                          <Col col="12" xl className="mb-3 mb-xl-0">
                            <Button type="submit" block color="success"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                          </Col>
                          <Col col="12" xl className="mb-3 mb-xl-0">
                            <Button type="reset" block color="danger"><i className="fa fa-ban"></i> Reset</Button>
                          </Col>
                        </Row>
                      </CardFooter>
                    </Form>
                  </TabPane>
                  <TabPane tabId="2">
                    <Collapse isOpen={this.state.collapseUploadForm}>
                      <Form id="upload-file" onSubmit={this.handleUploadFile} method="post" encType="multipart/form-data" className="form-horizontal">
                    <CardBody>
                        <FormGroup row>
                          <Col md="4">
                            <Label htmlFor="file-input">Upload file</Label>
                          </Col>
                          <Col xs="12" md="8">
                            <Input type="file" id="file" name="file" />
                          </Col>
                        </FormGroup>
                    </CardBody>
                    <CardFooter>
                      <Row className="align-items-center">
                        <Col col="12" xl className="mb-3 mb-xl-0">
                          <Button type="submit" block color="success"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                        </Col>
                        <Col col="12" xl className="mb-3 mb-xl-0">
                          <Button type="reset" block color="danger"><i className="fa fa-ban"></i> Reset</Button>
                        </Col>
                      </Row>
                    </CardFooter>
                      </Form><br/>
                    </Collapse>
                    <Collapse isOpen={this.state.collapseUploadPreview}>
                      <p><b>Uploaded Applications</b></p>
                      <BootstrapTable data={this.state.applications} striped hover pagination options={options} headerStyle={ { 'font-size': '13px' } }>
                         <TableHeaderColumn dataField='First_Name' thStyle={ { 'text-align': 'center' } } tdStyle={ { 'text-align': 'center' } } dataSort>Name</TableHeaderColumn>
                         <TableHeaderColumn dataField='Loan_Amount' thStyle={ { 'text-align': 'center' } } tdStyle={ { 'text-align': 'center' } } dataSort>Loan Amount ($)</TableHeaderColumn>
                         <TableHeaderColumn dataField='Interest_Rate' thStyle={ { 'text-align': 'center' } } tdStyle={ { 'text-align': 'center'} } dataSort>Interest rate (%)</TableHeaderColumn>
                         <TableHeaderColumn dataField='FICO_Score' thStyle={ { 'text-align': 'center' } } tdStyle={ { 'text-align': 'center' } } dataSort>FICO Score</TableHeaderColumn>
                         <TableHeaderColumn isKey dataField='Application_ID' thStyle={ { 'text-align': 'center',width:'10%' } } tdStyle={ { 'text-align': 'center',width:'10%' } } dataFormat={ actionFormatter } dataSort></TableHeaderColumn>
                     </BootstrapTable>
                    </Collapse>
                  </TabPane>
                </TabContent>
                </CardBody>
            </Card>
      </div>
    );
  }
}

export default Add;

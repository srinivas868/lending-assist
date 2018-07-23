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
import application_info_dictionary from '../../../assets/application_info_dictionary.json';

class Add extends Component {
  constructor(props) {
    super(props)

    this.toggleForm = this.toggleForm.bind(this)
    this.toggleUpload = this.toggleUpload.bind(this)
    this.handleUploadFile = this.handleUploadFile.bind(this)
    this.state = {
      collapseForm: false,
      collapseUpload: false,
      fadeIn: true,
      timeout: 300,
      status: 'Closed',
    };
  }

  toggleForm() {
    this.setState(
      { collapseForm: !this.state.collapseForm,
        collapseUpload: false
      });
  }

  toggleUpload() {
    this.setState(
      { collapseForm: false,
        collapseUpload: !this.state.collapseUpload
      });
  }

  handleUploadFile(event){
    console.log("Submitting file ...")
    event.preventDefault()
    const data = new FormData(event.target);
    console.log("Request ",data)
    //data.append('file', this.uploadInput[0]);
    fetch('/api/upload-file', {
        method: 'POST',
        body: data,
        }).then((response) => {
        response.json().then((body) => {
          alert("Submitted")
          response.redirect('/applications/manage')
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
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="24" md="6" style={{margin:'0 auto'}}>
            <Card>
              <CardHeader>
                <strong>ADD NEW APPLICATION</strong>
              </CardHeader>
              <br/>
              <Button color="primary" onClick={this.toggleForm} style={{ marginBottom: '1rem' }}>Show form</Button>
              <Collapse isOpen={this.state.collapseForm} onEntering={this.onEntering} onEntered={this.onEntered} onExiting={this.onExiting} onExited={this.onExited}>
                <Form onSubmit={this.handleFormSubmit} method="post" encType="multipart/form-data" className="form-horizontal">
                <CardBody>
                    <FormGroup row>
                      <Col md="4">
                        <Label htmlFor="first-name">First Name</Label>
                      </Col>
                      <Col xs="12" md="8">
                        <Input type="text" id="first-name" name="first_name" placeholder="Enter a text" />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="4">
                        <Label htmlFor="last-name">Last Name</Label>
                      </Col>
                      <Col xs="12" md="8">
                        <Input type="text" id="last-name" name="last_name" placeholder="Enter a text" />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="4">
                        <Label htmlFor="date-input">Date of birth</Label>
                      </Col>
                      <Col xs="12" md="8">
                        <Input type="date" id="dob" name="dob" placeholder="date" />
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
                          <Input type="number" id="loan-amount" name="loan_amount" placeholder="" />
                        </InputGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="4">
                        <Label htmlFor="text-input">Public record bankruptcies</Label>
                      </Col>
                      <Col xs="12" md="8">
                        <Input type="number" id="pub-rec-bankruptcies" name="pub_rec_bankruptcies" placeholder="Enter a number" />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="4">
                        <Label htmlFor="text-input">Debt to income ratio</Label>
                      </Col>
                      <Col xs="12" md="8">
                        <InputGroup className="input-prepend">
                          <Input type="number" id="debt-to-income-ratio" name="debt_to_income_ratio" placeholder="" />
                          <InputGroupAddon addonType="append">
                            <InputGroupText>%</InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="4">
                        <Label htmlFor="text-input">Number of open accounts</Label>
                      </Col>
                      <Col xs="12" md="8">
                        <Input type="number" id="open-accounts" name="open_accounts" placeholder="Enter a number" />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="4">
                        <Label htmlFor="text-input">Revolving utilization</Label>
                      </Col>
                      <Col xs="12" md="8">
                        <Input type="number" id="revoling-utilization" name="revoling_utilization" placeholder="Enter a number" />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="4">
                        <Label htmlFor="text-input">Annual income</Label>
                      </Col>
                      <Col xs="12" md="8">
                        <Input type="number" id="annual-income" name="annual_income" placeholder="Enter a number" />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="4">
                        <Label htmlFor="text-input">Total number of accounts</Label>
                      </Col>
                      <Col xs="12" md="8">
                        <Input type="number" id="total-accounts" name="total_accounts" placeholder="Enter a number" />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="4">
                        <Label htmlFor="text-input">Employment length</Label>
                      </Col>
                      <Col xs="12" md="8">
                        <Input type="number" id="employment-length" name="employment_length" placeholder="Enter a number" />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="4">
                        <Label htmlFor="text-input">Account now delinquent</Label>
                      </Col>
                      <Col xs="12" md="8">
                        <Input type="number" id="acc-now-delinq" name="acc_now_delinq" placeholder="Enter a number" />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="4">
                        <Label htmlFor="text-input">Delinquent amount</Label>
                      </Col>
                      <Col xs="12" md="8">
                        <Input type="number" id="delinquent-amount" name="delinquent_amount" placeholder="Enter a number" />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="4">
                        <Label htmlFor="text-input">Delinquent 2 Years</Label>
                      </Col>
                      <Col xs="12" md="8">
                        <Input type="number" id="delinquent-2-years" name="delinquent_2_years" placeholder="Enter a number" />
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
              </Collapse>
              <Button color="primary" onClick={this.toggleUpload} style={{ marginBottom: '1rem' }}>Upload file</Button>
              <Collapse isOpen={this.state.collapseUpload} onEntering={this.onEntering} onEntered={this.onEntered} onExiting={this.onExiting} onExited={this.onExited}>
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
                </Form>
              </Collapse>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Add;

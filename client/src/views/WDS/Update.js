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

class Update extends Component {
  constructor(props) {
    super(props)

    this.toggleForm = this.toggleForm.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.state = {
      collapseForm: false,
      collapseUpload: false,
      fadeIn: true,
      timeout: 300,
      status: 'Closed',
      applications: [],
      profileId: this.props.match.params.id
    };
  }

  toggleForm() {
    this.setState(
      { collapseForm: !this.state.collapseForm,
        collapseUpload: false
      });
  }

  componentDidMount(){
    const data = new FormData()
    console.log("Mount ",this.state.profileId)
    data.append('profileId', this.state.profileId)
    fetch('/api/applications/profile',{
        method: 'POST',
        body: data,
        })
      .then(res => res.json())
      .then(applications => this.setState({applications:applications}, () => console.log("Fetched ")));
  }

  handleFormSubmit(event){
    event.preventDefault()
    const data = new FormData(event.target)
    fetch('/api/update/form-submit', {
        method: 'POST',
        body: data,
        }).then((response) => {
        response.json().then((body) => {
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
                <strong>UPDATE APPLICATION</strong>
              </CardHeader>
              <br/>
              <Form onSubmit={this.handleFormSubmit} method="post" encType="multipart/form-data" className="form-horizontal">
                <CardBody>
                    <FormGroup row>
                      <Col md="4">
                        <Label htmlFor="first-name">First Name</Label>
                      </Col>
                      <Col xs="12" md="8">
                        {this.state.applications.map((application,index) => (
                          <Input key={index}type="text" id="first-name" defaultValue={application.First_Name} name="first_name" placeholder="Enter a text" />
                        ))}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="4">
                        <Label htmlFor="last-name">Last Name</Label>
                      </Col>
                      <Col xs="12" md="8">
                        {this.state.applications.map((application,index) => (
                          <Input type="text" id="last-name" name="last_name" defaultValue={application.Last_Name} placeholder="Enter a text" />
                        ))}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="4">
                        <Label htmlFor="date-input">Date of birth</Label>
                      </Col>
                      <Col xs="12" md="8">
                        {this.state.applications.map((application,index) => (
                          <Input type="date" id="dob" name="dob" value='{application.Date_of_Birth}' />
                        ))}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="4">
                        <Label htmlFor="select">Grade</Label>
                      </Col>
                      <Col xs="3" md="3">
                        {this.state.applications.map((application,index) => (
                          <Input type="select" name="grade" id="grade" bsSize="sm">
                            <option value="" disabled selected>Please select</option>
                            {application_info_dictionary.grades.map((grade, index) => (
                              <option key={index} selected={grade.code == application.Loan_Grade} value={grade.code}>{grade.code}</option>
                            ))}
                          </Input>
                        ))}
                      </Col>
                      <Col md="2">
                        <Label htmlFor="select">Sub Grade</Label>
                      </Col>
                      <Col xs="3" md="3">
                        {this.state.applications.map((application,index) => (
                          <Input type="select" name="sub_grade" id="sub-grade" bsSize="sm">
                            <option value="" disabled selected>Please select</option>
                            {application_info_dictionary.subGrades.map((subGrade, index) => (
                              <option key={index} selected={subGrade.code === application.Loan_Sub_Grade[1]} value={subGrade.code}>{subGrade.code}</option>
                            ))}
                          </Input>
                        ))}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="4">
                        <Label htmlFor="select">Home Ownership</Label>
                      </Col>
                      <Col xs="12" md="8">
                        {this.state.applications.map((application,index) => (
                          <Input type="select" name="home_ownership" id="home-ownership" bsSize="sm">
                            <option value="" disabled selected>Please select</option>
                            {application_info_dictionary.homeOwnerships.map((homeOwnership, index) => (
                              <option key={index} selected={homeOwnership.code == application.Home_Ownership} value={homeOwnership.code}>{homeOwnership.code}</option>
                            ))}
                          </Input>
                        ))}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="4">
                        <Label htmlFor="select">Verification Status</Label>
                      </Col>
                      <Col xs="12" md="8">
                        {this.state.applications.map((application,index) => (
                          <Input type="select" name="verification_status" id="verification-status" bsSize="sm">
                            <option value="" disabled selected>Please select</option>
                            {application_info_dictionary.verificationStatus.map((status, index) => (
                              <option key={index} selected={status.code == application.Verification_Status} value={status.code}>{status.code}</option>
                            ))}
                          </Input>
                        ))}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="4">
                        <Label htmlFor="select">Purpose</Label>
                      </Col>
                      <Col xs="12" md="8">
                        {this.state.applications.map((application,index) => (
                          <Input type="select" name="purpose" id="purpose" bsSize="sm">
                            <option value="" disabled selected>Please select</option>
                            {application_info_dictionary.purposes.map((purpose, index) => (
                              <option key={index} selected={purpose.code == application.Purpose} value={purpose.code}>{purpose.code}</option>
                            ))}
                          </Input>
                        ))}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="4">
                        <Label htmlFor="select">State</Label>
                      </Col>
                      <Col xs="12" md="8">
                        {this.state.applications.map((application,index) => (
                          <Input type="select" name="state" id="state" bsSize="sm">
                            <option value="" disabled selected>Please select</option>
                            {application_info_dictionary.stateCodes.map((stateCode, index) => (
                              <option key={index} selected={stateCode.code == application.Address_State} value={stateCode.code}>{stateCode.name}</option>
                            ))}
                          </Input>
                        ))}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="4">
                        <Label htmlFor="select">Application type</Label>
                      </Col>
                      <Col xs="12" md="8">
                        {this.state.applications.map((application,index) => (
                          <Input type="select" name="application_type" id="application-type" bsSize="sm">
                            <option value="" disabled selected>Please select</option>
                            {application_info_dictionary.applicationTypes.map((type, index) => (
                              <option key={index} selected={type.code == application.Application_Type} value={type.code}>{type.code}</option>
                            ))}
                          </Input>
                        ))}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="4">
                          <Label htmlFor="text-input">Loan amount</Label>
                      </Col>
                      <Col xs="12" md="8">
                        {this.state.applications.map((application,index) => (
                          <InputGroup className="input-prepend">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>$</InputGroupText>
                            </InputGroupAddon>
                            <Input type="number" id="loan-amount" defaultValue={application.Loan_Amount} name="loan_amount" placeholder="" />
                          </InputGroup>
                        ))}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="4">
                        <Label htmlFor="text-input">Public record bankruptcies</Label>
                      </Col>
                      <Col xs="12" md="8">
                        {this.state.applications.map((application,index) => (
                          <Input type="number" id="pub-rec-bankruptcies" defaultValue={application.Public_Record_Bankruptcies} name="pub_rec_bankruptcies" placeholder="Enter a number" />
                        ))}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="4">
                        <Label htmlFor="text-input">Debt to income ratio</Label>
                      </Col>
                      <Col xs="12" md="8">
                        {this.state.applications.map((application,index) => (
                          <InputGroup className="input-prepend">
                            <Input type="number" id="debt-to-income-ratio" defaultValue={application.Debt_to_Income_Ratio} name="debt_to_income_ratio" placeholder="" />
                            <InputGroupAddon addonType="append">
                              <InputGroupText>%</InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        ))}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="4">
                        <Label htmlFor="text-input">Number of open accounts</Label>
                      </Col>
                      <Col xs="12" md="8">
                        {this.state.applications.map((application,index) => (
                          <Input type="number" id="open-accounts" name="open_accounts" defaultValue={application.Open_Account} placeholder="Enter a number" />
                        ))}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="4">
                        <Label htmlFor="text-input">Revolving utilization</Label>
                      </Col>
                      <Col xs="12" md="8">
                        {this.state.applications.map((application,index) => (
                          <Input type="number" id="revoling-utilization" defaultValue={application.Revolving_Utilization} name="revoling_utilization" placeholder="Enter a number" />
                        ))}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="4">
                        <Label htmlFor="text-input">Annual income</Label>
                      </Col>
                      <Col xs="12" md="8">
                        {this.state.applications.map((application,index) => (
                          <Input type="number" id="annual-income" defaultValue={application.Annual_Income} name="annual_income" placeholder="Enter a number" />
                        ))}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="4">
                        <Label htmlFor="text-input">Total number of accounts</Label>
                      </Col>
                      <Col xs="12" md="8">
                        {this.state.applications.map((application,index) => (
                          <Input type="number" id="total-accounts" defaultValue={application.Total_Accounts} name="total_accounts" placeholder="Enter a number" />
                        ))}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="4">
                        <Label htmlFor="text-input">Employment length</Label>
                      </Col>
                      <Col xs="12" md="8">
                        {this.state.applications.map((application,index) => (
                          <Input type="number" id="employment-length" defaultValue={application.Employment_Length} name="employment_length" placeholder="Enter a number" />
                        ))}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="4">
                        <Label htmlFor="text-input">Account now delinquent</Label>
                      </Col>
                      <Col xs="12" md="8">
                        {this.state.applications.map((application,index) => (
                          <Input type="number" id="acc-now-delinq" defaultValue={application.Account_Now_Delinquent} name="acc_now_delinq" placeholder="Enter a number" />
                        ))}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="4">
                        <Label htmlFor="text-input">Delinquent amount</Label>
                      </Col>
                      <Col xs="12" md="8">
                        {this.state.applications.map((application,index) => (
                          <Input type="number" id="delinquent-amount" defaultValue={application.Delinquent_Amount} name="delinquent_amount" placeholder="Enter a number" />
                        ))}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="4">
                        <Label htmlFor="text-input">Delinquent 2 Years</Label>
                      </Col>
                      <Col xs="12" md="8">
                        {this.state.applications.map((application,index) => (
                          <Input type="number" id="delinquent-2-years" defaultValue={application.Delinquent_2_Years} name="delinquent_2_years" placeholder="Enter a number" />
                        ))}
                      </Col>
                    </FormGroup>
                </CardBody>
                <CardFooter>
                  <Row className="align-items-center">
                    <Col col="12" xl className="mb-3 mb-xl-0">
                      <Button type="submit" block color="success"><i className="fa fa-dot-circle-o"></i> Update</Button>
                    </Col>
                    <Col col="12" xl className="mb-3 mb-xl-0">
                      <Button type="reset" block color="danger"><i className="fa fa-ban"></i> Reset</Button>
                    </Col>
                  </Row>
                </CardFooter>
                {this.state.applications.map((application,index) => (
                  <Input key={index} type="hidden" id="application-id" value={application.Application_ID} name="application_id" />
                ))}
                </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Update;

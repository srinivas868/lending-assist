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

class Add extends Component {
  constructor(props) {
    super(props);

    this.toggleForm = this.toggleForm.bind(this);
    this.toggleUpload = this.toggleUpload.bind(this);
    this.handleUploadFile = this.handleUploadFile.bind(this);
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
    //event.preventDefault()
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
              <Button color="primary" onClick={this.toggleUpload} style={{ marginBottom: '1rem' }}>Upload file</Button>
              <Collapse isOpen={this.state.collapseForm} onEntering={this.onEntering} onEntered={this.onEntered} onExiting={this.onExiting} onExited={this.onExited}>
                <CardBody>
                  <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input">First Name</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="text-input" name="text-input" placeholder="" />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input">Last Name</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="text-input" name="text-input" placeholder="" />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="select">Grade</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="select" name="select" id="grade" bsSize="sm">
                          <option value="" disabled>Please select</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                          <option value="E">E</option>
                          <option value="F">F</option>
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="select">Sub Grade</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="select" name="select" id="sub-grade" bsSize="sm">
                          <option value="" disabled>Please select</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="select">Home Ownership</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="select" name="select" id="home-ownership" bsSize="sm">
                          <option value="" disabled>Please select</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="select">Verification Status</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="select" name="select" id="verification-status" bsSize="sm">
                          <option value="" disabled>Please select</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </Input>
                      </Col>
                    </FormGroup>
                    {/*<FormGroup row>
                      <Col md="3">
                        <Label>Radios</Label>
                      </Col>
                      <Col md="9">
                        <FormGroup check className="radio">
                          <Input className="form-check-input" type="radio" id="radio1" name="radios" value="option1" />
                          <Label check className="form-check-label" htmlFor="radio1">Option 1</Label>
                        </FormGroup>
                        <FormGroup check className="radio">
                          <Input className="form-check-input" type="radio" id="radio2" name="radios" value="option2" />
                          <Label check className="form-check-label" htmlFor="radio2">Option 2</Label>
                        </FormGroup>
                        <FormGroup check className="radio">
                          <Input className="form-check-input" type="radio" id="radio3" name="radios" value="option3" />
                          <Label check className="form-check-label" htmlFor="radio3">Option 3</Label>
                        </FormGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label>Inline Radios</Label>
                      </Col>
                      <Col md="9">
                        <FormGroup check inline>
                          <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="option1" />
                          <Label className="form-check-label" check htmlFor="inline-radio1">One</Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input className="form-check-input" type="radio" id="inline-radio2" name="inline-radios" value="option2" />
                          <Label className="form-check-label" check htmlFor="inline-radio2">Two</Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input className="form-check-input" type="radio" id="inline-radio3" name="inline-radios" value="option3" />
                          <Label className="form-check-label" check htmlFor="inline-radio3">Three</Label>
                        </FormGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3"><Label>Checkboxes</Label></Col>
                      <Col md="9">
                        <FormGroup check className="checkbox">
                          <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="option1" />
                          <Label check className="form-check-label" htmlFor="checkbox1">Option 1</Label>
                        </FormGroup>
                        <FormGroup check className="checkbox">
                          <Input className="form-check-input" type="checkbox" id="checkbox2" name="checkbox2" value="option2" />
                          <Label check className="form-check-label" htmlFor="checkbox2">Option 2</Label>
                        </FormGroup>
                        <FormGroup check className="checkbox">
                          <Input className="form-check-input" type="checkbox" id="checkbox3" name="checkbox3" value="option3" />
                          <Label check className="form-check-label" htmlFor="checkbox3">Option 3</Label>
                        </FormGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label>Inline Checkboxes</Label>
                      </Col>
                      <Col md="9">
                        <FormGroup check inline>
                          <Input className="form-check-input" type="checkbox" id="inline-checkbox1" name="inline-checkbox1" value="option1" />
                          <Label className="form-check-label" check htmlFor="inline-checkbox1">One</Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input className="form-check-input" type="checkbox" id="inline-checkbox2" name="inline-checkbox2" value="option2" />
                          <Label className="form-check-label" check htmlFor="inline-checkbox2">Two</Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input className="form-check-input" type="checkbox" id="inline-checkbox3" name="inline-checkbox3" value="option3" />
                          <Label className="form-check-label" check htmlFor="inline-checkbox3">Three</Label>
                        </FormGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="file-input">File input</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="file" id="file-input" name="file-input" />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="file-multiple-input">Multiple File input</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="file" id="file-multiple-input" name="file-multiple-input" multiple />
                      </Col>
                    </FormGroup>
                    <FormGroup row hidden>
                      <Col md="3">
                        <Label className="custom-file" htmlFor="custom-file-input">Custom file input</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Label className="custom-file">
                          <Input className="custom-file" type="file" id="custom-file-input" name="file-input" />
                          <span className="custom-file-control"></span>
                        </Label>
                      </Col>
                    </FormGroup>*/}
                  </Form>
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
              </Collapse>
              <Collapse isOpen={this.state.collapseUpload} onEntering={this.onEntering} onEntered={this.onEntered} onExiting={this.onExiting} onExited={this.onExited}>
                <Form id="upload-file" onSubmit={this.handleUploadFile} method="post" encType="multipart/form-data" className="form-horizontal">
                  <CardBody>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="file-input">Upload file</Label>
                        </Col>
                        <Col xs="12" md="9">
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

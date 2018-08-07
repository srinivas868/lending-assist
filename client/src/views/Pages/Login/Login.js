import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Form } from 'reactstrap';
var config = require('../../../config')

class Login extends Component {

  // Login page event
    handleLogin(event){
      event.preventDefault()
      const data = new FormData(event.target)
      fetch(config.root_url+'/api/add/login', {
          method: 'POST',
          body: data,
          }).then((response) => {
          response.json().then((body) => {
            //alert("Submit "+body.profileId)
            if (body.success == 'true'){
              window.location.href = '/#/dashboard'
            }
            else{
              alert("Login Failed. Please try again")
              window.location.href = '/#/login'
            }
          });
        });
    }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container style={{width:'400px'}}>
          <Card>
              <Form onSubmit={this.handleLogin} method="post" encType="multipart/form-data" className="form-horizontal">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Username" name="username"/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" name="password" />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4">Login</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">Forgot password?</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Form>
              </Card>
        </Container>
      </div>
    );
  }
}

export default Login;

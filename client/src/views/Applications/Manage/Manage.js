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
  Table,
} from 'reactstrap';

class Manage extends Component {
  constructor(props) {
    super(props);

    //this.handleUploadFile = this.handleUploadFile.bind(this);
    this.toggleNew = this.toggleNew.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.state = {
      collapseNew: false,
      collapseAll: false,
      fadeIn: true,
      timeout: 300,
      status: 'Closed',
    };
  }

  toggleNew() {
    this.setState(
      { collapseNew: !this.state.collapseNew,
        collapseAll: false
      });
  }

  toggleAll() {
    this.setState(
      { collapseNew: false,
        collapseAll: !this.state.collapseAll
      });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <Button color="primary" onClick={this.toggleNew} style={{ marginBottom: '1rem' }}>Show pending applications</Button>
          </CardHeader>
          <Collapse isOpen={this.state.collapseNew}>
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Date registered</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Samppa Nori</td>
                    <td>2012/01/01</td>
                    <td>Member</td>
                    <td>
                      <Badge color="success">Active</Badge>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Collapse>
        </Card>
        <Card>
          <CardHeader>
            <Button color="primary" onClick={this.toggleAll} style={{ marginBottom: '1rem' }}>Show all applications</Button>
          </CardHeader>
          <Collapse isOpen={this.state.collapseAll}>
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Date registered</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Samppa Nori</td>
                    <td>2012/01/01</td>
                    <td>Member</td>
                    <td>
                      <Badge color="success">Active</Badge>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Collapse>
        </Card>
      </div>
    );
  }
}

export default Manage;

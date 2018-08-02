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
  Progress
} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import '../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.js';

function actionFormatter(cell, row) {
  //console.log("Cell ",cell)
    return (
      <a href={"/#/applications/profile/"+cell} rel="noreferrer noopener" className="card-header-action">
        View <i className="fa fa-send-o fa-lg"></i>
      </a>
    );
}

function moneyFormatter(cell, row) {
  console.log("Cell ",cell)
    return (
      <div>${cell}</div>
    );
}

function roiFormatter(cell, row) {
  console.log("Cell ",cell)
  if(cell === null)
    return ('Not yet predicted')
  else
    return (
      <div>{cell}%</div>
    );
}

function percentFormatter(cell, row) {
  console.log("Cell ",cell)
  if(cell === null)
    return ('Not available')
  else
    return (
      <div>{cell}%</div>
    );
}

function riskFormatter(cell, row) {
  if(cell === null)
    return ('Not yet predicted')
  else
  {
    if(cell < 30)
      return (
        <Progress animated color="success" value={cell}><b>{cell}%</b></Progress>
      )
    else
      return (
        <Progress animated color="danger" value={cell}><b>{cell}%</b></Progress>
      )
  }
}

class Manage extends Component {
  constructor(props) {
    super(props);

    //this.handleUploadFile = this.handleUploadFile.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.togglePending = this.togglePending.bind(this);
    this.state = {
      collapsePending: true,
      collapseCompleted: false,
      fadeIn: true,
      timeout: 300,
      status: 'Closed',
      pendingApplications: [],
      completedApplications: []
    };
  }

  togglePending() {
    this.setState(
      { collapsePending: !this.state.collapsePending,
        collapseCompleted: false
      });
  }

  toggleCompleted() {
    this.setState(
      { collapsePending: false,
        collapseCompleted: !this.state.collapseCompleted
      });
  }

  componentDidMount(){
    fetch('/api/pending-applications')
      .then(res => res.json())
      .then(applications => this.setState({pendingApplications:applications}, () => console.log("Pending applications fetched ",applications)));

      fetch('/api/completed-applications')
        .then(res => res.json())
        .then(applications => this.setState({completedApplications:applications}, () => console.log("Applications fetched ")));
  }

  render() {
    const options = {
      sizePerPage:5,
      hideSizePerPage: true,
      clearSearch: true
    }

    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <p>All loan applications need to be predicted</p>
            <Button color="primary" onClick={this.togglePending} style={{ marginBottom: '1rem' }}>Show applications</Button>
          </CardHeader>
          <Collapse isOpen={this.state.collapsePending}>
            <CardBody>
              <BootstrapTable data={this.state.pendingApplications} striped hover pagination options={options}>
                 <TableHeaderColumn dataField='Full_Name' thStyle={ { 'text-align': 'center' } } tdStyle={ { 'text-align': 'center'} } dataSort>Name</TableHeaderColumn>
                 <TableHeaderColumn dataField='Loan_Amount' thStyle={ { 'text-align': 'center' } } tdStyle={ { 'text-align': 'center'} } dataFormat={ moneyFormatter } dataSort>Loan Amount</TableHeaderColumn>
                 <TableHeaderColumn dataField='FICO_Score' thStyle={ { 'text-align': 'center' } } tdStyle={ { 'text-align': 'center' } } dataSort>FICO Score</TableHeaderColumn>
                 <TableHeaderColumn dataField='Interest_Rate' thStyle={ { 'text-align': 'center' } } tdStyle={ { 'text-align': 'center'} } dataFormat={ percentFormatter } dataSort>Interest Rate</TableHeaderColumn>
                 <TableHeaderColumn dataField='Term' thStyle={ { 'text-align': 'center' } } tdStyle={ { 'text-align': 'center'} } dataSort>Term (months)</TableHeaderColumn>
                 <TableHeaderColumn isKey dataField='Application_ID' thStyle={ { 'text-align': 'center',width:'10%' } } tdStyle={ { 'text-align': 'center',width:'10%' } } dataFormat={ actionFormatter } dataSort></TableHeaderColumn>
             </BootstrapTable>
            </CardBody>
          </Collapse>
        </Card>
        <Card>
          <CardHeader>
            <p>All loan applications completed prediction</p>
            <Button color="primary" onClick={this.toggleCompleted} style={{ marginBottom: '1rem' }}>Show applications</Button>
          </CardHeader>
          <Collapse isOpen={this.state.collapseCompleted}>
            <CardBody>
            <BootstrapTable data={this.state.completedApplications} striped hover pagination options={options}>
               <TableHeaderColumn dataField='Full_Name' thStyle={ { 'text-align': 'center' } } tdStyle={ { 'text-align': 'center'} } dataSort>Name</TableHeaderColumn>
               <TableHeaderColumn dataField='Risk_Score' thStyle={ { 'text-align': 'center' } } tdStyle={ { 'text-align': 'center' } } dataFormat={ riskFormatter } dataSort>Risk Prediction</TableHeaderColumn>
               <TableHeaderColumn dataField='ROI' thStyle={ { 'text-align': 'center' } } tdStyle={ { 'text-align': 'center' } } dataFormat={ roiFormatter } dataSort>Return on Investment</TableHeaderColumn>
               <TableHeaderColumn dataField='Loan_Amount' thStyle={ { 'text-align': 'center' } } tdStyle={ { 'text-align': 'center'} } dataFormat={ moneyFormatter } dataSort>Loan Amount</TableHeaderColumn>
               <TableHeaderColumn dataField='FICO_Score' thStyle={ { 'text-align': 'center' } } tdStyle={ { 'text-align': 'center' } } dataSort>FICO Score</TableHeaderColumn>
               <TableHeaderColumn dataField='Interest_Rate' thStyle={ { 'text-align': 'center' } } tdStyle={ { 'text-align': 'center'} } dataFormat={ percentFormatter } dataSort>Interest Rate</TableHeaderColumn>
               <TableHeaderColumn dataField='Term' thStyle={ { 'text-align': 'center' } } tdStyle={ { 'text-align': 'center'} } dataSort>Term (months)</TableHeaderColumn>
               <TableHeaderColumn isKey dataField='Application_ID' thStyle={ { 'text-align': 'center',width:'10%' } } tdStyle={ { 'text-align': 'center',width:'10%' } } dataFormat={ actionFormatter } dataSort></TableHeaderColumn>
           </BootstrapTable>
            </CardBody>
          </Collapse>
        </Card>
      </div>
    );
  }
}

export default Manage;

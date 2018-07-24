import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  //Table,
} from 'reactstrap';
import Widget03 from '../../views/Widgets/Widget03'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
//import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.js';

// import 'https://code.jquery.com/jquery-3.3.1.js';
// import 'https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js';
// import 'https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap.min.js';
// import 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css';
// import 'https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap.min.css';

var ReactBsTable = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
var ReactBsTable = window.BootstrapTable;

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

function actionFormatter(cell, row) {
  console.log("Cell ",cell)
    return (
      <a href={"/#/applications/profile/"+cell} rel="noreferrer noopener" className="card-header-action">
        <i className="fa fa-edit fa-lg"></i>
      </a>
    );
}

function riskFormatter(cell, row) {
  if(cell === null)
    return ('Not yet predicted')
  else
  {
    if(cell < 30)
      return (
        <Progress animated color="success" value={cell} className="mb-3"><b>{cell}%</b></Progress>
      )
    else
      return (
        <Progress animated color="danger" value={cell} className="mb-3"><b>{cell}%</b></Progress>
      )
  }
}

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      applications: [],
      radioSelected: 2,
      page: 0,
      rowsPerPage: 5,
    };
  }

  handleChangePage = (event, page) => {
   this.setState({ page });
 };

 handleChangeRowsPerPage = event => {
   this.setState({ rowsPerPage: event.target.value });
 };

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  componentDidMount(){
    fetch('/api/applications')
      .then(res => res.json())
      .then(applications => this.setState({applications:applications}, () => console.log("Fetched ",applications)));
  }

  render() {
    const options = {
      sizePerPage:5,
      hideSizePerPage: true,
      clearSearch: true
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardBody>
              <Row className="align-items-center">
                <Col col="12" xl className="mb-3 mb-xl-0">
                  <h3>Recent loan applications</h3>
                </Col>
                <Col col="2" xl className="mb-3 mb-xl-0">
                  <Button color="primary" href="/#/applications/add" style={{float:'right'}} size="lg">Add new application</Button><br/><br/><br/>
                </Col>
              </Row><br/>
              <BootstrapTable data={this.state.applications} striped hover pagination tableStyle={ { 'padding': '0.5rem' } } options={options} search={ true } multiColumnSearch={ true }>
                 <TableHeaderColumn isKey dataField='Application_ID' thStyle={ { 'text-align': 'center' } } tdStyle={ { 'text-align': 'center' } } dataSort>Application ID</TableHeaderColumn>
                 <TableHeaderColumn dataField='Risk_Score' thStyle={ { 'text-align': 'center' } } tdStyle={ { 'text-align': 'center' } } dataFormat={ riskFormatter } dataSort>Risk Prediction (%)</TableHeaderColumn>
                 <TableHeaderColumn dataField='Full_Name' thStyle={ { 'text-align': 'center' } } tdStyle={ { 'text-align': 'center'} } dataSort>Name</TableHeaderColumn>
                 <TableHeaderColumn dataField='Loan_Amount' thStyle={ { 'text-align': 'center' } } tdStyle={ { 'text-align': 'center'} } dataSort>Loan Amount ($)</TableHeaderColumn>
                 <TableHeaderColumn dataField='Application_ID' thStyle={ { 'text-align': 'center' } } tdStyle={ { 'text-align': 'center' } } dataFormat={ actionFormatter } dataSort></TableHeaderColumn>
             </BootstrapTable>
                {/*<Table id="example" hover responsive className="table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                  <tr>
                    <th className="text-center">Application Id</th>
                    <th className="text-center">Name</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Risk(%)</th>
                    <th className="text-center"></th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.applications.map((application, index) => (
                    <tr key={index}>
                      <td className="text-center">
                        <div>{application.Application_ID}</div>
                      </td>
                      <td className="text-center">
                        <div className="clearfix">
                            <strong>{application.First_Name} {application.Last_Name} </strong>
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="clearfix">
                            <Badge color="success">Active</Badge>
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="clearfix">
                            <strong>{application.Risk_Score}</strong>
                        </div>
                      </td>
                      <td className="text-center">
                          <a href={"/#/applications/profile/"+application.Application_ID} rel="noreferrer noopener" className="card-header-action">
                            <i className="fa fa-edit fa-lg"></i>
                          </a>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </Table>*/}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;

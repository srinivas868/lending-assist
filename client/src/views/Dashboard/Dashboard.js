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
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.js';
var config = require('../../config')

function actionFormatter(cell, row) {
  //console.log("Cell ",cell)
    return (
      <a href={"/#/applications/profile/"+cell} rel="noreferrer noopener" className="card-header-action">
        View <i className="fa fa-send-o fa-lg"></i>
      </a>
    );
}

function moneyFormatter(cell, row) {
  //console.log("Cell ",cell)
    return (
      <div>${cell}</div>
    );
}

function roiFormatter(cell, row) {
  //console.log("Cell ",cell)
  if(cell === null)
    return ('Not yet predicted')
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
    fetch(config.root_url+'/api/applications')
      .then(res => res.json())
      .then(applications => this.setState({applications:applications}));
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
              <BootstrapTable data={this.state.applications} striped hover pagination options={options} search={ true } multiColumnSearch={ true }>
                <TableHeaderColumn dataField='Full_Name' thStyle={ { 'textAlign': 'center' } } tdStyle={ { 'textAlign': 'center'} } dataSort>Name</TableHeaderColumn>
                 <TableHeaderColumn dataField='Risk_Score' thStyle={ { 'textAlign': 'center' } } tdStyle={ { 'textAlign': 'center' } } dataFormat={ riskFormatter } dataSort>Risk Prediction</TableHeaderColumn>
                 <TableHeaderColumn dataField='ROI' thStyle={ { 'textAlign': 'center' } } tdStyle={ { 'textAlign': 'center'} } dataFormat={ roiFormatter } dataSort>Return on Investment</TableHeaderColumn>
                 <TableHeaderColumn dataField='Loan_Amount' thStyle={ { 'textAlign': 'center' } } tdStyle={ { 'textAlign': 'center'} } dataFormat={ moneyFormatter } dataSort>Loan Amount</TableHeaderColumn>
                 <TableHeaderColumn isKey dataField='Application_ID' thStyle={ { 'textAlign': 'center',width:'10%' } } tdStyle={ { 'textAlign': 'center',width:'10%' } } dataFormat={ actionFormatter } dataSort></TableHeaderColumn>
             </BootstrapTable>
             </CardBody>
             <CardFooter>
              <p>Research Industrial relevancy to your loan applications</p>
              <Button color="primary" href="/#/wds" size="lg">Explore Watson Discovery Service</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;

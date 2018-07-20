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
  Table,
} from 'reactstrap';
import Widget03 from '../../views/Widgets/Widget03'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      applications: [],
      radioSelected: 2,
    };
  }

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
              </Row>
                <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                  <tr>
                    <th className="text-center">S.No</th>
                    <th className="text-center">Application Id</th>
                    <th className="text-center">Name</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Risk(%)</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.applications.map((application, index) => (
                    <tr>
                      <td className="text-center">
                        <div>{index+1}</div>
                      </td>
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
                    </tr>
                  ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;

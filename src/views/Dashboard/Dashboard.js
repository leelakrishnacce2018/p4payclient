import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Bar, Line } from 'react-chartjs-2';
import { withRouter } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import {
  Badge,
  Row,
  Col,
  Progress,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Button,
  ButtonToolbar,
  ButtonGroup,
  ButtonDropdown,
  Label,
  Input,
  Table
} from 'reactstrap';
import { getAllCountsForDashboard } from '../../util/APIUtils';
import LoadingSpinner from '../../util/APIUtils';
import Country from '../../components/SAM Functions/Country';
import SamApps from '../../components/SAM Functions/SamApps';
import SamBU from '../../components/SAM Functions/SamBu';
import SamSbu from '../../components/SAM Functions/SamSbu';
import SamRole from '../../components/SAM Functions/SamRole';
import AppInfo from '../../components/SAM Functions/AppInfo';
import ApproveSamdata from '../../components/SAM Functions/ApproveSamdata';
//BLOCKUI Dependencies
import Loader from 'react-loaders'
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import 'loaders.css/loaders.min.css';
import { loadertype, loaderMsg } from '../../constants';
import RoleTitle from '../../components/SAM Functions/RoleTitle';
import SamData from '../../components/SAM Functions/SamData2';
import TestApp from '../../components/SAM Functions/TestApp';
import User from '../../components/SAM Functions/User';
import ApplicationName from '../../components/SAM Functions/ApplicationName';

const brandPrimary = '#36a9e1';

const brandInfo = '#67c2ef';




function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}





class Dashboard extends Component {
  constructor(props) {
    super(props);
    //console.log(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
   
    this.viewCountries =this.viewCountries.bind(this);
    this.viewApplications =this.viewApplications.bind(this);
    this.viewSbu =this.viewSbu.bind(this);
    this.viewBu =this.viewBu.bind(this);

    this.viewTitle = this.viewTitle.bind(this);

    this.viewRoles =this.viewRoles.bind(this);
    this.viewSamdata = this.viewSamdata.bind(this);
    this.viewfunctions = this.viewfunctions.bind(this);

    this.viewusers = this.viewusers.bind(this);

    this.viewApplications2 = this.viewApplications2.bind(this)



    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      countList:[],
      showComponent: false,
      showApp:false, //appdetails screen
      showApp2:false,
      showSbu:false,
      showBu:false,
      showtitle:false,
      showDashboard:true,
      modalOpen: false,
      loading: false,
      showRole:false,
      showUnApprove:false,
      showsamdata:false,
      showfun:false,  //app function details
      showusers:false,
    };

    this._onButtonClick = this._onButtonClick.bind(this);
    this._onButtonClick2 = this._onButtonClick2.bind(this);
    this._onButtonClick3 = this._onButtonClick3.bind(this);
    this._onButtonClick4 = this._onButtonClick4.bind(this);
    this._onButtonClick5 = this._onButtonClick5.bind(this);

    this._onButtonClickTitle = this._onButtonClickTitle.bind(this);
    this._onButtonClickApp = this._onButtonClickApp.bind(this);
    this.showUsers = this.showUsers.bind(this);
    
  }
  showUsers(){

    this.setState({
      showusers: true,
      showDashboard:false,
      modalOpen: !this.state.modalOpen
    });

  }
 
  _onButtonClick() {
    this.setState({
      showComponent: true,
      showDashboard:false,
      modalOpen: !this.state.modalOpen
    });
  }

  _onButtonClick2() {
    this.setState({
      showApp: true,
      showDashboard:false,
      modalOpen: !this.state.modalOpen
    });
  }

  _onButtonClick3() {
    this.setState({
      showBu: true,
      showDashboard:false,
      modalOpen: !this.state.modalOpen
    });
  }


  _onButtonClick4() {
    this.setState({
      showSbu: true,
      showDashboard:false,
      modalOpen: !this.state.modalOpen
    });
  }
  _onButtonClick5() {
    this.setState({
      showRole: true,
      showDashboard:false,
      modalOpen: !this.state.modalOpen
    });
  }
  _onButtonClickFun(){

    this.setState({
      showfun: true,
      showDashboard:false,
      modalOpen: !this.state.modalOpen
    });

  }

  _onButtonClickApp(){

    this.setState({
      showApp2: true,
      showDashboard:false,
      modalOpen: !this.state.modalOpen
    });

  }

  _onButtonClickTitle() {
    this.setState({
      showtitle: true,
      showDashboard:false,
      modalOpen: !this.state.modalOpen
    });
  }


  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected
    });
  }

  viewBu()  {
   // alert("view clicked");
    //this.props.history.push("/masters/sambu")
    this.setState({
      showBu: true,
      showDashboard:false,
      //modalOpen: !this.state.modalOpen
    });
    
  }

  viewfunctions(){
    this.setState({
      showfun: true,
      showDashboard:false,
      //modalOpen: !this.state.modalOpen
    })

  }

  viewusers(){

    this.setState({
      showusers: true,
      showDashboard:false,
      //modalOpen: !this.state.modalOpen
    });

  }

  viewSamdata(){
    this.setState({
      showsamdata: true,
      showDashboard:false,
      //modalOpen: !this.state.modalOpen
    });

  }

  viewTitle()  {
    // alert("view clicked");
     //this.props.history.push("/masters/sambu")
     this.setState({
       showtitle: true,
       showDashboard:false,
       //modalOpen: !this.state.modalOpen
     });
     
   }

  viewCountries(){
    //this.props.history.push("/masters/country")
    this.setState({
      showComponent: true,
      showDashboard:false,
      //modalOpen: !this.state.modalOpen
    });
  }
  viewApplications(){
    //this.props.history.push("/masters/samapp")
    this.setState({
      showApp2: true,
      showDashboard:false,
      //modalOpen: !this.state.modalOpen
    });
  }


  viewApplications2(){
    //this.props.history.push("/masters/samapp")
    this.setState({
      showApp2: true,
      showDashboard:false,
      //modalOpen: !this.state.modalOpen
    });
  }

  viewSbu(){
   // this.props.history.push("/masters/samsbu")
   this.setState({
    showSbu: true,
    showDashboard:false,
    //modalOpen: !this.state.modalOpen
  });
  }

  viewRoles(){ 

     this.setState({
       showRole: true,
       showDashboard:false,      
     });
     
   }

   viewUnApprovedList(){
    //this.props.history.push("/masters/samapp")
    this.setState({
      showUnApprove: true,
      showDashboard:false,
      //modalOpen: !this.state.modalOpen
    });
  }
 

  componentDidMount() {
    
    this.getActiveList();
  }

  getActiveList(){
    this.setState({ loading: true })
    getAllCountsForDashboard()
    .then(response => {       
      this.setState({
        countList : response.activelist,
        loading: false
      });      
    });

    
   }

  

  render() {
   /* const containerStyle = {
      zIndex: 2000
    };*/

  let crole =localStorage.getItem("cusrole");

   
  if(crole == 'checker'){


    return (
<BlockUi tag="div" blocking={this.state.loading} loader={<Loader active type={loadertype} color="#8dc63f"/>} message={loaderMsg}>

  <div>
  {this.state.showDashboard ? (
  <Row >
          <Col xs="12" sm="6" lg="3" >
          <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card2' isOpen={this.state.card6}
                    toggle={() => { this.setState({ card6: !this.state.card6 }); }}>
                    <DropdownToggle className="p-0 dropdown-toggle" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                    <DropdownItem onClick={this.viewUnApprovedList.bind(this)}>View</DropdownItem>            
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <h4 className="mb-0">{this.state.countList.map((item) => (<div key={1}>{item.unApprovesCount}</div>))}</h4>
                <p>UnApproved List</p>
              </CardBody>
              <div className="chart-wrapper px-3" style={{ height: '70px' }}>
               {// <Line data={cardChartData2} options={cardChartOpts2} height={70} />
               }</div>
              </Card>
          </Col>
         
          </Row>) : null }
          <Row>
          { this.state.showUnApprove ?
           < ApproveSamdata open={this.state.modalOpen}/> :
           null
        }

          </Row>

  </div>
</BlockUi>

    )
  }



  if(crole == 'maker'){

    return (
      <BlockUi tag="div" blocking={this.state.loading} loader={<Loader active type={loadertype} color="#8dc63f"/>} message={loaderMsg}>
      <div className="animated fadeIn">
      
    <div>
   
      {//<ToastContainer position="top-right" autoClose={5000} style={containerStyle} closeButton={false}/>
      }{this.state.showDashboard ?
          
       (  <Row >
          <Col xs="12" sm="6" lg="3"  key='1'>
          <Card className="text-white bg-primary"   >
          <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                <ButtonDropdown id='card1' isOpen={this.state.card1}
                    toggle={() => { this.setState({ card1: !this.state.card1 }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                    <DropdownItem  onClick={this.viewCountries}>View</DropdownItem>
                      <DropdownItem  onClick={this._onButtonClick}>Add</DropdownItem>
                      <DropdownItem  tag="a" href="../Templates/countryFormat.xlsx">Import Template</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </ButtonGroup>
                <h4 className="mb-0">{this.state.countList.map((item) => (<div key ='1'>{item.cCount}</div>))}</h4>
                <p>Country </p>
              </CardBody>
              <div className="chart-wrapper px-3" style={{ height: '70px' }}>
                {//<Line data={cardChartData1} options={cardChartOpts1} height={70} />
                }</div>
              </Card>  
          </Col>

          

          <Col xs="12" sm="6" lg="3"  key='2' >
          <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card2' isOpen={this.state.card2}
                    toggle={() => { this.setState({ card2: !this.state.card2 }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem onClick={this.viewSbu}>View</DropdownItem>
                      <DropdownItem  onClick={this._onButtonClick4}>Add</DropdownItem>
                      <DropdownItem  tag="a" href="../Templates/sbuFormat.xlsx">Import Template</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <h4 className="mb-0">{this.state.countList.map((item) => (<div key={1}>{item.sbuCount}</div>))}</h4>
                <p>SBU</p>
              </CardBody>
              <div className="chart-wrapper px-0" style={{ height: '70px' }}>
               {// <Line data={cardChartData3} options={cardChartOpts3} height={70} />
               }</div>
              </Card> 
          </Col>

          <Col xs="12" sm="6" lg="3"  key='3' >
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <ButtonDropdown id='card3' isOpen={this.state.card3}
                    toggle={() => { this.setState({ card3: !this.state.card3 }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                    <DropdownItem onClick={this.viewBu} >View</DropdownItem>
                      <DropdownItem  onClick={this._onButtonClick3}>Add</DropdownItem>
                    
                    </DropdownMenu>
                  </ButtonDropdown>
                </ButtonGroup>
                <h4 className="mb-0">{this.state.countList.map((item) => (<div key={1}>{item.buCount}</div>))}</h4>
                <p>BU</p>
              </CardBody>
              <div className="chart-wrapper px-3" style={{ height: '70px' }}>
               {// <Bar data={cardChartData4} options={cardChartOpts4} height={70} />
               }</div>
              </Card>
              </Col> 


              <Col xs="12" sm="6" lg="3"  key='4' >
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <ButtonDropdown id='card4' isOpen={this.state.card4}
                    toggle={() => { this.setState({ card4: !this.state.card4 }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                    <DropdownItem onClick={this.viewTitle} >View</DropdownItem>
                      <DropdownItem  onClick={this._onButtonClickTitle}>Add</DropdownItem>
                      <DropdownItem  tag="a" href="../Templates/hrRoleFormat.xlsx">Import Template</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </ButtonGroup>
                <h4 className="mb-0">{this.state.countList.map((item) => (<div key={1}>{item.titlesCount}</div>))}</h4>
                <p>HR Role</p>
              </CardBody>
              <div className="chart-wrapper px-3" style={{ height: '70px' }}>
               {// <Bar data={cardChartData4} options={cardChartOpts4} height={70} />
               }</div>
              </Card>
              </Col> 

              <Col xs="12" sm="6" lg="3"  key='11' >
            <Card className="text-white bg-success">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card5' isOpen={this.state.card11}
                    toggle={() => { this.setState({ card11: !this.state.card11 }); }}>
                    <DropdownToggle className="p-0 dropdown-toggle" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                    <DropdownItem onClick={this.viewApplications}>View</DropdownItem>
                      <DropdownItem  onClick={this._onButtonClickApp}>Add</DropdownItem>
                      <DropdownItem  tag="a" href="../Templates/appname.xlsx">Import Template</DropdownItem>
                    
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <h4 className="mb-0">{this.state.countList.map((item) => (<div key={1}>{item.appCount}</div>))}</h4>
                <p>Application</p>
              </CardBody>
              <div className="chart-wrapper px-3" style={{ height: '70px' }}>
               {// <Line data={cardChartData2} options={cardChartOpts2} height={70} />
               }</div>
              </Card> 
          </Col>


          <Col xs="12" sm="6" lg="3"  key='7' >
            <Card className="text-white bg-success">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <ButtonDropdown id='card7' isOpen={this.state.card7}
                    toggle={() => { this.setState({ card7: !this.state.card7 }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                    <DropdownItem onClick={this.viewfunctions} >View</DropdownItem>
                      <DropdownItem  tag="a" href="../Templates/appFunctionDetailsFormat.xlsx">Import Template</DropdownItem>
                    
                    </DropdownMenu>
                  </ButtonDropdown>
                </ButtonGroup>
                <h4 className="mb-0">{this.state.countList.map((item) => (<div key={1}>{item.funsCount}</div>))}</h4>
                <p>App Function Details</p>
              </CardBody>
              <div className="chart-wrapper px-3" style={{ height: '70px' }}>
               {// <Bar data={cardChartData4} options={cardChartOpts4} height={70} />
               }</div>
              </Card>
              </Col> 
              
             { /*<Col xs="12" sm="6" lg="3"  key='5' >
            <Card className="text-white bg-success">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card5' isOpen={this.state.card5}
                    toggle={() => { this.setState({ card5: !this.state.card5 }); }}>
                    <DropdownToggle className="p-0 dropdown-toggle" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                    <DropdownItem onClick={this.viewApplications}>View</DropdownItem>
                      <DropdownItem  onClick={this._onButtonClick2}>Add</DropdownItem>
                      <DropdownItem  tag="a" href="../Templates/samDetailsFormat.xlsx">Import Template</DropdownItem>
                    
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <h4 className="mb-0">{this.state.countList.map((item) => (<div key={1}>{item.appCount}</div>))}</h4>
                <p>SAM Details</p>
              </CardBody>
              <div className="chart-wrapper px-3" style={{ height: '70px' }}>
               {// <Line data={cardChartData2} options={cardChartOpts2} height={70} />
               }</div>
              </Card> 
          </Col>*/}



          <Col xs="12" sm="6" lg="3"  key='6' >
            <Card className="text-white bg-success">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <ButtonDropdown id='card6' isOpen={this.state.card6}
                    toggle={() => { this.setState({ card6: !this.state.card6 }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                    <DropdownItem onClick={this.viewRoles} >View</DropdownItem>
                      <DropdownItem  onClick={this._onButtonClick5}>Add</DropdownItem>
                      <DropdownItem  tag="a" href="../Templates/samRoleFormat.xlsx">Import Template</DropdownItem>
                    
                    </DropdownMenu>
                  </ButtonDropdown>
                </ButtonGroup>
                <h4 className="mb-0">{this.state.countList.map((item) => (<div key={1}>{item.rolsCount}</div>))}</h4>
                <p>SAM Role</p>
              </CardBody>
              <div className="chart-wrapper px-3" style={{ height: '70px' }}>
               {// <Bar data={cardChartData4} options={cardChartOpts4} height={70} />
               }</div>
              </Card>
              </Col> 

              

              <Col xs="12" sm="6" lg="3"  key='8' >
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <ButtonDropdown id='card8' isOpen={this.state.card8}
                    toggle={() => { this.setState({ card8: !this.state.card8 }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                    <DropdownItem onClick={this.viewusers} >View</DropdownItem>
                      <DropdownItem  onClick={this.showUsers}>Add</DropdownItem>
                      
                    
                    </DropdownMenu>
                  </ButtonDropdown>
                </ButtonGroup>
                <h4 className="mb-0">{this.state.countList.map((item) => (<div key={1}>{item.usersCount}</div>))}</h4>
                <p>User Privileges</p>
              </CardBody>
              <div className="chart-wrapper px-3" style={{ height: '70px' }}>
               {// <Bar data={cardChartData4} options={cardChartOpts4} height={70} />
               }</div>
              </Card>
              </Col> 

              <Col xs="12" sm="6" lg="3"  key='9' >
            <Card className="text-white bg-success">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <ButtonDropdown id='card9' isOpen={this.state.card9}
                    toggle={() => { this.setState({ card9: !this.state.card9 }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                   {/* <DropdownItem onClick={this.viewSamdata} >View</DropdownItem>*/}
                      <DropdownItem  tag="a" href="../Templates/samDataFormat.xlsx">Import Template</DropdownItem>
                    
                    </DropdownMenu>
                  </ButtonDropdown>
                </ButtonGroup>
                <h4 className="mb-0">{this.state.countList.map((item) => (<div key={1}>{item.samdatacount}</div>))}</h4>
                <p>SAM Data</p>
              </CardBody>
              <div className="chart-wrapper px-3" style={{ height: '70px' }}>
               {// <Bar data={cardChartData4} options={cardChartOpts4} height={70} />
               }</div>
              </Card>
              </Col> 



          
              </Row>  )  :
           null
        } 
        <Row>
        {this.state.showComponent ?
           < Country open={this.state.modalOpen}/> :
           null
        }
        {this.state.showApp ?
      
           < AppInfo open={this.state.modalOpen}/> :
           null
        }
        {this.state.showApp2 ?
      
      < ApplicationName open={this.state.modalOpen}/> :
      null
   }
        
        {this.state.showBu ?
           < SamBU open={this.state.modalOpen}/> :
           null
        }
       { this.state.showSbu ?
           < SamSbu open={this.state.modalOpen}/> :
           null
        }
           { this.state.showRole ?
           < SamRole open={this.state.modalOpen}/> :
           null
        }
         { this.state.showUnApprove ?
           < ApproveSamdata open={this.state.modalOpen}/> :
           null
        }
          {this.state.showtitle ?
           < RoleTitle open={this.state.modalOpen}/> :
           null
        }
         {this.state.showsamdata ?
           < SamData open={this.state.modalOpen}/> :
           null
        }

{this.state.showfun ?
           < TestApp open={this.state.modalOpen}/> :
           null
        }
        {this.state.showusers ?
           < User open={this.state.modalOpen}/> :
           null
        }


          </Row> 
           
      </div>  
        
        </div>      
        </BlockUi>    
    )
  
    
  }
    return (
      <BlockUi tag="div" blocking={this.state.loading} loader={<Loader active type={loadertype} color="#8dc63f"/>} message={loaderMsg}>
      <div className="animated fadeIn">
      
    <div>
   
      {//<ToastContainer position="top-right" autoClose={5000} style={containerStyle} closeButton={false}/>
      }{this.state.showDashboard ?
          
       (  <Row >
          <Col xs="12" sm="6" lg="3"  key='1'>
          <Card className="text-white bg-primary"   >
          <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                <ButtonDropdown id='card1' isOpen={this.state.card1}
                    toggle={() => { this.setState({ card1: !this.state.card1 }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                    <DropdownItem  onClick={this.viewCountries}>View</DropdownItem>
                      <DropdownItem  onClick={this._onButtonClick}>Add</DropdownItem>
                      <DropdownItem  tag="a" href="../Templates/countryFormat.xlsx">Import Template</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </ButtonGroup>
                <h4 className="mb-0">{this.state.countList.map((item) => (<div key ='1'>{item.cCount}</div>))}</h4>
                <p>Country </p>
              </CardBody>
              <div className="chart-wrapper px-3" style={{ height: '70px' }}>
                {//<Line data={cardChartData1} options={cardChartOpts1} height={70} />
                }</div>
              </Card>  
          </Col>

          

          <Col xs="12" sm="6" lg="3"  key='2' >
          <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card2' isOpen={this.state.card2}
                    toggle={() => { this.setState({ card2: !this.state.card2 }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem onClick={this.viewSbu}>View</DropdownItem>
                      <DropdownItem  onClick={this._onButtonClick4}>Add</DropdownItem>
                      <DropdownItem  tag="a" href="../Templates/sbuFormat.xlsx">Import Template</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <h4 className="mb-0">{this.state.countList.map((item) => (<div key={1}>{item.sbuCount}</div>))}</h4>
                <p>SBU</p>
              </CardBody>
              <div className="chart-wrapper px-0" style={{ height: '70px' }}>
               {// <Line data={cardChartData3} options={cardChartOpts3} height={70} />
               }</div>
              </Card> 
          </Col>

          <Col xs="12" sm="6" lg="3"  key='3' >
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <ButtonDropdown id='card3' isOpen={this.state.card3}
                    toggle={() => { this.setState({ card3: !this.state.card3 }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                    <DropdownItem onClick={this.viewBu} >View</DropdownItem>
                      <DropdownItem  onClick={this._onButtonClick3}>Add</DropdownItem>
                    
                    </DropdownMenu>
                  </ButtonDropdown>
                </ButtonGroup>
                <h4 className="mb-0">{this.state.countList.map((item) => (<div key={1}>{item.buCount}</div>))}</h4>
                <p>BU</p>
              </CardBody>
              <div className="chart-wrapper px-3" style={{ height: '70px' }}>
               {// <Bar data={cardChartData4} options={cardChartOpts4} height={70} />
               }</div>
              </Card>
              </Col> 


              <Col xs="12" sm="6" lg="3"  key='4' >
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <ButtonDropdown id='card4' isOpen={this.state.card4}
                    toggle={() => { this.setState({ card4: !this.state.card4 }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                    <DropdownItem onClick={this.viewTitle} >View</DropdownItem>
                      <DropdownItem  onClick={this._onButtonClickTitle}>Add</DropdownItem>
                      <DropdownItem  tag="a" href="../Templates/hrRoleFormat.xlsx">Import Template</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </ButtonGroup>
                <h4 className="mb-0">{this.state.countList.map((item) => (<div key={1}>{item.titlesCount}</div>))}</h4>
                <p>HR Role</p>
              </CardBody>
              <div className="chart-wrapper px-3" style={{ height: '70px' }}>
               {// <Bar data={cardChartData4} options={cardChartOpts4} height={70} />
               }</div>
              </Card>
              </Col> 


              
          { /*   <Col xs="12" sm="6" lg="3"  key='5' >
            <Card className="text-white bg-success">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card5' isOpen={this.state.card5}
                    toggle={() => { this.setState({ card5: !this.state.card5 }); }}>
                    <DropdownToggle className="p-0 dropdown-toggle" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                    <DropdownItem onClick={this.viewApplications}>View</DropdownItem>
                      <DropdownItem  onClick={this._onButtonClickApp}>Add</DropdownItem>
                      <DropdownItem  tag="a" href="../Templates/samDetailsFormat.xlsx">Import Template</DropdownItem>
                    
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <h4 className="mb-0">{this.state.countList.map((item) => (<div key={1}>{item.appname}</div>))}</h4>
                <p>SAM Details</p>
              </CardBody>
              <div className="chart-wrapper px-3" style={{ height: '70px' }}>
               {// <Line data={cardChartData2} options={cardChartOpts2} height={70} />
               }</div>
              </Card> 
          </Col>*/}



          <Col xs="12" sm="6" lg="3"  key='6' >
            <Card className="text-white bg-success">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <ButtonDropdown id='card6' isOpen={this.state.card6}
                    toggle={() => { this.setState({ card6: !this.state.card6 }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                    <DropdownItem onClick={this.viewRoles} >View</DropdownItem>
                      <DropdownItem  onClick={this._onButtonClick5}>Add</DropdownItem>
                      <DropdownItem  tag="a" href="../Templates/samRoleFormat.xlsx">Import Template</DropdownItem>
                    
                    </DropdownMenu>
                  </ButtonDropdown>
                </ButtonGroup>
                <h4 className="mb-0">{this.state.countList.map((item) => (<div key={1}>{item.rolsCount}</div>))}</h4>
                <p>SAM Role</p>
              </CardBody>
              <div className="chart-wrapper px-3" style={{ height: '70px' }}>
               {// <Bar data={cardChartData4} options={cardChartOpts4} height={70} />
               }</div>
              </Card>
              </Col> 

              <Col xs="12" sm="6" lg="3"  key='7' >
            <Card className="text-white bg-success">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <ButtonDropdown id='card7' isOpen={this.state.card7}
                    toggle={() => { this.setState({ card7: !this.state.card7 }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                    <DropdownItem onClick={this.viewfunctions} >View</DropdownItem>
                      <DropdownItem  tag="a" href="../Templates/appFunctionDetailsFormat.xlsx">Import Template</DropdownItem>
                    
                    </DropdownMenu>
                  </ButtonDropdown>
                </ButtonGroup>
                <h4 className="mb-0">{this.state.countList.map((item) => (<div key={1}>{item.funsCount}</div>))}</h4>
                <p>App Function Details</p>
              </CardBody>
              <div className="chart-wrapper px-3" style={{ height: '70px' }}>
               {// <Bar data={cardChartData4} options={cardChartOpts4} height={70} />
               }</div>
              </Card>
              </Col> 

              <Col xs="12" sm="6" lg="3"  key='8' >
            <Card className="text-white bg-success">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <ButtonDropdown id='card8' isOpen={this.state.card8}
                    toggle={() => { this.setState({ card8: !this.state.card8 }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                    <DropdownItem onClick={this.viewusers} >View</DropdownItem>
                      <DropdownItem  onClick={this.showUsers}>Add</DropdownItem>
                      
                    
                    </DropdownMenu>
                  </ButtonDropdown>
                </ButtonGroup>
                <h4 className="mb-0">{this.state.countList.map((item) => (<div key={1}>{item.usersCount}</div>))}</h4>
                <p>User Privileges</p>
              </CardBody>
              <div className="chart-wrapper px-3" style={{ height: '70px' }}>
               {// <Bar data={cardChartData4} options={cardChartOpts4} height={70} />
               }</div>
              </Card>
              </Col> 

              <Col xs="12" sm="6" lg="3"  key='9' >
            <Card className="text-white bg-success">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <ButtonDropdown id='card9' isOpen={this.state.card9}
                    toggle={() => { this.setState({ card9: !this.state.card9 }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                   {/* <DropdownItem onClick={this.viewSamdata} >View</DropdownItem>*/}
                      <DropdownItem  tag="a" href="../Templates/samDataFormat.xlsx">Import Template</DropdownItem>
                    
                    </DropdownMenu>
                  </ButtonDropdown>
                </ButtonGroup>
                <h4 className="mb-0">{this.state.countList.map((item) => (<div key={1}>{item.samdatacount}</div>))}</h4>
               
                <p>SAM Data</p>
              </CardBody>
              <div className="chart-wrapper px-3" style={{ height: '70px' }}>
               {// <Bar data={cardChartData4} options={cardChartOpts4} height={70} />
               }</div>
              </Card>
              </Col> 



          <Col xs="12" sm="6" lg="3"  key='10' >
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card10' isOpen={this.state.card10}
                    toggle={() => { this.setState({ card10: !this.state.card10 }); }}>
                    <DropdownToggle className="p-0 dropdown-toggle" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                    <DropdownItem onClick={this.viewUnApprovedList.bind(this)}>View</DropdownItem>            
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <h4 className="mb-0">{this.state.countList.map((item) => (<div key={1}>{item.unApprovesCount}</div>))}</h4>
                <p>UnApproved List</p>
              </CardBody>
              <div className="chart-wrapper px-3" style={{ height: '70px' }}>
               {// <Line data={cardChartData2} options={cardChartOpts2} height={70} />
               }</div>
              </Card> 
          </Col>
          <Col xs="12" sm="6" lg="3"  key='11' >
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card5' isOpen={this.state.card11}
                    toggle={() => { this.setState({ card11: !this.state.card11 }); }}>
                    <DropdownToggle className="p-0 dropdown-toggle" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                    <DropdownItem onClick={this.viewApplications}>View</DropdownItem>
                      <DropdownItem  onClick={this._onButtonClickApp}>Add</DropdownItem>
                      <DropdownItem  tag="a" href="../Templates/appname.xlsx">Import Template</DropdownItem>
                    
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <h4 className="mb-0">{this.state.countList.map((item) => (<div key={1}>{item.appname}</div>))}</h4>
                <p>Application</p>
              </CardBody>
              <div className="chart-wrapper px-3" style={{ height: '70px' }}>
               {// <Line data={cardChartData2} options={cardChartOpts2} height={70} />
               }</div>
              </Card> 
          </Col>
              </Row>  )  :
           null
        } 
        <Row>
        {this.state.showComponent ?
           < Country open={this.state.modalOpen}/> :
           null
        }
        {this.state.showApp ?
      
           < AppInfo open={this.state.modalOpen}/> :
           null
        }
        {this.state.showApp2 ?
      
      < ApplicationName open={this.state.modalOpen}/> :
      null
   }
        
        {this.state.showBu ?
           < SamBU open={this.state.modalOpen}/> :
           null
        }
       { this.state.showSbu ?
           < SamSbu open={this.state.modalOpen}/> :
           null
        }
           { this.state.showRole ?
           < SamRole open={this.state.modalOpen}/> :
           null
        }
         { this.state.showUnApprove ?
           < ApproveSamdata open={this.state.modalOpen}/> :
           null
        }
          {this.state.showtitle ?
           < RoleTitle open={this.state.modalOpen}/> :
           null
        }
         {this.state.showsamdata ?
           < SamData open={this.state.modalOpen}/> :
           null
        }

{this.state.showfun ?
           < TestApp open={this.state.modalOpen}/> :
           null
        }
        {this.state.showusers ?
           < User open={this.state.modalOpen}/> :
           null
        }


          </Row> 
           
      </div>  
        
        </div>      
        </BlockUi>    
    )
  }
}

export default withRouter(Dashboard);

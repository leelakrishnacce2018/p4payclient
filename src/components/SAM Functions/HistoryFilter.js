import React, { Component } from "react";
import { Card, CardHeader, CardBody, Button, Table } from "reactstrap";
import {
  BootstrapTable,
  TableHeaderColumn,
  ButtonToolbar
} from "react-bootstrap-table";
//import BootstrapTable from 'react-bootstrap-table-next';
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
//import SweetAlert from 'react-bootstrap-sweetalert';
import { 
  getSamApps, 
  getCountries,
  getBuBySbuId,
  getSbuBycunId,
  getSamRoles,  
  insertSamData,
  getSamData,
  filterSamData,
  getAppsByCtryId,
  filterForReports,
  ApprovedSamdata,
  getUsers,
  filterSAMHistory
} from "./../../util/APIUtils";
import {

  Col,
  
  Input,
  InputGroup,
  Form,
  FormGroup,
  FormText,
  CardFooter,
  Label,
  UncontrolledTooltip
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import LoadingSpinner from '../../util/LoadingSpinner';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Printd } from 'printd';

// react date utilities
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import { DateUtils } from 'react-day-picker';

//BLOCKUI Dependencies
import Loader from 'react-loaders'
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import 'loaders.css/loaders.min.css';
import { loadertype, loaderMsg } from "../../constants";

const d = new Printd()
const IOFormat = 'DD-MM-YYYY';
const FORMAT = 'YYYYMMDD';

class HistoryFilter extends Component {
  constructor(props) {
    super(props);

    //this.table = data.rows;

    this.state = {
      data: [],
      userId: "0",
      statusId:"0",
      users:[],
      loading: false,
      goStatus: false,
      statusList:[],
      fromDate:'',
      toDate:'',
      screenId :'0',
      screenList:[]
     
    };
   
    this.onUserId = this.onUserId.bind(this);
    this.onStatusId = this.onStatusId.bind(this);
    this.onScreenId = this.onScreenId.bind(this);
   
   
    this.onFromdate = this.onFromdate.bind(this);
    this.onToDate = this.onToDate.bind(this);
   

    this.formatDate =this.formatDate.bind(this);
    this.parseDate =this.parseDate.bind(this);

   
    

    
  }

 

  

  


  componentDidMount() {
       this.getActiveList();
       
   
  }

  

  
  

  onUserId(e) {    
   
    if (e.target.value == "0") {
      this.setState({
        userId: e.target.value,
        
      });
    } else {
      this.setState({
     userId: e.target.value,
        
      });
     
    }
  }

  

  onStatusId(e) {
     // alert(e.target.val);
    
    this.setState({
        statusId: e.target.value
    });
  }
  onScreenId(e) {
    // alert(e.target.val);
   
   this.setState({
       screenId: e.target.value
   });
 }


  onFromdate(date){
    //console.log(date);
    var strdate =dateFnsFormat(date, FORMAT);
  // console.log(strdate);
    this.setState({
        fromDate: strdate
    });

  }
  onToDate(date){
    var strdate =dateFnsFormat(date, FORMAT);
    this.setState({
        toDate: strdate
    });

  }



     getActiveList() {
    this.setState({ loading: true })
   
    getUsers().then(response => {
      //console.log(response.usersList);
      this.setState({
        users: response.usersList,
        statusList:response.rStatusList,
        screenList:response.rScreensList,
        loading:false
      });
    });

    
  }

 
  


 
  createUI() {    

 

  
   return  this.state.data.map((app,i) =>(
     
      
      <tr key={i}><td>{app.createdBy}</td><td>{app.screenName}</td><td>{app.oldData}</td><td>{app.newData}</td><td>{app.recordstatus}</td><td>{app.status}</td><td>{app.strcreatedTime}</td><td>{app.recordstatus == 'Import' ? <a href={"../uploadFiles/" + app.fileName}><i class="fa fa-download" aria-hidden="true"></i></a> :" "}</td>   

</tr>))



}
  

  

 

 formValidate(obj){
   if(obj.fromDate == '0' || obj.fromDate == ""){
    return false;
  }else if(obj.todate == '0' || obj.todate == ""){
    return false
  } else 
  {
    return true;
  }

}


 onSubmit()  {
  event.preventDefault();   
  //var fDate =dateFnsFormat(this.state.fromDate.replace("-","/"), FORMAT);
  //var tDate =dateFnsFormat(this.state.toDate.replace("-","/"), FORMAT);
  var obj = {
    status: this.state.statusId,
    fromDate: this.state.fromDate,
    todate:  this.state.toDate,
    updatedBy: this.state.userId ,  
    screenName:this.state.screenId, 
  };    

  //console.log(obj);

  
  if(!this.formValidate(obj)){
    // console.log("hello");
    event.preventDefault(); 
    return false;  
    }   

    this.setState({ loading: true })
    filterSAMHistory(obj)
             // createSamSubFun(obj)
                .then(response => {  
                   // console.log(response.appsList);
                  this.setState({
                    data: response.appsList,                   
                    goStatus:true,
                    loading: false,
                  });
                 // toast.dismiss()                                           
                 //toast.success('Record Inserted Successfully'); 
                              
              }).catch(function(error) {
                toast.dismiss()
                toast.error( error.message);              
                           });

}
  

onPrint()  {
 
  d.print( document.getElementById('table-to-xls'), [`table  {
    width:100%;    
    border: 1px solid #000 !important;
   
  
}, td {
  border: 1px solid #000 !important;
  
}`] );
}

 parseDate(str, format, locale) {
    const parsed = dateFnsParse(str, format, { locale });
    if (DateUtils.isDate(parsed)) {
      return parsed;
    }
    return undefined;
  }
 formatDate(date, format, locale) {
     var strdate =dateFnsFormat(date, format, { locale });
     
    return dateFnsFormat(date, format, { locale });
  }

  
  render() {
   
    
// style toast display
    const containerStyle = {
      zIndex: 1999
    };

    // users options
    let hUsers = this.state.users;
    let optionUsers = hUsers.map((user,key) => 
      <option key={key} value={user}>
        {user}
      </option>
    );
    // records  options

    let rStatus = this.state.statusList;
    let optionStatues = rStatus.map((status,key) => 
      <option key={key} value={status}>
        {status}
      </option>
    );

    let rScreens = this.state.screenList;
    let optionScreens = rScreens.map((screen,key) => 
      <option key={key} value={screen}>
        {screen}
      </option>
    );
   


    

 
   

   
    

    

    return (
      <BlockUi tag="div" blocking={this.state.loading} loader={<Loader active type={loadertype} color="#8dc63f"/>} message={loaderMsg}>
      <div className="animated">
    
       <Card>
       
         <CardHeader>
            <i className="icon-menu" />Change Logs 
            <div className="card-actions" />
          </CardHeader>
         
          <CardBody>
          <FormGroup  row>   
          <Col md="6">   
            <Label htmlFor="nf-email">User Name</Label>
            </Col>
                    <Col xs="12" md="6">  
            <Input
              type="select"
              name="select"
              id="select"
              value={this.state.userId}
              onChange={this.onUserId}
            >
              <option value="0">All</option>
              {optionUsers}
            </Input>
            </Col>      
          </FormGroup>
          <FormGroup  row>   
          <Col md="6">   
            <Label htmlFor="nf-email">Screen Name</Label>
            </Col>
                    <Col xs="12" md="6">  
            <Input
              type="select"
              name="select"
              id="select"
              value={this.state.screenId}
              onChange={this.onScreenId}
            >
              <option value="0">All</option>
              {optionScreens}
            </Input>
            </Col>      
          </FormGroup>
          <FormGroup row>
          <Col md="6">   
            <Label htmlFor="nf-email">Record Status</Label>
            </Col>
                    <Col xs="12" md="6">  
            <Input
              type="select"
              name="select"            
              value={this.state.statusId}
              onChange={this.onStatusId}              
            >
              <option value="0">All</option>
              {optionStatues}
            </Input>
            </Col>      
          </FormGroup>

          <FormGroup row>
          
          <Col md="6">   
            <Label htmlFor="nf-email">From Date</Label>
            </Col>
                    <Col xs="12" md="6">                    
                  
                   

                    <DayPickerInput
                                formatDate={this.formatDate}
                                format={IOFormat}
                                // parseDate={this.parseDate}
                                 placeholder={`${dateFnsFormat(new Date(), IOFormat)}`}                             
                                 onDayChange={this.onFromdate}
                                 class ='form-control'
                                 />
           
            </Col>      
          </FormGroup>
          <FormGroup row>
         { //monday we have to work on this appsByCunId
         } <Col md="6">   
            <Label htmlFor="nf-email">To Date</Label>
            </Col>
                    <Col xs="12" md="6"> 
                 {/*}   <ReactDatePicker
                    onChange={this.onToDate} 
                    range={[2013, 2020]} 
                    value={this.state.toDate} 
                    disabled={true}
                  />*/}
                          
                       
                          <DayPickerInput
                                formatDate={this.formatDate}
                                format={IOFormat}
                                // parseDate={this.parseDate}
                                 placeholder={`${dateFnsFormat(new Date(), IOFormat)}`}
                                 onDayChange={this.onToDate}
                                 />
            
            </Col>      
          </FormGroup>

          <FormGroup row>
          <Col md="6">  
          </Col>
          <Col xs="10" md="4"> 
           <Button className="btn btn-info" onClick={this.onSubmit.bind(this)} >GO</Button>
          
           </Col>
           </FormGroup>
           
          </CardBody>
          </Card>
       
          { this.state.goStatus ? (
           
        <Card>
          <CardHeader>
            <i className="icon-menu" />Change Logs
            <div className="card-actions" />
          </CardHeader>
          <CardBody>
          <div>
          <Button className=" btn-danger" onClick={this.onPrint.bind(this)} >Print</Button>
          
          <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="btn btn-warning"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="SAMByApp"
                    buttonText="Download as XLS"/>
            </div>
<br></br>

          <Table responsive striped bordered  hover  className="tableFixHead" id="table-to-xls">
              <thead>
                
                <tr>
                
                  <th>User Name</th>
                  <th>Screen Name</th>
                  <th>Before Change</th>
                  <th>After Change</th>
                  <th>Action</th>
                  <th>Status</th>
                  <th>Created Time</th>
                  <th>Imported File</th>
                 
                </tr>
              </thead>
              <tbody>{this.createUI()}</tbody>
            </Table>

          </CardBody>
       
      </Card>   ) : null }

        <ToastContainer
          position="top-right"
          autoClose={5000}
          style={containerStyle}
          closeButton={false}
        />


        
      </div>
      </BlockUi>
    );
  }
}






export default HistoryFilter;

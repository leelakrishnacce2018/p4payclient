import React, { Component } from "react";
import { Card, CardHeader, CardBody, Button, Table } from "reactstrap";
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
  getAppsByBuId,
  rolesByAppId
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
import { APIsService } from '../../util/API-service';
import { checkMimeType} from '../../util/customValidations';
import { containerStyle, loaderMsg, loadertype } from "../../constants";
//BLOCKUI Dependencies
import Loader from 'react-loaders'
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import 'loaders.css/loaders.min.css';
//import Collapsible from 'react-collapsible';


class SamData extends Component {
  constructor(props) {
    super(props);

    //this.table = data.rows;

    this.state = {
      data: [],
      error: null,
      modal: false,
      primary: false,
      iseditable: false,
      editrecord: [],
      title: "",
      submitClicked: false,
      cunList: [],
      cunId: "",
      sbuList: [],
      sbuId: "0",
      buId: "0",
      buList: [],
      sbustatus: true,
      bustatus: true,
      rolesList: [],
      checkboxStatus:false,
      dynamicRows:[],
      samdata:[],
      loading: false,
      goStatus:false,
      appId:"0",
      appstatus:true,
      appsList:[],
      roleId:"0",
      rolesByApp:[],
      rolestatus:true
       
     
    };
    this.apiservice =new APIsService();
    this.onCunId = this.onCunId.bind(this);
    this.onSbuId = this.onSbuId.bind(this);
    this.onBuId = this.onBuId.bind(this);
   // this.handlechange2 =this.handlechange2.bind(this);
  
    //this.setBoxBalue=this.setBoxBalue.bind(this);
    this.onAppId =this.onAppId.bind(this);
    this.onRoleId =this.onRoleId.bind(this);
    


    
  }

  onRoleId(e) {     
  
    this.setState({
      roleId: e.target.value
    });
  }

setBoxBalue(e){
    //console.log("id"+e.target.id);

    //var el = document.getElementById(e.target.id);
  //el.value = "false";
  //doEvent( el, 'input' )
  setState({
    checkboxStatus:true
  }) 
   
  }
  
  onAppId(e) {
    var appRequest = {
      appId: e.target.value
    };
   // alert("e"+e.target.value);
  if(e.target.value != '0'){

    this.setState({
      appId: e.target.value,
      rolestatus:false
     

    });

    this.getRolesByAppId(appRequest);  

  } else{

    this.setState({
      appId: e.target.value,
      rolestatus:true,
      roleId: "0"

    });

  }
  }

  


  componentDidMount() {
   
    this.getActiveList();
    
    this.getActiveCountries();
   
  }
  

  onCunId(e) {
    var sburequest = {
      cunId: e.target.value
    };
    if (e.target.value == "0") {
      this.setState({
        cunId: e.target.value,
        sbustatus: true,
        sbuId: "0",
        buId:"0",
        bustatus: true,
        appstatus:true,
        appId:"0",
        rolestatus:true,
        roleId:"0"
      });
    } else {
      this.setState({
        cunId: e.target.value,
        sbustatus: false
      });
      this.getActiveSBUs(sburequest);
    }
  }

  onSbuId(e) {
    // console.log("Hello password");
    this.setState({
      sbuId: e.target.value
    });
    var burequest = {
      sbuId: e.target.value
    };
    if (e.target.value == "0") {
      this.setState({
        sbuId: e.target.value,
        bustatus: true,
        buId: "0",
        appstatus:true,
        appId:"0",
        rolestatus:true,
        roleId:"0"
      });
    } else {
      this.setState({
        sbuId: e.target.value,
        bustatus: false
      });
      this.getActiveBus(burequest);
    }
  }
  onBuId(e) {
    // console.log("Hello password");
    var burequest = {
      buId: e.target.value
    };

    if(e.target.value == "0")
    {
      this.setState({
        buId: e.target.value,
        appstatus:true,
        appId:"0",
        rolestatus:true,
        roleId:"0"
      });

    } else {

      this.setState({
        buId: e.target.value,
        appstatus:false
      });
  
      this.getAppsBuId(burequest);

    }
    
  }


  getAppsBuId(datafilter) {
    this.setState({ loading: true })
    getAppsByBuId(datafilter).then(response => {
     // console.log("appslist"+response);
      this.setState({
        appsList: response.appsList,
        loading:false
      });
    });
  }

  getActiveList() {
    this.setState({ loading: true })
    /*getSamApps().then(response => {
      //console.log(response.activelist);
      this.setState({
        data: response.activelist,
        loading:false
      });
      this.createUI();
    });

    getSamRoles().then(response => {
      //console.log(response.activelist);
      this.setState({
        rolesList: response.activelist
      });
    });*/
    getSamData().then(response => {
      //console.log(response.activelist);
      this.setState({
        samdata: response.activelist,
        loading:false
      });
    });

   
  }

  getActiveCountries() {
    this.setState({ loading: true })
    getCountries().then(response => {
      //console.log(response);
      this.setState({
        cunList: response.activelist,
        loading:false
      });
    });
  }

  getActiveSBUs(sburequest) {
    this.setState({ loading: true })
    getSbuBycunId(sburequest).then(response => {
      //console.log(response);
      this.setState({
        sbuList: response.activelist,
        loading:false
      });
    });
  }

  getActiveBus(burequest) {
    this.setState({ loading: true })
    getBuBySbuId(burequest).then(response => {
      //console.log(response);
      this.setState({
        buList: response.activelist,
        loading:false
      });
    });
  }

 
  createUI() {    

    let tdarray =[];
    let k =0;

    for (var i in this.state.data){
      //console.log(i+""+this.state.data[i].length)
      k=k+1;
    
  
      tdarray.push(this.state.data[i].map((app,j) =>(
    
     
    
  
      <tr key={app.funId}><td>{app.menuName}</td><td>{`${k}.${j+1}  `}{app.funName}</td><td>{app.funtypeAcclevel}</td><td>{app.funtypes}</td>

    
    
   
{this.state.rolesList.map((x, key) =>  {
 //console.log(this.state.rolesList);
 let buid =this.state.buId;
  var inputid =buid+"-"+app.funId+"-"+x.roleTitle.titleId;

  //console.log(inputid);
  
    var status = this.handleChange2.call(this,inputid);

   return  <td key ={key}><input type="checkbox" id={buid+"-"+app.funId+"-"+x.roleTitle.titleId} name="one"  checked={status} onChange={this.handleChange.bind(this, i)} /></td>  
 } )} 
      </tr>)))
    }

    return tdarray;


}
  

  handleChange(i, event) {
    
    var inputvalue =event.target.id
    var pstatus =event.target.checked


    var obj = {
      inputvalue:inputvalue,
      pstatus:pstatus
      
    };

    insertSamData(obj)
               // createSamSubFun(obj)
                  .then(response => {      
                    toast.dismiss();                                         
                   toast.success('Record Inserted Successfully');
                   this.getActiveList(); 
                                 
                }).catch(error => {
                    //console.log(error);
                    toast.dismiss();
                  toast.error( error.message);              
                             });
     
 }

 handleChange2(event,inputid) {
var result = this.state.samdata.filter(obj => {
    return obj.inputvalue ==event
  })

  if(result[0]){
    var  exstatus =    result[0].pstatus;
return (exstatus =="true");
  }else{
    return false;
  }  
 }

 formValidate(obj){
   if(obj.cunId == '0' || obj.cunId == ""){
    return false
  } else if(obj.sbuId == '0' || obj.sbuId == ""){
    return false;
  }else if(obj.buId == '0' || obj.buId == ""){
    return false
  } else  if(obj.roleId == '0' || obj.roleId == "")
  {
    return false;
  } else{
    return true;
  }

}


 onSubmit()  {
  event.preventDefault();   
  var obj = {
    sbuId: this.state.sbuId,
    cunId: this.state.cunId,
    buId:this.state.buId,
    appId:this.state.appId,
    roleId:this.state.roleId    
  };    

  if(!this.formValidate(obj)){
    // console.log("hello");
    event.preventDefault(); 
    return false;  
    }   
    //console.log(" after filter roles list");
  var  rolesList =this.state.rolesByApp.filter(x => { return x.hrRoleId == obj.roleId });
//console.log(rolesList);


    this.setState({ loading: true, rolesList})    
  filterSamData(obj)
             // createSamSubFun(obj)
                .then(response => {  
                // console.log(response.appsList)
                  this.setState({
                    data: response.appsList,
                   // rolesList:this.state.rolesByApp.map(x =>x.hrRoleId == obj.roleId),
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

getRolesByAppId(appsrequest)  {
  event.preventDefault();   
     

  
    this.setState({ loading: true })    
    rolesByAppId(appsrequest)
             // createSamSubFun(obj)
                .then(response => {  
               //  console.log(response.rolesList);
                  this.setState({
                    
                    rolesByApp:response.rolesList,
                    loading: false,
                  });
                 
                              
              }).catch(function(error) {
                toast.dismiss()
                toast.error( error.message);              
                           });

}
  

handleUploadFile(event){
  const data = new FormData();
  this.setState({ loading: true })    
  let vstatus = checkMimeType(event);
  if(!vstatus)
  {
    alert("Enter only valid file");
    return false;
  }
  //using File API to get chosen file
  let file = event.target.files[0];
  //console.log("Uploading file", event.target.files[0]);
  data.append('file', event.target.files[0]);
  data.append('name', 'my_file');
  data.append('description', 'this file is uploaded from client side');
  let self = this;
  this.setState({ loading: true })
  //calling async Promise and handling response or error situation
  this.apiservice.uploadSamdataToServer(data).then((response) => {
     // console.log("File " + file.name + " is uploaded");
     this.setState({ loading: false })    
     this.getActiveList();
      
      //toast.success('File Uploaded successfully');
      alert("File uploaded successfully");
      //window.location.reload();
      //message.success(" file uploaded successfully");
  }).catch(error => {
    this.setState({ loading: false });
    toast.error(error.response.data.message);
  });
};


  
  render() {
   
    
// style toast display
   

    // countries options
    let cuns = this.state.cunList;
    let optioncuns = cuns.map(cun => (
      <option key={cun.cunId} value={cun.cunId}>
        {cun.cname}
      </option>
    ));
    // sbulist options

    let planets = this.state.sbuList;
    let optionItems = planets.map(planet => (
      <option key={planet.sbuId} value={planet.sbuId}>
        {planet.sbuname}({planet.sbucode})
      </option>
    ));
    //bulist options
    let bulist = this.state.buList;
    let buItems = bulist.map(bu => (
      <option key={bu.buId} value={bu.buId}>
        {bu.buName}
      </option>
    ));

    //let data = this.state.rolesList;
    var hrows = [];
    var filtrows = [];

    let applist = this.state.appsList;
    let appItem = applist.map(app => (
      <option key={app.appId} value={app.appId}>
        {app.appname}
      </option>
    ));
    

 
    let roleslistOpts = this.state.rolesByApp;
    let rolesItem = roleslistOpts.map(role => (
      <option key={role.hrRoleId} value={role.hrRoleId}>
        {role.rolename}
      </option>
    ));

   
    
      //generate headers dynamically

    function createHeaders(role) {
      return hrows.push(<th key={role.hrRoleId}>{role.rolename}</th>);
    }

    var autobots = this.state.rolesList.filter(createHeaders);

    

    return (
      <BlockUi tag="div" blocking={this.state.loading} loader={<Loader active type={loadertype} color="#8dc63f"/>} message={loaderMsg}>
      <div className="animated">
      
    
       <Card>
       
       <CardHeader>
            <i className="icon-menu" />SAM Data 
            <div className="card-actions" />
          </CardHeader>
         
          <CardBody>
          <FormGroup  row>   
          <Col md="6">   
            <Label htmlFor="nf-email">Country Name</Label>
            </Col>
                    <Col xs="12" md="6">  
            <Input
              type="select"
              name="select"
              id="select"
              value={this.state.cunId}
              onChange={this.onCunId}
            >
              <option value="0">Please Select</option>
              {optioncuns}
            </Input>
            </Col>      
          </FormGroup>
          <FormGroup row>
          <Col md="6">   
            <Label htmlFor="nf-email">SBU Name</Label>
            </Col>
                    <Col xs="12" md="6">  
            <Input
              type="select"
              name="select"
              id="select"
              value={this.state.sbuId}
              onChange={this.onSbuId}
              disabled={this.state.sbustatus}
            >
              <option value="0">Please select</option>
              {optionItems}
            </Input>
            </Col>      
          </FormGroup>

          <FormGroup row>
          
          <Col md="6">   
            <Label htmlFor="nf-email">BU Name</Label>
            </Col>
                    <Col xs="12" md="6"> 
            <Input
              type="select"
              name="select"
              id="select"
              value={this.state.buId}
              onChange={this.onBuId}
              disabled={this.state.bustatus}
            >
              <option value="0">Please select</option>
              {buItems}
            </Input>
            </Col>      
          </FormGroup>

          <FormGroup row>
          <Col md="6">   
            <Label htmlFor="nf-email">App Name</Label>
            </Col>
                    <Col xs="12" md="6"> 
            <Input
              type="select"
              name="select"
              id="select"
              value={this.state.appId}
              onChange={this.onAppId}
              disabled={this.state.appstatus}
            >
              <option value="0">Please select</option>
              {appItem}
            </Input>
            </Col>      
          </FormGroup>
         <FormGroup row>
        <Col md="6">   
            <Label htmlFor="nf-email">Role</Label>
            </Col>
                    <Col xs="12" md="6"> 
            <Input
              type="select"
              name="select"
              id="select"
              value={this.state.roleId}
              onChange={this.onRoleId}
              disabled={this.state.rolestatus}
            >
              <option value="0">Please select</option>
              {rolesItem}
            </Input>
            </Col>      
          </FormGroup>
          <FormGroup row>
          <Col md="6">  
          <label className="btn btn-warning" id="Import">Import<input type="file" hidden onChange={this.handleUploadFile.bind(this)} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/></label>
            <UncontrolledTooltip placement="right" target="Import">Import</UncontrolledTooltip>
          </Col>
          <Col xs="10" md="4"> 
           <Button className="btn btn-info" onClick={this. onSubmit.bind(this)} >GO</Button>
           
           </Col>
           </FormGroup>
          </CardBody>
          </Card>        
          { this.state.goStatus ? (
        <Card>
          <CardHeader>
            <i className="icon-menu" />SAM Data
            <div className="card-actions" />
          </CardHeader>
          <CardBody>
         
          <Table size="sm" responsive striped bordered hover >
              <thead>
                <tr>
                 
                  <th scope="row">Menu</th>
                  <th>Function</th>
                  <th>Function Access Type</th>
                  <th>Function  Type</th>
                 
                {//  {hrows}
                }
                 <th>Access</th>
                 
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

export default SamData;

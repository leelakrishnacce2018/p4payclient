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
  rolesByAppId,
  getSbusByMultiCountries,
  getbusMultisbu,
  getAppsMultibu,
  getRolesMultiApps,
  filterMultiSamData,
  ApprovedSamdata
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
import { checkMimeType, ForOnlyuseName} from '../../util/customValidations';
import { containerStyle, loaderMsg, loadertype } from "../../constants";
//BLOCKUI Dependencies
import Loader from 'react-loaders'
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import 'loaders.css/loaders.min.css';
import Select from 'react-select';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Printd } from 'printd'

class MultiSelectReport extends Component {
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
      cunId: [''],
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
      rolestatus:true,
      value2: [], //for countries dropdowen
      value:[] ,// for sbu dropdown
      buvalue:[],
      appvalue:[],
      rolevalue:[],


       
     
    };
    this.apiservice =new APIsService();
    
   // this.handlechange2 =this.handlechange2.bind(this);
  
    //this.setBoxBalue=this.setBoxBalue.bind(this);
    
    this.onRoleId =this.onRoleId.bind(this);
    
    this.saveChanges2 = this.saveChanges2.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.saveChangesbu = this.saveChangesbu.bind(this)
    this.saveChangesapp = this.saveChangesapp.bind(this)
    this.saveChangesrole = this.saveChangesrole.bind(this)
    this.blrMultiCounties = this.blrMultiCounties.bind(this);
    this.blrMultisbu = this.blrMultisbu.bind(this);
    this.blrMultibu = this.blrMultibu.bind(this);
    this.blrMultiApps = this.blrMultiApps.bind(this);

    
  }

  onRoleId(e) {     
  
    this.setState({
      roleId: e.target.value
    });
  }

  saveChanges2(value2) {
    this.setState({ value2:value2 });
    //console.log(this.state.value)
  }

  saveChanges(value) {
    this.setState({ value:value });
    //console.log(this.state.value)
  }
  saveChangesbu(buvalue) {
    this.setState({ buvalue:buvalue });
    //console.log(this.state.value)
  }

  saveChangesapp(appvalue) {
    this.setState({ appvalue:appvalue });
    console.log(this.state.appvalue)
  }
  saveChangesrole(rolevalue) {
    this.setState({ rolevalue:rolevalue });
    //console.log(this.state.value)
  }


  
  

  


  componentDidMount() {
   
    this.getActiveCountries();
    this. getActiveList();
   
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
  

  getActiveList() {
    this.setState({ loading: true })
   
    ApprovedSamdata().then(response => {
      //console.log(response.activelist);
      this.setState({
        samdata: response.activelist,
        loading:false
      });
    });

    
  }
 

  blrMultiCounties(){
    event.preventDefault();  
  
   // alert("Hello");

   let arrayCunsOfId =this.state.value2;
  let multiCunId ;

  if(arrayCunsOfId == null)
  {
    //console.log("null value");
    return false;

  }

  if (this.state.value2.length !=0) {

  console.log(arrayCunsOfId);

  arrayCunsOfId = arrayCunsOfId.map(x =>x.id);
    multiCunId =arrayCunsOfId.join();
  
     } else{
       alert("Invalid Action");
       return false;
     }

   
  console.log(multiCunId);
  var obj = {
    
    cunId: multiCunId,
      
  };    
  this.setState({ loading: true })

      getSbusByMultiCountries(obj)
                .then(response => {  
                  console.log(response.activelist)
                  this.setState({
                    sbuList:response.activelist,
                    loading: false,
                  });
                 // toast.dismiss()                                           
                 //toast.success('Record Inserted Successfully'); 
                              
              }).catch(function(error) {
                toast.dismiss()
                toast.error( error.message);              
                           });
  
  }


  blrMultisbu(){

   // console.log(this.state.value2);
   // alert("Hello");


   let arrayCunsOfId =this.state.value;
  let multiCunId ;
  if(arrayCunsOfId == null)
  {
    //console.log("null value");
    return false;

  }
  if(arrayCunsOfId.length > 0){

    arrayCunsOfId = arrayCunsOfId.map(x =>x.id);
    multiCunId =arrayCunsOfId.join();
  
     } else{
       //alert("Invalid actions");
       return false;
     }

   
  //console.log(sId);
  var obj = {
    
    sbuId: multiCunId,
      
  };    
  this.setState({ loading: true })

  getbusMultisbu(obj)
                .then(response => {  
                  console.log(response.activelist)
                  this.setState({
                    buList:response.activelist,
                    loading: false,
                  });
                 // toast.dismiss()                                           
                 //toast.success('Record Inserted Successfully'); 
                              
              }).catch(function(error) {
                toast.dismiss()
                toast.error( error.message);              
                           });
  
  }

  //blr multi bu's

  blrMultibu(){

    //console.log(this.state.value2);
   // alert("Hello");

   var arrayCunsOfId =this.state.buvalue;
  let multiCunId ;


  if(arrayCunsOfId == null)
  {
    //console.log("null value");
    return false;

  }

  if(arrayCunsOfId.length > 0){

    arrayCunsOfId = arrayCunsOfId.map(x =>x.id);
    multiCunId =arrayCunsOfId.join();
  
     } else{
       //alert("Invalid actions");
       return false;
     }

   
  //console.log(sId);
  var obj = {
    
    buId: multiCunId,
      
  };    
  this.setState({ loading: true })

    getAppsMultibu(obj)
                .then(response => {  
                  console.log(response.activelist)
                  this.setState({
                    appsList:response.activelist,
                    loading: false,
                  });
                 // toast.dismiss()                                           
                 //toast.success('Record Inserted Successfully'); 
                              
              }).catch(function(error) {
                toast.dismiss()
                toast.error( error.message);              
                           });
  
  }
  
 

  blrMultiApps(){

   
    var arrayCunsOfId =this.state.appvalue;
    let multiCunId ;

    if(arrayCunsOfId == null)
  {
    //console.log("null value");
    return false;

  }
  
    if(arrayCunsOfId.length > 0){
  
      arrayCunsOfId = arrayCunsOfId.map(x =>x.id);
      multiCunId =arrayCunsOfId.join();
    
       } else{
         //alert("Invalid actions");
         return false;
       }

  
  var obj = {
    
    appId: multiCunId,
      
  };    
  this.setState({ loading: true })

    getRolesMultiApps(obj)
                .then(response => {  
                  console.log(response.activelist)
                  this.setState({
                    rolesByApp:response.activelist,
                    loading: false,
                  });
                 // toast.dismiss()                                           
                 //toast.success('Record Inserted Successfully'); 
                              
              }).catch(function(error) {
                toast.dismiss()
                toast.error( error.message);              
                           });
  
  }
 

  

 

 
  createUI() {  
  
    return  this.state.data.map((app,i) =>(
       
       <tr key={app.funId}><td>{app.buName}</td><td>{app.appName}</td><td>{app.menuName}</td><td>{app.funName}</td><td>{app.parentFunName}</td> <td>{app.funtypes}</td>
 
     
     
    
 {this.state.rolesList.map((x, key) =>  {
   var inputid =app.funId+"-"+x.hrRoleId;
   
     var status = this.handleChange2.call(this,inputid);
 
   // return  <td key ={x.hrRoleId}><input type="checkbox" id={app.appId+"-"+x.hrRoleId} name="one"  checked={status} onChange={this.handleChange.bind(this, i)} /></td>  
  if(status)
  return <td key ={x.hrRoleId}>X</td>
  else
  return <td key ={x.hrRoleId}></td>
  } )} 
 </tr>))
 
 
 
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
      alert("select Atleast One Country")
     return false
   } else if(obj.sbuId == '0' || obj.sbuId == ""){
     alert("Select Atleast One SBU")
     return false;
   } else 
   {
     return true;
   }
  }

 onSubmit()  {
  event.preventDefault();  

  let arrayAppsOfId =this.state.appvalue;
  let appsId ;

  let arrayRolesOfId =this.state.rolevalue;
  let rolesId ;

  let arrayBUsOfId =this.state.buvalue;
  let multiBuId ;


  let arraySBUsOfId =this.state.value;
  let multiSBuId ;

  let arrayCunsOfId =this.state.value2;
  let multiCunId ;

  if(arrayAppsOfId){

   arrayAppsOfId = arrayAppsOfId.map(x =>x.id);
   appsId =arrayAppsOfId.join();
 } 
   

   if(arrayRolesOfId){

  arrayRolesOfId = arrayRolesOfId.map(x =>x.id);
  rolesId =arrayRolesOfId.join();

   } 

   if(arrayBUsOfId){

    arrayBUsOfId = arrayBUsOfId.map(x =>x.id);
    multiBuId =arrayBUsOfId.join();
  
     } 

     if(arraySBUsOfId){

      arraySBUsOfId = arraySBUsOfId.map(x =>x.id);
      multiSBuId =arraySBUsOfId.join();
    
       } 

       if(arrayCunsOfId){

        arrayCunsOfId = arrayCunsOfId.map(x =>x.id);
        multiCunId =arrayCunsOfId.join();
      
         } 
   
   

   
  var obj = {
    cunId:multiCunId,
    sbuId: multiSBuId,
    buId:multiBuId,
    appId:appsId,
    roleId:rolesId   
  };    
  console.log("In Go Method");
  console.log(obj)

  if(!this.formValidate(obj)){
    // console.log("hello");
    event.preventDefault(); 
    return false;  
    }  
     
    this.setState({ loading: true })    
  filterMultiSamData(obj)
             // createSamSubFun(obj)
                .then(response => {  
                  //console.log("response.appsList")
                  this.setState({
                    data: response.appsList,
                    rolesList:response.rolesList,
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
    border: solid #000 !important;
    border-width: 1px 0 0 1px !important;
  
}, td {
  border: solid #000 !important;
  border-width: 0 1px 1px 0 !important;
}`] );
}
  





  
  render() {
   
    
// style toast display
   

   
    
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
    var hrowsTop = [];

    
    
    
    function createHeadersTop(role) {
      return hrowsTop.push(<th key={role.hrRoleId}>{role.roleTitle.title}</th>);
    }
 
    
    

   
    
      //generate headers dynamically

    function createHeaders(role) {
      return hrows.push(<th key={role.hrRoleId}>{role.rolename}</th>);
    }

    var autobots = this.state.rolesList.filter(createHeaders);

    
 // countries options
 let cuns = this.state.cunList;
    let funypesitems3 = cuns.map((cun) =>{
      var obj = {
          value :cun.cname,
          label :cun.cname,
          id  :cun.cunId 
                      }  
                     // options2.push(obj);
                      //console.log(options2+"options")
                      return obj;
                  }
  );

  //for  sbu dropdowen
  let funypesitems = planets.map((cun) =>{
    var obj = {
        value :cun.sbuname,
        label :cun.sbuname,
        id  :cun.sbuId 
                    }  
                   // options2.push(obj);
                    //console.log(options2+"options")
                    return obj;
                }
);

//for  bu drop dowen

let funypesitemsbu = bulist.map((cun) =>{
  var obj = {
      value :cun.buName,
      label :cun.buName,
      id  :cun.buId 
                  }  
                 // options2.push(obj);
                  //console.log(options2+"options")
                  return obj;
              }
);

//for  apps drop dowen
let applist = this.state.appsList;

let funypesitemsapps = applist.map((cun) =>{
 // console.log("in apps rotation"+cun.appName);
  var obj = {
      value :cun.appName,
      label :cun.appName,
      id  :cun.appId 
                  }  
                 // options2.push(obj);
                  //console.log(options2+"options")
                  return obj;
              }
);
 

//for  aroles drop dowen
let roleslistOpts = this.state.rolesByApp;

let funypesitemsroles = roleslistOpts.map((cun) =>{
  var obj = {
      value :cun.rolename,
      label :cun.rolename,
      id  :cun.hrRoleId 
                  }  
                 // options2.push(obj);
                  //console.log(options2+"options")
                  return obj;
              }
);

    return (
      <BlockUi tag="div" blocking={this.state.loading} loader={<Loader active type={loadertype} color="#8dc63f"/>} message={loaderMsg}>
      <div className="animated">
      
    
       <Card>
       
       <CardHeader>
            <i className="icon-menu" />Search
            <div className="card-actions" />
          </CardHeader>
         
          <CardBody>
          <FormGroup  row>   
          <Col md="6">   
            <Label htmlFor="nf-email">Country Name</Label>
            </Col>
                    <Col xs="12" md="6">  
                    <Select 
                  // closeMenuOnSelect={false}            
                value={this.state.value2}
                options={funypesitems3}
                onChange={this.saveChanges2}
                onBlur={this.blrMultiCounties}
                placeholder={"Select Atleast One Country"}
                isMulti
              />
            </Col>    
         </FormGroup>  
          <FormGroup  row>   
          <Col md="6">   
            <Label htmlFor="nf-email">SBU Name</Label>
            </Col>
                    <Col xs="12" md="6">  
                    <Select 
                  // closeMenuOnSelect={false}            
                value={this.state.value}
                options={funypesitems}
                onChange={this.saveChanges}
                onBlur={this.blrMultisbu}
                placeholder={"Select Atleast One SBU"}
                isMulti
              />
            </Col>    
         </FormGroup>  

         <FormGroup  row>   
          <Col md="6">   
            <Label htmlFor="nf-email">BU Name</Label>
            </Col>
                    <Col xs="12" md="6">  
                    <Select 
                  // closeMenuOnSelect={false}            
                value={this.state.buvalue}
                options={funypesitemsbu}
                onChange={this.saveChangesbu}
                onBlur={this.blrMultibu}
                placeholder={"All"}
                isMulti
              />
            </Col>    
         </FormGroup>  

         <FormGroup  row>   
          <Col md="6">   
            <Label htmlFor="nf-email">App Name</Label>
            </Col>
                    <Col xs="12" md="6">  
                    <Select 
                  // closeMenuOnSelect={false}            
                value={this.state.appvalue}
                options={funypesitemsapps}
                onChange={this.saveChangesapp}
                onBlur={this.blrMultiApps}
                placeholder={"All"}
                isMulti
              />
            </Col>    
         </FormGroup>  
         <FormGroup  row>   
          <Col md="6">   
            <Label htmlFor="nf-email">Role Name</Label>
            </Col>
                    <Col xs="12" md="6">  
                    <Select 
                  // closeMenuOnSelect={false}            
                value={this.state.rolevalue}
                options={funypesitemsroles}
                onChange={this.saveChangesrole}
                placeholder={"All"}
                isMulti
              />
            </Col>    
         </FormGroup>  
          <FormGroup row>
          <Col md="6">  
         
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
          <Table responsive striped bordered hover className="tableFixHead" id="table-to-xls">
              <thead>
                <tr>
                <th>BU Name</th>
                  <th>Application</th>
                  <th>Menu</th>
                  <th>Function</th>  
                  <th>Parent Function</th>                
                  <th>Dual Control Status</th>
                  {hrows}
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






export default MultiSelectReport;

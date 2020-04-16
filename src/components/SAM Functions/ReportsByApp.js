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
  getAppsByBuId,getActiveList,getBuList,getAppNames
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
import { Printd } from 'printd'
//BLOCKUI Dependencies
import Loader from 'react-loaders'
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import 'loaders.css/loaders.min.css';
import { loadertype, loaderMsg } from "../../constants";
import Select from 'react-select';

const d = new Printd()


class ReportsByApp extends Component {
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
      sbuId: "",
      buId: "",
      appId:"",
      buList: [],
      sbustatus: false,
      bustatus: false,
      appstatus:false,
      rolesList: [],
      checkboxStatus:false,
      dynamicRows:[],
      samdata:[],
      loading: false,
       appsByCunId:[],
       selectedAppName:"",
       goStatus: false,
       value2: [],
       selectedBu:"",
       selectedSBu:"",
       selectCname:""
     
    };
   
    this.onCunId = this.onCunId.bind(this);
    this.onSbuId = this.onSbuId.bind(this);
    this.onBuId = this.onBuId.bind(this);

    this.onAppId =this.onAppId.bind(this);
   // this.handlechange2 =this.handlechange2.bind(this);
  
    //this.setBoxBalue=this.setBoxBalue.bind(this);
this.saveChanges2 = this.saveChanges2.bind(this);
this.myFunction = this.myFunction.bind(this);
this.myMenu = this.myMenu.bind(this)

this.myfunaccess = this.myfunaccess.bind(this)
this.myfuntype = this.myfuntype.bind(this)

    
  }

  myMenu(){
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("table-to-xls");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }

  }

  myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myFun");
    filter = input.value.toUpperCase();
    table = document.getElementById("table-to-xls");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }

  myfunaccess() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("funaccess");
    filter = input.value.toUpperCase();
    table = document.getElementById("table-to-xls");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[2];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }


  myfuntype() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("funtype");
    filter = input.value.toUpperCase();
    table = document.getElementById("table-to-xls");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[3];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
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
  
  saveChanges2(value2) {
    this.setState({ value2:value2 });
    //console.log(this.state.value)
  }
  


  componentDidMount() {
   
    this.getActiveList();
    
    this.getActiveCountries();
    this.getAllBudata();

    this.getAllSbudata();
    this.getAllAppsdata();
   
  }
  

  onCunId(e) {
    var sburequest = {
      cunId: e.target.value
    };
    var dataFilter = {
        cunId: e.target.value
      };
    if (e.target.value == "0") {
      this.setState({
        cunId: e.target.value,
        sbustatus: false,
        sbuId: "0",
        buId:"0",
        bustatus: true,
        appstatus:true,
        appId:'0'
      });
      this.getAllSbudata();
    } else {
      let label =e.target[e.target.selectedIndex].label
      this.setState({
        cunId: e.target.value,
        sbustatus: false,
        appstatus:true,
        selectCname:label
      });
      this.getActiveSBUs(sburequest);
     // this.getAppsByCtryId(dataFilter)
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
        bustatus: false,
        buId: "0"
      });
      this.getAllBudata();
    } else {
      let label =e.target[e.target.selectedIndex].label
      this.setState({
        sbuId: e.target.value,
        bustatus: false,
        selectedSBu:label
      });
      this.getActiveBus(burequest);
    }
  }
  onBuId(e) {
    // console.log("Hello password");
    
    var burequest = {
      buId: e.target.value
    };

    if (e.target.value == "0") {
      this.setState({
        buId: e.target.value,
        appstatus:true,
        appId: e.target.value,
      });
this.getAllAppsdata();
      

    } else {
      let label =e.target[e.target.selectedIndex].label
      this.setState({
        buId: e.target.value,
        appstatus:false,
        appId: '0',
        selectedBu:label
      });
  
      this.getAppsBuId(burequest);

    }
    
  }
  onAppId(e) {

   let label =e.target[e.target.selectedIndex].label

  
    this.setState({
      appId: e.target.value,
     selectedAppName:label

    });
  }
  

  getActiveList() {
    this.setState({ loading: true })
   /* getSamApps().then(response => {
      //console.log(response.activelist);
      this.setState({
        data: response.activelist,
        loading:false
      });
      this.createUI();
    });

    getSamRoles().then(response => {
      console.log("roles"+response.activelist);
      this.setState({
        rolesList: response.activelist
      });
    });*/
    ApprovedSamdata().then(response => {
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
        loading: false,
      });
    });
  }

  // all sbu data
  getAllSbudata() {
    this.setState({ loading: true })
    getActiveList().then(response => {
      //console.log(response);
      this.setState({
        sbuList: response.activelist,        
        loading: false,
      });
    });
  }

  getAllBudata() {
    this.setState({ loading: true })
    getBuList().then(response => {
      //console.log(response);
      this.setState({
        buList: response.activelist,        
        loading: false,
      });
    });
  }

  getAllAppsdata() {
    this.setState({ loading: true })
    getAppNames().then(response => {
      console.log(response.activelist);
      this.setState({
        appsByCunId: response.activelist,   
        loading: false,
      });
    });
  }

// here to modify
getAppsByCtryId(datafilter) {
  this.setState({ loading: true })
    getAppsByCtryId(datafilter).then(response => {
    //console.log(response.appsList);
      this.setState({
        appsByCunId: response.appsList,
        loading: false,
      });
    });
  }
 

  getAppsBuId(datafilter) {
    getAppsByBuId(datafilter).then(response => {
      //console.log(response.appsList);
      this.setState({
        appsByCunId: response.appsList
      });
    });
  }

  getActiveBus(burequest) {
    this.setState({ loading: true })
    getBuBySbuId(burequest).then(response => {
      //console.log(response);
      this.setState({
        buList: response.activelist,
        loading: false,
      });
    });
  }

 
  createUI() {  
  
   return  this.state.data.map((app,i) =>(
      
      <tr key={app.funId}><td>{app.menuName}</td><td>{app.funName}</td><td>{app.funtypeAcclevel}</td><td>{app.funtypes}</td>
    
   
{this.state.rolesList.map((x, key) =>  {
  let buid =this.state.buId;
  //console.log(buid);

  var inputid =buid+"-"+app.funId+"-"+x.roleTitle.titleId;
  
    var status = this.handleChange2.call(this,inputid);

  // return  <td key ={x.hrRoleId}><input type="checkbox" id={app.appId+"-"+x.hrRoleId} name="one"  checked={status} onChange={this.handleChange.bind(this, i)} /></td>  
 if(status)
 return <td key ={key}>X</td>
 else
 return <td key ={key}></td>
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
    this.setState({ loading: true })
    insertSamData(obj)
               // createSamSubFun(obj)
                  .then(response => {  
                    this.setState({ loading: false })    
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
   /*if(obj.cunId == '0' || obj.cunId == ""){
    return false
  } else if(obj.sbuId == '0' || obj.sbuId == ""){
    return false;
  }else if(obj.buId == '0' || obj.buId == ""){
    return false
  } */
  if(obj.appId == '0' || obj.appId == ""){
    return false
  }
  else 
  {
    return true;
  }

}


 onSubmit()  {
  event.preventDefault();   
  var obj = {
    sbuId: this.state.sbuId,
    cunId: this.state.cunId,
    buId:  this.state.buId,
    appId: this.state.appId.trim()     
  };    

  if(!this.formValidate(obj)){
    // console.log("hello");
    event.preventDefault(); 
    return false;  
    }   
    this.setState({ loading: true })     
    filterForReports(obj)
             // createSamSubFun(obj)
                .then(response => {  
                  console.log( response.appsList);
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
    const containerStyle = {
      zIndex: 1999
    };

    // countries options
    let cuns = this.state.cunList;
    let optioncuns = cuns.map(cun => (
      <option key={cun.cunId} value={cun.cunId} name ={cun.cname}>
        {cun.cname}
      </option>
    ));
    // sbulist options

    let planets = this.state.sbuList;
    let optionItems = planets.map(planet => (
      <option key={planet.sbuId} value={planet.sbuId} >
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


    let applist = this.state.appsByCunId;
    let appItem = applist.map(app => (
     
      <option key={app.appId} value={app.appId} >
        {app.appName} 
      </option>
    ));
    let data = this.state.rolesList;
    var hrows = [];
    var filtrows = [];

    var hrowsTop = [];

    
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
 
   

   
    
      //generate headers dynamically

    function createHeaders(role) {
      return hrows.push(<th key={role.hrRoleId}>{role.hrRoleSAMCode}</th>);
    }

    function createHeadersTop(role) {
      return hrowsTop.push(<th key={role.hrRoleId}>{role.roleTitle.title}</th>);
    }

    var autobots = this.state.rolesList.filter(createHeaders);
    var autobotsTop = this.state.rolesList.filter(createHeadersTop);

    

    return (
      <BlockUi tag="div" blocking={this.state.loading} loader={<Loader active type={loadertype} color="#8dc63f"/>} message={loaderMsg}>
      <div className="animated">
    
       <Card>
       
       <CardHeader>
            <i className="icon-menu" />SAM By App
            <div className="card-actions" />
          </CardHeader>
         
          <CardBody>
         {/*<FormGroup  row>   
          <Col md="6">   
            <Label htmlFor="nf-email">Country Name</Label>
            </Col>
                    <Col xs="12" md="6">  
                    <Select 
                  // closeMenuOnSelect={false}            
                value={this.state.value2}
                options={funypesitems3}
                onChange={this.saveChanges2}
                isMulti
              />
            </Col>    
         </FormGroup>  */}
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
              <option value="0">All</option>
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
              <option value="0">All</option>
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
              <option value="0">All</option>
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
            <i className="icon-menu" />SAM By App
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
 
          <Table responsive striped bordered hover   id="table-to-xls">
              <thead>
                <tr>
                <th colSpan={this.state.rolesList.length+4}>
                { `Country Name : ${this.state.selectCname}`}<br></br>
                { `SBU Name     :${this.state.selectedSBu}`}<br></br>
                 {`BU Name      : ${this.state.selectedBu}`} <br></br>
                 {`Application Name      : ${this.state.selectedAppName}`} <br></br>
                 
                 </th>
                
                
                 </tr>
                  {//{hrowsTop}
                  }
                <tr>
                   <th>Menu <Input type="text" id="myInput" onKeyUp={this.myMenu} placeholder="Search for Menu"/></th>
                  <th>Function <Input type="text" id="myFun" onKeyUp={this.myFunction} placeholder="Search for Function"/> </th>  
                 {// <th>Parent Function</th>
                 }                
                  <th>Function Access Type <Input type="text" id="funaccess" onKeyUp={this.myfunaccess} placeholder="Function access"/> </th>
                  <th>Function  Type<Input type="text" id="funtype" onKeyUp={this.myfuntype} placeholder="Function type"/> </th>
                  {hrowsTop}
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






export default ReportsByApp;

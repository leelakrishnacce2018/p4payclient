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
  getAppsByBuId,
  getMenues,
  filterForMenu
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

const d = new Printd()


class SamSearch extends Component {
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
      buId: "0",
      appId:"0",
      buList: [],
      sbustatus: "true",
      bustatus: "true",
      appstatus:"true",
      menustatus:"true",
      rolesList: [],
      checkboxStatus:false,
      dynamicRows:[],
      samdata:[],
      loading: false,
       appsByCunId:[],
       selectedAppName:"",
       goStatus: false,
       menuList:[],
       menuName:['0']
     
    };
   
    this.onCunId = this.onCunId.bind(this);
    this.onSbuId = this.onSbuId.bind(this);
    this.onBuId = this.onBuId.bind(this);

    this.onAppId =this.onAppId.bind(this);
    this.onMenuName =this.onMenuName.bind(this);
  
    //this.setBoxBalue=this.setBoxBalue.bind(this);


    
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
  

  


  componentDidMount() {
   
    this.getActiveList();
    
    this.getActiveCountries();
   
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
        sbustatus: true,
        sbuId: "0",
        buId:"0",
        bustatus: true,
        appstatus:true,
        appId:'0',
        menustatus:true
      });
    
    } else {
  
      this.setState({
        cunId: e.target.value,
        sbustatus: false
       
      });
      this.getActiveSBUs(sburequest);
    
    }
    //on every change empty the menus
    this.getMenus("0")
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
        appstatus: true,
        appId:"0"
      });
    } else {
      this.setState({
        sbuId: e.target.value,
        bustatus: false,
        buId: "0",
        appId:"0",
        appstatus: true
      });
      this.getActiveBus(burequest);
    }
    //on every change empty the menus
    this.getMenus("0")
  }
  onBuId(e) {
    // console.log("Hello password");
    var burequest = {
      buId: e.target.value
    };
    

    if (e.target.value == "0") {
      this.setState({
        buId: e.target.value,
        appstatus: true,
        menustatus:true,
        buId: "0"
      });
    } else {
      this.setState({
        buId: e.target.value,
        bustatus: false,
        appstatus:false,
      });
      this.getAppsBuId(burequest);
      
    }

    
  }
  onAppId(e) {

    if (e.target.value == "0") {

      this.setState({
        menustatus:true,
        appId: e.target.value,
      
  
      });
      this.getMenus( e.target.value)

    } else {
      this.setState({
        appId: e.target.value,
        menustatus:false     
  
      });
      this.getMenus( e.target.value)

    }
   
  
   

   
  }

  onMenuName(e){
    
    this.setState({ loading: true })
      var input =e.target.value;    


      var list =this.state.menuName;
      if(input != '0')
      {
        
      if(list.includes(input)){
        var index = list.indexOf(input);
        if (index > -1) {
          list.splice(index, 1);
        }
        

          //console.log(list);
        

      } else{

        list.push(input);
          // removeing none in options
          while (list.includes("0")){
          var index = list.indexOf('0');
          if (index > -1) {
            list.splice(index, 1);
          }        
          
  
        }

       

      }
    } else{
      //empty the array
      list.length = 0

      list.push("0");


    }

    let unique = [...new Set(list)];

    this.setState({
        menuName: unique,
        loading: false,
    }) 

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
// here to modify
getAppsByCtryId(datafilter) {
  this.setState({ loading: true })
    getAppsByCtryId(datafilter).then(response => {
     // console.log("appslist"+response);
      this.setState({
        appsByCunId: response.appsList,
        loading:false
      });
    });
  }
 

  getAppsBuId(datafilter) {
    this.setState({ loading: true })
    getAppsByBuId(datafilter).then(response => {
     // console.log("appslist"+response);
      this.setState({
        appsByCunId: response.appsList,
        loading:false
      });
    });
  }

  getActiveBus(burequest) {
    this.setState({ loading: true })
    getBuBySbuId(burequest).then(response => {
      //console.log(response);
      this.setState({
        buList: response.activelist
      });
    });
  }


  getMenus(key) {
    this.setState({ loading: true })
    getMenues(key).then(response => {
      //console.log(response);
      this.setState({
        menuList: response.activelist,
        loading:false
      });
    });
  }

 
  createUI() {  
  
   return  this.state.data.map((app,i) =>(
      
      <tr key={app.funId}><td>{app.appName}</td><td>{app.menuName}</td><td>{app.funName}</td><td>{app.parentFunName}</td><td>{app.funtypes}</td><td>{app.strAccessId}({app.access})</td>

    
    
   
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
    this.setState({ loading: true })
    insertSamData(obj)
               // createSamSubFun(obj)
                  .then(response => {   
                    loading: false,   
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
  }else 
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
    appId: this.state.appId.trim(),
    menu:this.state.menuName.join(",")     
  };    

  if(!this.formValidate(obj)){
    // console.log("hello");
    event.preventDefault(); 
    return false;  
    }        
    this.setState({ loading: true })
    filterForMenu(obj)
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


    let applist = this.state.appsByCunId;
    let appItem = applist.map(app => (
      <option key={app.appId} value={app.appId}>
        {app.appName}
      </option>
    ));
    let data = this.state.rolesList;
    var hrows = [];
    var filtrows = [];

    var hrowsTop = [];

    
 
    let menuItem = this.state.menuList.map(menu => (
      <option key={menu.menuName} value={menu.menuName}>
        {menu.menuName}
      </option>
    ));
 
   

   
    
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
            <i className="icon-menu" />SAM Search
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
              <option value="0">All</option>
              {buItems}
            </Input>
            </Col>      
          </FormGroup>
          <FormGroup row>
         { //monday we have to work on this appsByCunId
         } <Col md="6">   
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
              <option value="0">All</option>
              {appItem}
            </Input>
            </Col>      
          </FormGroup>

          <FormGroup row>
         { //monday we have to work on this appsByCunId
         } <Col md="6">   
            <Label htmlFor="nf-email">Menu</Label>
            </Col>
                    <Col xs="12" md="6"> 
                    <Input type="select" name="roleCode" id="roleCode"  disabled={this.state.menustatus} value={this.state.menuName}     onChange={this.onMenuName}  multiple>
                    <option value="0">All</option>
                    {menuItem}
                       
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
            <i className="icon-menu" />SAM Search
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

          <Table responsive striped bordered hover  className="tableFixHead" className="tableFixHead" id="table-to-xls">
              <thead>
                <tr>
                
                <th colSpan="6">Application :{this.state.selectedAppName}</th>
                 
                  {hrowsTop}
                </tr>
                <tr>
                <th>Application</th>
                  <th>Menu</th>
                  <th>Function</th>  
                  <th>Parent Function</th>                
                  <th>Function Types</th>
                  <th>Function Access Types</th>
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






export default SamSearch;

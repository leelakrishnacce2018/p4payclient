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
  getRolesByBu,
  filterForRoles,
  filterForBu,
  getBuList
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
import { loaderMsg, loadertype } from "../../constants";

const d = new Printd()


class SamByBu extends Component {
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
      roleId:"",
      buList: [],
      sbustatus: true,
      bustatus: true,
      rolestatus:true,
      rolesList: [],
      rolesListForOptions: [],
      checkboxStatus:false,
      dynamicRows:[],
      samdata:[],
      loading: false,
       appsByCunId:[],
       selectedAppName:"",
       goStatus: false,
       cname:"",
       sbuname:"",
       buname:""
     
    };
   
    this.onCunId = this.onCunId.bind(this);
    this.onSbuId = this.onSbuId.bind(this);
    this.onBuId = this.onBuId.bind(this);

    this.onRoleId =this.onRoleId.bind(this);
   // this.handlechange2 =this.handlechange2.bind(this);
  
    //this.setBoxBalue=this.setBoxBalue.bind(this);

    this.myFunction = this.myFunction.bind(this);
    this.myMenu = this.myMenu.bind(this);
    this.myApp = this.myApp.bind(this);
    
  }

  myApp(){
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myApp");
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
  myMenu(){
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
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

  myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myFun");
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
    
    //this.getActiveCountries();
   
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
        appId:'0'
      });
    } else {
      this.setState({
        cunId: e.target.value,
        sbustatus: false,
        appstatus:false,
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
        buId: "0"
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

      if (e.target.value == "0") {
        this.setState({
          buId: e.target.value,
          roletatus: true,
          roleId: "0"
        });
      } else {
        let cname = e.target.selectedOptions[0].getAttribute('cname');
        let sbuname = e.target.selectedOptions[0].getAttribute('sbuname');
        let buname = e.target[e.target.selectedIndex].label;


        this.setState({
          buId: e.target.value,
          sbuname:sbuname,
          cname:cname,
          rolestatus: false,
          buname:buname

        });
       // this.getRolesBybu(burequest);
      }


   
  }
  onRoleId(e) {     
  
    this.setState({
      roleId: e.target.value
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


      this.setState({ loading: true })
      getBuList().then(response => {
        console.log(response);
        this.setState({
          buList: response.activelist,
          loading:false
        });
      });
    

    
  }

  

  getActiveSBUs(sburequest) {
    this.setState({ loading: true })
    getSbuBycunId(sburequest).then(response => {
      //console.log(response);
      this.setState({
        buList: response.activelist,
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

  getRolesBybu(burequest){
    this.setState({ loading: true })
    getRolesByBu(burequest).then(response => {
        //console.log(response.rolesList);
        this.setState({
            rolesListForOptions: response.rolesList,
            loading:false
        });
      });


    



  }

 
  createUI() {    

 

  
   return  this.state.data.map((app,i) =>(
      
      <tr key={app.funId}><td>{app.appName}</td><td>{app.menuName}</td><td> {app.funName}</td><td>{app.funtypeAcclevel}</td><td>{app.funtypes}</td>

    
  
   
{this.state.rolesList.map((x, key) =>  {
// console.log(this.state.rolesList);
 var inputid =x.buId+"-"+app.funId+"-"+x.roleTitle.titleId;

  
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
  }else*/ if(obj.buId == '0' || obj.buId == ""){
    return false
  } else 
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
    roleId: this.state.roleId     
  };    

  if(!this.formValidate(obj)){
    // console.log("hello");
    event.preventDefault(); 
    return false;  
    }      
    this.setState({ loading: true })  
    filterForBu(obj)
             // createSamSubFun(obj)
                .then(response => {  
                  this.setState({
                    data: response.appsList,
                    rolesList:response.rolesList,
                    goStatus:true,                   
                    loading: false,
                  });
                  //console.log(response.appsList);                 
                              
              }).catch(function(error) {
                toast.dismiss()
                toast.error( error.message);              
                           });

}
  

onPrint()  {
 
  d.print( document.getElementById('table-to-xls'), [`table  {
    width:100%
    border: solid #000 !important;
    border-width: 1px 1px 1px 1px !important;
  
}, td {
  border: solid #000 !important;
  border-width: 1px 1px 1px 1px !important;
}`] );
}


  
  render() {
   
    
// style toast display
    const containerStyle = {
      zIndex: 1999
    };

    // countries options
    /*let cuns = this.state.cunList;
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
    ));*/
    //bulist options
    let bulist = this.state.buList;
    let buItems = bulist.map(bu => (
      <option key={bu.buId} value={bu.buId} cname={bu.cname} sbuname ={bu.sbuname}>
        {bu.buName}
      </option>
    ));


    /*let applist = this.state.appsByCunId;
    let appItem = applist.map(app => (
      <option key={app.appId} value={app.appName}>
        {app.appName}
      </option>
    ));*/


    





    var hrows = [];


    var hrowsTop = [];

    

 
   

   
    
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
            <i className="icon-menu" />SAM By BU
            <div className="card-actions" />
          </CardHeader>
         
          <CardBody>
        {/*  <FormGroup  row>   
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
        </FormGroup>*/}

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
              //disabled={this.state.bustatus}
            >
              <option value="0">Please select</option>
              {buItems}
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
            <i className="icon-menu" />SAM By BU
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

          <Table responsive striped bordered hover  className="tableFixHead"  id="table-to-xls">
              <thead>
                <tr>
                
                <th colSpan={this.state.rolesList.length+5}>
                { `Country Name : ${this.state.cname}`}<br></br>
                { `SBU Name     :${this.state.sbuname}`}<br></br>
                 {`BU Name      : ${this.state.buname}`} <br></br>
                 
                 </th>
                </tr>
                <tr>
                <th>Application <Input type="text" id="myApp" onKeyUp={this.myApp} placeholder="Application"/></th>
                  <th>Menu <Input type="text" id="myInput" onKeyUp={this.myMenu} placeholder="Menu"/></th>
                  <th>Function <Input type="text" id="myFun" onKeyUp={this.myFunction} placeholder="Function"/> </th>   
                  <th>Function Access Type</th>
                  <th>Function  Type</th>
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






export default SamByBu;

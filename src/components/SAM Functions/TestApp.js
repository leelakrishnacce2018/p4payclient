import React, { Component } from "react";
import { Card, CardHeader, CardBody, Button, Table,Row } from "reactstrap";
import {
  BootstrapTable,
  TableHeaderColumn,
  ButtonToolbar
} from "react-bootstrap-table";
//import BootstrapTable from 'react-bootstrap-table-next';
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
//import SweetAlert from 'react-bootstrap-sweetalert';
import { 

  getAccesstypes,
  getFunctiontypes,
  createFunDetails,
  getActiveAppsDetails,
  getActiveFunctions,
  getAppsSet,
  getParentFunctions,
  getRecordExistStatus,
  getAppNames
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


// react date utilities

import 'react-day-picker/lib/style.css';
import { OnlyAlphabic, OnlyAlphabic2 } from "../../util/customValidations";
import { containerStyle, colordboarder, defaultboarder, loadertype, loaderMsg ,defaultStyles} from "../../constants";
import FunctionDetails from "./FunctionDetails";
//BLOCKUI Dependencies
import Loader from 'react-loaders'
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import 'loaders.css/loaders.min.css';

import CreatableSelect from 'react-select/creatable';

//import Accordion from 'react-bootstrap/Accordion'

//const FORMAT = 'M/D/YYYY';
const FORMAT = 'YYYYMMDD';



class TestApp extends Component {
  constructor(props) {
    super(props);

    //this.table = data.rows;

    this.state = {
      
      cats: [{menuName:"",funName:"", parentFunId:"0",funaccId:"0",funTypeId:[]}],
      appName: "",
      menuName: "",
      funId:"",
      acctypesList :[],
      funtypesList :[],
      funtypesList :[],
      appsList:[],
      appId:'0',
      parentFunList:[],
      borderColorApp:defaultboarder,
      borderColorMenu:defaultboarder,
      borderColorFun:defaultboarder,   
      btnName:"Submit",
      loading: false,//for spinner,
      funcTypeLabelId:"",
      defaultMenu:"",
      editrecord :"",
      editStatus:false

      
    };
   
    

    this.addCat=this.addCat.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);

    this.removeCat=this.removeCat.bind(this);
 

    this.onAppName=this.onAppName.bind(this);
    this.onMenuName=this.onMenuName.bind(this);

    this.handleChange2 =this.handleChange2.bind(this);

    this.handleCreate =this.handleCreate.bind(this);
    this.onBlrAppName = this.onBlrAppName.bind(this)

    
    


   
    
    
    
    

    
  }

  onAppName(e){
    this.setState({ appId:e.target.value });        
    }
  

  onBlrAppName(e){
    var value =e.target.value;
      if(value == '0')
      {
        this.setState({
          borderColorApp:colordboarder        
        
      });
      document.getElementById("appError").textContent = "Select Application ";
      this.refs.child.getActiveList(); // to load all functions

      } else{
        this.setState({
          borderColorApp:defaultboarder,
          editrecord: value,
          editStatus:true           
      });

      
      this.refs.child.childMethod(); // to load selected app functions

      document.getElementById("appError").textContent = "";
      this.getActiveParentFunctions(value); // for parent function dropdowen

      }
    

  }

// menu field updations
  onMenuName(e){

    this.setState({ menuName:e.target.value.replace(/^ /, '') });

  }

  onBlrMenuName(e) {
    var value =e.target.value.trim();

    if( !value)
    {
      this.setState({
        borderColorMenu:colordboarder         
    });
   
    document.getElementById("menuError").textContent = "Enter Menu Name";

    } else
   
  
    if( value.length < 5)
    {
      this.setState({
        borderColorMenu:colordboarder
        
      
    });     
    document.getElementById("menuError").textContent = "Menu Name Must Be More Than 4 Characters";

    } else{
      this.setState({
        borderColorMenu:defaultboarder             
    });
    document.getElementById("menuError").textContent = "";

    }   
     
   }



  


  componentDidMount() {

   this.getAccessTypes();
   this.getFunctionTypes();
   this.getActiveAppsInfo();
  // this.getActiveParentFunctions();
  //window.scrollTo(0, 0)
   
  }

 
  getFunctionTypes(){
    this.setState({ loading: true })
    getFunctiontypes()
       .then(response => {
         // console.log(response.activelist);
         this.setState({
            funtypesList: response.activelist
         });
       });

}

  getActiveAppsInfo(){
    this.setState({ loading: true })
    //getActiveAppsDetails()
    getAppNames()
        .then(response => {
    //  console.log(response.activelist);
      this.setState({
        appsList: response.activelist,
        loading: false,
      
      });
    });
  }

  getActiveParentFunctions(key){
    var obj ={
      "appId":key
    }
    this.setState({ loading: true })
    getParentFunctions(obj)
    .then(response => {
     // console.log(response.activelist);
    // window.scrollTo(0, 0);
      this.setState({
        parentFunList: response.activelist,
        loading: false,
      
      });
     //console.log(this.convert(response.activelist));
    });
  }


  getActiveParentFunctions(key,efunid){
    var obj ={
      "appId":key
    }
    this.setState({ loading: true })
    getParentFunctions(obj)
    .then(response => {
     // console.log(response.activelist);
    // window.scrollTo(0, 0);
    let list =response.activelist;
    let filterList =list.filter(x => x.funId != efunid)
      this.setState({
        parentFunList: filterList,
        loading: false,
      
      });
     //console.log(this.convert(response.activelist));
    });
  }









  handleChange (e){
    let cats =[... this.state.cats];

    if ((e.target.className).includes("menuName") ) {

      //cats.push.apply(cats, this.state.cats);
      cats[e.target.dataset.id]['menuName'] = e.target.value
      let defaultMenu =e.target.value;
      this.setState({ cats,defaultMenu
       }); //console.log(this.state.cats))

      } else

    if ((e.target.className).includes("funName") ) {

      //cats.push.apply(cats, this.state.cats);
      cats[e.target.dataset.id]['funName'] = e.target.value
      this.setState({ cats }); //console.log(this.state.cats))
      } else if((e.target.className).includes("funaccId") ){
      //this.setState({ [e.target.name]: e.target.value })
      console.log(e.target.value);
      cats[e.target.dataset.id]['funaccId'] = e.target.value

      this.setState({ cats });


    } else if((e.target.className).includes("parentFunId") ){
      //this.setState({ [e.target.name]: e.target.value })
      cats[e.target.dataset.id]['parentFunId'] = e.target.value

      this.setState({ cats });


    } 
  }
  

// create dynamic functions

addCat(e){

  if(!this.formValidate()){           
    event.preventDefault(); 
    return false;  
}     

//let defaultMenu2 =this.state.cats[0].menuName;
console.log(this.state.defaultMenu)

let defaultMenu = this.state.defaultMenu;
var obj ={
  funId:this.state.funId,
  appId:this.state.appId,
  menuName:this.state.cats[0].menuName,
  funName:this.state.cats[0].funName,
  parentFunId:this.state.cats[0].parentFunId

}
this.setState({ loading: true })
  getRecordExistStatus(obj)
      .then(response => {    
        this.setState({ loading: false }) 
      //  console.log("Record Exists Status");            
       //  console.log(response); 
        
        if(response.success){
        this.setState((prevState) => ({
          cats: [...prevState.cats, {menuName:defaultMenu,funName:"", parentFunId:"0",funaccId:"0",funTypeId:[]}],
        }));
      } else{
        toast.dismiss()
        toast.error(response.message);

      }
     }).catch(error => {   
      toast.dismiss();   
    toast.error( error.message);            
        });
    
  }

  removeCat(e){
    var array = [...this.state.cats];
    //console.log("Before delete")
   // console.log(array)
   if(array.length > 1){
    var narray =array.pop();
   }
  //  console.log("After delete")
   // console.log(narray)
    this.setState({
        cats:array
     
    });
  }


  formValidate(){

    var list =this.state.cats;
    var appId =this.state.appId;
    var menuName =this.state.menuName;
    var funId =this.state.funId;
    

if(this.state.appId == '0' ){
  this.setState({
    borderColorApp:colordboarder
});
  document.getElementById("appError").textContent = "Select Application";  
} else{
       
  this.setState({
    borderColorApp:defaultboarder
});
document.getElementById("appError").textContent = "";
  
}



var i =0;
for(var call of list) {
  
 

  var a = call['funName']
  var ele = 'funError-'+i
  var eleid ='funName-'+i
  var result = true;


  var menu = call['menuName']
  var menuEle = 'menuError-'+i
  var menuEleId ='menuName-'+i

  if(a == null || a == "") {
    

    document.getElementById(ele).textContent = "Enter Function Name";  
    document.getElementById(eleid).style.borderColor = "red"; 
    result =false;
    
     // break
  } else if( a.length < 3){
  
    document.getElementById(ele).textContent = "Function Name Must Be More Than 2 Characters";   
    document.getElementById(eleid).style.borderColor = "red";      
    result =false;
   // break
  } else{
    document.getElementById(ele).textContent = "";   
    document.getElementById(eleid).style.borderColor = "#e4e6eb";

  }


// Valdating Menu Error

if(menu == null || menu == "") {
    

  document.getElementById(menuEle).textContent = "Enter Menu Name";  
  document.getElementById(menuEleId).style.borderColor = "red"; 
  result =false;
  
   // break
} else if( menu.length < 3){

  document.getElementById(menuEle).textContent = "Function Name Must Be More Than 2 Characters";   
  document.getElementById(menuEleId).style.borderColor = "red";      
  result =false;
 // break
} else{
  document.getElementById(menuEle).textContent = "";   
  document.getElementById(menuEleId).style.borderColor = "#e4e6eb";

}




  i =i+1;

}

 if(appId == '0' || result == false ) {
  
  event.preventDefault(); 
   return false;
 } else{
   return true;
 }
  }

    handleSubmit(e){
       e.preventDefault() 
   

    var list =this.state.cats;
    var appId =this.state.appId;
    var funId =this.state.funId;


    if(!this.formValidate()){           
      event.preventDefault(); 
      return false;  
  } 
    

 
//console.group(list);
    list.forEach(function(element) { 
      element.appId = appId;
      element.funId =funId;
     });

    //console.groupEnd(list);

    createFunDetails(list)
    .then(response => {     
      this.clearAll();          
      // console.log("rsponse"+response); 
      /*var obj ={
        'funName':'', 
        'parentFunId':'0',
        'funaccId':'0',
        'funTypeId':[""]

      }
      var fun =[];
      fun.push(obj);
      this.setState({      
        cats:  fun ,
        appId: "0",
        funId:"",    
      });*/
     // this.props.parentMethod();  
     
      toast.dismiss()
      if(this.state.btnName == 'Update'){
        toast.warn('Record Updated  Successfully');

      }else{
      toast.success('Record Inserted  Successfully');
      }
    //  this.props.parentMethod();
    //this.refs.child.getActiveList();
    this.refs.child.childMethod(); 

   }).catch(error => {      
    toast.dismiss()
  toast.error( error.message);            
      });
     
    


    
    }

    getAccessTypes(){
      this.setState({ loading: true })
      getAccesstypes()
         .then(response => {
             console.log(response.activelist);
           this.setState({
              acctypesList: response.activelist,
              loading: false,
           });
         });
     
       } 


 convert(array){
        var map = {};
        for(var i = 0; i < array.length; i++){
            var obj = array[i];
            obj.items= [];
    
            map[obj.appId] = obj;
    
            var parent = obj.parentFunId || '-';
            if(!map[parent]){
                map[parent] = {
                    items: []
                };
            }
            map[parent].items.push(obj);
        }
    
        return map['-'].items;
    
    }

    resetHeader(){
      this.setState({    
        menuName: "",        
        appId:'0'
        

      });


    }


       

     
    addSomething(record) {

      this.setState({       
        btnName:"Update"
       

      })
      
     // console.log("dataCaptured")
     // console.log(record);
      document.getElementById("parentFunId-0").value = record.strParentFunId;
      document.getElementById("funaccId-0").value = record.funtypeAcclevel;

      document.getElementById("btnUpdate").innerHTML = "Update";
      document.getElementById("Add").style.visibility = 'hidden';
      document.getElementById("Delete").style.visibility = 'hidden';

      
    
         var cobj =this.state.cats;
       //  console.log(cobj);
       var funtypes  = record.funtypes.split(",")
         cobj[0].funId= record.funId
         cobj[0].menuName= record.menuName
         cobj[0].funName= record.funName
         cobj[0].parentFunId= record.strParentFunId
         cobj[0].funaccId=record.funtypeAcclevel
         cobj[0].funTypeId =[]



              if(funtypes[0] != ""){        
               funtypes.map(entry => {
                cobj[0].funTypeId.push(entry);

               }) 
              }      
        


          
         
         


           this.forceUpdate()

           //console.log(this.state.cats);
           


   
     

     this.setState({
        appId:record.appId,
        menuName:record.menuName,
        funId:record.funId,
        btnName:"Update"
       
       // cats: [{funName:record.funName, parentFunId:'0',funaccId:record.strAccessId,funTypeId:['0']}],

      })
      this.getActiveParentFunctions(record.appId,record.funId)

    //  console.log("After set state")
    //  console.log(this.state.cats);
     // console.log(this.state.funId);
     
   }
    

 clearAll(){
 
  var obj ={
    'menuName':"",
    'funName':'', 
    'parentFunId':'0',
    'funaccId':'0',
    'funTypeId':[]

  }
  var fun =[];
  fun.push(obj);
  this.setState({      
    cats:  fun ,
    //appId: "0",
    funId:"", 
    borderColorApp:defaultboarder,
    borderColorMenu:defaultboarder

  });
  this.state.cats[0].funTypeId.length = 0;
document.getElementById("funaccId-0").value = '0';
document.getElementById("appError").textContent = "";
document.getElementById("funError-0").textContent = "";
document.getElementById("funName-0").style.borderColor = "#e4e6eb";
document.getElementById("menuError-0").textContent = "";   
document.getElementById("menuName-0").style.borderColor = "#e4e6eb";


 }
    
    
 
      
 handleChange2 (inputValue, actionMeta) {

  let labelid =this.state.funcTypeLabelId;

 
 let cats =[... this.state.cats];
 

  var list =cats[labelid]['funTypeId'];

 

  

  var selectvalue ="";
  if(actionMeta.action == 'clear'){

  
  this.state.cats[labelid].funTypeId.length = 0;

   // this.setState({cats[labelid].funTypeId: []});



  } else

if(actionMeta.action == 'select-option'){

 
   selectvalue =actionMeta.option.value;
  
  list.push(selectvalue);
  //console.log("action select");
} else if(actionMeta.action == "remove-value"){

  

  selectvalue =actionMeta.removedValue.value;

  var index = list.indexOf(selectvalue);
if (index > -1) {
  list.splice(index, 1);
}
 // console.log("removed action");
} else {

  
  var newValue = inputValue[inputValue.length-1];

  list.push(newValue.value);

 // console.log(list);



}

let unique = [...new Set(list)];

cats[labelid]['funTypeId'] =unique;

this.setState({ cats }, () => console.log(this.state.cats))



};

createNewValue(newValue,actionMeta){
 
}
  
funTypeBlr(event) {
 // console.log(event);





}

handleCreate(event)
{

  //console.log(event);
}
       
  render() {   
 
    
    let {owner, description, cats} = this.state



    let acctypesList = this.state.acctypesList;
                let acctypesitems = acctypesList.map((acctypes) =>
                        <option key={acctypes.accid} value={acctypes.typeLevel}>{acctypes.typeLevel}</option>
                    );

   

   

  let apps = this.state.appsList;
 let optionsapps = apps.map((app) =>
                            <option key={app.appId} value={app.appId}>{`${app.appName} `}</option>
                        );

  

let functions = this.state.parentFunList;
let optionsFuns = functions.map((fun) =>
                      <option key={fun.funId} value={fun.funId}>{fun.funName}({fun.menuName})</option>
                                               );
                    
            
       let funtypesList = this.state.funtypesList;
                  let optionsFunType = funtypesList.map((title) =>{
                  
                    var obj = {
                        value :title.funName,
                        label :title.funName,
                        id  :title.funName ,
                                    }  
                                    return obj;
                                });

                                let selectedFuntypesList = this.state.cats[0].funTypeId;
                                let sOptionsFunType = selectedFuntypesList.map((title) =>{
                                
                                  var obj = {
                                      value :title,
                                      label :title,
                                                  }  
                                                  return obj;
                                              });
                   


    return (
      <BlockUi tag="div" blocking={this.state.loading} loader={<Loader active type={loadertype} color="#8dc63f"/>} message={loaderMsg}>
      <div className="animated">
    <ToastContainer position="top-right" autoClose={5000} style={containerStyle} closeButton={false}/>
       <Card>
       
         <CardHeader>
            <i className="icon-menu" />App Function Details
            <div className="card-actions" />
          </CardHeader>
         
          <CardBody>         

          <FormGroup row> 
                  <Col md="6">
                  <Label htmlFor="nf-email">Application<span style={{color:'red'}}>*</span></Label>                  
                  </Col>
                    <Col  xs="10" md="6">
                    <Input type="text"  value={this.state.funId} hidden/>           
                      <Input type="select" id="app" name="select" id="select" style ={this.state.borderColorApp}  value ={this.state.appId}  onChange={this.onAppName}  onBlur={this.onBlrAppName}   >
                        <option value="0">Please select</option>
                        {optionsapps}
                      </Input>
                      <span id="appError"></span>
                      
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                      <Col md="6">  
                       </Col>
                       <Col xs="10" md="4"> 
                            
                            <button className="btn btn-danger" id="Add" onClick={this.addCat}><i className="fa fa-plus"></i></button>
                            <button className="btn btn-warning" id="Delete" onClick={this.removeCat} ><i className="fa fa-trash"></i></button>
                            <button className="btn btn-danger" id="reset" onClick={this.resetHeader.bind(this)}><i className="fa fa-refresh"></i></button>
                            <UncontrolledTooltip placement="top" target={"Add"}>Add Function</UncontrolledTooltip>
                            <UncontrolledTooltip placement="top" target={"Delete"}>Delete Function</UncontrolledTooltip>
                            <UncontrolledTooltip placement="top" target={"reset"}>Reset</UncontrolledTooltip>


                        </Col>
                    </FormGroup>                    

          <Row>                 
    </Row>
                <Form onSubmit={this.handleSubmit} onChange={this.handleChange} className="" >


               {   cats.map((val, idx)=> {
            let catId = `funName-${idx}`,menuId = `menuName-${idx}`, ageId = `parentFunId-${idx}`,funAccessId =`funaccId-${idx}`,funTypeId =`funTypeId-${idx}`,funError =`funError-${idx}`,menuError =`menuError-${idx}`
            return (
       
           <div key={idx} >
             <FormGroup row> 
                  <Col md="6">  
                <label htmlFor={menuId}  className="MenuName" >{`MenuName`}<span style={{color:'red'}}>*</span></label>
                </Col>
                    <Col xs="12" md="6">
                <Input
                  type="text"
                  name={menuId}
                  data-id={idx}
                  id={menuId}
                  maxLength ='100'
                  minLength ='3'
                  value={cats[idx].menuName} 
                  className="menuName"
                  onKeyPress={(e) => OnlyAlphabic2(e)}
                > 
                </Input>  
                <span id={menuError}></span> 
                </Col>   
                </FormGroup>
            <FormGroup row> 
                  <Col md="6">  
                <label htmlFor={catId}  className="funName" >{`Function #${idx + 1}`}<span style={{color:'red'}}>*</span></label>
                </Col>
                    <Col xs="12" md="6">
                <Input
                  type="text"
                  name={catId}
                  data-id={idx}
                  id={catId}
                  maxLength ='100'
                  minLength ='3'
                  value={cats[idx].funName} 
                  className="funName"
                  onKeyPress={(e) => OnlyAlphabic2(e)}
                > 
                </Input>  
                <span id={funError}></span>    
                </Col>   
                </FormGroup>   
                
               
                <FormGroup row> 
                  <Col md="6">         
               <label htmlFor={ageId}>Parent Function</label>    
               </Col>
                    <Col xs="12" md="6">
                <Input type="select" name={ageId}  
              data-id={idx}  id={ageId}  value={cats[idx].parentFunId} className="parentFunId">
                        <option value="0">None</option>
                        {optionsFuns}
                      </Input>
                      </Col>   
                </FormGroup>  
                      
                      
                     

                      <FormGroup row> 
                  <Col md="6">   
                  <Label htmlFor={funAccessId}>Function Access Types</Label>   
                  </Col>
                    <Col xs="12" md="6">               
                      <Input type="select" name={funAccessId}  
              data-id={idx}  id={funAccessId}  value={cats[idx].funAccessId} defaultValue={cats[idx].funAccessId}  className="funaccId">
                        {//<option value="0">None</option>
                        }{acctypesitems}
                      </Input>                      
                      </Col>   
                </FormGroup>
                <FormGroup row> 
                  <Col md="6">  
                       <Label htmlFor={funTypeId}>Function Types</Label>  
                       </Col>
                    <Col xs="12" md="6">                                       
                      <CreatableSelect name={idx} 
                      isMulti
                      onMenuOpen={() => this.setState({ funcTypeLabelId: idx })}
                      onChange={this.handleChange2}
                      options={optionsFunType}
                      styles ={defaultStyles}
                    
                     value={this.state.cats[idx].funTypeId.map(entry =>  {
                      var obj = {
                        value :entry,
                        label :entry,
                                    }  
                                    return obj;

                     })}
                      
                      
                     // onCreateOption={this.handleCreate}
                      
                       //onBlur ={this.funTypeBlr.bind(this)}
                      
                      />
                      </Col>   
                </FormGroup>

               
                   </div>      
           

            )
          })
        }
          <FormGroup row>
          <Col md="6">  
          </Col>
          <Col xs="10" md="4"> 

                    <Button type="Submit"  className="btn-danger" ><span id="btnUpdate">Submit</span></Button>
                    <Button type="reset"  className="btn-warning btn btn-secondary" onClick={this.clearAll.bind(this)} ><span id="btnClear">Clear</span></Button>
                    </Col>
           </FormGroup>
          
        </Form>
       

                      
                      

              </CardBody>

          </Card>
       
          
          
       

        <FunctionDetails ref="child" inputrecord={this.state.editrecord} editFlag ={this.state.editStatus}  addSomething={(record) => this.addSomething(record)}/>
         
        


        
      </div>
      </BlockUi>
    );
  }
}



export default TestApp;

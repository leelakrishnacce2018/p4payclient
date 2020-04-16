import React, {Component} from 'react';
import {Card, CardHeader, CardBody,Button} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn,ButtonToolbar} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
//import SweetAlert from 'react-bootstrap-sweetalert';
import {  deactiveFun, getSamRoles, updateSamRole, createSamRole, getCountries,  getSbuBycunId, getBuBySbuId, getRoleTitles, deactiveSamRole, getRolesByBu,createAppDetails,getActiveAppsDetails,deactiveAppdetails, updateAppInfo, getDelActiveAppsDetails, getBuList, getAppNames } from './../../util/APIUtils';
import {Row, Col, Modal, ModalHeader, ModalBody, ModalFooter,Input,
  InputGroup,  Form, FormGroup,
  FormText,CardFooter,
  Label,UncontrolledTooltip} from 'reactstrap';
  import {ToastContainer, toast} from 'react-toastify';
import { APIsService } from '../../util/API-service';
import { checkMimeType, OnlyAlphabic, upperCaseF, OnlyAlphabicW } from '../../util/customValidations';
import Select from 'react-select';
import './customCss.css';
import { colordboarder,defaultboarder, containerStyle, loadertype, loaderMsg,defaultRegex, reddefaultStyles ,defaultStyles} from '../../constants';

//BLOCKUI Dependencies
import Loader from 'react-loaders'
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import 'loaders.css/loaders.min.css';


const brandColor = '#46beed';

const customStyles = {
  control: (base, state) => ({
    ...base,
    boxShadow: state.isFocused ? 0 : 0,
    borderColor: state.isFocused
      ? brandColor
      : base.borderColor,
    '&:hover': {
      borderColor: state.isFocused
        ? brandColor
        : base.borderColor,
    }
  })
};


class AppInfo extends Component {
  constructor(props) {
    super(props);

    //this.table = data.rows;

    this.state = {
      
        data :[],
        error: null,
        isLoaded: false,
        modal: false,
        primary: false,
        iseditable :false,
        editrecord :[],
        title :"",
        submitClicked :false,
        loading: false,
        recordsListName:"Show Disable Records"
        
       
        
        
    }
    this.apiservice =new APIsService();
    this.toggle = this.toggle.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.doParentToggle = this.doParentToggle.bind(this);
    

    
    
    this.options = {
      sortIndicator: true,
      hideSizePerPage: false,
      paginationSize: 3,
      hidePageListOnlyOnePage: false,
      clearSearch: true,
      alwaysShowAllBtns: true,
      withFirstAndLast: true
    }

  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });

    //this.refs.child.onSubmit();
  }
  modalSubmit(){
    if(this.state.iseditable){
      this.refs.child.onUpdate();
    }else{
      this.refs.child.onSubmit();
    }     
   
   }
 

  modalClose(){
    this.setState({
      modal: !this.state.modal
    });

  }

  togglePrimary() {
    this.setState({
      primary: !this.state.primary
    });
  }


  componentDidMount() {
    this.setState({ modal:this.props.open})
    this.getActiveList();
    //this.refs.child.getActiveSBUs();  
    this.setState({     
      modal:this.props.open,
      title:"Add"  
    })
    
  }

  


   getActiveList(){
    this.setState({ loading: true })
    getActiveAppsDetails()
    .then(response => {
      console.log(response.activelist);
      this.setState({
        data: response.activelist,
        loading:false
      });
    });
   }


   getDeActiveList(){
    this.setState({ loading: true })
    getDelActiveAppsDetails()
    .then(response => {
       // console.log(response.inactivelist);
      this.setState({
        data: response.inactivelist,
        loading:false
        
      });
    });
   }

  cellButton(cell, row, enumObject, rowIndex) {
    
    return (
      <span>
      {row.rstatus == '1' ? (
        <div>
      <button className="btn btn-danger" id={"delete"+rowIndex}  onClick={() => {if(window.confirm('Disable The Item?')){this.deleteRow(row)}}}><i className="fa fa-trash"></i></button>
      <UncontrolledTooltip placement="left" target={"delete"+rowIndex}>Disable</UncontrolledTooltip> 
      <button className="btn btn-warning"  id={"edit"+rowIndex}  onClick={(e) => this.handleClickEdit(row)}><i className="fa fa-edit"></i></button>
    
    <UncontrolledTooltip placement="right" target={"edit"+rowIndex}>Edit</UncontrolledTooltip>
      </div>
  ) : (
    <div>
    <button className="btn btn-info" id={"delete"+rowIndex}  onClick={() => {if(window.confirm('Enable The Item?')){this.deleteRow(row)}}}><i className="fa fa-toggle-on"></i></button>
    <UncontrolledTooltip placement="left" target={"delete"+rowIndex}>Enable</UncontrolledTooltip>
    </div>
  )}
   
    
   
    </span>
      );
 }

        handleClick(record) {
   // console.log('this is:', record);
    this.setState({
      modal: !this.state.modal,
      iseditable:false, 
      title:"Add"     
      
    });
  //  console.log(this.state.modal);

    
  }

  

  handleClickEdit(record) {  
   
    this.setState({
      modal: !this.state.modal,
      iseditable:true,
      editrecord:record,
      title:"Update"  
    });
    
   
  // this.refs.child.getActiveSBUs();  
   //this.refs.child.getActiveBus(burequest);
  
  
   

    
  }

        deleteRow(record) {

          if(record.rstatus == '0'){
            this.setState({ loading: true })
            deactiveAppdetails(record.appDetailsId)
            .then(response => {    
              this.setState({ loading: false }) 
                this.getDeActiveList() 
                toast.dismiss();
                toast.success('Record Enabled Successfully');
                
            });
        
          } else{
            this.setState({ loading: true })
            deactiveAppdetails(record.appDetailsId)
            .then(response => {
              this.setState({ loading: false }) 
              this.getActiveList();
              toast.dismiss();
              toast.success('Record Disabled Successfully');
                
            });
        
          }
  
          

 
  }

    priceFormatter(cell, row,rowIndex,index){
      //console.log(this);
     // console.log(cell);
    return  (<div>{index+1}</div>) 
  }

  cnameFormatter(cell, row,rowIndex,index){
    //console.log(this);
    //console.log(cell);
  return  cell.cname;
}
sbunameFormatter(cell, row,rowIndex,index){
  //console.log(this);
  //console.log(cell);
return  cell.sbuname;
}
bunameFormatter(cell, row,rowIndex,index){
  //console.log(this);
  //console.log(cell);
return  cell.buName;
}


roleTitleFormatter(cell, row,rowIndex,index){
  //console.log(this);
  //console.log(cell);
return  cell.title;
}


   uploadFormatter(cell, row) {
    return (
      <UploadFormatter active={ cell } />
    );
  }

  handleUploadFile(event){
    const data = new FormData();

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
    this.apiservice.uploadAppInfoToServer(data).then((response) => {
      this.setState({ loading: false }) 
       // console.log("File " + file.name + " is uploaded");
        this.getActiveList();
        toast.success('File Uploaded Successfully');
        //message.success(" file uploaded successfully");
    }).catch(error => {
      this.setState({ loading: false });
      toast.error(error.response.data.message);
    });
};

doParentToggle(){
  //console.log("from child");
  this.getActiveList();  
  this.setState({
      modal: !this.state.modal,   //to close modal
      //submitClicked:!this.state.submitClicked
    }); 
 
}
  
showDeletedRecords(){ 
  if(this.state.recordsListName == "Show Enable Records"){
    this.getActiveList();
    this.setState({
      recordsListName:"Show Disable Records"
     
    }); 
  } else{
    this.getDeActiveList();
    this.setState({
      recordsListName:"Show Enable Records"
     
    }); 

  }
  
}

  render() {
    const selectRow = {
        mode: 'checkbox',
        bgColor: 'rgb(238, 193, 213)'
      };

      const cellEdit = {
        mode: 'click',
        blurToSave: true
      };

      

    return (
      <BlockUi tag="div" blocking={this.state.loading} loader={<Loader active type={loadertype} color="#8dc63f"/>} message={loaderMsg}>
      <div className="animated">
      <ToastContainer position="top-right" autoClose={5000} style={containerStyle} closeButton={false}/>
      
        <Card>
          <CardHeader>
            <i className="icon-menu"></i>SAM Details
            <div className="card-actions">
             
            </div>
          </CardHeader>
          <CardBody>
         
          
         {// <Button className="btn btn-info" onClick={this.handleClick} >ADD</Button>
         }
              <label className="btn btn-danger"  id="Add">ADD <input type="button"  hidden onClick={this.handleClick}/></label>
              <UncontrolledTooltip placement="right" target="Add">ADD</UncontrolledTooltip>  
              <label className="btn btn-warning" id="Import">Import<input type="file" hidden onChange={this.handleUploadFile.bind(this)} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/></label>
              <UncontrolledTooltip placement="right" target="Import">Import</UncontrolledTooltip>
              <Button className="btn btn-info" onClick={this.showDeletedRecords.bind(this)} id="rList">{this.state.recordsListName}</Button>
          <UncontrolledTooltip placement="top" target="rList">{this.state.recordsListName}</UncontrolledTooltip>

              

          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} keyboard={false} backdrop={false}>
          <ModalHeader toggle={this.toggle}>{this.state.title}</ModalHeader>
         
          <ModalBody>
          <CustModal ref="child" inputrecord={this.state.editrecord} editFlag ={this.state.iseditable}  parentMethod={this.doParentToggle} />
          </ModalBody>
          <ModalFooter>
            <Button className="btn-danger" onClick={this.modalSubmit.bind(this)}>{this.state.title}</Button>
            <Button className="btn-warning" onClick={this.modalClose.bind(this)}>Cancel</Button>
          </ModalFooter>
          
        </Modal>


       
        
         
        
            <BootstrapTable data={this.state.data} version="4"  condensed ={true} striped hover pagination search options={this.options} 
        
         exportCSV   multiColumnSearch={true} >
           <TableHeaderColumn isKey dataField="appDetailsId" dataField="appDetailsId" dataFormat={this.priceFormatter.bind(this)} export={false} >S.No</TableHeaderColumn>
            
           <TableHeaderColumn dataField="appname" csvHeader='Application  Name' filter={ { type: 'TextFilter', delay: 1000 } } dataSort tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }}   >Application</TableHeaderColumn>
         
            <TableHeaderColumn dataField="buname" csvHeader='BU Name' filter={ { type: 'TextFilter', delay: 1000 } }  dataSort  tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }}  >BU</TableHeaderColumn>
               <TableHeaderColumn dataField="sbuname" csvHeader='SBU Name' filter={ { type: 'TextFilter', delay: 1000 } }  dataSort  tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }}  >SBU</TableHeaderColumn>
             <TableHeaderColumn dataField="canme" csvHeader='Country Name' filter={ { type: 'TextFilter', delay: 1000 } } dataSort  tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }}  >Country</TableHeaderColumn>
          
            
            <TableHeaderColumn dataField='button' dataFormat={this.cellButton.bind(this)} hiddenOnInsert export={false} >Actions</TableHeaderColumn>
            {/*<TableHeaderColumn dataField="roleTitle" dataSort  dataFormat={this.roleTitleFormatter.bind(this)} tdStyle={ { whiteSpace: 'normal' } }  >Role Desc</TableHeaderColumn>
            <TableHeaderColumn dataField="country" dataSort dataFormat={this.cnameFormatter.bind(this)} tdStyle={ { whiteSpace: 'normal' } } >Country Name</TableHeaderColumn>
            <TableHeaderColumn dataField="sbu" dataSort dataFormat={this.sbunameFormatter.bind(this)} tdStyle={ { whiteSpace: 'normal' } } >SBU Name</TableHeaderColumn>
            <TableHeaderColumn dataField="sambu" dataSort dataFormat={this.bunameFormatter.bind(this)}  tdStyle={ { whiteSpace: 'normal' } }  >BU Name</TableHeaderColumn>
           
        */}
            </BootstrapTable>
          </CardBody>
        </Card> 
      </div>
      </BlockUi>
    );
  }
}


class CustModal extends Component {
    constructor() {
      super();
      this.state = {
        cunId:'',
        sbuId:'',
        buId:'0',
        appId:'0',
        appDetailsId:"",
        buList :[], 
        borderColor:defaultboarder,
        borderColorbu:defaultboarder, 
        borderColortitle:defaultboarder,  
        pasteAction:false,
        appName:'',
        value: { 'value' :'0',
        'label' :'Search BU Name',
        'id'  :'0' },
        selectTagBorderColor:defaultStyles,
        appsList:[],
       
      };
      
     
      this.onSubmit = this.onSubmit.bind(this);
    
     //
     
      this.onBuId = this.onBuId.bind(this);
      this.getActiveSBUs =this.getActiveSBUs.bind(this);
      this.blurBuId = this.blurBuId.bind(this);
      //app filed methods
      this.onAppName = this.onAppName.bind(this);
      this.blurapp = this.blurapp.bind(this);
      this.onPasteApp = this.onPasteApp.bind(this);


      this.saveChanges = this.saveChanges.bind(this);

      this.blurRoleTitle = this.blurRoleTitle.bind(this);
  

     
    }
    saveChanges(value) {
     // console.log(value)
      this.setState({ value:value });
     
     let obj = this.state.buList.filter(todo =>  todo.buId == value.id );
          this.setState({
            sbuId:obj[0].sbuname,
            cunId:obj[0].cname
            
          });
    }


    blurRoleTitle(value) {
      

      if( !value)
      {
        this.setState({
          borderColortitle:colordboarder         
        
      });
      toast.dismiss()
      toast.info('Select Country');

      } else{
        this.setState({
          borderColortitle:defaultboarder             
      });

      }

     }



    blurapp(e) {
      var value =e.target.value;

      if( value == '0')
      {
        this.setState({
          borderColorapp:colordboarder
          
        
      });
      document.getElementById("appCodeError").textContent = "Select  Application Name";

      }  else{
        this.setState({
          borderColorapp:defaultboarder             
      });
      document.getElementById("appCodeError").textContent = "";

      }
       
     }

     onAppName(e){
      this.setState({ appId:e.target.value });        
      }
     
    

     onPasteApp(e) {
      // console.log(e.value);
       this.setState({
        pasteAction: true
       });
     }


    

    componentDidMount() { 
      this.getActiveSBUs();
      this.getActiveAppsInfo();

       if(this.props.editFlag)
       {
          
        var editValue = {
          value :this.props.inputrecord.buname,
          label :this.props.inputrecord.buname,
          id  :this.props.inputrecord.buId 
                      }

       this.setState({
           value:editValue,
           appDetailsId: this.props.inputrecord.appDetailsId,           
           buId:this.props.inputrecord.buId,
           appId :this.props.inputrecord.appId,
           sbuId:this.props.inputrecord.sbuname,
           cunId:this.props.inputrecord.canme,

            
      
        });
     
        
   }

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
  
    

    
     

    
     onBuId(e) {
       //console.log(e);
    
  
      
  
        if (e.target.value == "0") {
          this.setState({
            buId: e.target.value,
            sbuId:""  
            
          
          });
        } else {
          
          let obj = this.state.buList.filter(todo =>  todo.buId == e.target.value );
          this.setState({
            buId: e.target.value,
            sbuId:obj[0].sbuname,
            cunId:obj[0].cname,
          
            
          });
          
        }
  
  
     
    }
    blurBuId(e) {
      var value =this.state.value.id;

      if( value == '0')
      {
        this.setState({
          borderColor:defaultboarder,
          borderColorbu:colordboarder,
          selectTagBorderColor:reddefaultStyles,    
          
          
        
      });
      document.getElementById("buNameError").textContent = "Select BU";

      } else{
        this.setState({
          borderColorbu:defaultboarder ,
          selectTagBorderColor:defaultStyles,            
      });

      document.getElementById("buNameError").textContent = "";

      }

     }
     

    


    formValidate(obj){
     // checking application name validations
      if(obj.appId == '0') {
        this.setState({
          borderColorapp:colordboarder
      });
      document.getElementById("appCodeError").textContent = "Select Application Name";

      } else {
        this.setState({
          borderColorapp:defaultboarder
      });
      document.getElementById("appCodeError").textContent = "";

      }

       // checking bu validations
     //  var value =this.state.value.id;
  if(obj.buId == '0'){
    this.setState({
      selectTagBorderColor:reddefaultStyles,  
  });
  document.getElementById("buNameError").textContent = "Select BU";

  }else{
    document.getElementById("buNameError").textContent = "";
    this.setState({
      selectTagBorderColor:defaultStyles,
  });
}
    
     


  
      if( obj.appId =="0"  || obj.buId == '0'  ){     
        
        return false;
      }else 
      {
        return true;
      }

  }


    onUpdate(){
      event.preventDefault();   
      //var code =this.state.hrRoleSAMCode.trim();

       // console.log("Befor Update");
       // console.log(this.state.hrRoleId);


      const obj = {
        appDetailsId:this.state.appDetailsId,
        appId:this.state.appId,
        buId:this.state.value.id
           
    
        
      };  
      //console.log(obj);

        if(!this.formValidate(obj)){
          // console.log("hello");
          event.preventDefault(); 
          return false;  
          }
     // console.log("Update Method Clicked");        
     updateAppInfo(obj)
      .then(response => {               
        // console.log("rsponse"+response); 
        toast.dismiss()
        toast.warn('Record Updated Successfully');
        this.props.parentMethod();
        
        
     }).catch(error => {  
      toast.dismiss()    
    toast.error( error.message);            
        });

  }

  onSubmit()  {
    event.preventDefault();   
  //console.log(this.state);

        //console.log("Befor Update");
       // console.log(this.state.hrRoleId);

    
  const obj = { 
   
    appId:this.state.appId,
    buId:this.state.value.id
   

    
  }; 
 // console.log(obj);       
            if(!this.formValidate(obj)){           
              event.preventDefault(); 
              return false;  
    }    

    createAppDetails(obj)
               // createSamSubFun(obj)
                  .then(response => {    
                    toast.dismiss()                                           
                   toast.success('Record Inserted Successfully'); 
                   this.props.parentMethod();  
                                
                }).catch(error => {
                   // console.log(error);
                   toast.dismiss()
                  toast.error( error.message);              
                             });
  
  }  

    




     getActiveSBUs(){
      getBuList()
      .then(response => {
         // console.log(response);
        this.setState({
          buList: response.activelist
        });
      });
    
    }
    




    
  
    render() {
      
          
              let bulist = this.state.buList;
              let buItems = bulist.map((bu) =>
                      <option key={bu.buId} value={bu.buId}>{bu.buName}</option>
                  );

                  
              let titleitems = bulist.map((title) =>{
                    //console.log("title.title"+title.title)
                    var obj = {
                        value :title.buName,
                        label :title.buName,
                        id  :title.buId ,
                                    }  
                                   // options2.push(obj);
                                    //console.log(options2+"options")
                                    return obj;
                                });

              let apps = this.state.appsList;
              let optionsapps = apps.map((app) =>
                            <option key={app.appId} value={app.appId}>{`${app.appName} `}</option>
                        );
             
                

      
      return (
        <Form onSubmit={this.onSubmit}  name="SamRole-form" >
        <Card>
          
              <CardHeader className="carheaderSmall">
                <strong>Application Info</strong> 
              </CardHeader>
              <CardBody>
                <FormGroup>
                    <Input type="text" placeholder="Username" value={this.state.appDetailsId}  hidden/>                   
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="nf-email">Application Name<span style={{color:'red'}}>*</span></Label>
                   {// <Input type="text" placeholder="Application Name" style ={this.state. borderColorapp}  maxLength ="50" minLength ="2" value={this.state.appName.replace(/^ /, '')} onPaste ={this.onPasteApp}  onChange={this.onAppName} onKeyPress={(e) => OnlyAlphabic(e)} onBlur = {this.blurapp} />
                    }
                    <Input type="select" id="app" name="select" id="select" style ={this.state.borderColorapp}  value ={this.state.appId}  onChange={this.onAppName}  onBlur={this.blurapp}   >
                        <option value="0">Please select</option>
                        {optionsapps}
                      </Input>
                    
                    <span id="appCodeError"></span>
                  </FormGroup>         
                  <FormGroup>  
                  <Label htmlFor="nf-email">BU Name<span style={{color:'red'}}>*</span></Label>
                      <Select
                     name="form-field-name2"             
                    value={this.state.value}
                    onChange={this.saveChanges}   
                    options={titleitems}
                   // style ={this.state.borderColorbu}
                    onBlur = {this.blurBuId}
                    styles={this.state.selectTagBorderColor}         
              />  
                      <span id="buNameError"></span>
                    
                  </FormGroup>         
                  
                  <FormGroup>  
                  <Label htmlFor="nf-email">Country Name</Label>
                     
                  <Input type="text" value={this.state.cunId} disabled></Input>
                   
                    
                  </FormGroup>
                  <FormGroup>  
                  <Label htmlFor="nf-email">SBU Name</Label>
                     
                  <Input type="text" value={this.state.sbuId} disabled ></Input>
                    
                  </FormGroup>  
                   
              </CardBody>
              
             
            </Card>
            </Form>
      );
    }
  }

export default AppInfo;

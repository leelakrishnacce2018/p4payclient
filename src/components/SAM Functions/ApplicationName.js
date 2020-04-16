import React, {Component} from 'react';
import {Card, CardHeader, CardBody,Button} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {  getBuList, deactiveRecord, updateBu, createBu, getCountries, deactiveCun, updateCountry, createCountry, getDelCountries, getAppNames, createAppname, updateApplicationName, deactiveAppName, getDeActiveAppNames } from './../../util/APIUtils';
import { Modal, ModalHeader, ModalBody, ModalFooter,Input,
   Form, FormGroup,
  FormText,
  Label,UncontrolledTooltip} from 'reactstrap';
  import {ToastContainer, toast} from 'react-toastify';
import { APIsService } from '../../util/API-service';
import { checkMimeType, OnlyAlphabic, OnlyAlphabicuns } from '../../util/customValidations';
import { colordboarder,defaultboarder, containerStyle, loaderMsg, loadertype ,defaultRegex} from '../../constants';
import LoadingSpinner from '../../util/LoadingSpinner';
//BLOCKUI Dependencies
import Loader from 'react-loaders'
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import 'loaders.css/loaders.min.css';

class ApplicationName extends Component {
  constructor(props) {
    super(props);   
    this.state = {      
        data :[],
        errormsg: null,
        loading: false,
        modal: false,
        primary: false,
        iseditable :false,
        editrecord :[],
        title :"",
        submitClicked :false,
        eclsname:"is-invalid",
        recordsListName:"Show Disable Records"
        
    }
    this.toggle = this.toggle.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.apiservice =new APIsService();
    this.doParentToggle = this.doParentToggle.bind(this);
    this.closeErrorMsg = this.closeErrorMsg.bind(this);
   
    
    this.options = {
      sortIndicator: true,
      hideSizePerPage: false,
      paginationSize: 3,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: true,
      withFirstAndLast: true,
      printToolBar: true
    }

  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    //console.log("modal closed");
    this.getActiveList();
    //this.refs.child.onSubmit();
  }

  modalSubmit(){
  /* var successFlag = this.refs.child.onSubmit();
   if(successFlag){
    this.setState({
      modal: !this.state.modal,
      submitClicked:!this.state.submitClicked
    });
    this.getActiveList();*/
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
   // console.log("modal closed");
    this.getActiveList();

  }

  togglePrimary() {
    this.setState({
      primary: !this.state.primary
    });
  }


  componentDidMount() {
    this.setState({ loading: true })

    this.getActiveList();
    this.setState({     
      modal:this.props.open,
      title:"Add"  
    })
  }

  
 



// api for  active countries 

   getActiveList(){
    this.setState({ loading: true })
    getAppNames()
    .then(response => {
       // console.log(response.activelist);
      this.setState({
        data: response.activelist,
        loading:false
      });
    });
   }

   getDeActiveList(){
    this.setState({ loading: true })
    getDeActiveAppNames()
    .then(response => {
       // console.log(response.activelist);
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
    //console.log('this is:', record);
    this.setState({
      modal: !this.state.modal,
      iseditable:false, 
      title:"Add"     
      
    });
    //console.log(this.state.modal);

    
  }

  

  handleClickEdit(record) {
   
   // console.log('this is:', record);
    this.setState({
      modal: !this.state.modal,
      iseditable:true,
      editrecord:record,
      title:"Update"  
    });
    //console.log(this.state.modal);

    
  }

  // api for set status '0' for de active country record

        deleteRow(record) {
     if(record.rstatus == '0'){
      this.setState({ loading: true })
      deactiveAppName(record.appId)
    .then(response => {   
      this.setState({ loading: false }) 
        this.getDeActiveList() 
        toast.dismiss();
        toast.success('Record Enabled Successfully');
        
    });

  } else{
    this.setState({ loading: true })
    deactiveAppName(record.appId)
    .then(response => {    
      this.setState({ loading: false })
        this.getActiveList();   
        toast.dismiss();
        toast.success('Record Disabled Successfully');
        
    });

  }

 
  }

    priceFormatter(cell, row,rowIndex,index){
         return  (<div>{index+1}</div>) 
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
    this.apiservice.uploadAppNamesToServer(data).then((response) => {
      this.setState({ loading: false }) 
       // console.log("File " + file.name + " is uploaded");
        this.getActiveList(); 
        if(response.data.success){
          toast.success("File Uploaded successfully");
          
        }
        
       
        //message.success(" file uploaded successfully");
    })
    .catch(error => {
      this.setState({ loading: false });
      toast.error(error.response.data.message);
    });
    
    
}

closeErrorMsg(){
  alert("Hello");
}

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
     
    
      <ToastContainer position="top-right"  autoClose={5000} style={containerStyle} closeButton={false}/>
     
        <Card  >
          <CardHeader>
            <i className="icon-menu"></i>Application
            <div className="card-actions">
             
            </div>
          </CardHeader>
          <CardBody>

          
          <Button className="btn btn-danger" onClick={this.handleClick} id="ADD">ADD</Button>
          <UncontrolledTooltip placement="top" target="ADD">ADD</UncontrolledTooltip>
          <label className="btn btn-warning" id="Import">Import<input type="file" hidden onChange={this.handleUploadFile.bind(this)} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/></label>
              <UncontrolledTooltip placement="right" target="Import">Import</UncontrolledTooltip>
          <Button className="btn btn-info" onClick={this.showDeletedRecords.bind(this)} id="rList">{this.state.recordsListName}</Button>
          <UncontrolledTooltip placement="top" target="rList">{this.state.recordsListName}</UncontrolledTooltip>

          
          

          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} keyboard={false} backdrop={false}>
          <ModalHeader toggle={this.toggle}>{this.state.title}</ModalHeader>
         
          <ModalBody>
          <CustModal ref="child" inputrecord={this.state.editrecord} editFlag ={this.state.iseditable} parentMethod={this.doParentToggle} />
          </ModalBody>
          <ModalFooter>
            <Button className=" btn-danger" onClick={this.modalSubmit.bind(this)}>{this.state.title}</Button>
            <Button className="btn-warning" onClick={this.modalClose.bind(this)}>Cancel</Button>
          </ModalFooter>
          
        </Modal>
         
        
            <BootstrapTable data={this.state.data} version="4"   condensed ={true} striped hover pagination search options={this.options} 
        
         exportCSV>
           <TableHeaderColumn isKey dataField="appId" dataField="appId" dataFormat={this.priceFormatter.bind(this)} export={false} >S.No</TableHeaderColumn>
            <TableHeaderColumn dataField="appName" dataSort  csvHeader='Application Name' tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }}  >Application Name</TableHeaderColumn>            
            <TableHeaderColumn dataField='button' dataFormat={this.cellButton.bind(this)} export={false} >Actions</TableHeaderColumn>
           
            </BootstrapTable>
          </CardBody>
      </Card>  
      </div>
      </BlockUi>
    );
  }
}



class CustModal extends Component {
    constructor(props) {
      super(props);
      this.apiservice =new APIsService();
      this.state = {
        pasteAction:false,
        appId: '',
        appName:'',
        eroor:'',
        borderColor:defaultboarder
         
       
      };
      
      this.onCname = this.onCname.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.blurCname = this.blurCname.bind(this);
      this.onPaste = this.onPaste.bind(this);
       

     
    }


    componentDidMount() { 
      
       if(this.props.editFlag)
       {         
       this.setState({
            appName: this.props.inputrecord.appName,
            appId: this.props.inputrecord.appId,
        });
        
   }else{
    this.setState({
        appName:'',
     
    });
  }

    }


    onPaste(e) {
      // console.log(e.value);
       this.setState({
        pasteAction: true
       });
     }
 
    
    onCname(e) {
     if(this.state.pasteAction)
     {
      this.setState({
        appName: e.target.value.replace(defaultRegex, ""),
        pasteAction:false
      });

     } else {
      this.setState({
        appName: e.target.value
      });
    }
    }

    blurCname(e) {
      
      var value =e.target.value.trim();
     

     // alert(allFoundCharacters.length);
      if( !value)
      {
       
        this.setState({
          borderColor:colordboarder
          
        
      });
      document.getElementById("ctryError").textContent = "Enter Application Name";
      

      } else
     
    
      if( value.length < 3)
      {
        this.setState({
          borderColor:colordboarder,
          errormsg:"input country"
        
      });
     
      document.getElementById("ctryError").textContent = "Application Name Minimum Length 3 Characters";

      } else{
        this.setState({
          borderColor:defaultboarder,
          errormsg:""        
      });
      document.getElementById("ctryError").textContent = "";

      }

      
       
     }
    
   
    

    formValidate(obj){
  


      if(!obj.appName) {
        this.setState({
          borderColor:colordboarder,
         // funId:'0',
      });
        document.getElementById("ctryError").textContent = "Enter Application Name";
        return false;

      }
     
      if((!obj.appName)||( obj.appName.length < 3)  ) {
        this.setState({
          borderColor:colordboarder,
         // funId:'0',
      });
      document.getElementById("ctryError").textContent = "Application Name Minimum Length 3  Characters";
     
        return false;
      } else
        {
        return true
      }

    }

    onUpdate(){
      var obj = {
        appName: this.state.appName.trim(),
        appId: this.state.appId,     
      }; 

        if(!this.formValidate(obj)){
          // console.log("hello");
          event.preventDefault(); 
          return false;  
          }
     // console.log("Update Method Clicked");        
     updateApplicationName(obj)
      .then(response => {               
        // console.log("rsponse"+response); 
        toast.dismiss()
        toast.warn('Record updated Successfully');
        this.props.parentMethod();
     }).catch(error => {      
      toast.dismiss()
    toast.error( error.message);            
        });

  }

  onSubmit()  {
    event.preventDefault();   
    var obj = {
      appName: this.state.appName.trim(),
      appId: this.state.appId,     
    };        
            if(!this.formValidate(obj)){           
              event.preventDefault(); 
              return false;  
    }         
    createAppname(obj)
               // createSamSubFun(obj)
                  .then(response => {   
                    toast.dismiss()                                           
                   toast.success('Record Inserted Successfully'); 
                   this.props.parentMethod();                 
                }).catch(function(error) {
                  toast.dismiss()
                  toast.error( error.message);              
                             });
  
  }
    



    
  
    render() {

      
      return (
        <Form onSubmit={this.onSubmit}  name="SamRole-form" >
        <Card>
              <CardHeader  className="carheaderSmall">
                <strong>Application Name</strong> 
              </CardHeader>
              <CardBody>
                <FormGroup>
                    <Input type="text"  value={this.state.appId}  hidden/>                   
                  </FormGroup> 
                  <FormGroup>
                    <Label htmlFor="nf-email">Application Name<span style={{color:'red'}}>*</span></Label>
                    <Input type="text" placeholder="Application Name"  style ={this.state.borderColor}  maxLength ="100" minLength ="3" value= {this.state.appName.replace(/^ /, '')} onPaste ={this.onPaste}  onChange = {this.onCname} onKeyPress={(e) => OnlyAlphabic(e)}  onBlur = {this.blurCname} />
                      <span id="ctryError"></span>
                  {//  <FormText className="help-block">{this.state.errormsg}</FormText>
                  }</FormGroup> 
              </CardBody>           
             
            </Card>
            </Form>
      );
    }
  }

export default ApplicationName;

import React, {Component} from 'react';
import {Card, CardHeader, CardBody,Button} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn,ButtonToolbar} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
//import SweetAlert from 'react-bootstrap-sweetalert';
import {  deactiveRecord, updateBu, createBu, getActiveList, getDelBuList, getUserList,getInactiveUserList,deactiveUser,createUser,updateuser } from './../../util/APIUtils';
import { Modal, ModalHeader, ModalBody, ModalFooter,Input,
  Form, FormGroup,
  Label,UncontrolledTooltip } from 'reactstrap';
  import {ToastContainer, toast} from 'react-toastify';
import { APIsService } from '../../util/API-service';
import { OnlyAlphabic, ForOnlyuseName ,charactersWithWhiteSpace} from '../../util/customValidations';
import { colordboarder,defaultboarder, containerStyle, loadertype, loaderMsg, onlyChrRegex } from '../../constants';

//BLOCKUI Dependencies
import Loader from 'react-loaders'
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import 'loaders.css/loaders.min.css';




class User extends Component {
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
        recordsListName:"Show Disable Records",
        firstName:"",
        lastName:""
        
    }
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
    this.getActiveList();
    this.setState({     
      modal:this.props.open,
      title:"Add"
      
    })
  }

  
 



   getActiveList(){
    this.setState({ loading: true })
    getUserList()
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
    getInactiveUserList()
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
   // console.log(this.state.modal);

    
  }

        deleteRow(record) {

          if(record.roleRank == '0'){
            this.setState({ loading: true })
            deactiveUser(record.id)
            .then(response => {    
              this.setState({ loading: false }) 
                this.getDeActiveList() 
                toast.dismiss();
                toast.success('Record Enabled Successfully');
                
            });
        
          } else{
            this.setState({ loading: true })
        
            deactiveUser(record.id)
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

   uploadFormatter(cell, row) {
    return (
      <UploadFormatter active={ cell } />
    );
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
      <ToastContainer position="top-right" autoClose={5000} style={containerStyle} closeButton={false}/>    
        <Card>
          <CardHeader>
            <i className="icon-menu"></i>User Privileges
            <div className="card-actions">
             
            </div>
          </CardHeader>
          <CardBody>
         
          
          <Button className="btn btn-danger" onClick={this.handleClick} id="ADD">ADD</Button>
          <UncontrolledTooltip placement="top" target="ADD">ADD</UncontrolledTooltip>
          <Button className="btn btn-info" onClick={this.showDeletedRecords.bind(this)} id="rList">{this.state.recordsListName}</Button>
          <UncontrolledTooltip placement="top" target="rList">{this.state.recordsListName}</UncontrolledTooltip>
          

          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} keyboard={false} backdrop={false}>
          <ModalHeader toggle={this.toggle}>{this.state.title}</ModalHeader>
         
          <ModalBody>
          <CustModal ref="child" inputrecord={this.state.editrecord} editFlag ={this.state.iseditable} parentMethod={this.doParentToggle} />
          </ModalBody>
          <ModalFooter>
            <Button className="btn-danger" onClick={this.modalSubmit.bind(this)}>{this.state.title}</Button>
            <Button className="btn-warning" onClick={this.modalClose.bind(this)}>Cancel</Button>
          </ModalFooter>
          
        </Modal>
         
        
            <BootstrapTable data={this.state.data} version="4"  condensed ={true} striped hover pagination search options={this.options} 
        
         exportCSV >
           <TableHeaderColumn isKey dataField="id"  dataFormat={this.priceFormatter.bind(this)}  export={false}>S.No</TableHeaderColumn>
            <TableHeaderColumn dataField="name" csvHeader='Full Name' filter={ { type: 'TextFilter', delay: 1000 } } dataSort  tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }} >Name</TableHeaderColumn> 
            <TableHeaderColumn dataField="mobileNumber" csvHeader='Mobile' filter={ { type: 'TextFilter', delay: 1000 } } dataSort tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }}   >Mobile</TableHeaderColumn>  
            <TableHeaderColumn dataField="email" csvHeader='Email' filter={ { type: 'TextFilter', delay: 1000 } } dataSort tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }}   >Email</TableHeaderColumn>  
            <TableHeaderColumn dataField="kycApproved" csvHeader='KYC Status' filter={ { type: 'TextFilter', delay: 1000 } } dataSort tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }}   >KYC</TableHeaderColumn>  

            <TableHeaderColumn dataField="otp" csvHeader='OTP' filter={ { type: 'TextFilter', delay: 1000 } } dataSort tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }}   >OTP</TableHeaderColumn>  
            <TableHeaderColumn dataField="otpStatus" csvHeader='OTP Status' filter={ { type: 'TextFilter', delay: 1000 } } dataSort tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }}   >OTP Status</TableHeaderColumn> 
            <TableHeaderColumn dataField="role" csvHeader='Role' filter={ { type: 'TextFilter', delay: 1000 } } dataSort tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }}   >Role</TableHeaderColumn> 
            <TableHeaderColumn dataField='button'  dataFormat={this.cellButton.bind(this)} hiddenOnInsert  export={false}>Actions</TableHeaderColumn>
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
        buId: '',
        buName:'U',
        sbuId:'0',
        sbuList:[],
        borderColor:defaultboarder,
        borderColorsbu:defaultboarder,
        pasteAction:false,
        recordsListName:"Get Disable Records"      
      };

      this.onBuName = this.onBuName.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onSbuId = this.onSbuId.bind(this);
      this.blurBuname = this.blurBuname.bind(this);
      this.blurSbuId = this.blurSbuId.bind(this);
      this.onPaste = this.onPaste.bind(this);
      this.onLastName = this.onLastName.bind(this);
      this.onFirstName = this.onFirstName.bind(this);

      this.blurFirstName = this.blurFirstName.bind(this);
      this.blurLastName = this.blurLastName.bind(this);

      
      
      
      

     
    }


    onPaste(e) {
      // console.log(e.value);
       this.setState({
        pasteAction: true
       });
     }
 
    

    blurBuname(e) {
      var value =e.target.value.trim();
      if(!value){
        this.setState({
          borderColor:colordboarder
      });
      document.getElementById("ctryError").textContent = "Enter Name";     

      } else  {
        this.setState({
          borderColor:defaultboarder
       
      });
      document.getElementById("ctryError").textContent = "";     

      }    
       
     }

     blurSbuId(e) {
      var value =e.target.value;

      if( value == '0')
      {
        this.setState({
          borderColorsbu:colordboarder
          
        
      });
      document.getElementById("sbuError").textContent = "Select User Role";
      
     
      } else{
        this.setState({
          borderColorsbu:defaultboarder             
      });
      document.getElementById("sbuError").textContent = "";

      }

     }


    componentDidMount() { 
      // console.log(this.props.editFlag);
   
       this.getActiverecords();

       if(this.props.editFlag)
       {
           //console.log("edit record"+this.props.inputrecord);

       this.setState({
            buName: this.props.inputrecord.exRole,
            buId: this.props.inputrecord.id,
            sbuId: this.props.inputrecord.interRole,
        });
        
   }else{
    this.setState({
        buName:'',
       // funId:'0',
    });
  }

    }


    
      onBuName(e) {
     
     
      this.setState({
        buName: e.target.value
      });
    
    }

    
    
    onSbuId(e) {
      // console.log("on sbu"+e.value);
       this.setState({
         sbuId: e.target.value
       });
     }
     onFirstName(e) {
      //console.log("on sbu"+e.value);
      this.setState({
        firstName: e.target.value
      });
    }

    onLastName(e) {
      //console.log("on sbu"+e.value);
      this.setState({
        lastName: e.target.value
      });
    }


    //blr actions

    blurFirstName(e) {
      
      var value =e.target.value.trim();

      if( !value)
      {
        document.getElementById("firstName").style.borderColor = "red";
        document.getElementById("firstNameError").textContent = "Enter First name";
      

      } 
     
    
      else{
      document.getElementById("firstName").style.borderColor = "#e4e6eb";
      document.getElementById("firstNameError").textContent = "";

      }

      
       
     }
     blurLastName(e) {
      
      var value =e.target.value.trim();

      if( !value)
      {
        document.getElementById("lastName").style.borderColor = "red";
        document.getElementById("lastNameError").textContent = "Enter Last name";
      

      } 
     
    
      else{
      document.getElementById("lastName").style.borderColor = "#e4e6eb";
      document.getElementById("lastNameError").textContent = "";

      }

      
       
     }
    
    
   
    

    formValidate(obj){

      if(!obj.name){
        this.setState({
          borderColor:colordboarder
      });
      document.getElementById("ctryError").textContent = "Enter User LoginId";     

      }  else  {
        this.setState({
          borderColor:defaultboarder
       
      });
      document.getElementById("ctryError").textContent = "";     

      }
      if(obj.interRole == '0'){
        this.setState({
          borderColorsbu:colordboarder
      });
      document.getElementById("sbuError").textContent = "Select User Role";
      

      } else{
        this.setState({
          borderColorsbu:defaultboarder
      });

        document.getElementById("sbuError").textContent = "";

      }   

      if(!obj.mobileNumber){
        document.getElementById("firstName").style.borderColor = "red";
      document.getElementById("firstNameError").textContent = "Enter First name";     

      }  else  {
        document.getElementById("firstName").style.borderColor = "#e4e6eb";
      document.getElementById("firstNameError").textContent = "";     

      }

      if(!obj.email){
        document.getElementById("lastName").style.borderColor = "red";
        document.getElementById("lastNameError").textContent = "Enter Last name";     
  
        }  else  {
          document.getElementById("lastName").style.borderColor = "#e4e6eb";
        document.getElementById("lastNameError").textContent = "";     
  
        }

     
      if(obj.name =="" || obj.exRole == 'undefined'   || obj.interRole == '0' || obj.email.length < 1 || obj.mobileNumber.length < 1){
       
        return false;
      }else
        {
        return true
      }

    }


    onUpdate(){
      var obj = {
        exRole: this.state.buName.trim(), //login id
        interRole: this.state.sbuId,      //user role
        id:this.state.buId,
        firstName:this.state.firstName,
        lastName:this.state.lastName,
         
      };    

        if(!this.formValidate(obj)){
          // console.log("hello");
          event.preventDefault(); 
          return false;  
          }
     // console.log("Update Method Clicked");        
     updateuser(obj)
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
  
    
    var obj = {
      name: this.state.buName.trim(), //login id
     // interRole: this.state.sbuId,      //user role
      mobileNumber:this.state.firstName,
      email:this.state.lastName,
      password:"123456"
       
    };         
            if(!this.formValidate(obj)){           
              event.preventDefault(); 
              return false;  
    }      
    createUser(obj)
               // createSamSubFun(obj)
                  .then(response => {   
                    toast.dismiss()                                            
                   toast.success('Record Inserted Successfully'); 
                   this.props.parentMethod();                 
                }).catch(error => {
                    //console.log(error);
                    toast.dismiss()
                  toast.error( error.message);              
                             });
  
  }   
    
    
getActiverecords(){
  getActiveList()
  .then(response => {
      //console.log(response);
    this.setState({
      sbuList: response.activelist
    });
  });

}
  
    render() {

   

      
      return (
        <Form onSubmit={this.onSubmit}  name="SamRole-form" >
        <Card>
          
              <CardHeader className="carheaderSmall">
                <strong>User Privileges</strong> 
              </CardHeader>
              <CardBody>
                <FormGroup>
                    <Input type="text"  value={this.state.buId}  hidden/>                   
                  </FormGroup> 
                  <FormGroup>
                    <Label htmlFor="nf-email">Name<span style={{color:'red'}}>*</span></Label>
                    <Input type="text" placeholder="Name" style ={this.state.borderColor}   value={this.state.buName} onPaste ={this.onPaste}   onChange={this.onBuName}   onBlur = {this.blurBuname}/>
                    <span id="ctryError"></span>
                  </FormGroup> 
                  <FormGroup>
                    <Label htmlFor="nf-email">Mobile<span style={{color:'red'}}>*</span></Label>
                    <Input type="text" placeholder="Mobile"  id="firstName" maxLength ="50" minLength ="1" value={this.state.firstName}   onChange={this.onFirstName}   onBlur = {this.blurFirstName}/>
                    <span id="firstNameError"></span>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="nf-email">Email<span style={{color:'red'}}>*</span></Label>
                    <Input type="text" placeholder="Email"  id="lastName" maxLength ="50" minLength ="1" value={this.state.lastName}    onChange={this.onLastName}   onBlur = {this.blurLastName}/>
                    <span id="lastNameError"></span>
                  </FormGroup>
                  <FormGroup>  
                  <Label htmlFor="nf-email">User Role<span style={{color:'red'}}>*</span></Label>                     
                      <Input type="select" name="select" style ={this.state.borderColorsbu}  id="select" value={this.state.sbuId} onChange={this.onSbuId}   onBlur = {this.blurSbuId}>
                        <option value="0">Please Select</option>
                        <option value="ROLE_ADMIN">Administrator</option>
                        <option value="ROLE_USER">USER</option>
                        <option value="ROLE_SUPERUSER">Super User</option>
                       
                      </Input>
                      <span id="sbuError"></span>           
                  </FormGroup>              
              </CardBody>     
             
            </Card>
            </Form>
      );
    }
  }

export default User;

import React, {Component} from 'react';
import {Card, CardHeader, CardBody,Button} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn,ButtonToolbar} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
//import SweetAlert from 'react-bootstrap-sweetalert';
import {  deactiveRecord, updateBu, createBu, getActiveList, getDelBuList, getUserList,getInactiveUserList,deactiveUser,createUser,updateuser, getUsersByFilter, approveUser } from './../../util/APIUtils';
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
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';




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
    this.onFilterChange = this.onFilterChange.bind(this);
    
    
    
    
    
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

  onFilterChange(){
    var e = document.getElementById("selectUsers");

    this.setState({ loading: true })

    var obj = {
      kycStatus :e.value
    }
    getUsersByFilter(obj)
    .then(response => {
       // console.log(response.activelist);
      this.setState({
        data: response.activelist,
        loading:false
      });
    });
   
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

    var obj = {
      kycStatus :'W'
    }
    getUsersByFilter(obj)
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
    getInactiveUserList()
    .then(response => {
       // console.log(response.inactivelist);
      this.setState({
        data: response.inactivelist,
        loading:false
        
      });
    });
   }

   showAddress(cell,row){
   
     return row.address ? row.address.address+"\n"+row.address.city+"\n"+row.address.state:'';
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
  approveRecord(record){

    console.log("view kyc");
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
            <i className="icon-menu"></i>Users
            <div className="card-actions">
             
            </div>
          </CardHeader>
          <CardBody>
         
          
          {/* <Button className="btn btn-danger" onClick={this.handleClick} id="ADD">ADD</Button>
          <UncontrolledTooltip placement="top" target="ADD">ADD</UncontrolledTooltip> */}
          <Button className="btn btn-info" onClick={this.showDeletedRecords.bind(this)} id="rList">{this.state.recordsListName}</Button>
          <UncontrolledTooltip placement="top" target="rList">{this.state.recordsListName}</UncontrolledTooltip>
          <select id='selectUsers' onChange={this.onFilterChange} style={{marginLeft:'10px',color:'#151b1e',backgroundColor:'#22f58f',borderColor:'#22f58f',display:'inline-block',marginBottom:'10px',border:'1px solid transparent',borderRadius:'0.25rem',lineHeight:'1.5',padding:'0.375rem 0.75rem',textAlign:'center',verticalAlign:'middle'}}>
            <option value="W">Approval Pending</option>
            <option value="N">Upload Pending</option>
            <option  value="R">Reject</option>
            <option  value="A">Approved</option>
          </select>

          
          

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
            <TableHeaderColumn dataField="kycStatus" csvHeader='KYC Status' filter={ { type: 'TextFilter', delay: 1000 } } dataSort tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }}   >KYC</TableHeaderColumn>  

            <TableHeaderColumn dataField="otpVerified" csvHeader='OTP Status' filter={ { type: 'TextFilter', delay: 1000 } } dataSort tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }}   >OTP</TableHeaderColumn> 
            <TableHeaderColumn dataField="mpin" csvHeader='MPIN' filter={ { type: 'TextFilter', delay: 1000 } } dataSort tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }}   >MPIN</TableHeaderColumn>   
            <TableHeaderColumn dataField="address" dataFormat={this.showAddress.bind(this)} csvHeader='Address' filter={ { type: 'TextFilter', delay: 1000 } } dataSort tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }}   >Address</TableHeaderColumn>   
             <TableHeaderColumn dataField="role" csvHeader='Role' filter={ { type: 'TextFilter', delay: 1000 } } dataSort tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }}   >Role</TableHeaderColumn> 
            <TableHeaderColumn dataField='button'  dataFormat={this.cellButton.bind(this)}  hiddenOnInsert  export={false}>Actions</TableHeaderColumn>
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
        buName:'',
        sbuId:'0',
        sbuList:[],
        borderColor:defaultboarder,
        borderColorsbu:defaultboarder,
        pasteAction:false,
        recordsListName:"Get Disable Records",
        name:"",
        panImg:"",
        selfiImg:"",
        kycStatus:""
       
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
      this.OnKycStatus =this.OnKycStatus.bind(this);

      
      
      
      

     
    }


    onPaste(e) {
      // console.log(e.value);
       this.setState({
        pasteAction: true
       });
     }

     OnKycStatus(e) {
      //console.log("on sbu"+e.value);
      this.setState({
        kycStatus: e.target.value
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
            panImg:this.props.inputrecord.panStr,
            selfiImg:this.props.inputrecord.selfyStr,
            name:this.props.inputrecord.name
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

      var e = document.getElementById("selectUsers");
      var obj = {
        remarks: this.state.buName.trim(), //login id
        kycStatus: this.state.kycStatus.trim(),      //user role
        id:this.state.buId
      };    

        
     // console.log("Update Method Clicked");   
     // console.log(obj);         
     approveUser(obj)
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
 
}
  
    render() {

   

      
      return (
        <Form onSubmit={this.onSubmit}  name="SamRole-form" >
        <Card>
          
              <CardHeader className="carheaderSmall">
                <strong>Users</strong> 
              </CardHeader>
              <CardBody>
              <form>
                  <div className="form-group row">
                     <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Name</label>
                  <div className="col-sm-8">
                     <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={this.state.name}/>
                   </div>
                   </div>
                          <div className="form-group row">
                            <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Pancard</label>
                            <div className="col-sm-8">
                            <a download="FILENAME.png" href={"data:image/png;base64,"+this.state.panImg}>Download</a>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Selfi Pic</label>
                            <div className="col-sm-8">
                            <a download="FILENAME.png" href={"data:image/png;base64,"+this.state.selfiImg}>Download</a>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label htmlFor="inputPassword" className="col-sm-3 col-form-label">KYC Status</label>
                            <div className="col-sm-8">
                            <Input
                                      type="select"
                                      name="select"
                                      id="kycStatus"
                                      value={this.state.cunId}
                                      onChange={this.OnKycStatus}
                                    >
                                      <option value="R">Reject</option>
                                      <option value="A">Approve</option>
              
            </Input>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Remarks</label>
                            <div className="col-sm-8">
                            <input type="text" id='remarks' className="form-control"  onChange={this.onBuName} value={this.state.buName}/>
                            </div>
                          </div>
                        </form>

             </CardBody>
            </Card>
            </Form>
      );
    }
  }

export default User;

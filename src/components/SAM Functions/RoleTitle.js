import React, {Component} from 'react';
import {Card, CardHeader, CardBody,Button} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { getRoleTitles, deactiveRoleTitle, updateRoleTitle, createRoletitle, getDelRoleTitles } from './../../util/APIUtils';
import { Modal, ModalHeader, ModalBody, ModalFooter,Input,
   Form, FormGroup,
  FormText,
  Label,UncontrolledTooltip} from 'reactstrap';
  import {ToastContainer, toast} from 'react-toastify';
import { APIsService } from '../../util/API-service';
import { checkMimeType, OnlyAlphabic } from '../../util/customValidations';
import { colordboarder,defaultboarder, containerStyle, loadertype, loaderMsg,defaultRegex } from '../../constants';
import LoadingSpinner from '../../util/LoadingSpinner';
//BLOCKUI Dependencies
import Loader from 'react-loaders'
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import 'loaders.css/loaders.min.css';


class RoleTitle extends Component {
  constructor(props) {
    super(props);   
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
    this.toggle = this.toggle.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.apiservice =new APIsService();
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
    //console.log("modal closed");
    this.getActiveList();
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
   // console.log("modal closed");
    this.getActiveList();

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
  
 
// api for  active countries 

   getActiveList(){
    this.setState({ loading: true })
    getRoleTitles()
    .then(response => {
        //console.log(response.activelist);
      this.setState({
        data: response.activelist,
        loading:false
      });
    });
   }

   getDeActiveList(){
    this.setState({ loading: true })
    getDelRoleTitles()
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
   // console.log(this.state.modal);

    
  }

  // api for set status '0' for de active country record

        deleteRow(record) {

          if(record.rstatus == '0'){
            this.setState({ loading: true })
            deactiveRoleTitle(record.titleId)
            .then(response => {   
              this.setState({ loading: false }) 
                this.getDeActiveList() 
                toast.dismiss();
                toast.success('Record Enabled Successfully');
                
            });
        
          } else{
            this.setState({ loading: true })
            deactiveRoleTitle(record.titleId)
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
    this.apiservice.uploadHRRolesToServer(data).then((response) => {
      //  console.log("File " + file.name + " is uploaded");
      this.setState({ loading: false })
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
      <ToastContainer position="top-right" autoClose={5000} style={containerStyle}  closeButton={false}/>
      
        <Card>
          <CardHeader>
            <i className="icon-menu"></i>HR Role
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
         
        
            <BootstrapTable data={this.state.data} version="4"  condensed ={true}  striped hover pagination search options={this.options} exportCSV>
           <TableHeaderColumn isKey dataField="titleId" dataField="titleId" dataFormat={this.priceFormatter.bind(this)} export={false} >S.No</TableHeaderColumn>
            <TableHeaderColumn dataField="title" dataSort  tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }} >Role Title</TableHeaderColumn>            
            <TableHeaderColumn dataField='button' dataFormat={this.cellButton.bind(this)} hiddenOnInsert export={false} >Actions</TableHeaderColumn>
           
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
        
        titleId: '',
        title:'',
        borderColor:defaultboarder,
        pasteAction:false,       
       
      };
      
      this.onCname = this.onCname.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onUpdate = this.onUpdate.bind(this);
      this.blurTitle = this.blurTitle.bind(this);
      this.onPaste = this.onPaste.bind(this);
      
     
     
    }
    blurTitle(e) {
      var value =e.target.value.trim();

      if( !value)
      {
        this.setState({
          borderColor:colordboarder
          
        
      });
      document.getElementById("ctryError").textContent = "Enter Role Title";

      } else
     
    
      if( value.length < 6)
      {
        this.setState({
          borderColor:colordboarder
          
        
      });
      document.getElementById("ctryError").textContent = "Role Title Be More Than 5  Characters";

      } else{
        this.setState({
          borderColor:defaultboarder             
      });
      document.getElementById("ctryError").textContent = "";
      }
       
     }


    componentDidMount() { 
      
       if(this.props.editFlag)
       {
    //console.log("edit record"+this.props.inputrecord);

       this.setState({
            title: this.props.inputrecord.title,
            titleId: this.props.inputrecord.titleId,
        });
        
   }else{
    this.setState({
        title:'',
       // funId:'0',
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
        title: e.target.value.replace(defaultRegex, ""),
        pasteAction: false

      });
      
      
     }else {
      this.setState({
        title: e.target.value
      });

     }
      
    }
    
   
    

    formValidate(obj){
      if(!obj.title){
        this.setState({
          borderColor:colordboarder
      });
        document.getElementById("ctryError").textContent = "Enter Role Title ";
        return false;
      } else

      if( obj.title.length < 6) {
        this.setState({
          borderColor:colordboarder
      });
      document.getElementById("ctryError").textContent = "Role Title Be More Than 5  Characters";
        return false;
      }else
        {
        return true
      }

    }


    onUpdate(){
        var obj = {
            title: this.state.title.trim(),
            titleId: this.state.titleId,     
          };

          if(!this.formValidate(obj)){
            // console.log("hello");
            event.preventDefault(); 
            return false;  
            }
       // console.log("Update Method Clicked");        
        updateRoleTitle(obj)
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

  
  const obj = {
    title: this.state.title.trim(),
    titleId: this.state.titleId,     
  };          
          if(!this.formValidate(obj)){           
            event.preventDefault(); 
            return false;  
  }      
        createRoletitle(obj)
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
  
    render() {      
      return (
        <Form onSubmit={this.onSubmit}  name="RoleTitle-form" >
        <Card>
              <CardHeader  className="carheaderSmall">
                <strong>Role Title</strong> 
              </CardHeader>
              <CardBody>
                <FormGroup>
                    <Input type="text"  value={this.state.titleId}  hidden/>                   
                  </FormGroup> 
                  <FormGroup>
                    <Label htmlFor="nf-email">Role Title<span style={{color:'red'}}>*</span></Label>
                    <Input type="text" placeholder="Role Title" style ={this.state.borderColor} maxLength ="100" minLength ="6" value={this.state.title.replace(/^ /, '')} onPaste ={this.onPaste}  onChange={this.onCname} onKeyPress={(e) => OnlyAlphabic(e)}  onBlur = {this.blurTitle} />
                    <span id="ctryError"></span>
                  </FormGroup> 
              </CardBody>
               {/*  
              <CardFooter>
                  <input type="submit" className="button"  value="Register"/>
                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                }<Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
              */}
             
            </Card>
            </Form>
      );
    }
  }

export default RoleTitle;

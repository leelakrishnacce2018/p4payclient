import React, {Component} from 'react';
import {Card, CardHeader, CardBody,Button} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn,ButtonToolbar} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
//import SweetAlert from 'react-bootstrap-sweetalert';
import {  unApprovedSamdata, rejectSamDataRecord,  approveSamDataRecord, ApprovedSamdata } from '../../util/APIUtils';
import {Row, Col, Modal, ModalHeader, ModalBody, ModalFooter,Input,
  InputGroup,  Form, FormGroup,
  FormText,CardFooter,
  Label,UncontrolledTooltip} from 'reactstrap';
  import {ToastContainer, toast} from 'react-toastify';
import { APIsService } from '../../util/API-service';
import { checkMimeType, OnlyAlphabic, upperCaseF, OnlyAlphabicW } from '../../util/customValidations';
import Select from 'react-select';
import './customCss.css';
import LoadingSpinner from '../../util/LoadingSpinner';
import { containerStyle, loadertype, loaderMsg } from '../../constants';
//BLOCKUI Dependencies
import Loader from 'react-loaders'
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import 'loaders.css/loaders.min.css';


class ReportsApproveRecords extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
        data :[],
        error: null,
        modal: false,
        primary: false,
        iseditable :false,
        editrecord :[],
        title :"",
        submitClicked :false,
        loading: false,
        
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
    this.setState({ loading: true })
    this.getActiveList();
  }

 
  


   getActiveList(){
    ApprovedSamdata()
    .then(response => {
       // console.log(response.activelist);
      this.setState({
        data: response.activelist,
        loading:false
      });
    });
   }

  cellButton(cell, row, enumObject, rowIndex) {
    
    return (
        <span>
          
        <button className="btn btn-danger"  id={"delete"+rowIndex}  onClick={() => {if(window.confirm('Reject the item?')){this.deleteRow(row)}}}><i className="fa fa-ban"></i></button>
        <button className="btn btn-warning"  id={"edit"+rowIndex}  onClick={() => {if(window.confirm('Approve the item?')){this.approveRow(row)}}}><i className="fa fa-check"></i></button>
       

        <UncontrolledTooltip placement="right" target={"edit"+rowIndex}>Approve</UncontrolledTooltip>
        <UncontrolledTooltip placement="left" target={"delete"+rowIndex}>Reject</UncontrolledTooltip>   
        
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
    //console.log(this.state.modal);
    var burequest ={
      sbuId:  record.sbu.sbuId
     } 
    var sburequest ={
    cunId: record.country.cunId,
   }
   
   //this.refs.child.getActiveSBUs();  
   //this.refs.child.getActiveBus(burequest);
  
  
   

    
  }

        deleteRow(record) {
  
rejectSamDataRecord(record.samDataId)
    .then(response => {
      toast.dismiss();
        this.getActiveList();
        toast.success('Record Rejected Successfully');
    });

 
  }

  approveRow(record) {  
   approveSamDataRecord(record.samDataId)
    .then(response => {
      toast.dismiss();
        this.getActiveList();
        toast.success('Record Approved Successfully');
    });

 
  }

    priceFormatter(cell, row,rowIndex,index){
      //console.log(this);
     // console.log(cell);
    return  (<div>{index+1}</div>) 
  }

  cnameFormatter(cell, row,rowIndex,index){
    //console.log(this);
    //console.log(cell);
  return  cell.hrRoleSAMCode;
}

appmenuFormatter(cell){
    return  cell.appMenu;
}

appfunFormatter(cell){
    return  cell.funName;
}

appsubfunFormatter(cell){
    return  cell.subFunName;
}




sbunameFormatter(cell, row,rowIndex,index){
  //console.log(this);
  //console.log(cell);
return  cell.appName;
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

enumFormatter(cell, row, enumObject) {
  
    return cell.funName;
  }

   uploadFormatter(cell, row) {
    return (
      <UploadFormatter active={ cell } />
    );
  }


  activeFormatter(cell, row) {
    return (
      <ActiveFormatter active={ cell } />
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
    //calling async Promise and handling response or error situation
    this.apiservice.uploadFileToServer(data).then((response) => {
        //console.log("File " + file.name + " is uploaded");
        this.getActiveList();
        toast.success('File Uploaded successfully');
        //message.success(" file uploaded successfully");
    }).catch(function (error) {
       // console.log(error);
        if (error.response) {
            //HTTP error happened
            //message.error(`${info.file.name} file upload failed.`);
           // console.log("Upload error. HTTP error/status code=",error.response.status);
        } else {
            //some other error happened
           console.log("Upload error. HTTP error/status code=",error.message);
        }
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
            <i className="icon-menu"></i>Approved List
            <div className="card-actions">
             
            </div>
          </CardHeader>
          <CardBody>
         
          
         

             

          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} keyboard={false} backdrop={false}>
          <ModalHeader toggle={this.toggle}>{this.state.title}</ModalHeader>
         
          <ModalBody>
          {//<CustModal ref="child" inputrecord={this.state.editrecord} editFlag ={this.state.iseditable}  parentMethod={this.doParentToggle} />
          }</ModalBody>
          <ModalFooter>
            <Button className="btn-danger" onClick={this.modalSubmit.bind(this)}>{this.state.title}</Button>
            <Button className="btn-warning" onClick={this.modalClose.bind(this)}>Cancel</Button>
          </ModalFooter>
          
        </Modal>


       
        
     
        
            <BootstrapTable data={this.state.data} version="4" striped hover pagination search options={this.options} 
        
         exportCSV search
         multiColumnSearch   >
           <TableHeaderColumn isKey dataField="samDataId" dataField="samDataId" dataFormat={this.priceFormatter.bind(this)} >S.No</TableHeaderColumn>
           <TableHeaderColumn dataField='buName'  tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }} dataSort>BU Name</TableHeaderColumn>
           <TableHeaderColumn dataField='appName'  tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }} dataSort>Application</TableHeaderColumn>
           <TableHeaderColumn dataField='menuName' tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }} dataSort>Menu</TableHeaderColumn>
           <TableHeaderColumn dataField='funName'  tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }} dataSort>Function</TableHeaderColumn>         
           <TableHeaderColumn dataField='title'  tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }} dataSort>HR Role</TableHeaderColumn>           
           <TableHeaderColumn dataField='pstatus' thStyle={ { whiteSpace: 'normal' }} dataSort>Permission Status</TableHeaderColumn>
           
            </BootstrapTable>
          </CardBody>
      </Card> 
      </div>
     </BlockUi>
    );
  }
}




  class ActiveFormatter extends React.Component {
    render() {
      return (
        <input type='checkbox' checked={ false }/>
      );
    }
  }

export default ReportsApproveRecords;

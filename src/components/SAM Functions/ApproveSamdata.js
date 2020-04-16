import React, {Component} from 'react';
import {Card, CardHeader, CardBody,Button} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn,ButtonToolbar} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
//import SweetAlert from 'react-bootstrap-sweetalert';
import {  unApprovedSamdata, rejectSamDataRecord,  approveSamDataRecord, approveRecordsMulti, rejectRecordsMulti } from '../../util/APIUtils';
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


//import '../../../scss/vendors/react-select/react-select.scss'


const funType = {
  0: 'Create User',
  1: 'Group Membership' 
}



class ApproveSamdata extends Component {
  constructor(props) {
    super(props);

    //this.table = data.rows;

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
        selectRowProp : {
          mode: 'checkbox',
          clickToSelect: true,
          onSelect:this.onRowSelect.bind(this),
          onSelectAll: this.onSelectAll.bind(this)
        },
        sMenu:[],
        
        
    }
    this.apiservice =new APIsService();
    this.toggle = this.toggle.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);
    this.approveMulti = this.approveMulti.bind(this);
    this.doParentToggle = this.doParentToggle.bind(this);
    this.rejectMulti = this.rejectMulti.bind(this)
    //this.onRowSelect  = this.onRowSelect .bind(this);
    //this.onSelectAll = this.onSelectAll.bind(selected,rows);
    

    
    
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
    unApprovedSamdata()
    .then(response => {
        //console.log(response.activelist);
      this.setState({
        data: response.activelist,
        loading:false
      });
    });
   }


    
  
   onRowSelect(row, isSelected, e) {

    

   // console.log(row)
    //console.log(row[prop])
let value =this.state.sMenu;
  console.log(value);

  

    if (isSelected) {
      value.push(row.samDataId)

    } else{

      var index = value.indexOf(row.samDataId);
        if (index > -1) {
          value.splice(index, 1);
        }
      

    }
    this.setState({
      sMenu:value
    });
    
   // alert(`is selected: ${isSelected}, ${rowStr}`);
  }
  
   onSelectAll(isSelected, rows) {
    
    let value ;
    if (isSelected) {

        value = rows.map(x =>x.samDataId);
      //value =rows;
    

    }else{
   value =[];

  
 
    }

    this.setState({
      sMenu:value
    })
    
    
  }



//approve all action

  approveMulti() {
    event.preventDefault(); 
    console.log(this.state.sMenu);
    let value =this.state.sMenu.join(",");
    if(value.length == 0){
      alert("Select Atleast One Record")
      return false;
    }
    
      var obj = {
        samDataId: value,
             
      };        
                     
          approveRecordsMulti(obj)
                 // createSamSubFun(obj)
                    .then(response => {  
                      this.getActiveList(); 
                      toast.dismiss()                                           
                     toast.success('Selected Records Approved  Successfully'); 
                                  
                  }).catch(function(error) {
                    toast.dismiss()
                    toast.error( error.message);              
                               });
    



}



rejectMulti() {
  event.preventDefault(); 
  console.log(this.state.sMenu);

  let value =this.state.sMenu;

  if(value.length == 0){
    alert("Select Atleast One Record")
    return false;
  }
       
    var obj = {
      samDataId: value.join(","),
           
    };        
                   
    rejectRecordsMulti(obj)
               // createSamSubFun(obj)
                  .then(response => {  
                    this.getActiveList();
                    toast.dismiss()                                           
                   toast.success('Selected Records Rejected  Successfully'); 
                                   
                }).catch(function(error) {
                  toast.dismiss()
                  toast.error( error.message);              
                             });
  



}


  cellButton(cell, row, enumObject, rowIndex) {
    
    return (
        <span>
          
        <button className="btn btn-danger"  id={"delete"+rowIndex}  onClick={() => {if(window.confirm('Reject The Item?')){this.deleteRow(row)}}}><i className="fa fa-ban"></i></button>
        <button className="btn btn-warning"  id={"edit"+rowIndex}  onClick={() => {if(window.confirm('Approve The Item?')){this.approveRow(row)}}}><i className="fa fa-check"></i></button>
       

        <UncontrolledTooltip placement="right" target={"edit"+rowIndex}>Approve</UncontrolledTooltip>
        <UncontrolledTooltip placement="left" target={"delete"+rowIndex}>Reject</UncontrolledTooltip>   
        
        </span>
      );
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
            <i className="icon-menu"></i>UnApproved List
            <div className="card-actions">
             
            </div>
          </CardHeader>
          <CardBody>
         
          
   

                

              <label className="btn btn-danger"  id="Edit">Reject All <input type="button"  hidden onClick={this.rejectMulti}/></label>
              <UncontrolledTooltip placement="right" target="Edit">Reject Selected Records</UncontrolledTooltip>  
              <label className="btn btn-warning"  id="Add">Approve All<input type="button"  hidden onClick={this.approveMulti}/></label>
              <UncontrolledTooltip placement="right" target="Add">Approve Selected Records</UncontrolledTooltip>

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
         multiColumnSearch   selectRow={ this.state.selectRowProp } >
           <TableHeaderColumn isKey dataField="samDataId" dataField="samDataId" dataFormat={this.priceFormatter.bind(this)} >S.No</TableHeaderColumn>
           <TableHeaderColumn dataField='buName'  tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }} dataSort>BU Name</TableHeaderColumn>
           <TableHeaderColumn dataField='appName'  tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }} dataSort>Application</TableHeaderColumn>
           <TableHeaderColumn dataField='menuName' tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }} dataSort>Menu</TableHeaderColumn>
           <TableHeaderColumn dataField='funName'  tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }} dataSort>Function</TableHeaderColumn>         
           <TableHeaderColumn dataField='title'  tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }} dataSort>HR Role</TableHeaderColumn>           
           <TableHeaderColumn dataField='pstatus' thStyle={ { whiteSpace: 'normal' }} dataSort>Permission Status</TableHeaderColumn>
           <TableHeaderColumn dataField='button' dataFormat={this.cellButton.bind(this)} hiddenOnInsert>Actions</TableHeaderColumn>
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

export default ApproveSamdata;

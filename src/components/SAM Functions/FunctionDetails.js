import React, {Component} from 'react';
import {Card, CardHeader, CardBody,Button} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn,ButtonToolbar} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
//import SweetAlert from 'react-bootstrap-sweetalert';
import {   getActiveFunctions, deactiveFundetails, getDeActiveFunctions, getFunDetailsBy } from './../../util/APIUtils';
import {Row, Col, Modal, ModalHeader, ModalBody, ModalFooter,Input,
  InputGroup,  Form, FormGroup,
  FormText,CardFooter,Alert,
  Label,UncontrolledTooltip} from 'reactstrap';
  import {ToastContainer, toast} from 'react-toastify';
  import { APIsService } from '../../util/API-service';
import { OnlyAlphabic ,checkMimeType} from '../../util/customValidations';
import Select from 'react-select';
import { defaultboarder,colordboarder, containerStyle, loadertype, loaderMsg ,defaultRegex,onlyChrRegex} from '../../constants';
import LoadingSpinner from '../../util/LoadingSpinner';

//BLOCKUI Dependencies
import Loader from 'react-loaders'
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import 'loaders.css/loaders.min.css';









class FunctionDetails extends Component {
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
        acctypesList :[],
        funtypesList :[],
        errormsg: null,
        loading: false,//for spinner
        recordsListName:"Show Disable Records"

        
    }
    this.apiservice =new APIsService();
    this.toggle = this.toggle.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.doParentToggle = this.doParentToggle.bind(this);

    this.childMethod = this.childMethod.bind(this);
    
    this.options = {
      sortIndicator: true,
      hideSizePerPage: false,
      paginationSize: 3,
      hidePageListOnlyOnePage: true,
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
   // alert("Hello");

   //console.log(this.props.editFlag);


    
    
   
    this.getActiveList();
    //this.getFunctionTypes();
   // this.getAccessTypes();
   this.setState({     
    modal:this.props.open,
    title:"Add"  
  })
  }
 

  
childMethod(){

  
    this.setState({ loading: true })
    getActiveFunctions()
    .then(response => {
       // console.log(response.activelist);

      this.setState({
        data: response.activelist.filter(x => x.appId == this.props.inputrecord),
        loading:false
      });
    });

  

}


   getActiveList(){
    this.setState({ loading: true })
    getActiveFunctions()
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
    getDeActiveFunctions()
    .then(response => {
      //  console.log(response.inactivelist);
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
        

    
  }

  

  handleClickEdit(record) {  
  
    this.props.addSomething(record)
   
    
  }

        deleteRow(record) {

          if(record.rstatus == '0'){
            this.setState({ loading: true })
            deactiveFundetails(record.funId)
            .then(response => {    
              this.setState({ loading: false }) 
                this.getDeActiveList() 
                toast.dismiss();
                toast.success('Record Enabled Successfully');
                
            });
        
          } else{
            this.setState({ loading: true })
            deactiveFundetails(record.funId)
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
     
   
  }

funtypesFormatter(cell, row,rowIndex,index){
 // console.log(this);
 // console.log(cell);
 var names =''

                let acctypesitems = cell.map((item) =>{
                names =names+item.funtypeidname+','
                });
  var name2 =names.substring(0,names.length-1)
                
return name2 ;
}

subfuntypesFormatter(cell, row,rowIndex,index){
  var names =''
 
                 let acctypesitems = cell.map((item) =>{
                 names =names+item.subfuntypeidname+','
                 });
                 
 return  (names.substring(0,names.length-1));
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
 // console.log("Uploading file", event.target.files[0]);
  data.append('file', event.target.files[0]);
  data.append('name', 'my_file');
  data.append('description', 'this file is uploaded from client side');
  let self = this;
  this.setState({ loading: true })
  //calling async Promise and handling response or error situation
  this.apiservice.uploadApplicationToServer(data).then((response) => {
     // console.log("File " + file.name + " is uploaded");
     this.setState({ loading: false }) 
      this.getActiveList();
      toast.success('File Uploaded successfully');
      //message.success(" file uploaded successfully");
     // alert("File uploaded successfully");
     // window.location.reload();
  }).catch(error => {
      this.setState({ loading: false });
      toast.error(error.response.data.message);
    });
};
  

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
            <i className="icon-menu"></i>Application Details List
            <div className="card-actions">
              
            </div>
          </CardHeader>
          <CardBody>
         
          
          
          <label className="btn btn-warning" id="Import">Import<input type="file" hidden onChange={this.handleUploadFile.bind(this)} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/></label>
              <UncontrolledTooltip placement="right" target="Import">Import</UncontrolledTooltip>
              <Button className="btn btn-info" onClick={this.showDeletedRecords.bind(this)} id="rList">{this.state.recordsListName}</Button>
          <UncontrolledTooltip placement="top" target="rList">{this.state.recordsListName}</UncontrolledTooltip>
          

         {/* <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} keyboard={false} backdrop={false}>
          <ModalHeader toggle={this.toggle}>{this.state.title}</ModalHeader>
         
          <ModalBody>
          <CustModal ref="child" inputrecord={this.state.editrecord} editFlag ={this.state.iseditable} parentMethod={this.doParentToggle} />
          </ModalBody>
          <ModalFooter>
            <Button className=" btn-danger" onClick={this.modalSubmit.bind(this)}>{this.state.title}</Button>
            <Button className="btn-warning" onClick={this.modalClose.bind(this)}>Cancel</Button>
          </ModalFooter>
          
      </Modal>*/}
         
        
            <BootstrapTable data={this.state.data} version="4"   condensed = {true}  striped hover pagination  options={this.options} 
        
         exportCSV >
           <TableHeaderColumn isKey dataField="funId" dataField="funId"  dataFormat={this.priceFormatter.bind(this)}  headerStyle={ { whiteSpace: 'normal' } } export={false} className="thw1">S.No</TableHeaderColumn>
          {/* <TableHeaderColumn dataField="cunName"  csvHeader='Country Name' filter={ { type: 'TextFilter', delay: 1000 } }  dataSort tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }} className="thw1" >Country</TableHeaderColumn>   
           <TableHeaderColumn dataField="sbuName" csvHeader='SBU Name'   filter={ { type: 'TextFilter', delay: 1000 } } dataSort tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }} className="thw1">SBU</TableHeaderColumn>   
           <TableHeaderColumn dataField="buName"  csvHeader='BU Name'  filter={ { type: 'TextFilter', delay: 1000 } } dataSort tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }} className="thw1">BU</TableHeaderColumn>   
    */}
              <TableHeaderColumn dataField="appName" csvHeader='Application Name' filter={ { type: 'TextFilter', delay: 1000 } }  dataSort tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }} className="thw1">App Name</TableHeaderColumn> 
                <TableHeaderColumn dataField="menuName"  csvHeader='Menu Name'  filter={ { type: 'TextFilter', delay: 1000 } }  dataSort tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }}  className="thw1">App Menu</TableHeaderColumn> 
              <TableHeaderColumn dataField="funName" csvHeader='Function Name'   filter={ { type: 'TextFilter', delay: 1000 } }  dataSort tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }} className="thw1">Function Name</TableHeaderColumn>
              <TableHeaderColumn dataField="parentFunName" csvHeader='Parent Function Name' filter={ { type: 'TextFilter', delay: 1000 } } dataSort tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }} className="thw1">Parent Function</TableHeaderColumn>               
              <TableHeaderColumn dataField="funtypeAcclevel"  csvHeader='Function Access Types'filter={ { type: 'TextFilter', delay: 1000 } } dataSort tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }} className="thw1">Function Access Type</TableHeaderColumn> 
              <TableHeaderColumn dataField="funtypes"  csvHeader='Function Types' filter={ { type: 'TextFilter', delay: 1000 } }  dataSort tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }} className="thw1">Function Type</TableHeaderColumn> 
                     
              {/*TableHeaderColumn dataField="sbuname" dataSort   >SBU Name</TableHeaderColumn>
          
    <TableHeaderColumn dataField="buname" dataSort   >BU Name</TableHeaderColumn>*/}
              <TableHeaderColumn      dataField='button' dataFormat={this.cellButton.bind(this)} hiddenOnInsert export={false} thStyle={ { width:'120px' }} tdStyle={ { width:'120px', } }  className="thw1">Actions</TableHeaderColumn>           
            </BootstrapTable>
          </CardBody>
      </Card>
      </div>
      </BlockUi>
    );
  }
}




export default FunctionDetails;

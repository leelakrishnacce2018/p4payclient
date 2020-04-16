import React, {Component} from 'react';
import {Card, CardHeader, CardBody,Button} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn,ButtonToolbar} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
//import SweetAlert from 'react-bootstrap-sweetalert';
import {  getActiveList, deactiveSbuRecord, updateSBU, createSBU, getBuList, getCountries, getDelSbuList } from './../../util/APIUtils';
import {Row, Col, Modal, ModalHeader, ModalBody, ModalFooter,Input,
  InputGroup,  Form, FormGroup,
  FormText,CardFooter,
  Label,UncontrolledTooltip} from 'reactstrap';
  import {ToastContainer, toast} from 'react-toastify';
import { APIsService } from '../../util/API-service';
import { OnlyAlphabicW, OnlyAlphabic, checkMimeType } from '../../util/customValidations';

import { colordboarder,defaultboarder, containerStyle, loadertype, loaderMsg,defaultRegex,defaultRegexW } from '../../constants';
import LoadingSpinner from '../../util/LoadingSpinner';
//BLOCKUI Dependencies
import Loader from 'react-loaders'
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import 'loaders.css/loaders.min.css';

//import data from './_data';


//const SweetAlert = require('react-bootstrap-sweetalert');

class SamSbu extends Component {
  constructor(props) {
    super(props);

    //this.table = data.rows;
    this.apiservice =new APIsService();
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
 getActiveList()
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
    getDelSbuList()
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
          if(record.rstatus == '0'){
            this.setState({ loading: true })
            deactiveSbuRecord(record.sbuId)
            .then(response => {    
              this.setState({ loading: false }) 
                this.getDeActiveList() 
                toast.dismiss();
                toast.success('Record Enabled Successfully');
                
            });
        
          } else{
            this.setState({ loading: true })
            deactiveSbuRecord(record.sbuId)
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
    this.apiservice.uploadSbuToServer(data).then((response) => {
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
            <i className="icon-menu"></i>SBU
            <div className="card-actions">
             
            </div>
          </CardHeader>
          <CardBody>
         
          
          <Button className="btn btn-danger" onClick={this.handleClick} id="ADD" >ADD</Button>
          <UncontrolledTooltip placement="top" target="ADD">ADD</UncontrolledTooltip>

          <label className="btn btn-warning" id="Import">Import<input type="file" hidden onChange={this.handleUploadFile.bind(this)} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/></label>
              <UncontrolledTooltip placement="right" target="Import">Import</UncontrolledTooltip>
              <Button className="btn btn-info" onClick={this.showDeletedRecords.bind(this)} id="rList">{this.state.recordsListName}</Button>
          <UncontrolledTooltip placement="top" target="rList">{this.state.recordsListName}</UncontrolledTooltip>

          

          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} keyboard={false} backdrop={false}>
          <ModalHeader toggle={this.toggle}>{this.state.title}</ModalHeader>
         
          <ModalBody>
          <CustModal ref="child" inputrecord={this.state.editrecord} editFlag ={this.state.iseditable} parentMethod={this.doParentToggle}/>
          </ModalBody>
          <ModalFooter>
            <Button className="btn-danger" onClick={this.modalSubmit.bind(this)}>{this.state.title}</Button>
            <Button className="btn-warning" onClick={this.modalClose.bind(this)}>Cancel</Button>
          </ModalFooter>
          
        </Modal>
         
        
            <BootstrapTable data={this.state.data} version="4"  condensed ={true} striped hover pagination search options={this.options} 
        
         exportCSV>
           <TableHeaderColumn isKey dataField="sbuId" dataField="sbuId"  dataFormat={this.priceFormatter.bind(this)} export={false} >S.No</TableHeaderColumn>
                   
              <TableHeaderColumn dataField="sbuname" csvHeader='SBU Code' filter={ { type: 'TextFilter', delay: 1000 } } dataSort tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }}>SBU Name</TableHeaderColumn>           
              <TableHeaderColumn dataField="sbucode" csvHeader='SBU Name' filter={ { type: 'TextFilter', delay: 1000 } } dataSort  tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }}  >SBU Code</TableHeaderColumn>
              <TableHeaderColumn dataField="cname"  csvHeader='Country Name' filter={ { type: 'TextFilter', delay: 1000 } }  dataSort  tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }}  >Country Name</TableHeaderColumn>
              <TableHeaderColumn dataField='button' dataFormat={this.cellButton.bind(this)} hiddenOnInsert export={false}>Actions</TableHeaderColumn>
           
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
      this.apiservice =new APIsService();
      this.state = {
        sbuname: '',
        sbucode:'',
        sbuId: '',
        cunId:'0',       
        cunList :[], 
        borderColor:defaultboarder,
        borderColorctry:defaultboarder,
        borderColorsbucode:defaultboarder,
        pasteAction:false,
        pasteActionCode:false

       
      };
      this.onSbuName = this.onSbuName.bind(this);
      this.onSbuCode = this.onSbuCode.bind(this);
      this.onCunId = this.onCunId.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.blurSbu = this.blurSbu.bind(this);
      this.blurCtryId = this.blurCtryId.bind(this);
      this.blurSbuCode = this.blurSbuCode.bind(this);

      this.onPaste = this.onPaste.bind(this);
      this.onPasteCode = this.onPasteCode.bind(this);
  

     
    }


    onPaste(e) {
      // console.log(e.value);
       this.setState({
        pasteAction: true
       });
     }

     onPasteCode(e) {
      // console.log(e.value);
       this.setState({
        pasteActionCode: true
       });
     }
 
 

    blurSbu(e) {
      var value =e.target.value.trim();

      if(!value){
        this.setState({
          borderColor:colordboarder
      });
      document.getElementById("sbuNameError").textContent = "Enter SBU Name";     

      } else if(value.length < 2 ){
        this.setState({
          borderColor:colordboarder
      });
      document.getElementById("sbuNameError").textContent = "SBU Name Minimum Length 2  Characters";     
          return false;
      } else  {
        this.setState({
          borderColor:defaultboarder
       
      });
      document.getElementById("sbuNameError").textContent = "";     

      }   
       
     }


     blurSbuCode(e) {
      var value =e.target.value.trim();

      if(!value){
        this.setState({
          borderColorsbucode:colordboarder
      });
      document.getElementById("codeError").textContent = "Enter SBU Code";     

      } else if(value.length < 2 ){
        this.setState({
          borderColorsbucode:colordboarder
      });
      document.getElementById("codeError").textContent = "SBU Code Minimum Length 2  Characters";     
          return false;
      } else  {
        this.setState({
          borderColorsbucode:defaultboarder
       
      });
      document.getElementById("codeError").textContent = "";     


      }   

      this.setState({
        sbucode: e.target.value.toUpperCase()
      })
       
     }


     blurCtryId(e) {
      var value =e.target.value;

      if( value == '0')
      {
        this.setState({
          borderColorctry:colordboarder
          
        
      });
      document.getElementById("ctryError").textContent = "Select Country";
      
     
      } else{
        this.setState({
          borderColorctry:defaultboarder             
      });
      document.getElementById("ctryError").textContent = "";

      }

     }


    componentDidMount() { 
      // console.log(this.props.editFlag);
   
       this.getActiverecords();

       if(this.props.editFlag)
       {
           //console.log("edit record"+this.props.inputrecord);

       this.setState({
           sbuname: this.props.inputrecord.sbuname,
           sbucode: this.props.inputrecord.sbucode,
           cunId:this.props.inputrecord.cunId,
           sbuId:this.props.inputrecord.sbuId
       //buid:'erwer'
        });
        
   }else{
    this.setState({
        sbuname:'',
        sbucode:''
       // funId:'0',
    });
  }

    }


    onSbuName(e) {

      if(this.state.pasteAction){
        this.setState({
          sbuname: e.target.value.replace(defaultRegex, ""),
          pasteAction:false
        });

      }else{
        this.setState({
          sbuname: e.target.value
        });

      }

      
    }
    
    onSbuCode(e) {
     
     if(this.state.pasteActionCode){
      this.setState({
        sbucode: e.target.value.replace(defaultRegexW, ""),
        pasteActionCode:false
      })
     } else{
      this.setState({
        sbucode: e.target.value
      })

     }
        
    }

    onCunId(e) {
      // console.log("Hello password");
       this.setState({
         cunId: e.target.value
       })  
     }
 

    

    formValidate(obj){

      if(!obj.sbuname){
        this.setState({
          borderColor:colordboarder
      });
      document.getElementById("sbuNameError").textContent = "Enter SBU Name";

      }  else if(obj.sbuname.length < 2 ){
        this.setState({
          borderColor:colordboarder
      });         
      
    document.getElementById("sbuNameError").textContent = "SBU Name Minimum Length 2  Characters";     
         
      }else{
        this.setState({
          borderColor:defaultboarder
      });
      document.getElementById("sbuNameError").textContent = "";  
      }
      //checking sbucode validations on submit
      if(!obj.sbucode){
        this.setState({
          borderColorsbucode:colordboarder
      });
      document.getElementById("codeError").textContent = "Enter SBU Code ";   

      }else if(obj.sbucode.length < 2){
        this.setState({
          borderColorsbucode:colordboarder
      });
      document.getElementById("codeError").textContent = "SBU Code Minimum Length 2  Characters";
      } else{
        this.setState({
          borderColorsbucode:defaultboarder
      });
      document.getElementById("codeError").textContent = "";

      }
// checking country validation onsubmit or update
      if(obj.cunId == '0'){
        this.setState({
          borderColorctry:colordboarder
      });

      document.getElementById("ctryError").textContent = "Select Country";

      }else{
        document.getElementById("ctryError").textContent = "";
        this.setState({
          borderColorctry:defaultboarder
      });
        
      }
      
     
      if(obj.sbuname =="" || obj.cunId == '0' || obj.sbucode =="" || obj.sbucode.length < 2 || obj.sbuname.length < 3 ){
       
        return false;
      }
      else
     {
        return true
      }

    }


    onUpdate(){
      event.preventDefault();   
      var code =this.state.sbucode.trim();
      const obj = {
        sbuname: this.state.sbuname.trim(),
        sbucode: code.toUpperCase(),
        sbuId:this.state.sbuId,
        cunId:this.state.cunId      
      };
        if(!this.formValidate(obj)){
          // console.log("hello");
          event.preventDefault(); 
          return false;  
          }
     // console.log("Update Method Clicked");        
     updateSBU(obj)
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
  
    var code =this.state.sbucode.trim();
    
    const obj = {
      sbuname: this.state.sbuname.trim(),
      sbucode: code.toUpperCase(),
      sbuId:this.state.sbuId,
      cunId:this.state.cunId      
    };          
            if(!this.formValidate(obj)){           
              event.preventDefault(); 
              return false;  
    }      
           createSBU(obj)
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
    
    

getActiverecords(){
  getCountries()
  .then(response => {
      //console.log(response);
    this.setState({
      cunList: response.activelist
    });
  });

}
  
    
  
    render() {

      let planets = this.state.cunList;
        let optionItems = planets.map((planet) =>
                <option key={planet.cunId} value={planet.cunId}>{planet.cname}</option>
            );

      return (
        <Form onSubmit={this.onSubmit}  name="Sbu-form" >
        <Card>
          
              <CardHeader className="carheaderSmall">
                <strong>SAM SBU</strong> 
              </CardHeader>
              <CardBody>
                <FormGroup>
                    <Input type="text"  value={this.state.sbuId} hidden/>                   
                  </FormGroup> 
                  <FormGroup>
                    <Label htmlFor="nf-email">SBU Name <span style={{color:'red'}}>*</span></Label>
                    <Input type="text" placeholder="SBU Name" pattern="[0-9]*" maxLength ="50" minLength ="3" style ={this.state.borderColor}  value={this.state.sbuname.replace(/^ /, '')}  onPaste ={this.onPaste} onChange={this.onSbuName}  onKeyPress={(e) => OnlyAlphabic(e)}  onBlur = {this.blurSbu}/>
                    <span id="sbuNameError"></span>
                  </FormGroup>  
                  <FormGroup>
                    <Label htmlFor="nf-email">SBU Code <span style={{color:'red'}}>*</span></Label>
                    <Input type="text" placeholder="SBU Code" maxLength ="20" minLength ="2" style ={this.state.borderColorsbucode} value={this.state.sbucode.replace(/^ /, '')} onPaste ={this.onPasteCode}  onChange={this.onSbuCode} onKeyPress={(e) => OnlyAlphabicW(e)} onBlur = {this.blurSbuCode }  />
                    <span id="codeError"></span>
                  </FormGroup>                
                  <FormGroup>  
                  <Label htmlFor="nf-email">Country Name <span style={{color:'red'}}>*</span></Label>
                     
                      <Input type="select" name="select"   id="select" style ={this.state.borderColorctry} value={this.state.cunId} onChange={this.onCunId} onBlur = {this.blurCtryId } >
                        <option value="0">Please select</option>
                        {optionItems}
                      </Input>
                      <span id="ctryError"></span>
                     
                    
                  </FormGroup>
              
              </CardBody>
              </Card>
            </Form>
      );
    }
  }

export default SamSbu;

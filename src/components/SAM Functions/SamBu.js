import React, {Component} from 'react';
import {Card, CardHeader, CardBody,Button} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn,ButtonToolbar} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
//import SweetAlert from 'react-bootstrap-sweetalert';
import {  getBuList, deactiveRecord, updateBu, createBu, getActiveList, getDelBuList } from './../../util/APIUtils';
import {Row, Col, Modal, ModalHeader, ModalBody, ModalFooter,Input,
  InputGroup,  Form, FormGroup,
  FormText,CardFooter,
  Label,UncontrolledTooltip } from 'reactstrap';
  import {ToastContainer, toast} from 'react-toastify';
import { APIsService } from '../../util/API-service';
import { OnlyAlphabic } from '../../util/customValidations';
import { colordboarder,defaultboarder, containerStyle, loadertype, loaderMsg ,defaultRegex} from '../../constants';
import LoadingSpinner from '../../util/LoadingSpinner';
//BLOCKUI Dependencies
import Loader from 'react-loaders'
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import 'loaders.css/loaders.min.css';




class SamBU extends Component {
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
    getBuList()
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
    getDelBuList()
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
            deactiveRecord(record.buId)
            .then(response => {    
              this.setState({ loading: false }) 
                this.getDeActiveList() 
                toast.dismiss();
                toast.success('Record Enabled Successfully');
                
            });
        
          } else{
            this.setState({ loading: true })
        
            deactiveRecord(record.buId)
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
            <i className="icon-menu"></i>BU
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
           <TableHeaderColumn isKey dataField="buId" dataField="buId" dataFormat={this.priceFormatter.bind(this)}  export={false}>S.No</TableHeaderColumn>
            <TableHeaderColumn dataField="buName" csvHeader='BU Name' filter={ { type: 'TextFilter', delay: 1000 } } dataSort  tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }} >BU Name</TableHeaderColumn> 
            <TableHeaderColumn dataField="sbucode" csvHeader='SBU Code' filter={ { type: 'TextFilter', delay: 1000 } } dataSort tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }}   >SBU Code</TableHeaderColumn>  
            <TableHeaderColumn dataField="sbuname" csvHeader='SBU Name'  filter={ { type: 'TextFilter', delay: 1000 } } dataSort tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }}  >SBU Name</TableHeaderColumn>           
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
        buName:'',
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
      document.getElementById("ctryError").textContent = "Enter BU Name";     

      } else if(value.length < 3 ){
        this.setState({
          borderColor:colordboarder
      });
      document.getElementById("ctryError").textContent = "BU Name Minimum Length 3  Characters";     
          return false;
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
      document.getElementById("sbuError").textContent = "Select SBU Name";
      
     
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
            buName: this.props.inputrecord.buName,
            buId: this.props.inputrecord.buId,
            sbuId: this.props.inputrecord.sbuId,
        });
        
   }else{
    this.setState({
        buName:'',
       // funId:'0',
    });
  }

    }


    
      onBuName(e) {
     // console.log(e.value);
     if(this.state.pasteAction){
      this.setState({
        buName: e.target.value.replace(defaultRegex, ""),
        pasteAction:false
      });

     } else{
      this.setState({
        buName: e.target.value
      });
    }
    }

    
    
    onSbuId(e) {
       //console.log("on sbu"+e.value);
       this.setState({
         sbuId: e.target.value
       });
     }
     
    
   
    

    formValidate(obj){

      if(!obj.buName){
        this.setState({
          borderColor:colordboarder
      });
      document.getElementById("ctryError").textContent = "Enter BU Name";     

      } else if(obj.buName.length < 3 ){
        this.setState({
          borderColor:colordboarder
      });
      document.getElementById("ctryError").textContent = "BU Name Minimum Length 3   Characters";     
          return false;
      } else  {
        this.setState({
          borderColor:defaultboarder
       
      });
      document.getElementById("ctryError").textContent = "";     

      }
      if(obj.sbuId == '0'){
        this.setState({
          borderColorsbu:colordboarder
      });
      document.getElementById("sbuError").textContent = "Select SBU Name";
      

      } else{
        this.setState({
          borderColorsbu:defaultboarder
      });

        document.getElementById("sbuError").textContent = "";

      }   

     
      if(obj.buName =="" || obj.buName == 'undefined' ||  obj.buName.length < 2  || obj.sbuId == '0'){
       
        return false;
      }else
        {
        return true
      }

    }


    onUpdate(){
      var obj = {
        buName: this.state.buName.trim(),
        buId: this.state.buId,
        sbuId:this.state.sbuId     
      };

        if(!this.formValidate(obj)){
          // console.log("hello");
          event.preventDefault(); 
          return false;  
          }
     // console.log("Update Method Clicked");        
     updateBu(obj)
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
      buName: this.state.buName.trim(),
      buId: this.state.buId,
      sbuId:this.state.sbuId     
    };         
            if(!this.formValidate(obj)){           
              event.preventDefault(); 
              return false;  
    }      
          createBu(obj)
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

      let planets = this.state.sbuList;
      let optionItems = planets.map((planet) =>
              <option key={planet.sbuId} value={planet.sbuId}>{planet.sbuname}({planet.sbucode})</option>
          );

      
      return (
        <Form onSubmit={this.onSubmit}  name="SamRole-form" >
        <Card>
          
              <CardHeader className="carheaderSmall">
                <strong>SAM BU</strong> 
              </CardHeader>
              <CardBody>
                <FormGroup>
                    <Input type="text"  value={this.state.buId}  hidden/>                   
                  </FormGroup> 
                  <FormGroup>
                    <Label htmlFor="nf-email">BU Name<span style={{color:'red'}}>*</span></Label>
                    <Input type="text" placeholder="BU Name" style ={this.state.borderColor}  maxLength ="50" minLength ="3" value={this.state.buName.replace(/^ /, '')} onPaste ={this.onPaste}  onChange={this.onBuName} onKeyPress={(e) => OnlyAlphabic(e)}   onBlur = {this.blurBuname}/>
                    <span id="ctryError"></span>
                  </FormGroup> 
                  <FormGroup>  
                  <Label htmlFor="nf-email">SBU Name<span style={{color:'red'}}>*</span></Label>                     
                      <Input type="select" name="select" style ={this.state.borderColorsbu}  id="select" value={this.state.sbuId} onChange={this.onSbuId}   onBlur = {this.blurSbuId}>
                        <option value="0">Please Select</option>
                        {optionItems}
                      </Input>
                      <span id="sbuError"></span>           
                  </FormGroup>              
              </CardBody>     
             
            </Card>
            </Form>
      );
    }
  }

export default SamBU;

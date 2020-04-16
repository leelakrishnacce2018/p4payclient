import React, {Component} from 'react';
import {Card, CardHeader, CardBody,Button} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn,ButtonToolbar} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
//import SweetAlert from 'react-bootstrap-sweetalert';
import { getSamSubFunctions,deactiveSubFun, getSamFunctions, createSamSubFun, updateSamSubFun, getMapSamFunctions, deactiveMapSamFun, updateMapSamFun, createMapSamFun, getSamApps } from './../../util/APIUtils';
import {Row, Col, Modal, ModalHeader, ModalBody, ModalFooter,Input,
  InputGroup,  Form, FormGroup,
  FormText,CardFooter,
  Label,UncontrolledTooltip} from 'reactstrap';
  import {ToastContainer, toast} from 'react-toastify';
import { APIsService } from '../../util/API-service';


//import data from './_data';


//const SweetAlert = require('react-bootstrap-sweetalert');

class FunctionsMap extends Component {
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
        
    }
    this.toggle = this.toggle.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);
    this.handleClick = this.handleClick.bind(this);
    
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
    var successFlag = this.refs.child.onSubmit();
    if(successFlag)
     this.setState({
       modal: !this.state.modal,
       submitClicked:!this.state.submitClicked
     });
       
   
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
  }

   
 componentDidUpdate(prevProps, prevState) {
  console.log('Component DID UPDATE!')
  if (prevState.submitClicked !== this.state.submitClicked) {
    this.getActiveList();     
  }

}


   getActiveList(){
 getMapSamFunctions()
    .then(response => {
        console.log(response.activelist);
      this.setState({
        data: response.activelist
      });
    });

  } 

  cellButton(cell, row, enumObject, rowIndex) {
    return (
        <span>
          
        <button className="btn btn-danger" id="Edit" onClick={() => {if(window.confirm('Delete the item?')){this.deleteRow(row)}}}><i className="fa fa-trash"></i></button>
        <button className="btn btn-warning" id="Delete" onClick={(e) => this.handleClickEdit(row)}><i className="fa fa-edit"></i></button>
        
        <UncontrolledTooltip placement="top" target="Edit">Edit</UncontrolledTooltip>
        <UncontrolledTooltip placement="top" target="Delete">Delete</UncontrolledTooltip>

        </span>
      );
 }

        handleClick(record) {
    console.log('this is:', record);
    this.setState({
      modal: !this.state.modal,
      iseditable:false, 
      title:"Add"     
      
    });
    console.log(this.state.modal);

    
  }

  

  handleClickEdit(record) {
   
    
    console.log('this is:', record);
    this.setState({
      modal: !this.state.modal,
      iseditable:true,
      editrecord:record,
      title:"Update"  
    });
    console.log(this.state.modal);

    
  }

        deleteRow(record) {
  
    deactiveMapSamFun(record.samFunId)
    .then(response => {
        this.getActiveList();
        toast.success('Success...');
    });

 
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
  

  render() {
    const selectRow = {
        mode: 'checkbox',
        bgColor: 'rgb(238, 193, 213)'
      };

      const cellEdit = {
        mode: 'click',
        blurToSave: true
      };

      const containerStyle = {
        zIndex: 1999
      };

    return (
      <div className="animated">
      <ToastContainer position="top-right" autoClose={5000} style={containerStyle}/>
        <Card>
          <CardHeader>
            <i className="icon-menu"></i>Sub Function
            <div className="card-actions">
             
            </div>
          </CardHeader>
          <CardBody>
         
          
          <Button className="btn btn-danger" onClick={this.handleClick} id="ADD" >ADD</Button>

          <UncontrolledTooltip placement="top" target="ADD">ADD</UncontrolledTooltip>
          

          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} keyboard={false} backdrop={false}>
          <ModalHeader toggle={this.toggle}>{this.state.title}</ModalHeader>
         
          <ModalBody>
          <CustModal ref="child" inputrecord={this.state.editrecord} editFlag ={this.state.iseditable}/>
          </ModalBody>
          <ModalFooter>
            <Button className="btn-danger" onClick={this.modalSubmit.bind(this)}>{this.state.title}</Button>
            <Button className="btn-warning" onClick={this.modalClose.bind(this)}>Cancel</Button>
          </ModalFooter>
          
        </Modal>
         
        
            <BootstrapTable data={this.state.data} version="4" striped hover pagination search options={this.options} 
        
         exportCSV>
           <TableHeaderColumn isKey dataField="subFunId" dataField="mapFunId" dataFormat={this.priceFormatter.bind(this)} >S.No</TableHeaderColumn>
                   
              <TableHeaderColumn dataField="appname" dataSort>Application Name</TableHeaderColumn>           
              <TableHeaderColumn dataField="funname" dataSort   >Function Name</TableHeaderColumn>
              <TableHeaderColumn
        dataField='button'
        dataFormat={this.cellButton.bind(this)} hiddenOnInsert
      />
           
            </BootstrapTable>
          </CardBody>
        </Card>
      </div>
    );
  }
}


class CustModal extends Component {
    constructor() {
      super();
      this.apiservice =new APIsService();
      this.state = {
        appId: '',
        funId: '', 
        mapFunId:'' ,      
        funName:'',
        funList :[], 
        appList :[], 
       
      };
      this.onAppId = this.onAppId.bind(this);
      this.onFunId = this.onFunId.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  

     
    }


    componentDidMount() { 
      // console.log(this.props.editFlag);
   
       this.getActivefunctions();
       this.getActiveApps();

       if(this.props.editFlag)
       {
           console.log("edit record"+this.props.inputrecord);

       this.setState({
        appId: this.props.inputrecord.appId,
           funId:this.props.inputrecord.funId          
       
        });
        
   }else{
    this.setState({
        subFunName:'',
       // funId:'0',
    });
  }

    }


   
    
    onFunId(e) {
     // console.log("Hello password");
      this.setState({
        funId: e.target.value
      })  
    }

    onAppId(e) {
      //console.log("Hello password");
      this.setState({
        appId: e.target.value
      })  
    }
    

    formValidate(obj){
     
      if(!obj.appId){
        return false;
      }
      else
      if(!obj.funId){
        return false;
      }else{
        return true
      }

    }
    
onSubmit(e)  {
  event.preventDefault(); 

  //console.log(`The values are ${this.state.usernameOrEmail}, ${this.state.password}`)
  const obj = {
    appId: this.state.appId,
    funId: this.state.funId,
    mapFunId:this.state.mapFunId      
  };
  console.log(obj);
        let status =this.formValidate(obj);
          if(!status){
            // console.log("hello");
            event.preventDefault(); 
            return false;  
  }

          if(this.props.editFlag)
            {
              updateMapSamFun(obj)
              .then(response => {
                 console.log("rsponse"+response);    
                // this.props.form.resetFields();              
                toast.warn('Record updated Successfully');
              
                  
                 
             }).catch(error => {
 
                // this.props.form.resetFields();
                toast.error( error.message);
                                    
                          });
            } else{
              
              createMapSamFun(obj)
             // createSamSubFun(obj)
                .then(function(response) {
                  console.log("rsponse"+response);    
                 // this.props.form.resetFields();              
                 toast.success('Record Inserted Successfully'); 
              }).catch(function(error) {
                toast.error( error.message);
                  //this.props.form.resetFields();
               
                                     
                           });
                          }
                          return true;
  
}

getActivefunctions(){
  getSamFunctions()
  .then(response => {
      //console.log(response);
    this.setState({
      funList: response.activelist
    });
  });

}

getActiveApps(){
    getSamApps()
    .then(response => {
        //console.log(response);
      this.setState({
        appList: response.activelist
      });
    });
  
  }  
   
    render() {

      let planets = this.state.funList;
        let optionItems = planets.map((planet) =>
                <option key={planet.funId} value={planet.funId}>{planet.funName}</option>
            );

            let apps = this.state.appList;
        let appItems = apps.map((app) =>
                <option key={app.appId} value={app.appId}>{app.appName}</option>
            );

      return (
        <Form onSubmit={this.onSubmit}  name="FunMap-form" >
        <Card>
          
              <CardHeader className="carheaderSmall">
                <strong>Functions Map</strong> 
              </CardHeader>
              <CardBody>
                <FormGroup>
                    <Input type="text" placeholder="Sub Function name" value={this.state.mapFunId} hidden/>                   
                  </FormGroup> 
                  <FormGroup>  
                  <Label htmlFor="nf-email">Application Name</Label>
                     
                      <Input type="select" name="select" id="select" value={this.state.appId} onChange={this.onAppId}>
                        <option value="0">Please select</option>
                        {appItems}
                      </Input>
                      <FormText className="help-block">Please Select Function</FormText>
                    
                  </FormGroup>                 
                  <FormGroup>  
                  <Label htmlFor="nf-email">Function Name</Label>
                     
                      <Input type="select" name="select" id="select" value={this.state.funId} onChange={this.onFunId}>
                        <option value="0">Please select</option>
                        {optionItems}
                      </Input>
                      <FormText className="help-block">Please Select Function</FormText>
                    
                  </FormGroup>
              
              </CardBody>
               
             
            </Card>
            </Form>
      );
    }
  }

export default FunctionsMap;

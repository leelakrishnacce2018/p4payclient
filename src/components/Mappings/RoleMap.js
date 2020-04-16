import React, {Component} from 'react';
import {Card, CardHeader, CardBody,Button} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn,ButtonToolbar} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
//import SweetAlert from 'react-bootstrap-sweetalert';
import { getSamSubFunctions,deactiveSubFun, getSamFunctions, createSamSubFun, updateSamSubFun, getMapSamRoles, deactiveMapSamRole, updateMapSamRole, createMapSamRole, getActiveList, getBuList, getSamRoles } from '../../util/APIUtils';
import {Row, Col, Modal, ModalHeader, ModalBody, ModalFooter,Input,
  InputGroup,  Form, FormGroup,
  FormText,CardFooter,
  Label,} from 'reactstrap';
  import {ToastContainer, toast} from 'react-toastify';
import { APIsService } from '../../util/API-service';


//import data from './_data';


//const SweetAlert = require('react-bootstrap-sweetalert');

class RoleMap extends Component {
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
      hideSizePerPage: true,
      paginationSize: 3,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false
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
 getMapSamRoles()
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
          
        <button className="btn btn-danger" onClick={() => {if(window.confirm('Delete the item?')){this.deleteRow(row)}}}><i className="fa fa-trash"></i></button>
        <button className="btn btn-warning" onClick={(e) => this.handleClickEdit(row)}><i className="fa fa-edit"></i></button>
        

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
  
    deactiveMapSamRole(record.buMapRoleId)
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
            <i className="icon-menu"></i>Role Mapping
            <div className="card-actions">
              
            </div>
          </CardHeader>
          <CardBody>
         
          
          <Button className="btn btn-danger" onClick={this.handleClick} >ADD</Button>
          

          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} keyboard={false} backdrop={false}>
          <ModalHeader toggle={this.toggle}>{this.state.title}</ModalHeader>
         
          <ModalBody>
          <CustModal ref="child" inputrecord={this.state.editrecord} editFlag ={this.state.iseditable}/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.modalSubmit.bind(this)}>{this.state.title}</Button>
            <Button color="secondary" onClick={this.modalClose.bind(this)}>Cancel</Button>
          </ModalFooter>
          
        </Modal>
         
        
            <BootstrapTable data={this.state.data} version="4" striped hover pagination search options={this.options} 
        
        insertRow exportCSV insertRow={ true }>
           <TableHeaderColumn isKey dataField="buMapRoleId" dataField="buMapRoleId" dataFormat={this.priceFormatter.bind(this)} >S.No</TableHeaderColumn>
                   
              <TableHeaderColumn dataField="sbuname" dataSort>SBU Name</TableHeaderColumn>           
              <TableHeaderColumn dataField="buname" dataSort   >BU Name</TableHeaderColumn>
              <TableHeaderColumn dataField="hrRoleCode" dataSort   >Hr Role Code</TableHeaderColumn>
              <TableHeaderColumn dataField="statusname" dataSort   >Approve Status</TableHeaderColumn>
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
        hrRoleId: '',
        sbuId: '',
        buId:'',
        sbuList:[],
        buList :[], 
        rolesList :[]
       
      };
      this.onBuId = this.onBuId.bind(this);
      this.onSbuId = this.onSbuId.bind(this);
      this.onHrRoleId = this.onHrRoleId.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  

     
    }


    componentDidMount() { 
      // console.log(this.props.editFlag);
   
       this.getSbuList();
       this.getRolesList();
       this.getbuList();

       if(this.props.editFlag)
       {
           console.log("edit record"+this.props.inputrecord);

       this.setState({
        hrRoleId: this.props.inputrecord.hrRoleId,
        sbuId:this.props.inputrecord.sbuId,
        buId:this.props.inputrecord.buId,
        buMapRoleId:this.props.inputrecord.buMapRoleId,
        hrRoleSAMCode:this.props.inputrecord.hrRoleSAMCode
       //buid:'erwer'
        });
        
   }else{
    this.setState({
        //subFunName:'',
       // funId:'0',
    });
  }

    }


    onHrRoleId(e) {
     // console.log(e.value);
      this.setState({
        hrRoleId: e.target.value
      });
    }
    
    onSbuId(e) {
     // console.log("Hello password");
      this.setState({
        sbuId: e.target.value
      })  
    }

    onBuId(e) {
      //console.log("Hello password");
      this.setState({
        buId: e.target.value
      })  
    }
    

    formValidate(obj){
     
      if(obj.sbuId =="" ||obj.sbuId == 'undefined'){
        return false;
      }
      else
      if(obj.buId == 'undefined' || obj.buId =="" ){
        return false;
      }else
      if(obj.hrRoleId == 'undefined' || obj.hrRoleId =="" ){
        return false;
      }
      else{
        return true
      }

    }
    
onSubmit(e)  {
  event.preventDefault(); 

  //console.log(`The values are ${this.state.usernameOrEmail}, ${this.state.password}`)
  const obj = {
    buMapRoleId: this.state.buMapRoleId,
    sbuId: this.state.sbuId,
    buId:this.state.buId,
    hrRoleId:this.state.hrRoleId,      
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
              
                   

                updateMapSamRole(obj)
              .then(response => {
                 console.log("rsponse"+response);    
                // this.props.form.resetFields();              
                toast.warn('Record updated Successfully');
              
                  
                 
             }).catch(error => {
 
                // this.props.form.resetFields();
                toast.error( error.message);
                                    
                          });
            } else{
              createMapSamRole(obj)
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

getSbuList(){
  getActiveList()
  .then(response => {
      //console.log(response);
    this.setState({
      sbuList: response.activelist
    });
  });
}

    getbuList(){
    getBuList()
    .then(response => {
        //console.log(response);
      this.setState({
        buList: response.activelist
      });
    });
  }

  getRolesList(){
    getSamRoles()
    .then(response => {
        //console.log(response);
      this.setState({
        rolesList: response.activelist
      });
    });
  }

  
    
  
    render() {

      let roles = this.state.rolesList ;
        let rolesItems = roles.map((role) =>
                <option key={role.hrRoleId} value={role.hrRoleId}>{role.hrRoleSAMCode}</option>
            );

            let bus = this.state.buList ;
        let buItems = bus.map((bu) =>
                <option key={bu.buId} value={bu.buId}>{bu.buName}</option>
            );


            let sbus = this.state.sbuList ;
        let sbuItems = sbus.map((sbu) =>
                <option key={sbu.sbuId} value={sbu.sbuId}>{sbu.sbuname}</option>
            );


      return (
        <Form onSubmit={this.onSubmit}  name="RoleMap-form" >
        <Card>
          
              <CardHeader>
                <strong>Role Map</strong> 
              </CardHeader>
              <CardBody>
                <FormGroup>
                    <Input type="text" placeholder="Username" value={this.state.buMapRoleId}  hidden/>                   
                  </FormGroup>                                   
                  <FormGroup>  
                  <Label htmlFor="nf-email">Hr Role Code</Label>                     
                      <Input type="select" name="select" id="select" value={this.state.hrRoleId} onChange={this.onHrRoleId}>
                        <option value="0">Please select HrRoleCode</option>
                        {rolesItems}
                      </Input>
                      <FormText className="help-block">Please Select HrRoleCode</FormText>                    
                  </FormGroup>
                  <FormGroup>  
                  <Label htmlFor="nf-email">SBU</Label>                     
                      <Input type="select" name="select" id="select" value={this.state.sbuId} onChange={this.onSbuId}>
                        <option value="0">Please select </option>
                        {sbuItems}
                      </Input>
                      <FormText className="help-block">Please Select SBU</FormText>                    
                  </FormGroup>
                  <FormGroup>  
                  <Label htmlFor="nf-email">BU</Label>                     
                      <Input type="select" name="select" id="select" value={this.state.buId} onChange={this.onBuId}>
                        <option value="0">Please select Bu</option>
                        {buItems}
                      </Input>
                      <FormText className="help-block">Please Select BU</FormText>                    
                  </FormGroup>


              
              </CardBody>       
             
            </Card>
            </Form>
      );
    }
  }

export default RoleMap;

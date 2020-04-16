import React, {Component} from 'react';
import {Card, CardHeader, CardBody,Button} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn,ButtonToolbar} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
//import SweetAlert from 'react-bootstrap-sweetalert';
import { getSamSubFunctions,deactiveSubFun, getSamFunctions, createSamSubFun, updateSamSubFun, getActiveList, deactiveSbuRecord, updateSBU, createSBU, getSamApps, deactiveSamApp, updateSamApp, createSamApp, getBuList, getCountries } from './../../util/APIUtils';
import {Row, Col, Modal, ModalHeader, ModalBody, ModalFooter,Input,
  InputGroup,  Form, FormGroup,
  FormText,CardFooter,
  Label,UncontrolledTooltip} from 'reactstrap';
  import {ToastContainer, toast} from 'react-toastify';
  import { APIsService } from '../../util/API-service';
import { OnlyAlphabic } from '../../util/customValidations';
import { defaultboarder,colordboarder, containerStyle } from '../../constants';





class SamApplications extends Component {
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
        errormsg: null,
        
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
    this.setState({     
      modal:this.props.open,
      title:"Add"  
    })
  }
  componentDidUpdate(prevProps, prevState) {
    //console.log('Component DID UPDATE!')
    if (prevState.submitClicked !== this.state.submitClicked) {
      this.getActiveList();     
    }

 }



   getActiveList(){
 getSamApps()
    .then(response => {
       // console.log(response.activelist);
      this.setState({
        data: response.activelist
      });
    });

  } 

  cellButton(cell, row, enumObject, rowIndex) {
    return (
        <span>
          
        <button className="btn btn-danger" id={"delete"+rowIndex}  onClick={() => {if(window.confirm('Delete The Item?')){this.deleteRow(row)}}}><i className="fa fa-trash"></i></button>
        <button className="btn btn-warning" id={"edit"+rowIndex} onClick={(e) => this.handleClickEdit(row)}><i className="fa fa-edit"></i></button>
       
        <UncontrolledTooltip placement="right" target={"edit"+rowIndex}>Edit</UncontrolledTooltip>
        <UncontrolledTooltip placement="left" target={"delete"+rowIndex}>Delete</UncontrolledTooltip>

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
  
    deactiveSamApp(record.appId)
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

     
    return (
      <div className="animated">
      <ToastContainer position="top-right" autoClose={5000} style={containerStyle}/>
        <Card>
          <CardHeader>
            <i className="icon-menu"></i>SAM Application
            <div className="card-actions">
              
            </div>
          </CardHeader>
          <CardBody>
         
          
          <Button className="btn btn-danger" onClick={this.handleClick} id="ADD">ADD</Button>
          <UncontrolledTooltip placement="top" target="ADD">ADD</UncontrolledTooltip>
          

          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} keyboard={false} backdrop={false}>
          <ModalHeader toggle={this.toggle}>{this.state.title}</ModalHeader>
         
          <ModalBody>
          <CustModal ref="child" inputrecord={this.state.editrecord} editFlag ={this.state.iseditable}/>
          </ModalBody>
          <ModalFooter>
            <Button className=" btn-danger" onClick={this.modalSubmit.bind(this)}>{this.state.title}</Button>
            <Button className="btn-warning" onClick={this.modalClose.bind(this)}>Cancel</Button>
          </ModalFooter>
          
        </Modal>
         
        
            <BootstrapTable data={this.state.data} version="4" striped hover pagination search options={this.options} 
        
         exportCSV >
           <TableHeaderColumn isKey dataField="appId" dataField="appId" dataFormat={this.priceFormatter.bind(this)} >S.No</TableHeaderColumn>
                   
              <TableHeaderColumn dataField="appName" dataSort>Application Name</TableHeaderColumn> 
              <TableHeaderColumn dataField="cname" dataSort>Country Name</TableHeaderColumn> 
              {/*TableHeaderColumn dataField="sbuname" dataSort   >SBU Name</TableHeaderColumn>
          
    <TableHeaderColumn dataField="buname" dataSort   >BU Name</TableHeaderColumn>*/}
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
        appId:'',
        appName:'',
        sbuName: '',
        sbuId: '',
        buId:'',
        buName:'',
        cunId:'',
        cname:'',
        borderColor:defaultboarder,
        buList :[], 
        sbuList :[],
        cunList :[],       
      };
      this.onSbuId = this.onSbuId.bind(this);
      this.onBuId = this.onBuId.bind(this);
      this.onAppName = this.onAppName.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onCunId = this.onCunId.bind(this);
  

     
    }


    componentDidMount() { 
      // console.log(this.props.editFlag);
   
      // this.getActiveBus();
      // this.getActiveSBUs();
      this.getActiveCountries();

       if(this.props.editFlag)
       {
          // console.log("edit record"+this.props.inputrecord);

       this.setState({
           appName: this.props.inputrecord.appName,
          // buId:this.props.inputrecord.buId,
          // sbuId:this.props.inputrecord.sbuId,
           appId:this.props.inputrecord.appId,
           cunId:this.props.inputrecord.cunId
       //buid:'erwer'
        });
        
   }else{
    this.setState({
        appName:'',
        //sbuId:'0',
    });
  }

    }


    onAppName(e) {
     // console.log(e.value);
      this.setState({
        appName: e.target.value
      });
    }
    
    onBuId(e) {
     // console.log("Hello password");
      this.setState({
        buId: e.target.value
      })  
    }
    onSbuId(e) {
        // console.log("Hello password");
         this.setState({
           sbuId: e.target.value
         })  
       }
       
       onCunId(e) {
        // console.log("Hello password");
         this.setState({
          cunId: e.target.value
         })  
       }
    

    formValidate(obj){
     
      if(obj.appName =="" ||obj.appName == 'undefined'){
        return false;
      }
     /* else
      if(obj.buId == 'undefined' || obj.buId =="" ){
        return false;
      }else
      if(obj.sbuId == 'undefined' || obj.sbuId =="" ){
        return false;
      }*/else if(obj.cunId == 'undefined' || obj.cunId =="" ){
        return false;
      }else{
        return true
      }

    }
    
onSubmit(e)  {
  event.preventDefault(); 

 
  const obj = {
    appName: this.state.appName,
    //buId: this.state.buId,
    //sbuId:this.state.sbuId,
    appId:this.state.appId, 
    cunId:this.state.cunId      
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
             updateSamApp(obj)
              .then(response => {
                // console.log("rsponse"+response);    
                // this.props.form.resetFields();              
                toast.warn('Record updated Successfully');
              
                  
                 
             }).catch(error => {
 
                // this.props.form.resetFields();
                toast.error( error.message);
                                    
                          });
            } else{
              createSamApp(obj)
             // createSamSubFun(obj)
                .then(function(response) {
                  //console.log("rsponse"+response);    
                 // this.props.form.resetFields();              
                 toast.success('Record Inserted Successfully'); 
              }).catch(function(error) {
                toast.error( error.message);
                  //this.props.form.resetFields();
               
                                     
                           });
                          }


                          return true;
  
}

getActiveBus(){
  getBuList()
  .then(response => {
      //console.log(response);
    this.setState({
      buList: response.activelist
    });
  });

}

getActiveSBUs(){
    getActiveList()
    .then(response => {
        //console.log(response);
      this.setState({
        sbuList: response.activelist
      });
    });
  
  }

  getActiveCountries(){
    getCountries()
    .then(response => {
        //console.log(response);
      this.setState({
        cunList: response.activelist
      });
    });
  
  }
  
    
  
    render() {

      let bulist = this.state.buList;
        let buItems = bulist.map((bu) =>
                <option key={bu.buId} value={bu.buId}>{bu.buName}</option>
            );

            let planets = this.state.sbuList;
        let optionItems = planets.map((planet) =>
                <option key={planet.sbuId} value={planet.sbuId}>{planet.sbuname}</option>
            );

            let cuns = this.state.cunList;
            let optioncuns = cuns.map((cun) =>
                    <option key={cun.cunId} value={cun.cunId}>{cun.cname}</option>
                );



      return (
        <Form onSubmit={this.onSubmit}  name="App-form" >
        <Card>
          
              <CardHeader className="carheaderSmall">
                <strong>SAM Application</strong> 
              </CardHeader>
              <CardBody>
                <FormGroup>
                    <Input type="text"  value={this.state.appId} hidden/>                   
                  </FormGroup> 
                  <FormGroup>
                    <Label htmlFor="nf-email">Application Name</Label>
                    <Input type="text" placeholder="Application Name" value={this.state.appName} onChange={this.onAppName} onKeyPress={(e) => OnlyAlphabic(e)} />
                    <FormText className="help-block">Please Enter Application Name</FormText>
                  </FormGroup>
                  <FormGroup>  
                  <Label htmlFor="nf-email">Country Name</Label>
                     
                      <Input type="select" name="select" id="select" value={this.state.cunId} onChange={this.onCunId}>
                        <option value="0">Please Select</option>
                        {optioncuns}
                      </Input>
                    
                    
                  </FormGroup>
                  {/*<FormGroup>  
                  <Label htmlFor="nf-email">SBU Name</Label>
                     
                      <Input type="select" name="select" id="select" value={this.state.sbuId} onChange={this.onSbuId}>
                        <option value="0">Please select</option>
                        {optionItems}
                      </Input>
                      <FormText className="help-block">Please Select SBU</FormText>
                    
                  </FormGroup>
                 
                  <FormGroup>  
                  <Label htmlFor="nf-email">BU Name</Label>
                     
                      <Input type="select" name="select" id="select" value={this.state.buId} onChange={this.onBuId}>
                        <option value="0">Please select</option>
                        {buItems}
                      </Input>
                      <FormText className="help-block">Please Select BU</FormText>
                    
                  </FormGroup>
              
             
                  */}
              </CardBody>
              <FormText className="help-block">{this.state.errmsg}</FormText>
            </Card>
            </Form>
      );
    }
  }

export default SamApplications;

import React, {Component} from 'react';
import {Card, CardHeader, CardBody,Button} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn,ButtonToolbar} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
//import SweetAlert from 'react-bootstrap-sweetalert';
import { getSamRoles, updateSamRole, createSamRole, getCountries,  getSbuBycunId, getBuBySbuId, getRoleTitles, deactiveSamRole, getDelSamRoles, getActiveAppsDetails,getBuList, getAppNames } from './../../util/APIUtils';
import {Row, Col, Modal, ModalHeader, ModalBody, ModalFooter,Input,
  InputGroup,  Form, FormGroup,
  FormText,CardFooter,
  Label,UncontrolledTooltip} from 'reactstrap';
  import {ToastContainer, toast} from 'react-toastify';
import { APIsService } from '../../util/API-service';
import { checkMimeType, OnlyAlphabic, upperCaseF, OnlyAlphabicW, positionIdKeyPress } from '../../util/customValidations';
import './customCss.css';
import { colordboarder,defaultboarder, containerStyle, loadertype, loaderMsg ,onlyChrRegex, defaultRegexW,reddefaultStyles,defaultStyles} from '../../constants';
//BLOCKUI Dependencies
import Loader from 'react-loaders'
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import 'loaders.css/loaders.min.css';
import Select from 'react-select';
import { classNames } from 'classnames';






class SamRole extends Component {
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
    this.setState({ loading: true , modal:this.props.open})
    this.getActiveList();
    this.setState({     
      modal:this.props.open,
      title:"Add"  
    })
  }

  


   getActiveList(){
    this.setState({ loading: true })
    getSamRoles()
    .then(response => {
      console.log(response.activelist);
      this.setState({
        data: response.activelist,
        loading:false
      });
    });
   }

   getDeActiveList(){
    this.setState({ loading: true })
    getDelSamRoles()
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
    /*console.log(this.state.modal);
    var burequest ={
      sbuId:  record.sbu.sbuId
     } 
    var sburequest ={
    cunId: record.country.cunId,
   }
   
   //this.refs.child.getActiveSBUs();  
   //this.refs.child.getActiveBus(burequest);
  */
  
   

    
  }

        deleteRow(record) {

          if(record.rstatus == '0'){
            this.setState({ loading: true })
            deactiveSamRole(record.hrRoleId)
            .then(response => {    
              this.setState({ loading: false }) 
                this.getDeActiveList() 
                toast.dismiss();
                toast.success('Record Enabled Successfully');
                
            });
        
          } else{
            this.setState({ loading: true })
        
            deactiveSamRole(record.hrRoleId)
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

  cnameFormatter(cell, row,rowIndex,index){
    //console.log(this);
    //console.log(cell);
  return  cell.cname;
}
sbunameFormatter(cell, row,rowIndex,index){
  //console.log(this);
  //console.log(cell);
return  cell.sbuname;
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
    this.apiservice.uploadFileToServer(data).then((response) => {
       // console.log("File " + file.name + " is uploaded");
       this.setState({ loading: false }) 
        this.getActiveList();
        toast.success('File Uploaded successfully');
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
            <i className="icon-menu"></i>SAM Role
            <div className="card-actions">
             
            </div>
          </CardHeader>
          <CardBody>
         
          
         {// <Button className="btn btn-info" onClick={this.handleClick} >ADD</Button>
         }
              <label className="btn btn-danger"  id="Add">ADD <input type="button"  hidden onClick={this.handleClick}/></label>
              <UncontrolledTooltip placement="right" target="Add">ADD</UncontrolledTooltip>  

              <label className="btn btn-warning" id="Import">Import<input type="file" hidden onChange={this.handleUploadFile.bind(this)} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/></label>
              <UncontrolledTooltip placement="right" target="Import">Import</UncontrolledTooltip>
              <Button className="btn btn-info" onClick={this.showDeletedRecords.bind(this)} id="rList">{this.state.recordsListName}</Button>
          <UncontrolledTooltip placement="top" target="rList">{this.state.recordsListName}</UncontrolledTooltip>

          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} keyboard={false} backdrop={false}>
          <ModalHeader toggle={this.toggle}>{this.state.title}</ModalHeader>
         
          <ModalBody>
          <CustModal ref="child" inputrecord={this.state.editrecord} editFlag ={this.state.iseditable}  parentMethod={this.doParentToggle} />
          </ModalBody>
          <ModalFooter>
            <Button className="btn-danger" onClick={this.modalSubmit.bind(this)}>{this.state.title}</Button>
            <Button className="btn-warning" onClick={this.modalClose.bind(this)}>Cancel</Button>
          </ModalFooter>
          
        </Modal>


       
        
         
        
            <BootstrapTable data={this.state.data} version="4" classNames="thw"  condensed ={true} striped hover pagination search options={this.options} exportCSV   multiColumnSearch={true}>
           <TableHeaderColumn isKey dataField="hrRoleId" dataField="hrRoleId" dataFormat={this.priceFormatter.bind(this)} export={false} tdStyle={ { whiteSpace: 'normal', width:'42px !important`', } } thStyle={ { whiteSpace: 'normal' }}  className="thw" >S.No</TableHeaderColumn>
           <TableHeaderColumn dataField="appName" csvHeader='Application' filter={ { type: 'TextFilter', delay: 1000 } }  dataSort  tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal'}}   className="thw">Application</TableHeaderColumn>
           <TableHeaderColumn dataField="rolename" csvHeader='HR Role Name' filter={ { type: 'TextFilter', delay: 1000 } }  dataSort  tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }}  className="thw" >Role Title</TableHeaderColumn>
          <TableHeaderColumn dataField="hrRoleSAMCode" csvHeader='HR Role Code' filter={ { type: 'TextFilter', delay: 1000 } }  dataSort  tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }}    className="thw">Position Id</TableHeaderColumn>
          <TableHeaderColumn dataField='button' dataFormat={this.cellButton.bind(this)} hiddenOnInsert export={false} className="thw">Actions</TableHeaderColumn>

           
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
        
        hrRoleId: '',
        hrRoleSAMCode:'',
        hrRoleSAMDesc:'',
        funList :[], 
        cunList :[], 
        cunId:'',
        sbuList :[],
        sbuId:'',
        titleId:'0',
        buId:'0',
        buList :[], 
        sbustatus:'true',
        bustatus:'true',
        titleList:[],
        value: { 'value' :'0',
        'label' :'Search App Name',
        'id'  :'0' },
        borderColor:defaultboarder,
        borderColorctry:defaultboarder,
        borderColorsbu:defaultboarder, 
        borderColorbu:defaultStyles,   
        borderColorTitle:defaultStyles,
        borderColorapp:defaultStyles,
        pasteAction:false,
        appsList:[],
        valueBu: { 'value' :'0',
        'label' :'Search BU Name',
        'id'  :'0' },
        valueTitle: { 'value' :'0',
        'label' :'Search HR Role',
        'id'  :'0' },
        cunName:"",
        sbuName:"",
        
       
      };
      
      this.onHrRoleSAMCode = this.onHrRoleSAMCode.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      
     
      this.getActiveSBUs =this.getActiveSBUs.bind(this);
      this.saveChanges = this.saveChanges.bind(this);
      this.saveChangesBu = this.saveChangesBu.bind(this);
      this.saveChangesTitle = this.saveChangesTitle.bind(this);
      
      this.blurBuId = this.blurBuId.bind(this);
      
      this.blurRoleCode = this.blurRoleCode.bind(this);
      this.blurRoleTitle = this.blurRoleTitle.bind(this);
      this.onPaste = this.onPaste.bind(this);
      this.blurAppId =this.blurAppId.bind(this);
       
  

     
    }


    onPaste(e) {
      // console.log(e.value);
       this.setState({
        pasteAction: true
       });
     }



     blurAppId(e) {

     var value =this.state.value.id;
      if(value  == '0')
      {
        this.setState({
          
          borderColorapp:reddefaultStyles
          
        
      });
      document.getElementById("appError").textContent = "Select Application";

      } else {
        this.setState({
          borderColorapp:defaultStyles             
      });

      document.getElementById("appError").textContent = "";

      }

     }

    blurRoleTitle(e) {
      
      var value =this.state.valueTitle.id;
      if(value == '0')
      {
        this.setState({
          borderColorTitle:reddefaultStyles         
        
      });
      document.getElementById("titleError").textContent = "Select Role Title ";

      } else{
        this.setState({
          borderColorTitle:defaultStyles             
      });

      document.getElementById("titleError").textContent = "";

      }

     }

    

     blurBuId(e) {
      var value =this.state.valueBu.id;
      if( value == '0')
      {
        this.setState({
  
          borderColorbu:reddefaultStyles        
          
        
      });
      document.getElementById("buNameError").textContent = "Select BU";

      } else{
        this.setState({
          borderColorbu:defaultStyles             
      });

      document.getElementById("buNameError").textContent = "";

      }

     }

    


    blurRoleCode(e) {
      var value =e.target.value.trim();

      if( !value)
      {
        this.setState({
          borderColor:colordboarder         
      });
     
      document.getElementById("roleCodeError").textContent = "Enter Role Code";

      } else
     
    
      if( value.length < 3)
      {
        this.setState({
          borderColor:colordboarder
          
        
      });     
      document.getElementById("roleCodeError").textContent = "Role Code Must Be More Than 2  Characters";

      } else{
        this.setState({
          borderColor:defaultboarder             
      });
      document.getElementById("roleCodeError").textContent = "";

      }

      this.setState({
        hrRoleSAMCode: e.target.value
      });
       
     }

     saveChanges(value) {
      // console.log(value)
       this.setState({ value:value });
      
      
     }
     saveChangesBu(valueBu) {
      // console.log(value)
       this.setState({ valueBu:valueBu });

       let obj = this.state.buList.filter(todo =>  todo.buId == valueBu.id );
          this.setState({
            sbuName:obj[0].sbuname,
            cunName:obj[0].cname,
            sbuId:obj[0].sbuId,
            cunId:obj[0].buId
            
          });
    
      
      
     }

     saveChangesTitle(valueTitle){
      this.setState({ valueTitle:valueTitle });

     }
 


    componentDidMount() { 
      // console.log(this.props.editFlag);
   
      // this.getActivefunctions();
      this.getActiveCountries();
      this.getActiveHrTitles();
      this.getActiveApplications();
      this.getActiveBus();
     // this.getActiveSBUs();
     //this.getActiveBus();

       if(this.props.editFlag)
       {
          // console.log("edit record"+this.props.inputrecord);
         /*  var sburequest ={
            cunId: this.props.inputrecord.country.cunId,
           }
           var burequest ={
            sbuId:  this.props.inputrecord.sambu.sbuId
           } */

           var appValue = {
            value :this.props.inputrecord.appName,
            label :this.props.inputrecord.appName,
            id  :this.props.inputrecord.appId 
                        }

      /*  var buValue = {
                          value :this.props.inputrecord.buname,
                          label :this.props.inputrecord.buname,
                          id  :this.props.inputrecord.sambu.buId 
                         }*/

       var titleValue = {
                          value :this.props.inputrecord.rolename,
                          label :this.props.inputrecord.rolename,
                          id  :this.props.inputrecord.roleTitle.titleId 
                      }
                        
                        
          

         //  this.getActiveSBUs(sburequest);
          // this.getActiveBus(burequest);

           /*sbuName:obj[0].sbuname,
            cunName:obj[0].cname,
            sbuId:obj[0].sbuId,
            cunId:obj[0].buId*/

       this.setState({
           hrRoleSAMCode: this.props.inputrecord.hrRoleSAMCode,
           titleId:this.props.inputrecord.roleTitle.titleId,
           hrRoleId:this.props.inputrecord.hrRoleId,
         //  cunId:this.props.inputrecord.country.cunId,           
         //  sbuId:this.props.inputrecord.sbu.sbuId,
        //   buId:this.props.inputrecord.sambu.buId,
           //cunName:this.props.inputrecord.ctryname,
           //sbuName:this.props.inputrecord.sbuname,
           //valueBu:buValue,
           valueTitle:titleValue,
           value:appValue
            
      
        });
     
        
   }else{
    this.setState({
        funName:'',
       // funId:'0',
    });
  }

    }


    onHrRoleSAMCode(e) {
     
     
      this.setState({
        hrRoleSAMCode: e.target.value
      });

     
      
    }
    
    

    

     
     



    formValidate(obj){

       // checking app validations
  if(obj.appId == '0'){
    this.setState({
      borderColorapp:reddefaultStyles
  });
  document.getElementById("appError").textContent = "Select Application";

  }else{
    document.getElementById("appError").textContent = "";
    this.setState({
      borderColorapp:defaultStyles
  });
}
// checking roleTitle validations

if(obj.roleTitle.titleId == '0'){
  this.setState({
    borderColorTitle:reddefaultStyles
});
document.getElementById("titleError").textContent = "Select Role Title";

}else{
  document.getElementById("titleError").textContent = "";
  this.setState({
    borderColorTitle:defaultStyles
});
  
}
   
     // checking sam role code validations
   if(!obj.hrRoleSAMCode) {
        this.setState({
          borderColor:colordboarder
      });
      document.getElementById("roleCodeError").textContent = "Enter Role Code";

      } else if( obj.hrRoleSAMCode.length < 3) {
        this.setState({
          borderColor:colordboarder
      });
      document.getElementById("roleCodeError").textContent = "Role Code Must Be More Than 2  Characters";
      } else {
        this.setState({
          borderColor:defaultboarder
      });
      document.getElementById("roleCodeError").textContent = "";

      }
      
      
   

  // checking bu validations
  if(obj.buId == '0'){
    this.setState({
      borderColorbu:reddefaultStyles
  });
  document.getElementById("buNameError").textContent = "Select BU";

  }else{
    document.getElementById("buNameError").textContent = "";
    this.setState({
      borderColorbu:defaultStyles
  });
    
  }

  
      if(   obj.roleTitle.titleId == '0' || obj.appId == '0'|| obj.hrRoleSAMCode.length < 3||obj.buId == '0'){     
        
        return false;
      }else 
      {
        return true;
      }

  }


    onUpdate(){
      event.preventDefault();   
      var code =this.state.hrRoleSAMCode.trim();
      const obj = {
        hrRoleSAMCode: code,
        appId:this.state.value.id,
        buId:this.state.valueBu.id,
       // hrRoleSAMDesc: this.state.hrRoleSAMDesc.trim(),  
        hrRoleId:this.state.hrRoleId,
       /* country:{
          cunId:this.state.cunId     
        },
        sbu :{
          sbuId:this.state.sbuId,
        },
        sambu :{
          buId:this.state.valueBu.id
        }*/
        roleTitle :{
          titleId:this.state.valueTitle.id
        }
        
      };

      //console.log(obj);

        if(!this.formValidate(obj)){
          // console.log("hello");
          event.preventDefault(); 
          return false;  
          }
     // console.log("Update Method Clicked");        
     updateSamRole(obj)
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
  //console.log(this.state);
    var code =this.state.hrRoleSAMCode.trim()
    const obj = {
      hrRoleSAMCode: code,
      appId:this.state.value.id,
      buId:this.state.valueBu.id,
     // hrRoleSAMDesc: this.state.hrRoleSAMDesc.trim(),  
      hrRoleId:this.state.hrRoleId,
    /*  country:{
        cunId:this.state.cunId     
      },
      sbu :{
        sbuId:this.state.sbuId
      },
      sambu :{
        buId:this.state.valueBu.id
      }*/
      roleTitle :{
        titleId:this.state.valueTitle.id
      }
  
      
    };       
    console.log(obj);  
            if(!this.formValidate(obj)){           
              event.preventDefault(); 
              return false;  
    }      
      createSamRole(obj)
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

    

getActiveCountries(){
  getCountries()
  .then(response => {
      //console.log(response);
    this.setState({
      cunList: response.activelist
    });
  });

}


     getActiveSBUs(sburequest){
      getSbuBycunId(sburequest)
      .then(response => {
          //console.log(response);
        this.setState({
          sbuList: response.activelist
        });
      });
    
    }
    
getActiveBus(burequest){
  getBuList()
  .then(response => {
    console.log(response.activelist);
    this.setState({
      buList: response.activelist
    });
  });

}

getActiveHrTitles(){
  getRoleTitles()
  .then(response => {
    //console.log("Title"+response);
    this.setState({
      titleList: response.activelist
    });
  });

}

getActiveApplications(){
  getAppNames()
  .then(response => {
  console.log(response.activelist);
    this.setState({
      appsList: response.activelist
    });
  });
}

    
  
    render() {
      
             
             

                  // for hr roles dropdowen
                  let titlesList = this.state.titleList;
                  let optionTitles = titlesList.map((title) =>{
                    //console.log("title.title"+title.title)
                    var obj = {
                        value :title.title,
                        label :title.title,
                        id  :title.titleId ,
                                    }  
                                   // options2.push(obj);
                                    //console.log(options2+"options")
                                    return obj;
                                });

              // for apps dropdowen

              let appslist = this.state.appsList;
              let titleitems = appslist.map((title) =>{
                //console.log("title.title"+title.title)
                var obj = {
                    value :title.appId,
                    label :title.appName,
                    id  :title.appId ,
                    buId:title.buId
                                }  
                               // options2.push(obj);
                                //console.log(options2+"options")
                                return obj;
                            });
                           
                            let bulist = this.state.buList;
                            let buTitles = bulist.map((title) =>{
                    //console.log("title.title"+title.title)
                var obj = {
                        value :title.buName,
                        label :title.buName,
                        id  :title.buId ,
                                    }  
                                   // options2.push(obj);
                                    //console.log(options2+"options")
                                    return obj;
                                });
                

      
      return (
        <Form onSubmit={this.onSubmit}  name="SamRole-form" >
        <Card>
          
              <CardHeader className="carheaderSmall">
                <strong>SAM ROLE</strong> 
              </CardHeader>
              <CardBody>
                <FormGroup>
                    <Input type="text" value={this.state.hrRoleId}  hidden/>                   
                  </FormGroup>
                  <FormGroup>  
                  <Label htmlFor="nf-email">Application Name<span style={{color:'red'}}>*</span></Label>
                  <Select
                     name="form-field-name2"             
                    value={this.state.value}
                    onChange={this.saveChanges}   
                    options={titleitems}
                    styles={this.state.borderColorapp}  
                    onBlur = {this.blurAppId}
                               
              />  
                      <span id="appError"></span>
                    
                  </FormGroup>
                  <FormGroup>  
                  <Label htmlFor="nf-email">Role Title<span style={{color:'red'}}>*</span></Label>
                  <Select
                     name="form-field-name2"             
                    value={this.state.valueTitle}
                    onChange={this.saveChangesTitle}   
                    options={optionTitles}
                    styles ={this.state.borderColorTitle}
                    onBlur = {this.blurRoleTitle}
                               
              />  
                      
                      <span id="titleError"></span>
                    
                 </FormGroup>
                 <FormGroup>
                    <Label htmlFor="nf-email">Position Id<span style={{color:'red'}}>*</span></Label>
                    <Input type="text" placeholder="Role Code" style ={this.state.borderColor}  maxLength ="10" minLength ="3" onPaste ={this.onPaste}   value={this.state.hrRoleSAMCode.replace(/^ /, '')} onChange={this.onHrRoleSAMCode} onKeyPress={(e) => positionIdKeyPress(e)} onBlur = {this.blurRoleCode} />
                    <span id="roleCodeError"></span>
                </FormGroup>

                <FormGroup>  
                  <Label htmlFor="nf-email">BU Name<span style={{color:'red'}}>*</span></Label>
                   
                      <Select
                     name="form-field-name2"             
                    value={this.state.valueBu}
                    onChange={this.saveChangesBu}   
                    options={buTitles}
                    styles ={this.state.borderColorbu}
                    onBlur = {this.blurBuId}
                               
              />  
                      <span id="buNameError"></span>
                    
                  </FormGroup>         
                  
                {/*    <FormGroup>  
                  <Label htmlFor="nf-email">Country Name</Label>
                     
                  <Input type="text" value={this.state.cunName} disabled></Input>
                   
                    
                  </FormGroup>
                  <FormGroup>  
                  <Label htmlFor="nf-email">SBU Name</Label>
                     
                  <Input type="text" value={this.state.sbuName} disabled ></Input>
                    
                 </FormGroup>  */}
                  
                  
                 
                 
                  
              
              </CardBody>
              
             
            </Card>
            </Form>
      );
    }
  }

export default SamRole;

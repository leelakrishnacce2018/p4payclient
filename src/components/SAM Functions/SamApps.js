import React, {Component} from 'react';
import {Card, CardHeader, CardBody,Button} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn,ButtonToolbar} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
//import SweetAlert from 'react-bootstrap-sweetalert';
import {  getActiveList,  getSamApps, deactiveSamApp, updateSamApp, createSamApp, getBuList, getCountries, getFunctiontypes, getAccesstypes } from './../../util/APIUtils';
import {Row, Col, Modal, ModalHeader, ModalBody, ModalFooter,Input,
  InputGroup,  Form, FormGroup,
  FormText,CardFooter,Alert,
  Label,UncontrolledTooltip} from 'reactstrap';
  import {ToastContainer, toast} from 'react-toastify';
  import { APIsService } from '../../util/API-service';
import { OnlyAlphabic ,checkMimeType} from '../../util/customValidations';
import Select from 'react-select';
import { defaultboarder,colordboarder, containerStyle } from '../../constants';
import LoadingSpinner from '../../util/LoadingSpinner';






const options = [
    { value: 'chocolate', label: 'Chocolate' ,id:'1'},
    { value: 'strawberry', label: 'Strawberry',id:'2' },
    { value: 'vanilla', label: 'Vanilla',id:'3' }
  ];




class SamApps extends Component {
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
    //this.getFunctionTypes();
   // this.getAccessTypes();
   this.setState({     
    modal:this.props.open,
    title:"Add"  
  })
  }
 



   getActiveList(){
 getSamApps()
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
          
        <button className="btn btn-danger" id={"delete"+rowIndex} onClick={() => {if(window.confirm('Delete The Item?')){this.deleteRow(row)}}}><i className="fa fa-trash"></i></button>
        <button className="btn btn-warning" id={"edit"+rowIndex} onClick={(e) => this.handleClickEdit(row)}><i className="fa fa-edit"></i></button>
        
        <UncontrolledTooltip placement="right" target={"edit"+rowIndex}>Edit</UncontrolledTooltip>
        <UncontrolledTooltip placement="left" target={"delete"+rowIndex}>Delete</UncontrolledTooltip>

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
   // console.log(this.state.modal);

    
  }

  

  handleClickEdit(record) {  
    
    //console.log('this is:', record);
    this.setState({
      modal: !this.state.modal,
      iseditable:true,
      editrecord:record,
      title:"Update"  
    });
    //console.log(this.state.modal);

    
  }

        deleteRow(record) {
  
    deactiveSamApp(record.appId)
    .then(response => {
        this.getActiveList();
        toast.dismiss();
        toast.success('Record Deleted Successfully');
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

  doParentToggle(){
    //console.log("from child");
    this.getActiveList();  
    this.setState({
        modal: !this.state.modal,   //to close modal
        //submitClicked:!this.state.submitClicked
      }); 
   
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
  console.log("Uploading file", event.target.files[0]);
  data.append('file', event.target.files[0]);
  data.append('name', 'my_file');
  data.append('description', 'this file is uploaded from client side');
  let self = this;
  //calling async Promise and handling response or error situation
  this.apiservice.uploadApplicationToServer(data).then((response) => {
     // console.log("File " + file.name + " is uploaded");
      this.getActiveList();
     // toast.success('File Uploaded successfully');
      //message.success(" file uploaded successfully");
      alert("File uploaded successfully");
     // window.location.reload();
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
      <ToastContainer position="top-right" autoClose={5000} style={containerStyle} closeButton={false}/>
      { this.state.loading ? (<LoadingSpinner />) : (
        <Card>
          <CardHeader>
            <i className="icon-menu"></i>SAM Application
            <div className="card-actions">
              
            </div>
          </CardHeader>
          <CardBody>
         
          
          <Button className="btn btn-danger" onClick={this.handleClick} id="ADD">ADD</Button>
          <UncontrolledTooltip placement="top" target="ADD">ADD</UncontrolledTooltip>
          <label className="btn btn-warning" id="Import">Import<input type="file" hidden onChange={this.handleUploadFile.bind(this)} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/></label>
              <UncontrolledTooltip placement="right" target="Import">Import</UncontrolledTooltip>
          

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
         
        
            <BootstrapTable data={this.state.data} version="4" striped hover pagination search options={this.options} 
        
         exportCSV >
           <TableHeaderColumn isKey dataField="appId" dataField="appId" dataFormat={this.priceFormatter.bind(this)}  headerStyle={ { whiteSpace: 'normal' } } export={false} >S.No</TableHeaderColumn>
                   
              <TableHeaderColumn dataField="appName" dataSort tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }}>App Name</TableHeaderColumn> 
              <TableHeaderColumn dataField="cname" dataSort tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }}>Country Name</TableHeaderColumn> 
              <TableHeaderColumn dataField="appMenu" dataSort>App Menu</TableHeaderColumn> 
              <TableHeaderColumn dataField="funName" dataSort tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }}>Function Name</TableHeaderColumn> 
              <TableHeaderColumn dataField="funaccIdname" dataSort tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }}>Function Access Type</TableHeaderColumn> 
              <TableHeaderColumn dataField="subFunName" dataSort tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }}  >Sub Function Name</TableHeaderColumn> 
              <TableHeaderColumn dataField="subfunaccIdname" dataSort tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }}>Sub Function Access Type</TableHeaderColumn> 
              <TableHeaderColumn dataField="functyplist"  dataFormat={this.funtypesFormatter.bind(this)}  tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }} export={false} >Function Types</TableHeaderColumn> 
              <TableHeaderColumn dataField="subfunctyplist"  dataFormat={this.subfuntypesFormatter.bind(this)}  tdStyle={ { whiteSpace: 'normal' } } thStyle={ { whiteSpace: 'normal' }} export={false} >Sub Function Types</TableHeaderColumn> 
              
              {/*TableHeaderColumn dataField="sbuname" dataSort   >SBU Name</TableHeaderColumn>
          
    <TableHeaderColumn dataField="buname" dataSort   >BU Name</TableHeaderColumn>*/}
              <TableHeaderColumn
        dataField='button'
        dataFormat={this.cellButton.bind(this)} hiddenOnInsert export={false}
      >Actions</TableHeaderColumn>
           
            </BootstrapTable>
          </CardBody>
      </Card> )}
      </div>
    );
  }
}


class CustModal extends Component {
    constructor() {
      super();
    
      this.state = {
        appId:'',
        appName:'',
        sbuName: '',
        sbuId: '',
        buId:'',
        buName:'',
        cunId:'0',
        cname:'',
        buList :[], 
        sbuList :[],
        cunList :[], 
        acctypesList :[],
        funtypesList :[] ,
        acctypesid:'',
        funaccId:'0',
        subfunaccId:'0',
        funTypes:'',
        subfunTypes:'',
        appMenu:'',
        funName:'',
        subFunName:'',
        selectedOption: null,
        value: [],
        value2: [],
        funTypes:'',
        subfunTypes:'',
        borderColor:defaultboarder,
        borderColorctry:defaultboarder,
        borderColormenu:defaultboarder,
        borderColorapp:defaultboarder,
        borderColorfun:defaultboarder,
        pasteAction:false,
        pasteActionMenu:false,
        pasteActionFun:false,
        pasteActionSubFun:false,

      };
      this.onSbuId = this.onSbuId.bind(this);
      this.onBuId = this.onBuId.bind(this);
      this.onAppName = this.onAppName.bind(this);
      this.onSubmit = this.onSubmit.bind(this);      
      this.OnfunaccId = this.OnfunaccId.bind(this);
      this.OnsubfunaccId = this.OnsubfunaccId.bind(this);
      this.OnfunTypes = this.OnfunTypes.bind(this);
      this.OnsubfunTypes = this.OnsubfunTypes.bind(this);  
  
      this.onCunId = this.onCunId.bind(this);
      this.handleChange=this.handleChange.bind(this);
      this.saveChanges = this.saveChanges.bind(this);
      this.saveChanges2 = this.saveChanges2.bind(this);
      this.OnappMenu = this.OnappMenu.bind(this);
      this.OnfunName = this.OnfunName.bind(this);
      this.OnsubFunName = this.OnsubFunName.bind(this);
      this.blurctry = this.blurctry.bind(this);
      this.blurmenu = this.blurmenu.bind(this);
      this.blurapp = this.blurapp.bind(this);
      this.blurfun = this.blurfun.bind(this);

      this.onPaste = this.onPaste.bind(this);
      this.onPasteMenu = this.onPasteMenu.bind(this);
      this.onPasteFun = this.onPasteFun.bind(this);
      this.onPasteSubFun = this.onPasteSubFun.bind(this);
     
  

     
    }


    onPasteSubFun(e) {
      // console.log(e.value);
       this.setState({
        pasteActionSubFun: true
       });
     }
    onPasteFun(e) {
      // console.log(e.value);
       this.setState({
        pasteActionFun: true
       });
     }

    onPasteMenu(e) {
      // console.log(e.value);
       this.setState({
        pasteActionMenu: true
       });
     }

    onPaste(e) {
      // console.log(e.value);
       this.setState({
        pasteAction: true
       });
     }


    saveChanges(value) {
        this.setState({ value:value });
       // console.log(this.state.value)
      }
      saveChanges2(value2) {
        this.setState({ value2:value2 });
        //console.log(this.state.value)
      }
    

      blurmenu(e) {
        var value =e.target.value;
  
        if( !value)
        {
          this.setState({
            borderColormenu:colordboarder
            
          
        });
        toast.dismiss()
        toast.info('Enter Menu Name');
  
        } else
       
      
        if( value.length < 3)
        {
          this.setState({
            borderColormenu:colordboarder
            
          
        });
        toast.dismiss()
        toast.info('Enter Menu Name');
  
        } else{
          this.setState({
            borderColormenu:defaultboarder             
        });
  
        }
         
       }

       blurapp(e) {
        var value =e.target.value;
  
        if( !value)
        {
          this.setState({
            borderColorapp:colordboarder
            
          
        });
        toast.dismiss()
        toast.info('Enter Application Name');
  
        } else
       
      
        if( value.length < 6)
        {
          this.setState({
            borderColorapp:colordboarder
            
          
        });
        toast.dismiss()
        toast.info('Enter application Name');
  
        } else{
          this.setState({
            borderColorapp:defaultboarder             
        });
  
        }
         
       }

       blurfun(e) {
        var value =e.target.value;
  
        if( !value)
        {
          this.setState({
            borderColorfun:colordboarder
            
          
        });
        toast.dismiss()
        toast.info('Enter Function Name');
  
        } else
       
      
        if( value.length < 3)
        {
          this.setState({
            borderColorfun:colordboarder
            
          
        });
        toast.dismiss()
        toast.info('Enter Function Name');
  
        } else{
          this.setState({
            borderColorfun:defaultboarder             
        });
  
        }
         
       }
    
    

      blurctry(e) {
        var value =e.target.value;
  
        if( value == '0')
        {
          this.setState({
            borderColorctry:colordboarder
            
          
        });
        toast.dismiss()
        toast.info('Select Country');
  
        } else{
          this.setState({
            borderColorctry:defaultboarder             
        });
  
        }
  
       }

    componentDidMount() { 
      // console.log(this.props.editFlag);
   
      // this.getActiveBus();
      // this.getActiveSBUs();
      this.getActiveCountries();
      this.getFunctionTypes();
    this.getAccessTypes();

       if(this.props.editFlag)
       {
           //console.log("edit record"+this.props.inputrecord);

          // console.log("AccessTypesOnEdit"+this.state.acctypesList)
         //  console.log("AccessTypesOnEdit"+this.state.acctypesList.length)
           let editValues = this.props.inputrecord.functyplist.map((funtypes) =>{
            var obj = {
                value :funtypes.funtypeidname,
                label :funtypes.funtypeidname,
                id  :funtypes.funtypeid 
                    }  
                          
                            return obj;
                        }
        );

        let editValues2 = this.props.inputrecord.subfunctyplist.map((funtypes) =>{
          var obj = {
              value :funtypes.subfuntypeidname,
              label :funtypes.subfuntypeidname,
              id  :funtypes.subfuntypeid 
                  }  
                        
                          return obj;
                      }
      );


       this.setState({
           appName: this.props.inputrecord.appName,
          // buId:this.props.inputrecord.buId,
          // sbuId:this.props.inputrecord.sbuId,
           appId:this.props.inputrecord.appId,
           cunId:this.props.inputrecord.cunId,
           appMenu:this.props.inputrecord.appMenu,
           funName:this.props.inputrecord.funName,
           funaccId:this.props.inputrecord.funaccId,
           subfunaccId:this.props.inputrecord.subfunaccId,
           subFunName:this.props.inputrecord.subFunName,
           value:editValues,          //set function type values
           value2:editValues2         //set subfunction types list
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
     if(this.state.pasteAction){
      this.setState({
        appName: this.state.appName,
        pasteAction:false
      });
     } else{
      this.setState({
        appName: e.target.value
      });

     }
      
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

      
       

       OnappMenu(e) {
        // console.log(e.value);
        if(this.state.pasteActionMenu){
          this.setState({
            appMenu: this.state.appMenu,
            pasteActionMenu:false
         });
        } else{
          this.setState({
            appMenu: e.target.value
         });

        }
         
        }
        OnfunName(e) {
        // console.log(e.value);
        if(this.state.pasteActionFun){
          this.setState({
            funName: this.state.funName,
            pasteActionFun:false
         });
        } else{
          this.setState({
            funName: e.target.value
         });

        }
        
       }
       OnsubFunName(e) {
        // console.log(e.value);
        if(this.state.pasteActionSubFun){
          this.setState({
            subFunName: this.state.subFunName,
            pasteActionSubFun:false

         });
        } else{
          this.setState({
            subFunName: e.target.value
         });

        }
        
       }

       OnfunaccId(e) {
        // console.log(e.value);
         this.setState({
          funaccId: e.target.value
         });
       }

       OnsubfunaccId(e) {
        // console.log(e.value);
         this.setState({
          subfunaccId: e.target.value
         });
       }

       OnfunTypes(e) {
        // console.log(e.value);
         this.setState({
          funTypes: e.target.value
         });
       }

       OnsubfunTypes(e) {
        // console.log(e.value);
         this.setState({
          subfunTypes: e.target.value
         });
       }


       
       
    

    formValidate(obj){  
      if(obj.cunId =='0'){
        this.setState({
          borderColorctry:colordboarder
      });
      toast.dismiss()
      toast.info('Select Country');
        return false;
      }  
      else if(obj.appName =="" || obj.appName == 'undefined' ||  obj.appName.length < 6 ){
        this.setState({
          borderColorapp:colordboarder
      });
      toast.dismiss()
      toast.info('Enter application Name ');

        return false
      }else if(obj.appMenu =="" || obj.appMenu == 'undefined' ||  obj.appMenu.length < 6 ){        
        this.setState({
          borderColormenu:colordboarder
      });
      toast.dismiss()
      toast.info('Enter Menu Name ');
        return false
      } else if(obj.funName =="" || obj.funName == 'undefined' ||  obj.funName.length < 3 ){ 
        this.setState({
          borderColorfun:colordboarder
      });
      toast.dismiss()
      toast.info('Enter Function Name ');
        return false
      }      
       else {
        return true
       }     

    }

    formValidate2(obj){     
      if((obj.funTypes != '') || (obj.funaccId != '0')){
        this.setState({
          borderColor:defaultboarder,
          
         
      });
        
        return true
      }     
       else {
        
        this.setState({
          borderColor:colordboarder,
         
         
      });
      toast.dismiss()
      toast.info('Please Select Either Function Types Or Access Types');
        return false
       }

    }
    formValidate3(obj){   

     
      if(!obj.subFunName) {
        return true
      }     
       else {
        if((obj.subfunaccId != '0') || (obj.subfunTypes != '')){
          return true
        }     
         else {
          toast.dismiss()
          toast.info('Please Select Either Sub Function Types or Sub Function Access Types');
          return false
         }

      
       }

    }



    



    onUpdate(){
      event.preventDefault();   
      var funTypes="";
  this.state.value.map((record,i)=>{
    funTypes =funTypes+record.id+","
  });

  var subfunTypes ="";

  this.state.value2.map((record,i)=>{
    subfunTypes =subfunTypes+record.id+","
  });
      var obj = {
        appName: this.state.appName.trim(),        
        appId:this.state.appId, 
        cunId:this.state.cunId ,
        appMenu:this.state.appMenu.trim(),
        funName:this.state.funName.trim(),
        subFunName:this.state.subFunName.trim(),
        funaccId:this.state.funaccId,
        subfunaccId:this.state.subfunaccId,
        funTypes:funTypes.substring(0,funTypes.length-1),
        subfunTypes:subfunTypes.substring(0,subfunTypes.length-1),
        
      };

      if(!this.formValidate(obj)){           
        event.preventDefault(); 
        return false;  
}      


if(!this.formValidate2(obj)){
// console.log("hello");
event.preventDefault(); 
return false;  
}
else  if(!this.formValidate3(obj)){
  // console.log("hello");
  event.preventDefault(); 
  return false;  
  }





     // console.log("Update Method Clicked");        
     updateSamApp(obj)
      .then(response => {               
        // console.log("rsponse"+response); 
        toast.dismiss()
        toast.warn('Record updated Successfully');
        this.props.parentMethod();
     }).catch(error => {   
      toast.dismiss();   
    toast.error( error.message);            
        });

  }



  onSubmit()  {
    event.preventDefault();   
  
    
    var funTypes="";
  this.state.value.map((record,i)=>{
    funTypes =funTypes+record.id+","
  });

  var subfunTypes ="";

  this.state.value2.map((record,i)=>{
    subfunTypes =subfunTypes+record.id+","
  });

  

  const obj = {
    appName: this.state.appName.trim(),
    //buId: this.state.buId,
    //sbuId:this.state.sbuId,
    appId:this.state.appId, 
    cunId:this.state.cunId ,
    appMenu:this.state.appMenu.trim(),
    funName:this.state.funName.trim(),
    subFunName:this.state.subFunName.trim(),
    funaccId:this.state.funaccId,
    subfunaccId:this.state.subfunaccId,
    funTypes:funTypes.substring(0,funTypes.length-1),
    subfunTypes:subfunTypes.substring(0,subfunTypes.length-1),
  };
          
            if(!this.formValidate(obj)){           
              event.preventDefault(); 
              return false;  
    }      

    
    if(!this.formValidate2(obj)){
      // console.log("hello");
      event.preventDefault(); 
      return false;  
      }
    else  if(!this.formValidate3(obj)){
        // console.log("hello");
        event.preventDefault(); 
        return false;  
        }

    createSamApp(obj)
               // createSamSubFun(obj)
                  .then(response => {      
                    toast.dismiss();                                         
                   toast.success('Record Inserted Successfully'); 
                   this.props.parentMethod();                 
                }).catch(error => {
                    console.log(error);
                    toast.dismiss();
                  toast.error( error.message);              
                             });
  
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

  getAccessTypes(){
    getAccesstypes()
       .then(response => {
          // console.log(response.activelist);
         this.setState({
            acctypesList: response.activelist
         });
       });
   
     } 


getFunctionTypes(){
    getFunctiontypes()
       .then(response => {
         //  console.log(response.activelist);
         this.setState({
            funtypesList: response.activelist
         });
       });

}
handleChange(selectedOption){
   
   // console.log(`Option selected:`, selectedOption);
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

                let acctypesList = this.state.acctypesList;
                let acctypesitems = acctypesList.map((acctypes) =>
                        <option key={acctypes.accid} value={acctypes.accid}>{acctypes.typeLevel}</option>
                    );

                  
                    let funtypesList = this.state.funtypesList;
                    let funypesitems = funtypesList.map((funtypes) =>
                        <option key={funtypes.id} value={funtypes.id}>{funtypes.funName}</option>
                    );

                    var options2 =[];

                    let funypesitems3 = funtypesList.map((funtypes) =>{
                    var obj = {
                        value :funtypes.funName,
                        label :funtypes.funName,
                        id  :funtypes.id 
                                    }  
                                   // options2.push(obj);
                                    //console.log(options2+"options")
                                    return obj;
                                }
                );
                   
                    
                    for(let i = 0; i < this.state.funtypesList; i++) {                    
                      
                        var obj = {
                            value :"hihi",
                            label :"one",
                            id  :"hi"+i  
                                        }                  
                                        options2.push(obj);
                                       // console.log(options2+"options")
                                    }
                      
                    
                   
                    
               




      return (
        <Form onSubmit={this.onSubmit}  name="App-form" className="form-horizontal" >
        <Card>
          
              <CardHeader className="carheaderSmall">
                <strong>SAM Application</strong> 
              </CardHeader>
              <CardBody>
                <FormGroup>
                
                    <Input type="text"  value={this.state.appId} hidden/>                   
                  </FormGroup> 
                  <FormGroup row> 
                  <Col md="6">
                  <Label htmlFor="nf-email">Country Name<span style={{color:'red'}}>*</span></Label>
                  </Col>
                    <Col xs="12" md="6">
                     
                      <Input type="select" name="select" style ={this.state.borderColorctry}  id="select" value={this.state.cunId} onChange={this.onCunId} onBlur = {this.blurctry}>
                        <option value="0">Please Select</option>
                        {optioncuns}
                      </Input>
                      
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                  <Col md="6">
                    <Label htmlFor="nf-email">Application Name<span style={{color:'red'}}>*</span></Label>
                    </Col>
                    <Col xs="12" md="6">
                    <Input type="text" placeholder="Application Name" style ={this.state. borderColorapp}  maxLength ="35" minLength ="6" value={this.state.appName} onPaste ={this.onPaste}  onChange={this.onAppName} onKeyPress={(e) => OnlyAlphabic(e)} onBlur = {this.blurapp} />
                     </Col>
                 </FormGroup>
                  <FormGroup row>
                  <Col md="6">
                    <Label htmlFor="nf-email">Menu Name<span style={{color:'red'}}>*</span></Label>
                    </Col>
                    <Col xs="12" md="6">
                    <Input type="text" placeholder="Menu Name" maxLength ="20" minLength ="6" style ={this.state. borderColormenu}   value={this.state.appMenu} onPaste ={this.onPasteMenu}  onChange={this.OnappMenu} onKeyPress={(e) => OnlyAlphabic(e)} onBlur = {this.blurmenu} />    
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                  <Col md="6">
                    <Label htmlFor="nf-email">Function Name<span style={{color:'red'}}>*</span></Label>
                    </Col>
                    <Col xs="12" md="6">
                    <Input type="text" placeholder="Function Name" maxLength ="20" minLength ="3" style ={this.state. borderColorfun}  value={this.state.funName} onPaste ={this.onPasteFun}  onChange={this.OnfunName} onKeyPress={(e) => OnlyAlphabic(e)} onBlur = {this.blurfun}  />    
                    </Col>
                  </FormGroup>                  
                  <FormGroup row>   
                  <Col md="6">                 
                      <Label htmlFor="nf-email">Function Types</Label>
                      </Col>
                      <Col xs="12" md="6">
                  <Select
                name="form-field-name2"
                value={this.state.value}
                options={funypesitems3}
                onChange={this.saveChanges}
                isMulti 
              />
              </Col>              
              </FormGroup> 
                  <FormGroup row>  
                  <Col md="6">
                  <Label htmlFor="nf-email">Function Access Types</Label>
                  </Col>
                    <Col xs="12" md="6">
                      <Input type="select" name="select" id="select" value={this.state.funaccId} onChange={this.OnfunaccId }>
                        <option value="0">Please Select</option>
                        {acctypesitems}
                      </Input>
                      
                      </Col>    
                  </FormGroup>

                  <FormGroup row>
                  <Col md="6">
                    <Label htmlFor="nf-email">Sub Function Name</Label>
                    </Col>
                    <Col xs="12" md="6">
                    <Input type="text" placeholder="Sub Function Name" maxLength ="20" minLength ="3" value={this.state.subFunName}   onPaste ={this.onPasteSubFun} onChange={this.OnsubFunName} onKeyPress={(e) => OnlyAlphabic(e)} />    
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                  <Col md="6">
                       <Label htmlFor="nf-email">Sub Function Types</Label> 
                       </Col>
                    <Col xs="12" md="6">                    
                  <Select 
                  // closeMenuOnSelect={false}            
                value={this.state.value2}
                options={funypesitems3}
                onChange={this.saveChanges2}
                isMulti
              />
             </Col>
              </FormGroup>
              <FormGroup row>  
              <Col md="6">
                  <Label htmlFor="nf-email">Sub Function Access Types</Label>
                  </Col>
                    <Col xs="12" md="6">  
                      <Input type="select" name="select" id="select" value={this.state.subfunaccId} onChange={this.OnsubfunaccId }>
                        <option value="0">Please Select</option>
                        {acctypesitems}
                      </Input>
                      </Col>                    
                  </FormGroup>   
                  
              </CardBody>

            </Card>
            
            </Form>
      );
    }
  }

export default SamApps;

import React, {Component} from 'react';
import {Card, CardHeader, CardBody,Button} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {  getBuList, deactiveRecord, updateBu, createBu, getCountries, deactiveCun, updateCountry, createCountry, getDelCountries, getActiveFunctions } from './../../util/APIUtils';
import { Modal, ModalHeader, ModalBody, ModalFooter,Input,
   Form, FormGroup,
  FormText,
  Label,UncontrolledTooltip} from 'reactstrap';
  import {ToastContainer, toast} from 'react-toastify';
import { APIsService } from '../../util/API-service';
import { checkMimeType, OnlyAlphabic, OnlyAlphabicuns } from '../../util/customValidations';
import { colordboarder,defaultboarder, containerStyle, loaderMsg, loadertype ,defaultRegex} from '../../constants';
import LoadingSpinner from '../../util/LoadingSpinner';
//BLOCKUI Dependencies
import Loader from 'react-loaders'
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import 'loaders.css/loaders.min.css';
import 'antd/dist/antd.css';
//import './index.css';
import { Table } from 'antd';

import custmdata from '../SAM Functions/custmdata'

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  }


class RowExpand extends Component {
  constructor(props) {
    super(props);   
    this.state = {      
        data :[],
        errormsg: null,
        loading: false,
        modal: false,
        primary: false,
        iseditable :false,
        editrecord :[],
        title :"",
        submitClicked :false,
        eclsname:"is-invalid",
        recordsListName:"Show Disable Records",
        data2 :[],
        columns :[
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
                width: '12%',
              },
              {
                title: 'Address',
                dataIndex: 'address',
                width: '30%',
                key: 'address',
              },
        ],
        data3:[
            
  {
    key: 1,
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    children: [
      {
        key: 11,
        name: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park',
      },
      {
        key: 12,
        name: 'John Brown jr.',
        age: 30,
        address: 'New York No. 3 Lake Park',
        children: [
          {
            key: 121,
            name: 'Jimmy Brown',
            age: 16,
            address: 'New York No. 3 Lake Park',
          },
        ],
      },
      {
        key: 13,
        name: 'Jim Green sr.',
        age: 72,
        address: 'London No. 1 Lake Park',
        children: [
          {
            key: 131,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 2 Lake Park',
            children: [
              {
                key: 1311,
                name: 'Jim Green jr.',
                age: 25,
                address: 'London No. 3 Lake Park',
              },
              {
                key: 1312,
                name: 'Jimmy Green sr.',
                age: 18,
                address: 'London No. 4 Lake Park',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
        ]
        
    }
    this.toggle = this.toggle.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.apiservice =new APIsService();
    this.doParentToggle = this.doParentToggle.bind(this);
    this.closeErrorMsg = this.closeErrorMsg.bind(this);
   
    
    this.options = {
      sortIndicator: true,
      hideSizePerPage: false,
      paginationSize: 3,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: true,
      withFirstAndLast: true,
      printToolBar: true
    }

  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    //console.log("modal closed");
    this.getActiveList();
    //this.refs.child.onSubmit();
  }

  modalSubmit(){
  /* var successFlag = this.refs.child.onSubmit();
   if(successFlag){
    this.setState({
      modal: !this.state.modal,
      submitClicked:!this.state.submitClicked
    });
    this.getActiveList();*/
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
   // console.log("modal closed");
    this.getActiveList();

  }

  togglePrimary() {
    this.setState({
      primary: !this.state.primary
    });
  }


  componentDidMount() {
    this.setState({ loading: true })

    this.getActiveList();
    this.setState({     
      modal:this.props.open,
      title:"Add"  
    })
  }

  
 



// api for  active countries 

getActiveList(){
    this.setState({ loading: true })
    getActiveFunctions()
    .then(response => {
        console.log(response.activelist);
      this.setState({
        data: response.activelist,
        loading:false
      });
      //var data2 =this.list_to_tree(response.activelist);

    // this.iterate(data2[0]);

    //this.jsonPrinter(data2[0]);

    

    });

  } 

  list_to_tree(list) {
    var map = {}, node, roots = [], i;
    for (i = 0; i < list.length; i += 1) {
        map[list[i].funId] = i; // initialize the map
        list[i].children = []; // initialize the children
    }
    for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.strParentFunId !== "0") {
            // if you have dangling branches check that map[node.parentId] exists
            list[map[node.strParentFunId]].children.push(node);
        } else {
            roots.push(node);
        }
    }
    return roots;
}


jsonPrinter(obj) {
    console.log(obj["funId"]+"----->"+obj["strParentFunId"]);
    for (let key in obj) {
        // checking if it's nested
        if (obj.hasOwnProperty(key) && (typeof obj[key] === "object")) {
            this.jsonPrinter(obj[key])
        } else {
            // printing the flat attributes
            
            //console.log(key + " -> " + obj[key]);
            if(key == 'strParentFunId' || key == 'funId')
            console.log(obj["funId"]+"----->"+obj["strParentFunId"]);
            
            

        }
    }
}


iterate(obj){
    let value =1.
    
    Object.keys(obj).forEach(key => {

   

    if (typeof obj[key] === 'object') {
        value = value+1.
            this.iterate(obj[key])
        } else{
            if( key == 'funId')
            console.log(obj["funId"]+"----->"+obj["strParentFunId"]+"---"+value);
            //console.log('key: '+ key + ', value: '+obj[key]);
        }
    })
}





   getDeActiveList(){
    this.setState({ loading: true })
    getDelCountries()
    .then(response => {
       // console.log(response.activelist);
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
    //console.log(this.state.modal);

    
  }

  // api for set status '0' for de active country record

        deleteRow(record) {
     if(record.rstatus == '0'){
      this.setState({ loading: true })
    deactiveCun(record.cunId)
    .then(response => {   
      this.setState({ loading: false }) 
        this.getDeActiveList() 
        toast.dismiss();
        toast.success('Record Enabled Successfully');
        
    });

  } else{
    this.setState({ loading: true })
    deactiveCun(record.cunId)
    .then(response => {    
      this.setState({ loading: false })
        this.getActiveList();   
        toast.dismiss();
        toast.success('Record Disabled Successfully');
        
    });

  }

 
  }

    priceFormatter(cell, row,rowIndex,index){
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
    this.apiservice.uploadContrysToServer(data).then((response) => {
      this.setState({ loading: false }) 
       // console.log("File " + file.name + " is uploaded");
        this.getActiveList(); 
        if(response.data.success){
          toast.success("File Uploaded successfully");
          
        }
        
       
        //message.success(" file uploaded successfully");
    })
    .catch(error => {
      this.setState({ loading: false });
      toast.error(error.response.data.message);
    });
    
    
}

closeErrorMsg(){
  alert("Hello");
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
     
    
      <ToastContainer position="top-right"  autoClose={5000} style={containerStyle} closeButton={false}/>
     
        <Card  >
          <CardHeader>
            <i className="icon-menu"></i>Country
            <div className="card-actions">
             
            </div>
          </CardHeader>
          <CardBody>

          
          <Button className="btn btn-danger" onClick={this.handleClick} id="ADD">ADD</Button>
          <UncontrolledTooltip placement="top" target="ADD">ADD</UncontrolledTooltip>
          <label className="btn btn-warning" id="Import">Import<input type="file" hidden onChange={this.handleUploadFile.bind(this)} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/></label>
              <UncontrolledTooltip placement="right" target="Import">Import</UncontrolledTooltip>
          <Button className="btn btn-info" onClick={this.showDeletedRecords.bind(this)} id="rList">{this.state.recordsListName}</Button>
          <UncontrolledTooltip placement="top" target="rList">{this.state.recordsListName}</UncontrolledTooltip>

          
        
        {//  <Table columns={this.state.columns} rowSelection={rowSelection} dataSource={this.state.data3} />
        }
          <Table columns={custmdata.columns2} rowSelection={rowSelection} dataSource={custmdata.cdata} />
          
         
        
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





export default RowExpand;

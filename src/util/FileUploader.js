import React, { Component } from 'react';
import { APIsService } from './API-service';





export class FileUploader extends Component {
    constructor() {
        super();  
        this.state ={
          image: ''
        }      
        this.apiservice =new APIsService();
        this.onFormSubmit = this.onFormSubmit.bind(this)
      this.onChange = this.onChange.bind(this)
      this.fileUpload = this.fileUpload.bind(this)
    }

    onFormSubmit(e){
      e.preventDefault() 
      this.fileUpload(this.state.image);
    }
    onChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
            return;
      this.createImage(files[0]);
    }
    createImage(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.setState({
          image: e.target.result
        })
      };
      reader.readAsDataURL(file);
    }
    fileUpload(image){
           
      const formData = {file: this.state.image}
      this.apiservice.uploadFileToServer(formData).then((response) => {
        console.log("File " + file.name + " is uploaded");
        //message.success(" file uploaded successfully");
    }).catch(function (error) {
        console.log(error);
        if (error.response) {
            //HTTP error happened
            //message.error(`${info.file.name} file upload failed.`);
            console.log("Upload error. HTTP error/status code=",error.response.status);
        } else {
            //some other error happened
           console.log("Upload error. HTTP error/status code=",error.message);
        }
    });
    }

    handleUploadFile(event){
        const data = new FormData();
        //using File API to get chosen file
        let file = event.target.files[0];
        console.log("Uploading file", event.target.files[0]);
        data.append('file', event.target.files[0]);
        data.append('name', 'my_file');
        data.append('description', 'this file is uploaded from client side');
        let self = this;
        //calling async Promise and handling response or error situation
        this.apiservice.uploadFileToServer(data).then((response) => {
            console.log("File " + file.name + " is uploaded");
            //message.success(" file uploaded successfully");
        }).catch(function (error) {
            console.log(error);
            if (error.response) {
                //HTTP error happened
                //message.error(`${info.file.name} file upload failed.`);
                console.log("Upload error. HTTP error/status code=",error.response.status);
            } else {
                //some other error happened
               console.log("Upload error. HTTP error/status code=",error.message);
            }
        });
    };



    render() {
        var myStyle = {
         color: '#1890ff',
         background:'1890ff'
         }
        return (
            <div>   

          {// <div className="btn btn-primary btn-file" >Browse <input type="file"/>    </div>
          
          //  <input type="file" className="btn btn-primary btn-file" onChange={this.handleUploadFile.bind(this)} />
        }
            <form onSubmit={this.onFormSubmit}>        
        <input type="file"  onChange={this.onChange}/>
        <button type="submit">Upload</button>
         </form>
        
            </div>
        )
    };
}
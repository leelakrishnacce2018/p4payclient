import  service  from './CustomAPI';

export class APIsService {

   
    uploadFileToServer(data){
        //returns Promise object
        return service.getRestClient().post('/samrole/files', data);
    }

    CreateSamSubFunctions(data){
     

        return service.getRestClient().post('/subfun/create',data);
    }

    //file uploading countries
    uploadContrysToServer(data){
        //returns Promise object
        return service.getRestClient().post('/cun/files', data);
    }


      //file uploading sbus
      uploadSbuToServer(data){
        //returns Promise object
        return service.getRestClient().post('/sbu/uploadFile', data);
    }

    uploadSamdataToServer(data){
        //returns Promise object
        return service.getRestClient().post('/reports/upload', data);
    }
//upload function details
    uploadApplicationToServer(data){
           
        return service.getRestClient().post('/appdetails/appdetailsfiles', data);
    }
//upload app info screen
    uploadAppInfoToServer(data){
           
        return service.getRestClient().post('/appdetails/files', data);
    }

//upload HR Roles
    uploadHRRolesToServer(data){
        return service.getRestClient().post('/rtile/uploadFile', data);
    }//returns Promise object
        
    uploadAppNamesToServer(data){
        return service.getRestClient().post('/appname/files', data);
    }//returns Promise object
        



}
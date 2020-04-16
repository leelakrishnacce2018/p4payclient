import { API_BASE_URL, POLL_LIST_SIZE, ACCESS_TOKEN } from '../constants';


function request(options) {
    const headers = new Headers({
        'Content-Type': 'application/json',
        'crossDomain': true,
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
          //  console.log(json);
          
             if(!response.ok) {
               if(response.status == 401){
                var obj ={
                    usernameOrEmail:localStorage.getItem("LOGINID")
                  }
                  sessionOutRequest(obj)
                  .then(response => {
                    localStorage.clear();
                    window.location.href = '/sam';
                    return false;
                  });
                   
               } else
                // throw new Error('Something went wrong');
                return Promise.reject(json);
               
             }
            return json;
        })
    );
};

// auth controller apis
export function loginRequest(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}




export function logoutRequest(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signout",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}


export function sessionOutRequest(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/sessionout",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}






export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + "/users/" + username,
        method: 'GET'
    });
}



// apis for SAM BU Screen
export function createBu(buRequest) {
      

    return request({
        url: API_BASE_URL + "/bu/create",
        method: 'POST',        
        body: JSON.stringify(buRequest)
    });
}

export function getBuList(buRequest) {
     

    return request({
        url: API_BASE_URL + "/bu/active",
        method: 'GET',
       
        
    });
}

export function deactiveRecord(key){
    

    return request({
        url: API_BASE_URL + "/bu/"+key,
        method: 'DELETE'       
        
    });


}
export function updateBu(buRequest) {
      

    return request({
        url: API_BASE_URL + "/bu/update",
        method: 'PUT',        
        body: JSON.stringify(buRequest)
    });
}

export function getBuBySbuId(buRequest) {  
    return request({
        url: API_BASE_URL + "/bu/bysbuid",
        method: 'POST',        
        body: JSON.stringify(buRequest)
    });
}

// get deactive bu 
export function getDelBuList(buRequest) {    

    return request({
        url: API_BASE_URL + "/bu/inactive",
        method: 'GET',
       
        
    });
}



export function getSbuByMultiBuId(buRequest) {     

    return request({
        url: API_BASE_URL + "/bu/multibuid",
        method: 'POST',  
        body: JSON.stringify(buRequest)
        
        
    });
}


// sam sbu apis
export function getActiveList() {       

    return request({
        url: API_BASE_URL + "/sbu/active",
        method: 'GET',        
        
    });
}

export function createSBU(sbuRequest) {   

   

    return request({
        url: API_BASE_URL + "/sbu/create",
        method: 'POST',        
        body: JSON.stringify(sbuRequest)
    });
}

export function deactiveSbuRecord(key){
    

    return request({
        url: API_BASE_URL + "/sbu/"+key,
        method: 'DELETE',
       
        
    });


}

export function updateSBU(sbuRequest) {   

   

    return request({
        url: API_BASE_URL + "/sbu/update",
        method: 'PUT',        
        body: JSON.stringify(sbuRequest)
    });
}

export function getSbuBycunId(sbuRequest) {  
    return request({
        url: API_BASE_URL + "/sbu/bycunid",
        method: 'POST',        
        body: JSON.stringify(sbuRequest)
    });
}



export function getCtriesByMultiSbuId(sbuRequest) {     

    return request({
        url: API_BASE_URL + "/sbu/multisbuid",
        method: 'POST',  
        body: JSON.stringify(sbuRequest)
        
        
    });
}

// get deactive sbu list date:19062019
export function getDelSbuList(sbuRequest) {       

    return request({
        url: API_BASE_URL + "/sbu/inactive",
        method: 'GET',        
        
    });
}

export function getSamFunctions() {    

    return request({
        url: API_BASE_URL + "/fun/active",
        method: 'GET',
        
        
    });
}

export function createSamFun(funRequest) {   

   

    return request({
        url: API_BASE_URL + "/fun/create",
        method: 'POST',        
        body: JSON.stringify(funRequest)
    });
}

export function deactiveFun(key){
     

    return request({
        url: API_BASE_URL + "/fun/"+key,
        method: 'DELETE',
       
        
    });


}


export function updateSamFun(funRequest) {   

   

    return request({
        url: API_BASE_URL + "/fun/update",
        method: 'Put',        
        body: JSON.stringify(funRequest)
    });
}


export function getSamSubFunctions() {
     

    return request({
        url: API_BASE_URL + "/subfun/active",
        method: 'GET',
        
        
    });
}

export function createSamSubFun(subfunRequest) {   

   

    return request({
        url: API_BASE_URL + "/subfun/create",
        method: 'POST',        
        body: JSON.stringify(subfunRequest)
    });
}

export function deactiveSubFun(key){
     

    return request({
        url: API_BASE_URL + "/subfun/"+key,
        method: 'DELETE',
       
        
    });


}

export function updateSamSubFun(subfunRequest) {   

   

    return request({
        url: API_BASE_URL + "/subfun/update",
        method: 'Put',        
        body: JSON.stringify(subfunRequest)
    });
}

export function getSamApps() {
     

    return request({
        url: API_BASE_URL + "/sapp/active",
        method: 'GET',
        
        
    });
}

export function createSamApp(appRequest) {   

   

    return request({
        url: API_BASE_URL + "/sapp/create",
        method: 'POST',        
        body: JSON.stringify(appRequest)
    });
}

export function deactiveSamApp(key){
     

    return request({
        url: API_BASE_URL + "/sapp/"+key,
        method: 'DELETE',
       
        
    });


}

export function updateSamApp(appRequest) {   

   

    return request({
        url: API_BASE_URL + "/sapp/update",
        method: 'Put',        
        body: JSON.stringify(appRequest)
    });
}


export function getFunctiontypes() {     
    return request({
        url: API_BASE_URL + "/fundetails/funtypes",
        method: 'GET', 
    });
}


export function getAccesstypes() {
    return request({
        url: API_BASE_URL + "/fundetails/acctypes",
        method: 'GET',
        
        
    });
}




export function getSamRoles() {
     

    return request({
        url: API_BASE_URL + "/samrole/active",
        method: 'GET',
        
        
    });
}

export function createSamRole(roleRequest) {   

   

    return request({
        url: API_BASE_URL + "/samrole/create",
        method: 'POST',        
        body: JSON.stringify(roleRequest)
    });
}

export function updateSamRole(roleRequest) {   

   

    return request({
        url: API_BASE_URL + "/samrole/update",
        method: 'Put',        
        body: JSON.stringify(roleRequest)
    });
}


export function deactiveSamRole(key){    

    return request({
        url: API_BASE_URL + "/samrole/"+key,
        method: 'DELETE',
       
        
    });


}
// get deactive samroles date:19062019
export function getDelSamRoles() {
     

    return request({
        url: API_BASE_URL + "/samrole/inactive",
        method: 'GET',
        
        
    });
}

export function getMapSamRoles() {    

    return request({
        url: API_BASE_URL + "/rolemap/active",
        method: 'GET',
        
        
    });
}

export function getapprovedMapRoles() {    

    return request({
        url: API_BASE_URL + "/rolemap/approved",
        method: 'GET',
        
        
    });
}

export function createMapSamRole(roleRequest) {    

    return request({
        url: API_BASE_URL + "/rolemap/create",
        method: 'POST',        
        body: JSON.stringify(roleRequest)
    });
}

export function updateMapSamRole(roleRequest) {   

    return request({
        url: API_BASE_URL + "/rolemap/update",
        method: 'Put',        
        body: JSON.stringify(roleRequest)
    });
}

export function deactiveMapSamRole(key){
    return request({
        url: API_BASE_URL + "/rolemap/"+key,
        method: 'DELETE',
       
        
    });


}

export function ApproveMapSamRole(record){
    return request({
        url: API_BASE_URL + "/rolemap/changestatus",
        method: 'POST',  
        body: JSON.stringify(record)
    });
}




export function getMapSamFunctions() {    

    return request({
        url: API_BASE_URL + "/funmap/active",
        method: 'GET',
        
        
    });
}


export function createMapSamFun(funRequest) {   

    return request({
        url: API_BASE_URL + "/funmap/create",
        method: 'POST',        
        body: JSON.stringify(funRequest)
    });
}

export function updateMapSamFun(funRequest) { 
    return request({
        url: API_BASE_URL + "/funmap/update",
        method: 'Put',        
        body: JSON.stringify(funRequest)
    });
}

export function deactiveMapSamFun(key){
    return request({
        url: API_BASE_URL + "/funmap/"+key,
        method: 'DELETE',
       
        
    });


}

export function ApproveMapSamFun(record){
    return request({
        url: API_BASE_URL + "/funmap/changestatus",
        method: 'POST',  
        body: JSON.stringify(record)
    });
}


export function getSamData() {    

    return request({
        url: API_BASE_URL + "/samdata/active",
        method: 'GET',
        
        
    });
}


export function createSamData(samDataRequest) { 
    return request({
        url: API_BASE_URL + "/samdata/create",
        method: 'POST',        
        body: JSON.stringify(samDataRequest)
    });
}


export function insertSamData(samDataRequest) { 
    return request({
        url: API_BASE_URL + "/samdata/insert",
        method: 'POST',        
        body: JSON.stringify(samDataRequest)
    });
}



export function updateSamData(samDataRequest) { 
    return request({
        url: API_BASE_URL + "/samdata/update",
        method: 'Put',        
        body: JSON.stringify(samDataRequest)
    });
}


export function deactiveSamData(key){
    return request({
        url: API_BASE_URL + "/samdata/"+key,
        method: 'DELETE',
       
        
    });


}

export function approveSamDataRecord(key){
    return request({
        url: API_BASE_URL + "/samdata/approve/"+key,
        method: 'GET',  
       
    });
}

export function filterSamData(record){
    return request({
        url: API_BASE_URL + "/samdata/filter",
        method: 'POST',  
        body: JSON.stringify(record)
    });
}

//get roles by bu id date:21/08/2019

export function rolesByAppId(record){
    return request({
        url: API_BASE_URL + "/samdata/rolesbyappid",
        method: 'POST',  
        body: JSON.stringify(record)
    });
}

//
export function getAppsByCtryId(record) {  
    return request({
        url: API_BASE_URL + "/samdata/appsByCtryId",
        method: 'POST',        
        body: JSON.stringify(record)
    });
}


export function getAppsByBuId(record) {  
    return request({
        url: API_BASE_URL + "/samdata/appsByBuId",
        method: 'POST',        
        body: JSON.stringify(record)
    });
}


export function ApprovedSamdata(){
    return request({
        url: API_BASE_URL + "/samdata/approves",
        method: 'GET',  
       
    });
}

export function unApprovedSamdata(){
    return request({
        url: API_BASE_URL + "/samdata/unapproves",
        method: 'GET',  
       
    });
}
export function rejectSamDataRecord(key){
    return request({
        url: API_BASE_URL + "/samdata/reject/"+key,
        method: 'GET',  
        
    });
}

// approve multiple records

export function approveRecordsMulti(buRequest) {
      

    return request({
        url: API_BASE_URL + "/samdata/approvemulti",
        method: 'POST',        
        body: JSON.stringify(buRequest)
    });
}


// reject multiple records

export function rejectRecordsMulti(buRequest) {
      

    return request({
        url: API_BASE_URL + "/samdata/rejectmulti",
        method: 'POST',        
        body: JSON.stringify(buRequest)
    });
}


// apis for SAM BU Screen

export function filterForReports(record){
    return request({
        url: API_BASE_URL + "/reports/filter",
        method: 'POST',  
        body: JSON.stringify(record)
    });
}

export function getRolesByBu(record){
    return request({
        url: API_BASE_URL + "/reports/rolesbybu",
        method: 'POST',  
        body: JSON.stringify(record)
    });
}

export function filterForRoles(record){
    return request({
        url: API_BASE_URL + "/reports/filterbyRoles",
        method: 'POST',  
        body: JSON.stringify(record)
    });
}

export function filterForBu(record){
    return request({
        url: API_BASE_URL + "/reports/filterbybu",
        method: 'POST',  
        body: JSON.stringify(record)
    });
}

export function filterForSbu(record){
    return request({
        url: API_BASE_URL + "/reports/filterbysbu",
        method: 'POST',  
        body: JSON.stringify(record)
    });
}


export function getUsers(){
    return request({
        url: API_BASE_URL + "/reports/users",
        method: 'GET',  
       
    });
}


export function filterSAMHistory(record){
    return request({
        url: API_BASE_URL + "/reports/filterhistory",
        method: 'POST',  
        body: JSON.stringify(record)
       
    });
}


export function filterForMenu(record){
    return request({
        url: API_BASE_URL + "/reports/search",
        method: 'POST',  
        body: JSON.stringify(record)
    });
}



export function getFunMapData() {    

    return request({
        url: API_BASE_URL + "/funmap/activedata",
        method: 'GET',
        
        
    });
}



//Country web API"S

export function getCountries() {     

    return request({
        url: API_BASE_URL + "/cun/active",
        method: 'GET',
        
        
    });
}

export function createCountry(cunRequest) {  

    return request({
        url: API_BASE_URL + "/cun/create",
        method: 'POST',        
        body: JSON.stringify(cunRequest)
    });
}

export function deactiveCun(key){    

    return request({
        url: API_BASE_URL + "/cun/"+key,
        method: 'DELETE',
       
        
    });


}


export function updateCountry(cunRequest) {  

    return request({
        url: API_BASE_URL + "/cun/update",
        method: 'Put',        
        body: JSON.stringify(cunRequest)
    });


}

//get deactive countries date:18-06-2019

export function getDelCountries() {     

    return request({
        url: API_BASE_URL + "/cun/inactive",
        method: 'GET',
        
        
    });
}


export function getAllCountsForDashboard() {     

    return request({
        url: API_BASE_URL + "/dash/allcount",
        method: 'GET',
        
        
    });
}

export function getrolesJson() {     

    return request({
        url: API_BASE_URL + "/dash/getrolesjson",
        method: 'GET',
        
        
    });
}

// RoleTitle web API calls


export function getRoleTitles() {     

    return request({
        url: API_BASE_URL + "/rtile/active",
        method: 'GET',
        
        
    });
}

export function createRoletitle(rtitleRequest) {  

    return request({
        url: API_BASE_URL + "/rtile/create",
        method: 'POST',        
        body: JSON.stringify(rtitleRequest)
    });
}

export function deactiveRoleTitle(key){    

    return request({
        url: API_BASE_URL + "/rtile/"+key,
        method: 'DELETE',
       
        
    });


}
export function updateRoleTitle(rtitleRequest) {  

    return request({
        url: API_BASE_URL + "/rtile/update",
        method: 'Put',        
        body: JSON.stringify(rtitleRequest)
    });


}

// get deactive roletitles date:18062019
export function getDelRoleTitles() {     

    return request({
        url: API_BASE_URL + "/rtile/inactive",
        method: 'GET',
        
        
    });
}

export function getData() {
    return request({
        url: API_BASE_URL + "/auth/data",
        method: 'GET'
        
    });
}


export function getData3() {
    return request({
        url: API_BASE_URL + "/auth/data2",
        method: 'GET'
        
    });
}

export function getLoginUser() {
    return request({
        url: API_BASE_URL + "/auth/logeduser",
        method: 'GET'
        
    });
}
// ajax calls for fundetails 

export function createFunDetails(record) {  

    return request({
        url: API_BASE_URL + "/fundetails/create",
        method: 'POST',        
        body: JSON.stringify(record)
    });
}


export function getActiveFunctions() {       

    return request({
        url: API_BASE_URL + "/fundetails/active",
        method: 'GET',        
        
    });
}


export function getParentFunctions(record) {       

    return request({
        url: API_BASE_URL + "/fundetails/pfunctions",
        method: 'POST',        
        body: JSON.stringify(record)        
        
    });
}

export function getAppsSet() {       

    return request({
        url: API_BASE_URL + "/fundetails/appsset",
        method: 'GET',        
        
    });
}


export function deactiveFundetails(key){
    

    return request({
        url: API_BASE_URL + "/fundetails/"+key,
        method: 'DELETE',
       
        
    });


}

export function getRecordExistStatus(record){
    

    return request({
        url: API_BASE_URL + "/fundetails/existstatus",
        method: 'POST',        
        body: JSON.stringify(record) 
       
        
    });


}


export function getMenues(key){
    

    return request({
        url: API_BASE_URL + "/fundetails/"+key,
        method: 'GET',
       
        
    });


}

// get De active function detailsList date:19062019
export function getDeActiveFunctions() {       

    return request({
        url: API_BASE_URL + "/fundetails/inactive",
        method: 'GET',        
        
    });
}


//get function details by appid


export function getFunDetailsBy(record) {  

    return request({
        url: API_BASE_URL + "/fundetails/byappid",
        method: 'POST',        
        body: JSON.stringify(record)
    });
}



//app info apis


export function createAppDetails(record) {  

    return request({
        url: API_BASE_URL + "/appdetails/create",
        method: 'POST',        
        body: JSON.stringify(record)
    });
}


export function getActiveAppsDetails() {       

    return request({
        url: API_BASE_URL + "/appdetails/active",
        method: 'GET',        
        
    });
}

export function deactiveAppdetails(key){
    

    return request({
        url: API_BASE_URL + "/appdetails/"+key,
        method: 'DELETE',
       
        
    });


}


export function updateAppInfo(appRequest) {
      

    return request({
        url: API_BASE_URL + "/appdetails/update",
        method: 'PUT',        
        body: JSON.stringify(appRequest)
    });
}


// get deactive appdetails date:19062019
export function getDelActiveAppsDetails() {       

    return request({
        url: API_BASE_URL + "/appdetails/inactive",
        method: 'GET',        
        
    });
}


// API's for User screen

export function getUserList() {
     

    return request({
        url: API_BASE_URL + "/user/active",
        method: 'GET',
       
        
    });
}
export function getInactiveUserList() {
     

    return request({
        url: API_BASE_URL + "/user/inactive",
        method: 'GET',
       
        
    });
}

export function deactiveUser(key){
    

    return request({
        url: API_BASE_URL + "/user/"+key,
        method: 'DELETE'       
        
    });


}


export function createUser(buRequest) {
      

    return request({
        url: API_BASE_URL + "/user/create",
        method: 'POST',        
        body: JSON.stringify(buRequest)
    });
}

export function updateuser(buRequest) {
      

    return request({
        url: API_BASE_URL + "/user/update",
        method: 'PUT',        
        body: JSON.stringify(buRequest)
    });
}

// multi reports

export function getSbusByMultiCountries(record) {  
    return request({
        url: API_BASE_URL + "/dash/bymultictrs",
        method: 'POST',        
        body: JSON.stringify(record)
    });
}

export function getbusMultisbu(record) {  
    return request({
        url: API_BASE_URL + "/dash/bymultisbu",
        method: 'POST',        
        body: JSON.stringify(record)
    });
}

export function getAppsMultibu(record) {  
    return request({
        url: API_BASE_URL + "/dash/bymultibu",
        method: 'POST',        
        body: JSON.stringify(record)
    });
}

export function getRolesMultiApps(record) {  
    return request({
        url: API_BASE_URL + "/dash/bymultiapps",
        method: 'POST',        
        body: JSON.stringify(record)
    });
}

export function filterMultiSamData(record){
    return request({
        url: API_BASE_URL + "/dash/bymultigo",
        method: 'POST',  
        body: JSON.stringify(record)
    });
}



export function getActiveRolesInBu(roleRequest) {     

    return request({
        url: API_BASE_URL + "/samrole/activeinbu",
        method: 'POST',  
        body: JSON.stringify(roleRequest)
        
        
    });
}


// apis of application master

export function getAppNames() {     

    return request({
        url: API_BASE_URL + "/appname/active",
        method: 'GET',
        
        
    });
}

export function createAppname(cunRequest) {  

    return request({
        url: API_BASE_URL + "/appname/create",
        method: 'POST',        
        body: JSON.stringify(cunRequest)
    });
}

export function deactiveAppName(key){    

    return request({
        url: API_BASE_URL + "/appname/"+key,
        method: 'DELETE',
       
        
    });


}


export function updateApplicationName(cunRequest) {  

    return request({
        url: API_BASE_URL + "/appname/update",
        method: 'Put',        
        body: JSON.stringify(cunRequest)
    });


}

export function getDeActiveAppNames() {     

    return request({
        url: API_BASE_URL + "/appname/inactive",
        method: 'GET',
        
        
    });
}
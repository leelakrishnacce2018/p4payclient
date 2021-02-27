import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import Dashboard from '../../views/Dashboard/';



// UI Kits
import Login from '../../views/Pages/Login'
import SamRole from './../../components/SAM Functions/SamRole';
import SamBU from './../../components/SAM Functions/SamBu';
import SamSbu from './../../components/SAM Functions/SamSbu';
import Country from '../../components/SAM Functions/Country';

import SamApps from '../../components/SAM Functions/SamApps';
import RoleTitle from '../../components/SAM Functions/RoleTitle';
import SamData2 from '../../components/SAM Functions/SamData2';
import ApproveSamdata from '../../components/SAM Functions/ApproveSamdata';
import ReportsApproveRecords from '../../components/SAM Functions/ReportsApproveRecords';
import ReportsByApp from '../../components/SAM Functions/ReportsByApp';
import SAMByRole from '../../components/SAM Functions/SAMByRole';
import SamByBu from '../../components/SAM Functions/SamByBu';
import SamBySbu from '../../components/SAM Functions/SamBySbu';
import HistoryFilter from '../../components/SAM Functions/HistoryFilter';
import TestApp from '../../components/SAM Functions/TestApp';
import AppInfo from '../../components/SAM Functions/AppInfo';
import User from '../../components/SAM Functions/User';
import MultiSelectReport from '../../components/SAM Functions/MultiSelectReport';
import ApplicationName from '../../components/SAM Functions/ApplicationName';
import RowExpand from '../../components/SAM Functions/RowExpand';
import Transactions from '../../components/SAM Functions/Transactions';



class Full extends Component {
  

  

  
  render() {

    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={Dashboard}  />
                <Route path="/login" name="login" component={Login}/>            
                
               
                <Route path="/masters/country" name="Country" component={RowExpand}  />
                <Route path="/masters/roletitle" name="RoleTitle" component={RoleTitle}/>
                
                <Route path="/masters/samroles" name="Sam Roles" component={SamRole}/>
                <Route path="/masters/sambu" name="Sam Bu" component={SamBU}/>
                <Route path="/masters/samsbu" name="Sam Sbu" component={SamSbu}/>
                <Route path="/masters/samapp" name="Sam application" component={SamApps}/>
                <Route path="/masters/application" name="Sam application" component={ApplicationName}/>
 

                
                
                <Route path="/samdata" name="samdata" component={SamData2}/> 
                <Route path="/approvesamdata" name="approvesamdata" component={ApproveSamdata}/> 
                <Route path="/reports/AppsRoles" name="AppsVsRoles" component={ReportsByApp}/> 
                <Route path="/reports/transactions" name="Approves" component={Transactions}/> 
                <Route path="/reports/sambyrole" name="sambyrole" component={SAMByRole}/> 
                <Route path="/reports/sambybu" name="sambybu" component={SamByBu}/> 
                <Route path="/reports/sambysbu" name="sambysbu" component={SamBySbu}/> 
                <Route path="/reports/history" name="SAMHistory" component={HistoryFilter}/> 
                <Route path="/masters/test" name="App Details" component={TestApp}/> 
              {//  <Route path="/masters/appdetails" name="APP Info" component={AppInfo}/> 
               } <Route path="/masters/user" name="User" component={User}/> 
                <Route path="/reports/search" name="search" component={MultiSelectReport}/> 
                {//<Route path="/reports/multiselect" name="search" component={MultiSelectReport}/> 
                }
               
               

                {/* <Redirect from="/" to="/dashboard"/> */}
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;

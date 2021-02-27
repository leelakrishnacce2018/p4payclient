import React, {Component} from 'react';
import {Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup} from 'reactstrap';
import { getLoginUser } from '../../../util/APIUtils';
import { ACCESS_TOKEN, API_BASE_URL,onlyChrRegex, crole } from '../../../constants';
import { withRouter } from 'react-router';
import { ForOnlyuseName } from '../../../util/customValidations';
import logo from './logo.png';


import nav from '../../../components/Sidebar/_nav'

class Login extends Component {

  constructor(props){
    super(props);   
    this.state = {
      usernameOrEmail: '',
      password: '',
      pasteAction:false,
      pasteActionPass:false,
     
  }

  this.onChangeusernameOrEmail = this.onChangeusernameOrEmail.bind(this);
  this.onChangepassword = this.onChangepassword.bind(this);
  this.onSubmit = this.onSubmit.bind(this);
  this.onPaste = this.onPaste.bind(this);

  this.onPastePass = this.onPastePass.bind(this);
    
}


componentWillUnmount() {
  document.removeEventListener('contextmenu', this._handleContextMenu);
 
}
_handleContextMenu (event)  {
  event.preventDefault();

}
setNavItems(crole){
  if(crole =='maker'){

return nav.items.filter(val => {
    return val.role == crole
  });}
  else if(crole ==  'checker'){
    return nav.items.filter(val => {
      return val.role == crole
    });

  } else {
   
      return nav.items2;

  }

  
}

onPaste(e) {
  // console.log(e.value);
   this.setState({
    pasteAction: true
   });
 }

 onPastePass(e){
  this.setState({
    pasteActionPass: true
   });

 }



onChangeusernameOrEmail(e) {
 

  if(this.state.pasteAction){
    this.setState({
      usernameOrEmail: e.target.value.replace(onlyChrRegex, ""),
      pasteAction:false
    });

   } else{
    this.setState({
      usernameOrEmail: e.target.value
    });
  }


}

onChangepassword(e) {

  if(this.state.pasteActionPass){
    this.setState({
      password: "",
      pasteActionPass:false
    }) 
  } else{
    this.setState({
      password: e.target.value
    }) 

  }

  
}



formValidate(obj){
     
  if(!obj.usernameOrEmail){
    alert("Enter username")
    return false;
  }
  else
  if(!obj.password){
    alert("Enter Password")
    return false;
  }else{
    return true
  }

}


onSubmit(e)  {
    event.preventDefault(); 
   
    //console.log(`The values are ${this.state.usernameOrEmail}, ${this.state.password}`)
    const obj = {
      usernameOrEmail: this.state.usernameOrEmail,
      password: this.state.password      
    };     
   // console.log(obj);

   let status =this.formValidate(obj);
   if(!status){
    
    return false;
   }

   fetch( API_BASE_URL + "/auth/signin",{
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {    
      'Content-Type': 'application/json'
    }
   })
      .then(res => res.json())
      .then(
        (response) => {

         // console.log(response)
          if(response.success){
            //alert(response.status)
          localStorage.setItem(ACCESS_TOKEN, response.accessToken);  
          localStorage.setItem("LOGINID", obj.usernameOrEmail);  
          localStorage.setItem("username", this.state.usernameOrEmail);
        localStorage.setItem("cusrole", response.role);
        localStorage.setItem("loggedNav",JSON.stringify(this.setNavItems(response.role)));
        
        
       this.props.handler();
      this.props.history.push("/dashboard")
        
          }else{
            //alert(response.status)
            this.setState({
              usernameOrEmail: '',
              password: '',       
          })
      
            alert(response.message);
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
         
            alert(error);
        }
      )   

  }
  setLoginUserDetails(){
    getLoginUser()
    .then(response => {
       // console.log(response);
        localStorage.setItem("username", response.user);
        localStorage.setItem("cusrole", response.croles);
        localStorage.setItem("loggedNav",JSON.stringify(this.setNavItems(response.croles)));
       this.props.handler();
      this.props.history.push("/dashboard")
    });
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
            <form>
              <CardGroup className="mb-4">
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In To Your Account</p>                   
                    <InputGroup className="mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="icon-user"></i>
                        </span>
                      </div> 
                      
                      {//<Input type="text" placeholder="Username" maxLength ="6" minLength ="6" value={this.state.usernameOrEmail} onPaste ={this.onPaste}  onChange={this.onChangeusernameOrEmail} onKeyPress={(e) => ForOnlyuseName(e)} />
                      }
                      <Input type="text" placeholder="Username"  value={this.state.usernameOrEmail} onPaste ={this.onPaste}  onChange={this.onChangeusernameOrEmail}/>
                  
                      </InputGroup>
                    <InputGroup className="mb-4">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="icon-lock"></i>
                        </span>
                      </div>
                      <Input type="password" placeholder="Password" maxLength ="15" minLength ="6" value={this.state.password} onPaste ={this.onPastePass} onChange={this.onChangepassword} />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button type="button"   onClick={this.onSubmit}  color="primary" className="px-4">Login</Button>
                      </Col>
                   
                    </Row>                   
                  </CardBody>
                </Card>

                
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                  <img src={'img/favicon1.png'} width="200" height="200"  />

                  </CardBody>
                </Card>
              </CardGroup>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(Login);

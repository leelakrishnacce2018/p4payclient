import React, {Component} from 'react';
import { Col, Card, CardHeader, CardBody,CardFooter, Button,Form,FormGroup,Input,Label,FormText} from 'reactstrap';

class Search extends Component {
  render() {
    return (
      <div className="animated fadeIn"> 
       <Card>
              <CardHeader>
                <strong>Search</strong> 
              </CardHeader>
              <CardBody>
                <Form action="" method="post" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="hf-email">Search Key one</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="email" id="hf-email" name="hf-email" placeholder="search keyword one"/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="hf-password">Search Key two</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="password" id="hf-password" name="hf-password" placeholder="search keyword two"/>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
            </div>
                )
  }
}

export default Search;

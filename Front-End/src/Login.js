import React from 'react';
import { Form, FormControl, Button, Container }from 'react-bootstrap'


class Login extends React.Component {

  render(){
    return(
      <Container>
        <div id="login-form">
          <h3>Login:</h3>
          <Form className="mb-3" size="lg">
            <Form.Group>
              <FormControl id="login-username-input" sz="lg" placeholder="Enter Username"/>
              <FormControl type="password" id="login-password-input" placeholder="Enter Password"/>
              <Button onClick={(e) => this.props.login(e)}type="button">Submit</Button>
            </Form.Group>
          </Form>
        </div>
        <div id="signup-form">
          <h3>Or create an account:</h3>
          <Form className="mb-3" size="lg">
            <Form.Group>
              <FormControl id="create-username-input" sz="lg" placeholder="Enter Username"/>
              <FormControl type="password" id="create-password-input" placeholder="Enter Password"/>
              <Button onClick={(e) => this.props.createUser(e)} type="button">Submit</Button>
            </Form.Group>
          </Form>
          </div>
      </Container>
    )
  }


}

export default Login;

import React from 'react';
import { Form, FormControl, Button }from 'react-bootstrap'


class Login extends React.Component {

  render(){
    return(
      <div>
        <h3>Login:</h3>
        <Form className="mb-3" size="lg">
          <Form.Group>
            <FormControl sz="lg" placeholder="Enter Username"/>
            <FormControl placeholder="Enter Password"/>
            <Button type="button">Submit</Button>
          </Form.Group>
        </Form>
        <h3>Or create an account:</h3>
        <Form className="mb-3" size="lg">
          <Form.Group>
            <FormControl sz="lg" placeholder="Enter Username"/>
            <FormControl placeholder="Enter Password"/>
            <Button onClick={(e) => this.props.createUser(e)}type="button">Submit</Button>
          </Form.Group>
        </Form>
      </div>
    )
  }


}

export default Login;

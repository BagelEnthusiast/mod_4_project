import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap'


class EnterGameNumber extends React.Component {

  render(){
    return(
      <div>
        <h3>Hello {this.props.user}! Create or enter a Game using a Game Number</h3>
        <Form className="mb-3" size="lg">
          <Form.Group>
            <FormControl sz="lg" placeholder="Enter Game Number"/>
            <Button onClick={(e) => this.props.createOrJoinGame(e)}type="button">Submit</Button>
          </Form.Group>
        </Form>
      </div>
    )
  }
}

export default EnterGameNumber;

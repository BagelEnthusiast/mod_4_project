import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap'


class Dashboard extends React.Component {

  render(){
    return(
      <div>
        <h3>Hello {this.props.user ? this.props.user : null}! Create or enter a Game using a Game Number</h3>
        <Form className="mb-3" size="lg">
          <Form.Group>
            <FormControl sz="lg" placeholder="Enter Game Number"/>
            <Button type="button">Submit</Button>
          </Form.Group>
        </Form>
      </div>
    )
  }


}

export default Dashboard;

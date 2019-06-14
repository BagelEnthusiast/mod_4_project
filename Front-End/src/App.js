import React from 'react';
import DrawingBoard from './DrawingBoard';
import Login from './Login';
import Header from './Header';



class App extends React.Component {
  constructor(){
    super()
    this.state = {
      loggedIn: true,
      user: null,
      userList: []
    }
  }

  login = (user) => {
    let newUserList = this.state.userList.push(user)
    this.setState({
      loggedIn: true,
      user: user,
      userList: newUserList
    })
  }

  render() {
    return (
      <div>
        <Header />
        {
          this.state.loggedIn ? <DrawingBoard /> : <Login login={this.login}/>
        }
      </div>
    );
  }
}

export default App;

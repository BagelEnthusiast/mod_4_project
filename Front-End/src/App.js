import React from 'react';
import DrawingBoard from './DrawingBoard';
import Login from './Login';
import Header from './Header';

// import socketIO from 'socket.io-client'

const io = socketIO('http://10.185.0.210:8080')
window.io = io

io.on('message', payload => {
  console.log(payload)
})

// var socket = io.connect('http://localhost:3003')

//vidhi lecture code
// import socketIO from 'socket.io-client'
//const io =  socketIO('http://10.185.1.7:3003')

//vidhi ip
// const io = socketIO('http://10.185.0.210:8080')
// window.io = io

//io.emit('random', "table tennis*")  test in console




class App extends React.Component {
  constructor(){
    super()
    this.state = {
      loggedIn: false,
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

  createUser = (e) => {
    let username = e.target.parentElement.children[0].value
    let password = e.target.parentElement.children[1].value
    let newUser = {username: username, password: password}

  }

  render() {
    return (
      <div>
        <Header />
        {
          this.state.loggedIn ? <DrawingBoard /> : <Login login={this.login} createUser={this.createUser}/>
        }
      </div>
    );
  }
}

export default App;

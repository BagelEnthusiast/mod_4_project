import React from 'react';
import Dashboard from './Dashboard';
import Login from './Login';
import Header from './Header';

// import socketIO from 'socket.io-client'

// const io = socketIO('http://10.185.0.210:8080')
// window.io = io
//
// io.on('message', payload => {
//   console.log(payload)
// })

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
      user: null,
      userList: []
    }
  }

  login = (e) => {
    let username = e.target.parentElement.children[0].value
    let password = e.target.parentElement.children[1].value
    fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username, password: password
      })
    })
    .then(res => res.json())
    .then(obj => {
      if(obj.error) {
        alert(obj.error)
      } else {
      let newUserlist = this.state.userList
      newUserlist.push(obj.user)
      this.setState({
        user: obj.user,
        userList: newUserlist
      })
    }})
    .catch(err => {
      err.json()
    })
  }

  createUser = (e) => {
    let userField = document.getElementById("create-username-input")
    let passField = document.getElementById("create-password-input")
    let username = e.target.parentElement.children[0].value
    let password = e.target.parentElement.children[1].value
    fetch('http://localhost:8000/register',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username, password: password
      })
    })
    .then(res => res.json())
    .then(user => {
      if(user.error){
        alert(user.error);
      } else
      {alert('Account created. Please log in to continue.')
      userField.value = "";
      passField.value = ""}
    })
  }

  render() {
    return (
      <div>
        <Header />
        {
          this.state.user ? <Dashboard user={this.state.user} userlist={this.state.userList}/> : <Login login={this.login} createUser={this.createUser}/>
        }
      </div>
    );
  }
}

export default App;

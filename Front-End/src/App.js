import React, { Component } from "react";
import Dashboard from './Dashboard';
import Login from './Login';
import Header from './Header';
import socketIOClient from 'socket.io-client'
const socket = socketIOClient('http://10.185.3.183:8080')



class App extends Component {

  constructor() {
    console.log("constructor")
    super()
    this.state = {
      displayText: "",
      feedbackText: "",
      user: null,
      userList: []
    }
  }

  // emit events
  onButtonPress = (handle, text) => {
    // debugger
    socket.emit("chat", {
      message: text,
      handle: handle
    })
  }

  onTyping = (handle) => {
    socket.emit('typing', handle)
  }

  login = (e) => {
    let username = e.target.parentElement.children[0].value
    let password = e.target.parentElement.children[1].value
    fetch('http://localhost:3003/login', {
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
      localStorage.userToken = obj.token
      this.setState({
        user: obj.user,
        userList: newUserlist
      })
    }})

  }



  componentDidMount() {
  console.log("component did mount")

  //listen for events
  socket.on("chat", data => {
    this.setState({
      displayText: `${data.handle}: ${data.message}`,
      feedbackText: ""
    })
  })

  socket.on('typing', data => {
    this.setState({
      feedbackText: `${data} is typing a message`

      })
  })
}


  createUser = (e) => {
    let userField = document.getElementById("create-username-input")
    let passField = document.getElementById("create-password-input")
    let username = e.target.parentElement.children[0].value
    let password = e.target.parentElement.children[1].value
    fetch('http://localhost:3003/register',{
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
  )

  }
}

export default App;



// }

//   render(){
//     console.log("render")
//   return (
//   <div>
//     <input type="text" onChange={(e) => this.showText(e.target.value)}></input>

//     <div id="chat">
//       <div id="chat-window">
//         <div id="output">{this.state.displayText}
//         </div>
//         <div id="feedback">{this.state.feedbackText}</div>
//         <input id="handle" type="text" placeholder="Handle"/>
//         <input onKeyPress={(event) => this.onTyping(event.target.parentElement.children[2].value)} id="message" type="text" placeholder="Message"/>
//         <button id="send" onClick={(event) => this.onButtonPress(event.target.parentElement.children[2].value, event.target.parentElement.children[3].value)}>Send</button>

//       </div>
//     </div>

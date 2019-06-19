import React, { Component } from "react";
//import Dashboard from './Dashboard';
import Login from './Login';
import Header from './Header';


import DrawingBoard from "./DrawingBoard";
import socketIOClient from 'socket.io-client'

// const socket = socketIOClient('http://10.185.4.34:8080')
window.socket = socketIOClient('http://10.185.4.34:8080')


const wordsArray = ["dog", "cat", "cow", "duck", "camel", "house", "whale", "fork", "truck", "hand", "nose", "pizza", "cup", "hamburger", "computer", "building", "boat", "airplane", "car", "monkey", "cloud", "pen", "paper", "book", "television", "shoe"]


class App extends Component {

  constructor() {
    console.log("constructor")
    super()
    this.state = {
     
      user: "",
      userList: [],
      currentPainter: "",
      currentWord: "",
      username: ""
    }
  }

  // toggleCurrentPainter = () => {
    
  //   let newPainter = !this.state.currentPainter
  //   this.setState({
  //     currentPainter: newPainter
  //   })
    
  // }

  refreshUserList = (list) => {
    this.setState({
      userList: list
    })
  }

  toggleCurrentPainter = () => {
    this.setState({
      currentPainter: this.state.userList[0].socket
    })
  }

  setCurrentWord = () => {
    this.setState({
      currentWord: wordsArray[Math.floor(Math.random()*wordsArray.length)]
    }, () => window.socket.emit("currentWord", this.state.currentWord))
    window.socket.emit('clear')
  }

  

  onGuess = (word) => {
    if (this.state.currentWord === word) {
      this.setCurrentWord()
      this.toggleCurrentPainter()
      window.socket.emit("playerChange", this.state.user)
      
    }
  }

//  addUserToUserList = (user,callback) => {
//    if (this.state.userList.includes(user)) {
    
//      return
//    }
//   this.setState({
//     userList: this.state.userList.concat(user)
//   }, callback)
 
//  }

addUserToUserList = (user) => {
  if (this.state.userList.includes(user)) {
   
    return
  }
 this.setState({
   userList: this.state.userList.concat(user)
 })

}

 updateUserList = (list) => {
   
   this.setState({
     userList: list
   })
 }

 setCurrentUser = (socketId) => {
  this.setState({
    user: socketId
  })
 }

  login = (e) => {
    console.log(window.socket.id)
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
      // let newUserlist = this.state.userList
      // newUserlist.push(obj.user)
      //localStorage.userToken = obj.token
      this.setState({
        user: window.socket.id,
        username: obj.user
        // userList: newUserlist
      })
    }})
    .catch(err => {
      
      err.json()
     })

  }
  componentDidMount() {
  console.log("component did mount")
  window.socket.on("currentWord", word => {
    this.setState({
      currentWord: word
    })
  })
  window.socket.on("playerChange", (user) => {
    this.setState({
      currentPainter: user
    })
    window.socket.emit('clear')
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
          this.state.user ? <DrawingBoard username={this.state.username} setCurrentUser={this.setCurrentUser} refreshUserList={this.refreshUserList} onGuess={this.onGuess} setCurrentWord={this.setCurrentWord} currentWord={this.state.currentWord} currentPainter={this.state.currentPainter} toggleCurrentPainter={this.toggleCurrentPainter} updateUserList={this.updateUserList} addUserToUserList={this.addUserToUserList} user={this.state.user} userList={this.state.userList}/> : <Login login={this.login} createUser={this.createUser}/>
          //this.state.user ? <Dashboard user={this.state.user} userlist={this.state.userList}/> : <Login login={this.login} createUser={this.createUser}/>
        }
      </div>

    );


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

//     </div>

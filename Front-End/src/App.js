
import React, { Component } from "react";
import './App.css';
import socketIOClient from 'socket.io-client'
const socket = socketIOClient('http://10.185.2.208:8080')
//window.io = io

// io.on('message', payload => {
//   console.log(payload)
// })


class App extends Component {

  constructor() {
    console.log("constructor")
    super()
    this.state = {
      displayText: "",
      feedbackText: ""
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

  render(){
    console.log("render")
  return (
  <div>
    <input type="text" onChange={(e) => this.showText(e.target.value)}></input>
    
    <div id="chat">
      <div id="chat-window">
        <div id="output">{this.state.displayText}
        </div>
        <div id="feedback">{this.state.feedbackText}</div>
        <input id="handle" type="text" placeholder="Handle"/>
        <input onKeyPress={(event) => this.onTyping(event.target.parentElement.children[2].value)} id="message" type="text" placeholder="Message"/>
        <button id="send" onClick={(event) => this.onButtonPress(event.target.parentElement.children[2].value, event.target.parentElement.children[3].value)}>Send</button>
      </div>
    </div>
  </div>
  );

  }
}

export default App;

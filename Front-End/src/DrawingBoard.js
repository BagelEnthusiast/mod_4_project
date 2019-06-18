import React from "react";
import socketIOClient from 'socket.io-client'

const socket = socketIOClient('http://10.185.7.204:8080')

class DrawingBoard extends React.Component {
  constructor(){
    super()
    this.state = {
      // displayText: "",
      // feedbackText: "",
      id: null,
      drawing: false,
      cleared: false,
      // username: null,
      // userList: [],
      drawingboard: null,
      canvasX: null,
      canvasY: null
    }

  }

  mouseDown = () => {
    this.setState({
      drawing: true
    })
  }

  mouseUp = () => {
    this.setState({
      drawing: false,
      canvasX: null,
      canvasY: null
    })
    socket.emit('mouseUp')
  }

  mouseMove = (e) => {
    if (!this.props.currentPainter){
      return
    }

    let drawingboard = document.getElementById('drawingboard')
    let pos = this.getPosition(drawingboard, e);
    let posX = pos.x;
    let posY = pos.y;
    this.draw(this.drawingboard, posX, posY)
    this.setState({
      drawingboard: drawingboard
    })
    if(this.state.drawing) {socket.emit('drawing', posX, posY)}
    //console.log(this.state.drawingboard)
  }

  getPosition = (canvas, event) => {
    let drawingboard = document.getElementById('drawingboard')
    let rect = drawingboard.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }

  }

  draw = (canvas, x, y) => {
    let drawingboard = document.getElementById('drawingboard')
    let context = drawingboard.getContext("2d")
    if(this.state.drawing) {
      context.beginPath()
      context.lineWidth = 4;
      if(this.state.canvasX !== null) {
        context.moveTo(this.state.canvasX, this.state.canvasY)
      } else {
        context.moveTo(x,y)
      }
      this.setState({
        canvasX: x,
        canvasY: y
      })
      context.lineTo(x, y)
      context.stroke()

      socket.emit('drawing', x, y)

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

// onDrawing = (drawing) => {
//   console.log(drawing)
//   socket.emit('drawing', drawing)
// }

  componentDidMount() {
    console.log("component did mount")


  //   this.props.addUserToUserList(this.props.user, 
  //     () => { if (this.props.userList[0] === this.props.user) {
  //     this.props.toggleCurrentPainter()
  //   }
  //   console.log(this.props.user)
  //   console.log(this.props.userList)
  // })
  this.props.addUserToUserList(this.props.user)

   console.log(this.props.userList)
    socket.emit('join', this.props.user)
    
    //listen for events
    socket.on("join", user => {
      this.props.addUserToUserList(user)
      console.log(this.props)
      console.log(this.props.userList)
      socket.emit("requestList", this.props.userList)
    })

    socket.on('receiveUserList', userList => {
      if ((this.props.userList[0] === this.props.user) && !this.props.currentPainter) {
        this.props.toggleCurrentPainter()
        this.props.setCurrentWord()
        
      }
      this.props.updateUserList(userList)
    })

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

    socket.on('clear', () => {
      let drawingboard = document.getElementById('drawingboard')
      let context = drawingboard.getContext("2d")
      context.clearRect(0, 0, drawingboard.width, drawingboard.height)
    })

    socket.on('drawing', (x, y) => {
      let drawingboard = document.getElementById('drawingboard')
      let context = drawingboard.getContext("2d")
      context.beginPath()
      context.lineWidth = 4;
      if(this.state.canvasX !== null) {
        context.moveTo(this.state.canvasX, this.state.canvasY)
      } else {
        context.moveTo(x,y)
      }
      this.setState({
        canvasX: x,
        canvasY: y
      })
      context.lineTo(x, y)
      context.stroke()
      
    })

    socket.on('mouseUp', () => {
      this.setState({
        canvasX: null,
        canvasY: null
      })
    })


    //become current painter if first user
    
   
  }

  clearCanvas = () => {
    let drawingboard = document.getElementById('drawingboard')
    let context = drawingboard.getContext("2d")
    context.clearRect(0, 0, drawingboard.width, drawingboard.height)
    socket.emit('clear')
  }

  render() {
    return (
      <div type="container">
        <canvas id={"drawingboard"}
                onMouseDown={this.mouseDown}
                onMouseUp={this.mouseUp}
                onMouseMove={(e) => this.mouseMove(e)}
                width="700"
                height="500"
                style={{"border": "3px solid black", "margin": "0 auto"}}
                ref={this.drawingboard}
                />

        {this.props.currentPainter ?
        <div>
        <button onClick={this.clearCanvas}>Clear</button>
        <h1>{this.props.currentWord}</h1>
        <button onClick={this.props.setCurrentWord}>Skip</button>
        </div>
        : 
        <input onChange={(event) => this.props.onGuess(event.target.value)} type="text"/>
        }

      </div>


    )
  }


}
export default DrawingBoard;

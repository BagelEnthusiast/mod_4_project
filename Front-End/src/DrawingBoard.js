import React from "react";
import socketIOClient from 'socket.io-client'

const socket = socketIOClient('http://10.185.6.241:8080')

class DrawingBoard extends React.Component {
  constructor(){
    super()
    this.state = {
      displayText: "",
      feedbackText: "",
      id: null,
      drawing: false,
      cleared: false,
      username: null,
      userList: [],
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
      drawing: false
    })
  }

  mouseMove = (e) => {
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
      context.fillRect(x, y, 5, 5)

      socket.emit('drawing', context.canvas.height, context.canvas.width)

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
      context.fillRect(x, y, 5, 5)
    })
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
        <button onClick={this.clearCanvas}>Clear</button>
      </div>


    )
  }


}
export default DrawingBoard;

import React from "react";


class DrawingBoard extends React.Component {
  constructor(){
    super()
    this.state = {
      id: null,
      drawing: false,
      cleared: false,
      username: null,
      userList: []
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
    }
  }

  render() {
    return (
      <canvas id={"drawingboard"}
              onMouseDown={this.mouseDown}
              onMouseUp={this.mouseUp}
              onMouseMove={(e) => this.mouseMove(e)}
              width="1000"
              height="700"
              ref={this.drawingboard}
              />

    )
  }


}
export default DrawingBoard;

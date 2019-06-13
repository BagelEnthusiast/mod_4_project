import React from "react";
import Header from "./Header"

class DrawingBoard extends React.Component {
  constructor(){
    super()
    this.state = {
      id: null,
      drawing: false,
      color: "black",
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
      cleared: false
    }
  }

  render() {
    return (
      <div>
        <Header />

      </div>
    )
  }


}
export default DrawingBoard

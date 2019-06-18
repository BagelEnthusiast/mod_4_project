import React from 'react';
import EnterGameNumber from './EnterGameNumber'
import DrawingBoard from './DrawingBoard'


class Dashboard extends React.Component {
  constructor(){
    super()
    this.state = {
      gameNumber: null
    }

  }

  createOrJoinGame = (e) => {
    let gameNumber = e.target.parentElement.children[0].value
    this.setState({
      gameNumber: gameNumber
    })
  }

  render(){
    return(
      <div>
        {
          this.state.gameNumber ? <DrawingBoard gameNumber={this.state.gameNumber} /> : <EnterGameNumber createOrJoinGame={this.createOrJoinGame}/>
        }
      </div>
    )
  }


}

export default Dashboard;

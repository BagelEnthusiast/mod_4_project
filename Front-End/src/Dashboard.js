import React from 'react';
import EnterGameNumber from './EnterGameNumber'
import DrawingBoard from './DrawingBoard'


class Dashboard extends React.Component {
  constructor(){
    super()
    this.state = {
      gameNumber: 1
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
          this.state.gameNumber ? <DrawingBoard gameNumber={this.state.gameNumber} /> : <EnterGameNumber user={this.props.user} createOrJoinGame={this.createOrJoinGame}/>
        }
      </div>
    )
  }


}

export default Dashboard;

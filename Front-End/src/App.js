import React from 'react';
import logo from './logo.svg';
import './App.css';
import socketIO from 'socket.io-client'

const io = socketIO('http://10.185.0.210:8080')
window.io = io

io.on('message', payload => {
  console.log(payload)
})

// var socket = io.connect('http://localhost:3003')

//vidhi lecture code
// import socketIO from 'socket.io-client'
//const io =  socketIO('http://10.185.1.7:3003')

//vidhi ip
// const io = socketIO('http://10.185.0.210:8080')
// window.io = io

//io.emit('random', "table tennis*")  test in console


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

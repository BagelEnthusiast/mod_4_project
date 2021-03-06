// load our app server using express
const express = require('express')
const io = require('socket.io')()


//setup other required imports
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const pg = require('pg')
const pry = require('pryjs')
const User = require('./models/User')
let userList = []

//App setup
const app = express()
const server = app.listen(3003, () => {
    console.log("server is up and listening on 3003...")
})

//static files
app.use(express.static('../Front-End/public'))
app.use(cors())

process.env.SECRET_KEY = 'secret'


io.on('connection', (socket) => {
    console.log("made connection", socket.id)

    //listeners
    socket.on('chat', data => {
        io.sockets.emit('chat', data)
    })

    socket.on('typing', data => {
        socket.broadcast.emit('typing', data)
    })

    socket.on('clear', () => {
        console.log("cleared")
      io.sockets.emit('clear')
    })

    socket.on('drawing', (x, y) => {

        socket.broadcast.emit('drawing', x, y)
    })
  
    socket.on('join', (name) => {
        
        userList.push({socket: socket.id, username: name})
        io.sockets.emit('join', userList)
    })

    socket.on('requestList', userList => {
        console.log(userList)
        socket.broadcast.emit('receiveUserList', userList)
    })

    socket.on("currentWord", word => {
        io.sockets.emit('currentWord', word)
    })

    socket.on("playerChange", (user) => {
        io.sockets.emit("playerChange", user)
    })

    socket.on('mouseUp', () => {
        socket.broadcast.emit('mouseUp')
    })

    socket.on('disconnect', () => {
        console.log('Got disconnect')

        var i = userList.splice(i,1)
    })

})


//Body Parser
app.use(bodyParser.json())

 io.listen(8080)



//DB Connect to Postgres String
var connect = "postgres://flatironstudentaccount:learnlovecode@localhost/mod_4_project"


app.use(morgan('short'))
//app.use(morgan('combined'))

app.get("/", (req, res) => {
    console.log("Responding to root route")
    res.send("Hello from ROOOOTtttt")
})
//users routes
app.get('/users', (req, res) => {
    User.findAll()
    .then(user =>
        res.json(user))
})

app.get('/users/:id', (req, res) => {
    // eval(pry.it)
     User.findByPk(req.params.id)
     .then(user =>
         res.json(user))
 })

app.post('/login', (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
  .then(user => {
    if(user) {
      console.log(user)
      if(bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY)
        res.json({
          user: user.username,
          token: token
        })
      } else {
        res.status(400).json({error: 'Password doesn\'t match.'})
      }
    } else {
      res.status(400).json({error: 'User doesn\'t exist.'})
    }
  })
})

app.post('/register', (req, res) => {
    if(req.body.username !== "" && req.body.password !== "")
    {let userData = {
      username: req.body.username,
      password: req.body.password
    }
    User.findOne({
      where: {username: req.body.username}
    })
    .then(user => {
      if(!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          User.create(userData)
          .then(user => {
            res.json({status: user.username + ' registered'})
          })
          .catch(err => {
            res.send('error: ' + err)
          })
        })
      } else {
        res.json({error: "User already exists."})
      }
    })}else{res.json({error: "Please enter valid Username and Password"})}
})

app.patch('/users/:id', async (req, res) => {
    let user = await User.findByPk(req.params.id)
    await user.update(req.body)
    res.json(user)
 })

 app.delete('/users/:id', async (req, res) => {
    let user = await User.findByPk(req.params.id)
    user.destroy()
})




// app.listen(3003, () => {
//     console.log("server is up and listening on 3003...")
// })

// var http = require('http').createServer(app);
// var io = require('socket.io')(http);


//vidhi lecture code
// const io = require('socket.io')
// io.on('connection', socket => {

//     socket.on('message', payload => {
//         // console.log(payload)
//         socket.emit('message', "040119")
//     })

// })

// io.listen(3003)

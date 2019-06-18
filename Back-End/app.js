// load our app server using express
const express = require('express')
const io = require('socket.io')()


//setup other required imports
const morgan = require('morgan')
const bodyParser = require('body-parser')
const pg = require('pg')
const pry = require('pryjs')
const User = require('./models/User')

//App setup
const app = express()
const server = app.listen(3003, () => {
    console.log("server is up and listening on 3003...")
})

//static files
app.use(express.static('../Front-End/public'))


io.on('connection', (socket) => {
    console.log("made connection", socket.id)

    //listeners
    socket.on('chat', data => {
        io.sockets.emit('chat', data)
    })

    socket.on('typing', data => {
        socket.broadcast.emit('typing', data)
    })

    socket.on('drawing', (x, y) => {
       
        socket.broadcast.emit('drawing', x, y)
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

app.post('/users', async (req, res) => {
    let user = await User.create(req.body)
    res.json(user)
    // .then(painting => 
    //     res.json(painting))
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
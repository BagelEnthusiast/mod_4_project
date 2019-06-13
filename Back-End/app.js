// load our app server using express
const express = require('express')

const morgan = require('morgan')
const bodyParser = require('body-parser')
const pg = require('pg')
const pry = require('pryjs')
const User = require('./models/User')

const app = express()

//DB Connect to Postgres String
var connect = "postgres://flatironstudentaccount:learnlovecode@localhost/mod_4_project"

//Body Parser
app.use(bodyParser.json())


//localhost:3003
app.listen(3003, () => {
    console.log("server is up and listening on 3003...")
})


app.use(morgan('short'))
//app.use(morgan('combined'))

app.get("/", (req, res) => {
    console.log("Responding to root route")
    res.send("Hello from ROOOOTtttt")
})

// app.get("/users", (req, res) => {
//     var user1 = {firstName: "Stephen", lastname: "Curry"}
//     const user2 = {firstName: "Kevin", lastname: "Durant"}
//     const user3 = {firstName: "James", lastname: "Harden"}
//     res.json([user1, user2, user3])
// })


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
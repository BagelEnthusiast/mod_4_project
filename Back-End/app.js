// load our app server using express
const express = require('express')

const morgan = require('morgan')
const bodyParser = require('body-parser')
const pg = require('pg')
const pry = require('pryjs')
const User = require('./models/User')

const app = express()

//DB Connect String
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

app.get("/users", (req, res) => {
    var user1 = {firstName: "Stephen", lastname: "Curry"}
    const user2 = {firstName: "Kevin", lastname: "Durant"}
    const user3 = {firstName: "James", lastname: "Harden"}
    res.json([user1, user2, user3])

    //res.send("Nodemon auto updates when I save this file")
})



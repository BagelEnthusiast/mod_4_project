const User = require('./models/User')


User.sync()

const users = [

    {
        "username": "Nathan",
        "password": "password"
        
    },

    {
        "username": "Chris",
        "password": "password"
    }

]

users.forEach(user => User.create(user))
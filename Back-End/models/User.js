const Sequelize = require('sequelize')
const {STRING} = Sequelize

const sequelize = new Sequelize(`postgres://postgres:learnlovecode@127.0.0.1:5432/mod_4_project`);


const User = sequelize.define('user', {
    username: {
        type: STRING
    },
    password: {
        type: STRING
    }
})

module.exports = User

sequelize.sync()
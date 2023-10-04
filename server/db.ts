const {Sequelize} = require('sequelize')

const db = new Sequelize('final_project','postgres','Ysavely1333559',{
    host:'localhost',
    dialect:"postgres"
})
module.exports = db
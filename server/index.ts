const express = require('express')
const path = require('path')
const cors = require('cors')
const http = require('http')
const sequelize = require('./db')
const modules = require('./models/models')
const router = require('./routes/router')
const {Server} = require('socket.io')

const errorHandler = require('./error/ErrorHandlerMidleware')
//ss
const PORT = 5000
const app = express()
const server = http.createServer(app)
app.use(cors())
app.use(express.json())
app.use('/api',router)

app.use(errorHandler)

const io = new Server(server,{
    path:'/socket.io/',
    cors:{
        origin: "*"
    }
})
io.on('connection',(socket:any)=>{
    socket.on('chat message', (data:string) => {
        io.emit('chat message', data);
    });
})

server.listen(PORT||5000,async()=>{
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        console.log(`Port listening on ${PORT} port`)
    }catch (e) {
        console.log(e)
    }
})

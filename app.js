const express = require ('express')
const app = express()
app.use(express.text())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(__dirname + '/public'))

const http = require('http')
const server = http.createServer(app)

const {Server} = require('socket.io')
const io = new Server(server)

io.on('connection', (socket) => {
    console.log('Usuario conectado')
   socket.on('chat', (msg) => {
        io.emit('chat', msg)
    })
})

app.get('/', (req, resp) => {
    resp.sendFile(`${__dirname}/cliente/chat_view.html`)
})

server.listen(3000,() => {
    console.log('Servidor corriendo en http://localhost:3000')
})
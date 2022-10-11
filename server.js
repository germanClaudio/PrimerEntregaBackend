const express = require('express')
const app = express()
const router = require('./modulos/rutas')

// const { Server: IOServer } = require('socket.io')
// const { Server: HttpServer } = require('http')

// const httpServer = new HttpServer(app)
// const io = new IOServer(httpServer)

const PORT = 8080

app.use(express.static('src/images'))
app.use(express.static( __dirname + '/public'))
//app.use('/static', express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set('views', __dirname + '/public/views/pages') 

// const ContainerProducts = require('./containerProducts')
// const containerProduct = new ContainerProducts("./productos.json")
// const getAllProducts = containerProduct.getAllProd()


//------------ SERVER ----------
app.use('/api/productos', router)

app.use('/api/carrito', router)


const server = app.listen(PORT, ()=> {
    console.log(`Express server listening on port ${server.address().port}`)
})

// const server = httpServer.listen(PORT, () => {
//     console.log(`SERVER listen on port ${PORT}`)
// })

server.on("error", error => console.log(`Error en servidor ${error}`))

// io.on('connection', (socket) => {
//     // "connection" se ejecuta la primera vez que se abre una nueva conexión
//     // Se imprimirá solo la primera vez que se ha abierto la conexión   
//     console.log('Usuario conectado - ID User: ' + socket.id)

//     // Productos --------------------------
//     socket.emit('productsAll', JSON.stringify(getAllProducts))

//     socket.on('newProducto', (producto) => {
//         console.log('Data servidor: ' + JSON.stringify(producto))
//         const arrayProducts = containerProduct.saveProduct(producto)
//         io.sockets.emit('productsAll', arrayProducts)
//     })

//     socket.on('disconnect', () => {
//         console.log(`User desconectado`)
//     })
// })
const express = require('express')

    const { Server: HttpServer } = require('http')
    const { Server: IOServer } = require('socket.io')

const app = express()

    const httpServer = new HttpServer(app)
    const io = new IOServer(httpServer)

const router = require('./modulos/rutas')

const PORT = 8082

const ContainerProducts = require('./containerProducts')
const containerProduct = new ContainerProducts("./productos.json")
const getAllProducts = containerProduct.getAllProd()

app.use(express.static('src/images'))
app.use(express.static( __dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set('views', __dirname + '/public/views/pages') 

//------------ SERVER ----------
app.use('/api/productos', router)

app.use('/api/carrito', router)

// const server = app.listen(PORT, ()=> {
//     console.log(`Express server listening on port ${server.address().port}`)
// })
// server.on("error", error => console.log(`Error en servidor ${error}`))

const serverHttp = httpServer.listen(PORT, () => {
    console.log(`SERVER listen on port ${PORT}`)
})

serverHttp.on("error", error => console.log(`Error en servidor ${error}`))

io.on('connection', (socket) => {
    // "connection" se ejecuta la primera vez que se abre una nueva conexión
    // Se imprimirá solo la primera vez que se ha abierto la conexión   
    console.log('Usuario conectado - ID User: ' + socket.id)
    
    // Productos --------------------------
    socket.emit('productsAll', JSON.stringify(getAllProducts))

    socket.on('newProducto', (producto) => {
        console.log('Data servidor: ' + JSON.stringify(producto))
        const arrayProducts = containerProduct.saveProduct(producto)
        io.sockets.emit('productsAll', arrayProducts)
    })

    // socket.emit('productUpdated', )

    // const productDeleted = containerProduct.deleteById(id)
    // socket.emit('deleteProduct', JSON.stringify(productDeleted))

    // socket.on('ProductEliminated', (productElim) => {
    //     console.log('Data servidor: ' + JSON.stringify(productElim.id))
    //     const arrayProducts = containerProduct.deleteById(productElim.id)
    //     io.sockets.emit('ProductEliminated', arrayProducts)
    // })

    socket.on('disconnect', () => {
        console.log(`User desconectado`)
    })
})
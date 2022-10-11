const express = require('express')
const app = express()
const router = require('./modulos/rutas')

const PORT = 8080

app.use(express.static('src/images'))
app.use(express.static( __dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set('views', __dirname + '/public/views/pages') 

//------------ SERVER ----------
app.use('/api/productos', router)

app.use('/api/carrito', router)

const server = app.listen(PORT, ()=> {
    console.log(`Express server listening on port ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))

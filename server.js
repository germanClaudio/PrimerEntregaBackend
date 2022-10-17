const express = require('express')
const app = express()
const router = require('./modulos/rutas')
const routerCart = require('./modulos/rutasCart')

const PORT = process.env.PORT || 8082

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//------------ ROUTER ----------
app.use('/api/productos', router)
app.use('/api/carrito', routerCart)

app.all('*', (req, res) => {
    return res.status(404).send({
        Error: 'Path not found.'
    })
})

const server = app.listen(PORT, () => {
    console.log(`SERVER listen on port ${PORT}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))
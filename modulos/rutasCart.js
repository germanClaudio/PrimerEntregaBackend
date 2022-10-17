const express = require('express')
const { Router } = express
const routerCart = Router()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//-------------- Carritos ----------------
const ContainerCarts = require('../containerCart')
const containerCart = new ContainerCarts("./carrito.json")

//-------------- Productos ----------------
// const ContainerProducts = require('../containerProducts')
// const containerProduct = new ContainerProducts("./productos.json")

//---------ADMIN / USER -----------
const admin = true  // change to false to simulate user, change to true to simulate admin

//-------- Cart Router POST ---------
routerCart.post("/", (req, res) => {
    //console.log('Post: ' + req.body)

    if (admin === false) {
        res.json({ Error: 'Upps! You do not have permissions to see this!' })
    } else {

        const today = new Date()
        const timestamp = today.toLocaleString('en-GB')

        const addCart = {
            timestamp: timestamp,
            productos: []
        }

        containerCart.saveCart(addCart)
        res.json({ Success: `Cart Added successfully - ${JSON.stringify(addCart)} ` })
    }   
})

//--------Router DELETE BY ID ---------
routerCart.delete('/:id', (req, res) => {
    const { id } = req.params
    const cartDeleted = containerCart.deleteById(id)
    // console.log('Carrito a borrar: ' + JSON.stringify(cartDeleted))
    res.json(JSON.stringify(cartDeleted))
})

//--------Router GET BY ID ---------
routerCart.get('/:id_Cart/productos', (req, res) => {
    const { id_Cart } = req.params
    // console.log('params: ' + JSON.stringify(id_Cart))
    const getCart = containerCart.getCartById(Number(id_Cart))

    if (admin === false) {
        res.json({ Error: 'Upps! You do not have permissions to see this!' })
    } else {
        
        if (getCart.productos === undefined) {
            res.json({ Error: `Sorry, we could not find the Product with the ID# ${id_Cart}!` })
        }
        res.json({ ServerAnswer: `Id Cart#: ${getCart.id_Cart} , Products: ${JSON.stringify(getCart.productos, null, 2)} ` })
    }
})

//--------Router POST ---------
routerCart.post('/:id_Cart/productos', (req, res) => {
    const { id_Cart } = req.params
    const body = req.body
    
    if (admin === false) {
        res.json({ Error: 'Upps! You do not have permissions to do this!' })
    
    } else {
        const dbresponse = containerCart.updateCart(id_Cart, body)
        
        res.json({ ServerAnswer: `11- Id Cart#: ${id_Cart} - Product added: ${JSON.stringify(dbresponse, null, 2)}` })
    }
})

//--------Router DELETE PRODUCT IN CART BY ID PRODUCT ---------
routerCart.delete('/:id_Cart/productos/:id', (req, res) => {
    const { id_Cart, id } = req.params
    let respuesta = containerCart.deleteProductById(id_Cart, id)
    
    res.json(JSON.stringify(respuesta))
})

module.exports = routerCart;
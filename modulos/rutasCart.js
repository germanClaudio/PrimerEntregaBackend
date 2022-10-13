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
const ContainerProducts = require('../containerProducts')
const containerProduct = new ContainerProducts("./productos.json")

//---------ADMIN / USER -----------
const admin = true  // change to false to simulate user, change to true to simulate admin
//const admin = require('./admin')

//-------- Cart Router POST ---------
routerCart.post("/", (req, res) => {
    //console.log('Post: ' + req.body)
    const today = new Date()
    const timestamp = today.toLocaleString('en-GB')

    const addCart = {
        timestamp: timestamp,
        productos: []
    }

    containerCart.saveCart(addCart)
    res.json({ Success: `Cart Added successfully - ${JSON.stringify(addCart)} ` })
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
        console.log('Cart: ' + JSON.stringify(getCart.id_Cart) + ' - id: ' + id_Cart)
        if (getCart.productos === undefined) {
            res.json({ Error: `Sorry, we could not find the Product with the ID# ${id_Cart}!` })
        }
        res.json({ ServerAnswer: `Id Cart#: ${getCart.id_Cart} , Products: ${JSON.stringify(getCart.productos, null, 2)} ` })
    }
})

//--------Router POST ---------
routerCart.post('/:id_Cart/productos', (req, res) => {
    const { id_Cart } = req.params
    const getCart = containerCart.getCartById(Number(id_Cart))
    const body = req.body
    console.log('0-getcartlenght: ' + JSON.stringify(getCart))

    // res.json( { Error: `We could not find the Cart with the id#${id_Cart}` })
    // console.log('1-id: ' + id_Cart)
    // console.log('2-getcart: ' + JSON.stringify(getCart, null, 2))
    // console.log('3-Producto a agregar: ' + JSON.stringify(body, null, 2))

    if (admin === false) {
        res.json({ Error: 'Upps! You do not have permissions to do this!' })
    
    } else {
        const dbresponse = containerCart.updateCart(id_Cart, body)
        // console.log('8-db response: ' + JSON.stringify(dbresponse, null, 2))
        // console.log('10-productsInCArt: ' + JSON.stringify(productsInCart, null, 2))

        res.json({ ServerAnswer: `11- Id Cart#: ${id_Cart} - Product added: ${JSON.stringify(dbresponse, null, 2)}` })
    }

})

//--------Router DELETE PRODUCT IN CART BY ID PRODUCT ---------
routerCart.delete('/:id_Cart/productos/:id', (req, res) => {
    const { id_Cart, id } = req.params

    console.log('0-ID cart: '+ id_Cart + ' - id: ' + id)

    const cartId = containerCart.getCartById(id_Cart)

    console.log('1-cartId: '+ cartId)

    const index = cartId.productos.findIndex((item, indice) => {
        if(item.id === id) {
            return true
        }
    })

    const productsUpdated = cartId.productos.filter((prod, indice) => prod.id != id)

    cartId.productos = productsUpdated

    let respuesta = containerCart.updateCart(cartId)

    // const productDeleted = containerCart.deleteProductById(id_Cart, id)
    
    // console.log('Producto de Carrito a borrar: ' + JSON.stringify(productDeleted))

    res.json(JSON.stringify(respuesta))
})

module.exports = routerCart;
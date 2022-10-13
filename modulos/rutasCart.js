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
    res.json( { Success: `Cart Added successfully - ${JSON.stringify(addCart)} `} )
})

//--------Router DELETE BY ID ---------
routerCart.delete('/:id', (req, res) => {
    const { id } = req.params
    const cartDeleted = containerCart.deleteById(id)
    // console.log('Carrito a borrar: ' + JSON.stringify(cartDeleted))
    res.json( JSON.stringify(cartDeleted) )
})

//--------Router GET BY ID ---------
routerCart.get('/:id_Cart/productos', (req, res) => {
    const { id_Cart } = req.params
    // console.log('params: ' + JSON.stringify(id_Cart))
    const getCart = containerCart.getCartById(Number(id_Cart))
    
    if(admin === false) {
        res.json({ Error: 'Upps! You do not have permissions to see this!' })
    } else {
        console.log('Cart: ' + JSON.stringify(getCart.id_Cart) + ' - id: '+ id_Cart)
        if (getCart.productos === undefined) {
            res.json( { Error: `Sorry, we could not find the Product with the ID# ${id_Cart}!`} )
        }
        res.json({ ServerAnswer: `Id Cart#: ${getCart.id_Cart} , products: ${JSON.stringify(getCart.productos)} `})
    }
})

//--------Router POST ---------
routerCart.post('/:id_Cart/productos', (req, res) => {
    const { id_Cart } = req.params
    const getCart = containerCart.getCartById(Number(id_Cart))
    const body = req.body

    console.log('id: ' + id_Cart)
    console.log('getcart: ' + JSON.stringify(getCart))
    console.log('CartBody: ' + JSON.stringify(body))

    if(admin === false) {
        res.json({ Error: 'Upps! You do not have permissions to do this!' })
    } else {
        let productsInCart = body.forEach(id => {
            const product = containerProduct.getById(id)
            getCart.productos.push(product)
        })
        res.json({ ServerAnswer: `Id Cart#: ${productsInCart}`})
    }
    
})

//--------Router PUT ---------
// routerCart.post('/:id', (req, res) => {
//     console.log('Put: ' + req.params.id)
//     const today = new Date()
//     const timestamp = today.toLocaleString('en-GB')
//     const { id } = req.params
//     const { name, description, price, picture, code, stock } = req.body
    
//     const updateProductById = containerProduct.updateProduct(id, timestamp, name, description, price, picture, code, stock)

//     res.status(201).render('productUpdated', { updateProductById } )
// })



module.exports = routerCart;
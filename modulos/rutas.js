const express = require('express')
const { Router } = express
const router = Router()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//-------------- Productos ----------------
const ContainerProducts = require('../containerProducts')
const containerProduct = new ContainerProducts("./productos.json")
const getAllProducts = containerProduct.getAllProd()

//---------ADMIN / USER -----------
const admin = true  // change to false to simulate user, change to true to simulate admin

//--------Router GET ALL ---------
router.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.render('index', { getAllProducts, admin } )
})

//--------Router GET BY ID ---------
router.get('/:id', (req, res) => {
    const { id } = req.params
    const getProductById = containerProduct.getById(Number(id))
    //console.log(admin)
    res.setHeader('Content-Type', 'text/html')
    res.render('productSelected', { getProductById, admin } )
})

//--------Router POST ---------
 router.post("/", (req, res) => {
    console.log('Post: ' + req.body)
    const today = new Date()
    const timestamp = today.toLocaleString('en-GB')

    const addProduct = {
        timestamp: timestamp,
        name: req.body.name,
        description: req.body.description,
        price: parseInt(req.body.price),
        picture: req.body.picture,
        code: req.body.code,
        stock: parseInt(req.body.stock)
    }
    
    containerProduct.saveProduct(addProduct)
    res.setHeader('Content-Type', 'application/json')
    res.status(201).render('productSaved', { addProduct } )
})

//--------Router PUT ---------
router.post('/:id', (req, res) => {
    const today = new Date()
    const timestamp = today.toLocaleString('en-GB')
    const { id } = req.params
    const { name, description, price, picture, code, stock } = req.body
    const updateProductById = containerProduct.updateProduct(id, timestamp, name, description, price, picture, code, stock)
    
    res.setHeader('Content-Type', 'application/json')
    res.status(201).render('productUpdated', { updateProductById } )
})


//--------Router DELETE BY ID ---------
router.delete('/:id', (req, res) => {
    const { id } = req.params
    const productDeleted = containerProduct.deleteById(id)
    console.log('producto a borrar: '+productDeleted)
    res.setHeader('Content-Type', 'application/json')
    res.status(200).render( 'productDeleted', { productDeleted } )
})

module.exports = router;